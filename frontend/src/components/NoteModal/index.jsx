import React from "react";

import Box from "../Box";
import Modal from "../Modal";

export default class NoteModal extends React.PureComponent {
  render() {
    const { data, isOpen, onClose } = this.props;

    if (!data) {
      return null;
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Box display="grid" gap="16px" />
      </Modal>
    );
  }
}
