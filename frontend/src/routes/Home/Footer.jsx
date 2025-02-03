import { map } from "lodash";
import React from "react";

import Box from "../../components/Box";

import Tab from "./Tab";

const values = [1, 2, 5, 10];

export default class Footer extends React.PureComponent {
  state = { row: 10 };

  onChangeRow = (row) => this.setState({ row });

  render() {
    const { ...restProps } = this.props;
    const { row } = this.state;

    return (
      <Box
        alignItems="center"
        display="flex"
        gap="4px"
        justifyContent="center"
        p="16px"
        {...restProps}
      >
        {map(values, (value) => (
          <Tab
            isSelected={row === value}
            key={value}
            onChangeRow={this.onChangeRow}
            value={value}
          />
        ))}
      </Box>
    );
  }
}
