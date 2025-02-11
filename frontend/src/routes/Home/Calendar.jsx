import { flatMap, map, size } from "lodash";
import React from "react";

import Box from "../../components/Box";
import Text from "../../components/Text";
import Tip from "../../components/Tip";
import { theme } from "../../constants/constants";

import Dot from "./Dot";
import Note from "./Note";
import StackedNotes from "./StackedNotes";

const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const noteSize = "80%";

export default class Calendar extends React.PureComponent {
  render() {
    const {
      editId,
      organizedDates,
      onChangeDate,
      notes,
      onChangeEditId,
      onChangeShowDate,
      reload,
      row,
    } = this.props;

    return (
      <Box display="grid" gap="16px" overflow="auto">
        <Box display="grid" gridTemplateColumns="repeat(7, 1fr)">
          {map(daysInWeek, (day) => (
            <Text
              color={theme.lightbrown}
              fontFamily="Montserrat"
              fontSize="12px"
              key={day}
              textAlign="center"
            >
              {day}
            </Text>
          ))}
        </Box>
        {map(organizedDates, ({ month, weeks }) => (
          <Box display="grid">
            <Text
              color={theme.darkbrown}
              fontFamily="Montserrat"
              fontSize="12px"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {month}
            </Text>
            <Box display="grid" gap="4px" gridTemplateColumns="repeat(7, 1fr)">
              {flatMap(weeks, (week, weekIndex) =>
                map(week, (dateInfo, dateIndex) => {
                  if (!dateInfo) {
                    return <Box />;
                  }

                  const { date, noteIds } = dateInfo;

                  if (size(noteIds) > 1) {
                    return (
                      <Tip key={date} title={`${date} (${noteIds.length})`}>
                        <StackedNotes
                          editId={editId}
                          noteIds={noteIds}
                          notes={notes}
                          onChangeEditId={onChangeEditId}
                          onChangeShowDate={onChangeShowDate}
                          reload={reload}
                          row={row}
                          size={noteSize}
                        />
                      </Tip>
                    );
                  }

                  const note = notes[noteIds[0]];

                  if (!note) {
                    return (
                      <Tip key={date} title={date}>
                        <Box
                          aspectRatio={1}
                          display="grid"
                          key={[month, weekIndex, dateIndex]}
                          size={noteSize}
                        >
                          <Dot
                            date={date}
                            onChangeDate={onChangeDate}
                            size={2}
                          />
                        </Box>
                      </Tip>
                    );
                  }

                  return (
                    <Tip key={date} title={date}>
                      <Box size={noteSize}>
                        <Note
                          data={note}
                          editId={editId}
                          onChangeEditId={onChangeEditId}
                          onNoteUpdated={reload}
                          row={row}
                          showContent={row < 3}
                        />
                      </Box>
                    </Tip>
                  );
                })
              )}
            </Box>
          </Box>
        ))}
      </Box>
    );
  }
}
