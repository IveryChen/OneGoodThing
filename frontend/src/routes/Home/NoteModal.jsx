import styled from "@emotion/styled";
import React from "react";

import Modal from "../../components/Modal";
import { stickies } from "../../constants/constants";

const StyledInput = styled.textarea`
  background-color: ${stickies.lightyellow};
  border-style: none;
  color: black;
  height: 320px;
  padding: 8px;
  width: 320px;
  font-family: inherit;
`;

export default class NoteModal extends React.PureComponent {
  handleChange = (e) => {
    const value = this.props.toUpperCase
      ? e.target.value.toUpperCase()
      : e.target.value;
    this.props.onChangeNote(value);
  };

  render() {
    const { data, isOpen, onClose } = this.props;

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <StyledInput
          background={stickies.lightyellow}
          onChange={this.handleChange}
          required={true}
          type="text"
          value={data}
        />
      </Modal>
    );
  }
}
