import styled from "@emotion/styled";
import * as Slider from "@radix-ui/react-slider";
import { reduce } from "lodash";
import React from "react";

import Box from "../../components/Box";
import { theme } from "../../constants/constants";

const ALLOWED_VALUES = [1, 2, 7, 10, 14];

// Style the slider root
const StyledSlider = styled(Slider.Root)`
  align-items: center;
  display: flex;
  height: 20px;
  position: relative;
  touch-action: none;
  user-select: none;
  width: 100%;
`;

// Style the track
const StyledTrack = styled(Slider.Track)`
  background-color: ${theme.lightgray};
  border-radius: 9999px;
  flex-grow: 1;
  height: 3px;
  position: relative;
`;

// Style the range (filled part)
const StyledRange = styled(Slider.Range)`
  background-color: ${theme.darkbrown};
  border-radius: 9999px;
  height: 100%;
  position: absolute;
`;

// Style the thumb
const StyledThumb = styled(Slider.Thumb)`
  background-color: white;
  border-radius: 50%;
  border: 2px solid ${theme.darkbrown};
  cursor: pointer;
  display: block;
  height: 16px;
  width: 16px;

  &:hover {
    background-color: ${theme.lightbrown};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${theme.lightgray};
    outline: none;
  }
`;

function findClosestValue(value) {
  return reduce(ALLOWED_VALUES, (prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

export default class RowSlider extends React.PureComponent {
  handleValueChange = (values) => {
    const closestValue = findClosestValue(values[0]);

    this.props.onChangeRow(closestValue);
  };

  render() {
    const { row } = this.props;

    return (
      <Box maxWidth="600px" px="12px" py="24px" width="100%">
        <Box display="grid" gap="16px">
          <Box display="grid" gap="8px">
            <StyledSlider
              aria-label="Value"
              max={14}
              min={1}
              onValueChange={this.handleValueChange}
              step={1}
              value={[row]}
            >
              <StyledTrack>
                <StyledRange />
              </StyledTrack>
              <StyledThumb />
            </StyledSlider>
          </Box>
        </Box>
      </Box>
    );
  }
}
