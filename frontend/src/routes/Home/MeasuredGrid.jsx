import React from "react";
import Measure from "react-measure";
import { isEmpty, map, size } from "lodash";

import Box from "../../components/Box";
import Tip from "../../components/Tip";
import formatDateString from "../../utils/formatDateString";

import Dot from "./Dot";
import Note from "./Note";

class MeasuredGrid extends React.PureComponent {
  state = {
    dimensions: {
      width: -1,
    },
  };

  renderStackedNotes = (noteIds, gridSize) => {
    const { editId, notes, onChangeEditId, onChangeShowDate, reload, row } =
      this.props;

    return (
      <Box height={gridSize} position="relative" width={gridSize}>
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
                showContent={row < 5}
              />
            </Box>
          );
        })}
      </Box>
    );
  };

  renderItems = (width) => {
    const { allDays, dateMap, editId, notes, onChangeAdd, reload, row } =
      this.props;
    const gridSize = Math.floor((width - 24) / row);

    return map(allDays, (day) => {
      const date = formatDateString(day);
      const noteIds = dateMap[date];

      if (!noteIds || isEmpty(noteIds)) {
        if (row < 5) {
          return null;
        }

        return (
          <Tip key={date} title={date}>
            <Box display="grid" key={date} size={gridSize}>
              <Dot onChangeAdd={onChangeAdd} />
            </Box>
          </Tip>
        );
      }

      if (size(noteIds) > 1) {
        return (
          <Tip
            key={date}
            title={`${formatDateString(day)} (${noteIds.length})`}
          >
            {this.renderStackedNotes(noteIds, gridSize)}
          </Tip>
        );
      }

      const note = notes[noteIds[0]];
      return (
        <Tip key={date} title={formatDateString(note.createdAt)}>
          <Box height={gridSize} width={gridSize}>
            <Note
              data={note}
              editId={editId}
              onChangeEditId={this.props.onChangeEditId}
              onNoteUpdated={reload}
              row={row}
              showContent={row < 5}
            />
          </Box>
        </Tip>
      );
    });
  };

  render() {
    const { row } = this.props;

    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          this.setState({ dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) => (
          <Box
            alignContent="start"
            display="grid"
            gap={row === 2 && 12}
            gridTemplateColumns={`repeat(${row}, 1fr)`}
            height="100%"
            overflow="auto"
            overflowX="hidden"
            ref={measureRef}
          >
            {this.state.dimensions.width > 0 &&
              this.renderItems(this.state.dimensions.width)}
          </Box>
        )}
      </Measure>
    );
  }
}

export default MeasuredGrid;
