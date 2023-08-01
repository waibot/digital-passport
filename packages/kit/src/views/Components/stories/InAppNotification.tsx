import { Box, Button, Center, useThemeValue } from '@onekeyhq/components';
import { showNotification } from '@onekeyhq/components/src/utils/showNotification';

const InAppNotificationGallery = () => {
  const bg = useThemeValue('background-default');
  return (
    <Center>
      <Box maxWidth="360px" h="full" bg={bg} p="10">
        <Button
          type="primary"
          onPress={() => {
            showNotification({
              title: '😀 Notification',
              subtitle: 'Subtitle',
              cover:
                'https://ethereum.org/favicon-32x32.png?v=8b512faa8d4a0b019c123a771b6622aa',
            });
          }}
        >
          showNotification
        </Button>
        <Button
          type="primary"
          mt={10}
          onPress={() => {
            showNotification({
              title: '😀 Notification',
              subtitle: 'Subtitle',
              actionText: 'Update',
              onBodyPress: () => {
                alert('onBodyPress');
              },
              onActionPress: () => {
                alert('Update');
              },
            });
          }}
        >
          showNotification with action
        </Button>
      </Box>
    </Center>
  );
};

export default InAppNotificationGallery;
