import React from "react";
import { map } from "lodash";

import Box from "../../components/Box";
import { stickiesColours } from "../../constants/constants";

import Color from "./Color";

export default class ColorPicker extends React.PureComponent {
  render() {
    const { selectedColor, onChangeColor } = this.props;

    return (
      <Box display="flex" gap="8px" justifyContent="space-evenly">
        {map(stickiesColours, (hex) => (
          <Color
            hex={hex}
            key={hex}
            onChangeColor={onChangeColor}
            selectedColor={selectedColor}
          />
        ))}
      </Box>
    );
  }
}
