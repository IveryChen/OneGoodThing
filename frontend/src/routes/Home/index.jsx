import { map } from "lodash";
import React from "react";
import { Async } from "react-async";

import { fetchNotes } from "../../api/fetchNotes";
import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";
import formatDateString from "../../utils/formatDateString";
import getCalendarDates from "../../utils/getCalendarDates";
import getDaysInYear from "../../utils/getDaysInYear";
import { withRouter } from "../../utils/withRouter";

import AddNoteModal from "./AddNoteModal";
import EditNoteModal from "./EditNoteModal";
import Footer from "./Footer";
import Header from "./Header";
import MeasuredGrid from "./MeasuredGrid";

// TODO: dont' hard code this
const year = 2025;

function organizeNotesIntoCalendar(yearCalendar, dateMap) {
  return map(yearCalendar, (month) => ({
    ...month,
    weeks: map(month.weeks, (week) => {
      return map(week, (day) => {
        if (!day) return null;

        const dateKey = formatDateString(day);
        return {
          date: dateKey,
          noteIds: dateMap[dateKey] || [],
        };
      });
    }),
  }));
}

class Home extends React.PureComponent {
  state = { date: false, editId: null, note: "", row: 14, showDate: null };

  onChangeEditId = (editId) => this.setState({ editId });

  onChangeDate = (date) => this.setState({ date });

  onChangeNote = (note) => this.setState({ note });

  onChangeRow = (row) => this.setState({ row });

  onChangeShowDate = (showDate) => this.setState({ showDate });

  onClose = () => this.setState({ date: false, editId: null });

  render() {
    const token = localStorage.getItem("token");

    return (
      <Async promiseFn={fetchNotes} token={token}>
        {this.renderBody}
      </Async>
    );
  }

  renderBody = ({ data, error, isPending, reload }) => {
    if (!data) {
      return null;
    }

    const { dateMap, notes } = data;
    const { date, editId, note, row, showDate } = this.state;

    if (isPending)
      return (
        <Text color={theme.darkgray} fontFamily="Montserrat" p="12px">
          Loading...
        </Text>
      );
    if (error)
      return (
        <Text color={theme.darkgray} fontFamily="Montserrat" p="12px">
          Error: {error.message}
        </Text>
      );
    if (notes) {
      const allDays = getDaysInYear();
      const yearCalendar = getCalendarDates(year);
      const organizedDates = organizeNotesIntoCalendar(yearCalendar, dateMap);
      const stackIds = showDate && dateMap[showDate];
      const stackData = stackIds && map(stackIds, (id) => notes[id]);

      return (
        <Box
          display="grid"
          gridTemplateRows="auto 1fr auto"
          height="100%"
          overflow="hidden"
          p="12px"
          pb={0}
        >
          <Header mb="12px" onChangeDate={this.onChangeDate} />
          <MeasuredGrid
            allDays={allDays}
            dateMap={dateMap}
            editId={editId}
            notes={notes}
            onChangeDate={this.onChangeDate}
            onChangeEditId={this.onChangeEditId}
            onChangeShowDate={this.onChangeShowDate}
            reload={reload}
            row={row}
          />
          <Footer onChangeRow={this.onChangeRow} row={row} />
          <EditNoteModal
            data={notes[editId]}
            editId={editId}
            isOpen={editId}
            onClose={this.onClose}
            onChangeEditId={this.onChangeEditId}
            onNoteUpdated={reload}
            showDate={showDate}
            stackData={stackData}
          />
          <AddNoteModal
            date={date}
            isOpen={date}
            note={note}
            onChangeDate={this.onChangeDate}
            onChangeNote={this.onChangeNote}
            onClose={this.onClose}
            onNoteUpdated={reload}
          />
        </Box>
      );
    }
  };
}

export default withRouter(Home);
