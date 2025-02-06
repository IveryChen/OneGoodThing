import { map } from "lodash";
import React from "react";

import Box from "../../components/Box";

import Tab from "./Tab";

const values = [2, 10, 18];

export default class Footer extends React.PureComponent {
  render() {
    const { onChangeRow, row, ...restProps } = this.props;

    return (
      <Box
        alignItems="center"
        display="flex"
        gap="4px"
        justifyContent="center"
        mb="8px"
        mt="8px"
        {...restProps}
      >
        {map(values, (value) => (
          <Tab
            isSelected={row === value}
            key={value}
            onChangeRow={onChangeRow}
            value={value}
          />
        ))}
      </Box>
    );
  }
}
