import styled from "@emotion/styled";
import { map } from "lodash";
import React from "react";

import { deleteNote } from "../../api/deleteNote";
import updateNote from "../../api/updateNote";
import Box from "../../components/Box";
import ColorPicker from "../../components/ColorPicker";
import Modal from "../../components/Modal";
import IconButton from "../../components/IconButton";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";
import format from "../../utils/format";

import SmallNote from "./SmallNote";

const StyledInput = styled.textarea`
  background-color: ${(props) => props.backgroundColor};
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
  state = {
    color: this.props.data?.color,
    edit: false,
    isPending: false,
    note: "",
  };

  componentDidMount() {
    if (this.props.data) {
      this.setState({
        color: this.props.data.color,
        note: this.props.data.text,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.data && this.props.data) {
      this.setState({
        color: this.props.data.color,
        note: this.props.data.text,
      });
    }

    if (prevProps.editId !== this.props.editId && this.props.data) {
      this.setState({
        color: this.props.data.color,
        edit: false,
        note: this.props.data.text,
      });
    }
  }

  onChangeColor = (color) => this.setState({ color });

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
    const { color, note } = this.state;

    this.setState({ isPending: true });

    try {
      await updateNote(data._id, color, note, token);
      onNoteUpdated();
      this.props.onClose();
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ isPending: false });
    }
  };

  handleDelete = async () => {
    const token = localStorage.getItem("token");
    const { data, onNoteUpdated } = this.props;

    this.setState({ isPending: true });
    try {
      await deleteNote(data._id, token);
      onNoteUpdated();
      this.props.onClose();
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ isPending: false });
    }
  };

  render() {
    const { data, editId, isOpen, onChangeEditId, onClose, stackData } =
      this.props;
    const { color, edit, isPending, note } = this.state;

    if (!data) {
      return null;
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Box display="grid" gap="8px" gridTemplateRows="auto 1fr">
          <Box
            alignItems="center"
            display="flex"
            flexWrap="wrap"
            gap="4px"
            justifyContent="center"
          >
            {map(stackData, (data) => (
              <SmallNote
                data={data}
                id={data._id}
                key={data._id}
                onChangeEditId={onChangeEditId}
                selected={editId === data._id}
              />
            ))}
          </Box>
          <Box display="grid" gap="8px">
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
            >
              <Text
                color={theme.darkbrown}
                fontFamily="Montserrat"
                fontSize="16px"
                fontWeight="bold"
              >
                {format(data.createdAt)}
              </Text>
              <IconButton
                borderWidth={0}
                color={edit ? theme.lightbrown : theme.darkbrown}
                disabled={isPending}
                justifyItems="center"
                justifySelf="end"
                label={edit ? "SAVE" : "EDIT"}
                onClick={edit ? this.handleSubmit : this.toggleEdit}
                p={0}
              />
            </Box>
            {edit && (
              <ColorPicker
                onChangeColor={this.onChangeColor}
                selectedColor={color}
              />
            )}
            <Box position="relative">
              <Box
                alt="Note background"
                as="img"
                left={0}
                pointerEvents="none"
                position="absolute"
                src={`https://onegoodthing.s3.us-east-2.amazonaws.com/edit.png`}
                top={0}
                width="100%"
              />
              <StyledInput
                backgroundColor={edit ? color : data.color}
                onChange={this.handleChange}
                readOnly={!edit}
                required={true}
                type="text"
                value={note}
              />
            </Box>
            <IconButton
              borderWidth={0}
              color={theme.darkgray}
              disabled={isPending}
              justifyItems="center"
              justifySelf="end"
              label="DELETE"
              onClick={this.handleDelete}
              p={0}
            />
          </Box>
        </Box>
      </Modal>
    );
  }
}
