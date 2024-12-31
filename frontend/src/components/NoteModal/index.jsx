import React from "react";

import Box from "../Box";
import Modal from "../Modal";

import { stickies } from "../../constants/constants";

export default class NoteModal extends React.PureComponent {
  render() {
    const { data, isOpen, onChangeNote, onClose } = this.props;

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Box
          bg={stickies.lightyellow}
          display="grid"
          gap="16px"
          height={320}
          width={320}
        />
      </Modal>
    );
  }
}
