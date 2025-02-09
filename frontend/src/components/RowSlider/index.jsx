import styled from "@emotion/styled";
import * as Slider from "@radix-ui/react-slider";
import React from "react";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";

// Style the slider root
const StyledSlider = styled(Slider.Root)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  touch-action: none;
  user-select: none;
`;

// Style the track
const StyledTrack = styled(Slider.Track)`
  background-color: ${theme.lightgray};
  position: relative;
  flex-grow: 1;
  height: 3px;
  border-radius: 9999px;
`;

// Style the range (filled part)
const StyledRange = styled(Slider.Range)`
  position: absolute;
  background-color: ${theme.darkbrown};
  height: 100%;
  border-radius: 9999px;
`;

// Style the thumb
const StyledThumb = styled(Slider.Thumb)`
  display: block;
  width: 16px;
  height: 16px;
  background-color: white;
  border: 2px solid ${theme.darkbrown};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${theme.lightbrown};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.lightgray};
  }
`;

export default class RowSlider extends React.PureComponent {
  handleValueChange = (values) => this.props.onChangeRow(values[0]);

  render() {
    const { row } = this.props;

    return (
      <Box maxWidth="600px" p="24px" width="100%">
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
            <Text color={theme.darkgray} fontSize="14px">
              {row}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }
}
