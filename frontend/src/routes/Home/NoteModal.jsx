import styled from "@emotion/styled";
import React from "react";

import submitNote from "../../api/submitNote";
import IconButton from "../../components/IconButton";
import Modal from "../../components/Modal";
import { stickies, theme } from "../../constants/constants";
import chooseColor from "../Notes/chooseColour";

const StyledInput = styled.textarea`
  background-color: ${chooseColor()};
  border-style: none;
  color: black;
  font-family: inherit;
  height: 320px;
  padding: 8px;
  user-select: text;
  width: 320px;
`;

export default class NoteModal extends React.PureComponent {
  handleChange = (e) => {
    const value = this.props.toUpperCase
      ? e.target.value.toUpperCase()
      : e.target.value;
    this.props.onChangeNote(value);
  };

  onClick = () => {
    const token = localStorage.getItem("token");

    submitNote(this.props.data, token);
    this.props.onChangeIsOpen(false);
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
        <IconButton
          color={theme.darkgray}
          justifyItems="center"
          label="SUBMIT"
          onClick={this.onClick}
        />
      </Modal>
    );
  }
}
