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
        if (row < 5) {
          return null;
        }

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
          <Box width={gridSize} height={gridSize}>
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
            ref={measureRef}
            alignContent="start"
            display="grid"
            gap={row === 10 ? 24 / row : 12}
            gridTemplateColumns={`repeat(${row}, 1fr)`}
            height="100%"
            overflow="auto"
            overflowX="hidden"
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
