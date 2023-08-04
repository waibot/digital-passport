import { Box, Button, SceneMap, TabView } from '@onekeyhq/components';

import WebView from '../../../components/WebView';
import useNavigation from '../../../hooks/useNavigation';

const IframeView = () => (
  <Box flex="1" bg="background-hovered">
    <iframe
      title="iframe-web"
      src="https://app.uniswap.org/#/swap"
      frameBorder="0"
      style={{ height: '100%', width: '100%' }}
    />
  </Box>
);

const IWebView = () => {
  // const navigation = useNavigation();
  return (
    <Box flex="1" bg="background-hovered">
      {/*<Button*/}
      {/*  onPress={() => {*/}
      {/*    navigation.navigate('Components/Approval' as any);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Send Transaction*/}
      {/*</Button>*/}
      <WebView src="https://app.uniswap.org/#/swap" />
    </Box>
  );
};

const Settings = () => (
  <Box flex="1" bg="background-hovered">
    <Box flex={1}>
      <TabView
        paddingX={16}
        autoWidth
        routes={[
          {
            key: 'IWebView',
            title: 'WebView',
          },
          {
            key: 'IframeView',
            title: 'iframe',
          },
        ]}
        renderScene={SceneMap({
          IWebView,
          IframeView,
        })}
      />
    </Box>
  </Box>
);

export default Settings;
