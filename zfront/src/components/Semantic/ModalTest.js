import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";

function BasicModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Edit Posting</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Modal Title</Header>
          <p>
            Here's a medium-length sentence that provides the content of this
            modal.
          </p>
          <p>Want to run around the block?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Close
        </Button>
        {/* <Button
          content="Yes"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        /> */}
      </Modal.Actions>
    </Modal>
  );
}

export default BasicModal;
