import React from "react";
import { LiaCalendar } from "react-icons/lia";

import Box from "../../components/Box";
import RowSlider from "../../components/RowSlider";
import { theme } from "../../constants/constants";

export default class Footer extends React.PureComponent {
  onClick = () => this.props.onChangeCalendar(!this.props.calendar);

  render() {
    const { calendar, onChangeCalendar, onChangeRow, row, ...restProps } =
      this.props;

    return (
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        {...restProps}
      >
        <RowSlider onChangeRow={onChangeRow} row={row} />
        <Box
          as={LiaCalendar}
          color={calendar ? theme.lightbrown : theme.darkbrown}
          onClick={this.onClick}
          size={24}
        />
      </Box>
    );
  }
}
