import { map } from "lodash";
import React from "react";

import Box from "../../components/Box";

import Note from "./Note";

export default class StackedNotes extends React.PureComponent {
  render() {
    const {
      editId,
      noteIds,
      notes,
      onChangeEditId,
      onChangeShowDate,
      reload,
      row,
      size,
    } = this.props;

    return (
      <Box size={size} position="relative">
        {map(noteIds, (noteId, index) => {
          const note = notes[noteId];
          const even = index % 2 === 0;
          const rotation = row < 7 ? (even ? -2 : 2) : even ? -8 : 8;

          return (
            <Box
              height="100%"
              key={noteId}
              position="absolute"
              transform={`rotate(${rotation}deg)`}
              width="100%"
            >
              <Note
                data={note}
                editId={editId}
                onChangeShowDate={onChangeShowDate}
                onChangeEditId={onChangeEditId}
                onNoteUpdated={reload}
                row={row}
                showContent={row < 3}
              />
            </Box>
          );
        })}
      </Box>
    );
  }
}
