import React from "react";
import Measure from "react-measure";
import { map } from "lodash";

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

  renderItems = (width) => {
    const { notes, dateMap, row, editId, reload, allDays } = this.props;
    const gridSize = Math.floor((width - 24) / row);

    return map(allDays, (day) => {
      const date = formatDateString(day);
      const noteId = dateMap[date];

      if (!noteId) {
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

      const note = notes[noteId];

      return (
        <Tip title={formatDateString(note.createdAt)}>
          <Box height={gridSize} width={gridSize}>
            <Note
              data={note}
              editId={editId}
              key={noteId}
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
