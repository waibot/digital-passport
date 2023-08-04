import { Box } from '@onekeyhq/components';

import WebView from '../../../components/WebView';

const WebViewDesktopDapp = () => (
  <Box flex="1" bg="background-hovered">
    <WebView
      style={{ alignSelf: 'center', width: 390 }}
      src="https://chat.openai.com"
    />
  </Box>
);

export default WebViewDesktopDapp;
