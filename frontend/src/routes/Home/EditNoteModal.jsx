import styled from "@emotion/styled";
import React from "react";

import submitNote from "../../api/submitNote";
import ColorPicker from "../../components/ColorPicker";
import Box from "../../components/Box";
import IconButton from "../../components/IconButton";
import Modal from "../../components/Modal";
import { theme } from "../../constants/constants";

import chooseColor from "./chooseColour";

const StyledInput = styled.textarea`
  background-color: ${(props) => props.backgroundColor || chooseColor()};
  border-style: none;
  color: black;
  font-family: inherit;
  font-size: 16px;
  height: 320px;
  padding: 8px;
  user-select: text;
  width: 320px;
`;

export default class EditNoteModal extends React.PureComponent {
  state = { color: chooseColor(), isPending: false };

  handleChange = (e) => {
    const value = this.props.toUpperCase
      ? e.target.value.toUpperCase()
      : e.target.value;
    this.props.onChangeNote(value);
  };

  handleSubmit = async () => {
    const { onChangeNote } = this.props;
    const { color } = this.state;
    const token = localStorage.getItem("token");

    onChangeNote("");

    this.setState({ isPending: true });

    try {
      await submitNote(this.props.note, color, token);
      this.props.onChangeIsOpen(false);
      this.props.onNoteUpdated();
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ isPending: false });
    }
  };

  onChangeColor = (color) => this.setState({ color });

  render() {
    const { isOpen, onClose, note } = this.props;
    const { color, isPending } = this.state;

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Box display="grid" gap="8px" p="8px">
          <ColorPicker
            onChangeColor={this.onChangeColor}
            selectedColor={color}
          />
          <Box position="relative">
            <Box
              alt="Note background"
              as="img"
              left={0}
              position="absolute"
              src={`https://onegoodthing.s3.us-east-2.amazonaws.com/edit.png`}
              top={0}
              width="100%"
            />
            <StyledInput
              backgroundColor={color}
              onChange={this.handleChange}
              required={true}
              type="text"
              value={note}
            />
            <IconButton
              borderWidth={0}
              color={theme.darkbrown}
              disabled={isPending}
              justifyItems="center"
              label="SUBMIT"
              onClick={this.handleSubmit}
            />
          </Box>
        </Box>
      </Modal>
    );
  }
}
