import styled from "@emotion/styled";
import React from "react";

import updateNote from "../../api/updateNote";
import Box from "../../components/Box";
import Modal from "../../components/Modal";
import IconButton from "../../components/IconButton";
import { stickies, theme } from "../../constants/constants";
import chooseColor from "../Notes/chooseColour";

// import { AiOutlineEdit, AiTwotoneEdit } from "react-icons/ai";

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
  state = { edit: false, note: "" };

  onChangeNote = (note) => this.setState({ note });

  toggleEdit = () => this.setState((prevState) => ({ edit: !prevState.edit }));

  handleChange = (e) => {
    const value = this.props.toUpperCase
      ? e.target.value.toUpperCase()
      : e.target.value;
    this.onChangeNote(value);
  };

  onClick = () => {
    const token = localStorage.getItem("token");

    updateNote(this.props.note, token);
  };

  render() {
    const { data, isOpen, note, onClose } = this.props;
    const { edit } = this.state;

    if (!data) {
      return null;
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Box display="grid" gap="8px">
          <StyledInput
            background={stickies.lightyellow}
            onChange={this.handleChange}
            readOnly={!edit}
            required={true}
            type="text"
            value={edit ? note : data.text}
          />
          <IconButton
            bg={edit ? theme.darkgray : "transparent"}
            color={edit ? theme.beige : theme.darkgray}
            justifyItems="center"
            label="EDIT"
            onClick={this.toggleEdit}
          />
          <IconButton
            color={theme.darkgray}
            justifyItems="center"
            label="DELETE"
            //   onClick={this.onClick}
          />
        </Box>
      </Modal>
    );
  }
}
