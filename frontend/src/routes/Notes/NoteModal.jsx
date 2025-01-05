import styled from "@emotion/styled";
import React from "react";

import updateNote from "../../api/updateNote";
import Box from "../../components/Box";
import Modal from "../../components/Modal";
import IconButton from "../../components/IconButton";
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
  state = { edit: false, isPending: false, note: "" };

  componentDidMount() {
    if (this.props.data) {
      this.setState({ note: this.props.data.text });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.data && this.props.data) {
      this.setState({ note: this.props.data.text });
    }
  }

  onChangeNote = (note) => this.setState({ note });

  toggleEdit = () => this.setState((prevState) => ({ edit: !prevState.edit }));

  handleChange = (e) => {
    const value = this.props.toUpperCase
      ? e.target.value.toUpperCase()
      : e.target.value;
    this.onChangeNote(value);
  };

  handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const { data, onNoteUpdated } = this.props;
    const { note } = this.state;

    this.setState({ isPending: true });

    try {
      await updateNote(data._id, note, token);
      onNoteUpdated();
      this.props.onClose();
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ isPending: false });
    }
  };

  render() {
    const { data, isOpen, onClose } = this.props;
    const { edit, isPending, note } = this.state;

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
            value={note}
          />
          <IconButton
            bg={edit ? theme.darkgray : "transparent"}
            color={edit ? theme.beige : theme.darkgray}
            disabled={isPending}
            justifyItems="center"
            label={edit ? "SAVE" : "EDIT"}
            onClick={edit ? this.handleSubmit : this.toggleEdit}
          />
          <IconButton
            color={theme.darkgray}
            justifyItems="center"
            label="DELETE"
          />
        </Box>
      </Modal>
    );
  }
}
