import React from "react";

import Box from "../../components/Box";
import RowSlider from "../../components/RowSlider";

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
        <RowSlider onChangeRow={onChangeRow} row={row} />
      </Box>
    );
  }
}
