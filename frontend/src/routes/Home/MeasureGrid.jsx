import React from "react";
import Measure from "react-measure";
import { map } from "lodash";

import Box from "../../components/Box";
import Tip from "../../components/Tip";
import { theme } from "../../constants/constants";
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
      const noteId = dateMap[day.toDateString()];

      if (!noteId) {
        return (
          <Tip title={day.toDateString()}>
            <Box display="grid" key={day.toDateString()} size={gridSize}>
              <Box
                alignSelf="center"
                bg={theme.lightgray}
                borderRadius="50%"
                justifySelf="center"
                size={4}
              />
            </Box>
          </Tip>
        );
      }

      const note = notes[noteId];

      return (
        <Tip title={new Date(note.createdAt).toDateString()}>
          <Box size={gridSize}>
            <Note
              data={note}
              editId={editId}
              key={noteId}
              onChangeEditId={this.props.onChangeEditId}
              onNoteUpdated={reload}
              row={row}
              showContent={false}
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
            gap={row === 10 ? 24 / row : 12}
            gridTemplateColumns={`repeat(${row}, 1fr)`}
            height="100%"
            key={row}
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
