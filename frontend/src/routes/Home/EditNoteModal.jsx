import styled from "@emotion/styled";
import React from "react";

import submitNote from "../../api/submitNote";
import ColorPicker from "../../components/ColorPicker";
import Box from "../../components/Box";
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

export default class EditNoteModal extends React.PureComponent {
  state = { color: null, isPending: false };

  handleChange = (e) => {
    const value = this.props.toUpperCase
      ? e.target.value.toUpperCase()
      : e.target.value;
    this.props.onChangeNote(value);
  };

  handleSubmit = async () => {
    const token = localStorage.getItem("token");

    this.setState({ isPending: true });

    try {
      await submitNote(this.props.data, token);
      this.props.onChangeIsOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ isPending: false });
    }
  };

  onChangeColor = (color) => this.setState({ color });

  render() {
    const { data, isOpen, onClose } = this.props;
    const { color, isPending } = this.state;

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Box display="grid" gap="8px">
          <StyledInput
            background={stickies.lightyellow}
            onChange={this.handleChange}
            required={true}
            type="text"
            value={data}
          />
          <ColorPicker
            onChangeColor={this.onChangeColor}
            selectedColor={color}
          />
          <IconButton
            color={theme.darkgray}
            disabled={isPending}
            justifyItems="center"
            label="SUBMIT"
            onClick={this.handleSubmit}
          />
        </Box>
      </Modal>
    );
  }
}
