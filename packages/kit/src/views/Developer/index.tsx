/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, SceneMap, TabView } from '@onekeyhq/components';

import WebViewChatGpt from '../Components/stories/WebViewChatGpt';
import WebViewNativeBase from '../Components/stories/WebViewNativeBase';

import DebugView from './Debug';
import Dev from './Dev';

const Developer = () => {
  const devCurrentIndex = localStorage.getItem('dev_currentIndex') || '1';
  return (
    <Box flex={1} p={2}>
      <TabView
        currentIndex={Number(devCurrentIndex)}
        onIndexChange={(index) =>
          localStorage.setItem('dev_currentIndex', String(index))
        }
        autoWidth
        routes={[
          {
            key: 'Debug',
            title: 'Debug',
          },
          {
            key: 'Dev',
            title: 'Dev',
          },
          {
            key: 'ChatGpt',
            title: 'ChatGpt',
          },
          {
            key: 'NativeBase',
            title: 'NativeBase',
          },
        ]}
        renderScene={SceneMap({
          Dev,
          Debug: DebugView,
          ChatGpt: WebViewChatGpt,
          NativeBase: WebViewNativeBase,
        })}
      />
    </Box>
  );
};

export default Developer;
