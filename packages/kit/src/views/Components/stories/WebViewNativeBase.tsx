import { Box } from '@onekeyhq/components';

import WebView from '../../../components/WebView';

const WebViewNativeBase = () => (
  <Box flex="1" bg="background-hovered">
    <WebView
      style={{ alignSelf: 'center', width: 390 }}
      src="https://docs.nativebase.io/"
    />
  </Box>
);

export default WebViewNativeBase;
