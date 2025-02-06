import React from "react";
import Measure from "react-measure";
import { isEmpty, map, size } from "lodash";

import Box from "../../components/Box";
import Tip from "../../components/Tip";
import { theme } from "../../constants/constants";
import formatDateString from "../../utils/formatDateString";

import Note from "./Note";

class MeasuredGrid extends React.PureComponent {
  state = {
    dimensions: {
      width: -1,
    },
  };

  renderStackedNotes = (noteIds, notes, gridSize, editId, reload, row) => {
    return (
      <Box height={gridSize} position="relative" width={gridSize}>
        {map(noteIds, (noteId, index) => {
          const note = notes[noteId];
          const rotation = index % 2 === 0 ? -3 : 3;
          const offset = index * 2;

          return (
            <Box
              height="100%"
              key={noteId}
              left={`${offset}px`}
              position="absolute"
              top={`${offset}px`}
              transform={`rotate(${rotation}deg)`}
              width="100%"
              zIndex={index}
            >
              <Note
                data={note}
                editId={editId}
                onChangeEditId={this.props.onChangeEditId}
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
    const { notes, dateMap, row, editId, reload, allDays } = this.props;
    const gridSize = Math.floor((width - 24) / row);

    return map(allDays, (day) => {
      const date = formatDateString(day);
      const noteIds = dateMap[date];

      if (!noteIds || isEmpty(noteIds)) {
        if (row < 5) {
          return null;
        }

        return (
          <Tip title={date}>
            <Box display="grid" key={date} size={gridSize}>
              <Box
                alignSelf="center"
                bg={theme.lightgray}
                borderRadius="50%"
                justifySelf="center"
                size={2}
              />
            </Box>
          </Tip>
        );
      }

      if (size(noteIds) > 1) {
        return (
          <Tip title={`${formatDateString(day)} (${noteIds.length})`}>
            {this.renderStackedNotes(
              noteIds,
              notes,
              gridSize,
              editId,
              reload,
              row
            )}
          </Tip>
        );
      }

      const note = notes[noteIds[0]];
      return (
        <Tip title={formatDateString(note.createdAt)}>
          <Box height={gridSize} width={gridSize}>
            <Note
              data={note}
              editId={editId}
              key={noteIds}
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
