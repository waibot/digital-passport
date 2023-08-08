import type { ComponentProps, FC } from 'react';
import { useCallback } from 'react';

import { Flex } from 'native-base';

import { Box, Button, Center, Text, VStack } from '@onekeyhq/components';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

import backgroundApiProxy from '../../background/instance/backgroundApiProxy';
import {
  useActiveWalletAccount,
  useGeneral,
  useRuntime,
  useRuntimeWallets,
} from '../../hooks/redux';
import extUtils from '../../utils/extUtils';
import InpageProviderWebView from '../WebView/InpageProviderWebView';

import type { IJsBridgeReceiveHandler } from '@onekeyfe/cross-inpage-provider-types';
import type { IWebViewWrapperRef } from '@onekeyfe/onekey-cross-webview';
import type {
  WebViewNavigation,
  WebViewOpenWindowEvent,
  WebViewSource,
} from 'react-native-webview/lib/WebViewTypes';

interface WebViewProps {
  id?: string;
  accountIndex?: number;
  accountIndexList?: number[];
  src?: string;
  partition?: string;
  style?: Record<string, any>;
  onSrcChange?: (src: string) => void;
  openUrlInExt?: boolean;
  onWebViewRef?: (ref: IWebViewWrapperRef | null) => void;
  onNavigationStateChange?: (event: WebViewNavigation) => void;
  onShouldStartLoadWithRequest?: (event: WebViewNavigation) => boolean;
  allowpopups?: boolean;
  containerProps?: ComponentProps<typeof Box>;
  customReceiveHandler?: IJsBridgeReceiveHandler;
  nativeWebviewSource?: WebViewSource | undefined;
  nativeInjectedJavaScriptBeforeContentLoaded?: string;
  isSpinnerLoading?: boolean;
  onContentLoaded?: () => void; // currently works in NativeWebView only
  onOpenWindow?: (event: WebViewOpenWindowEvent) => void;
  androidLayerType?: 'none' | 'software' | 'hardware';
}
const WalletWebview: FC<WebViewProps> = ({
  src = '',
  openUrlInExt = false,
  allowpopups = false,
  onWebViewRef = () => {},
  customReceiveHandler,
  accountIndex,
  ...rest
}) => {
  const { activeNetworkId, activeAccountId } = useGeneral();
  const { accounts, wallets } = useRuntime();
  const runtimeWallets = useRuntimeWallets();
  const activeWalletAccount = useActiveWalletAccount();
  console.log({
    accounts,
    wallets,
    runtimeWallets,
    activeWalletAccount,
    activeNetworkId,
    activeAccountId,
  });
  const { address } = accounts[accountIndex!];
  const url = `http://localhost:5001/?networkId=${activeNetworkId}&address=${address}`;
  const receiveHandler = useCallback<IJsBridgeReceiveHandler>(
    async (payload, hostBridge) => {
      console.log(
        '[receiveHandler] payload',
        accountIndex,
        payload.id,
        '>>>>>>>>',
        // @ts-ignore
        payload.data?.method,
        '<<<<<<<<',
        payload,
      );
      const result = await backgroundApiProxy.bridgeReceiveHandler({
        ...payload,
        accountIndex,
      });
      // return customReceiveHandler() response not supported yet
      await customReceiveHandler?.(payload, hostBridge);
      console.log('[receiveHandler] result ', accountIndex, result);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result;
    },
    [accountIndex, customReceiveHandler],
  );
  if (
    platformEnv.isExtension &&
    !platformEnv.isExtensionUiExpandTab &&
    openUrlInExt
  ) {
    return (
      <Center flex={1}>
        <Button onPress={() => extUtils.openUrlInTab(src)}>Open</Button>
      </Center>
    );
  }
  return (
    <Box rounded="lg" shadow={3}>
      <VStack>
        <Box>
          <Text># {accountIndex! + 1}</Text>
        </Box>
        <InpageProviderWebView
          ref={onWebViewRef}
          src={url}
          allowpopups={allowpopups}
          receiveHandler={receiveHandler}
          {...rest}
        />
      </VStack>
    </Box>
  );
};

const WebView: FC<WebViewProps> = ({
  accountIndexList,
  containerProps,
  ...rest
}) => {
  const { accounts } = useRuntime();
  return (
    <Box flex={1} {...containerProps}>
      <Flex direction="row" justifyContent="space-around" wrap="wrap-reverse">
        {accounts.length
          ? accountIndexList!.map((accountIndex) => (
              <WalletWebview {...rest} accountIndex={accountIndex} />
            ))
          : null}
      </Flex>
    </Box>
  );
};

export default WebView;
