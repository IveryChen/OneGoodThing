import { map } from "lodash";
import React from "react";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";

const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default class Calendar extends React.PureComponent {
  render() {
    return (
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)">
        {map(daysInWeek, (day) => (
          <Text color={theme.darkbrown} fontFamily="Montserrat" key={day}>
            {day}
          </Text>
        ))}
      </Box>
    );
  }
}
