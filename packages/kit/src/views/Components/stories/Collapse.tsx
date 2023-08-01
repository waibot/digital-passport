import { Box, Button, Center, Collapse } from '@onekeyhq/components';

const CollapseGallery = () => (
  <Center flex="1" bg="background-default">
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Collapse trigger="hello">this is a question</Collapse>
      <Collapse trigger="defaultCollapsed" defaultCollapsed={false}>
        this is a question
      </Collapse>
      <Collapse
        renderCustomTrigger={(onPress) => (
          <Button onPress={onPress}>CustonTrigger</Button>
        )}
        onCollapseChange={alert}
      >
        this is another question
      </Collapse>
    </Box>
  </Center>
);

export default CollapseGallery;
