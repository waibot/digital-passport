import { Box } from '@onekeyhq/components';

import WebViewWallet from '../../../components/WebViewWallet';
import ControllerBarDesktop from '../../Discover/Explorer/Desktop/ControllerBarDesktop';

const WebViewDesktopDapp = () => {
  return (
    <Box flex="1" bg="background-hovered">
      <Box mb={10}>
        <ControllerBarDesktop />
      </Box>
      <Box>
        <WebViewWallet
          accountIndexList={[0]}
          style={{ width: "100%", height: 600 }}
          src="http://localhost:5001/"
        />
      </Box>
    </Box>
  );
};

export default WebViewDesktopDapp;
