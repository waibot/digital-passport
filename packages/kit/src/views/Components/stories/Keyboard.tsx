import { useState } from 'react';

import { Box, Center, Keyboard, Text } from '@onekeyhq/components';

const KeyboardGallery = () => {
  const [inputText, updateInputText] = useState('');
  return (
    <Center flex="1">
      <Box
        h="full"
        width="360px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Text mb={50} typography="DisplayXLarge">
          {inputText}
        </Text>
        <Keyboard
          // keys={['1', '3', '4', '2', '7', '8', '5', '9', '6']}
          // secure
          pattern={/^([0-9]+|[0-9]+\.?)([0-9]{1,2})?$/}
          text={inputText}
          onTextChange={(text) => {
            updateInputText(() => text);
          }}
        />
      </Box>
    </Center>
  );
};

export default KeyboardGallery;
