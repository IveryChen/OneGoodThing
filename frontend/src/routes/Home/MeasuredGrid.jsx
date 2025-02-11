import React from "react";
import Measure from "react-measure";
import { isEmpty, map, size } from "lodash";

import Box from "../../components/Box";
import Tip from "../../components/Tip";
import formatDate from "../../utils/formatDate";
import formatDateString from "../../utils/formatDateString";

import Dot from "./Dot";
import Note from "./Note";
import StackedNotes from "./StackedNotes";

class MeasuredGrid extends React.PureComponent {
  state = {
    dimensions: {
      width: -1,
    },
  };

  renderItems = (width) => {
    const {
      allDays,
      dateMap,
      editId,
      notes,
      onChangeDate,
      onChangeEditId,
      onChangeShowDate,
      reload,
      row,
    } = this.props;
    const gridSize = Math.floor((width - 24) / row);

    return map(allDays, (day) => {
      const date = formatDateString(day);
      const noteIds = dateMap[date];

      if (!noteIds || isEmpty(noteIds)) {
        if (row < 7) {
          return null;
        }

        return (
          <Tip key={date} title={formatDate(day)}>
            <Box display="grid" key={date} size={gridSize}>
              <Dot date={date} onChangeDate={onChangeDate} />
            </Box>
          </Tip>
        );
      }

      if (size(noteIds) > 1) {
        return (
          <Tip key={date} title={`${formatDate(day)} (${noteIds.length})`}>
            <StackedNotes
              editId={editId}
              noteIds={noteIds}
              notes={notes}
              onChangeEditId={onChangeEditId}
              onChangeShowDate={onChangeShowDate}
              reload={reload}
              row={row}
              size={gridSize}
            />
          </Tip>
        );
      }

      const note = notes[noteIds[0]];
      return (
        <Tip key={date} title={formatDate(note.createdAt)}>
          <Box height={gridSize} width={gridSize}>
            <Note
              data={note}
              editId={editId}
              onChangeEditId={this.props.onChangeEditId}
              onNoteUpdated={reload}
              row={row}
              showContent={row < 3}
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
            gap={row < 3 && 12}
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
