import styled from "@emotion/styled";
import React from "react";
import { readableColor } from "polished";

import Box from "../../components/Box";
import Text from "../../components/Text";

const StyledNote = styled(Box)`
  transition: all 0.2s ease;
  position: relative;
  transform: rotate(${() => Math.random() * 2 - 1}deg);

  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px,
    inset 0 -20px 20px -20px rgba(0, 0, 0, 0.1),
    inset 0 50px 100px -30px rgba(255, 255, 255, 0.3);

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px,
      inset 0 -20px 20px -20px rgba(0, 0, 0, 0.1),
      inset 0 50px 100px -30px rgba(255, 255, 255, 0.3);
  }

&:before {
  content: "";
  position: absolute;
  ${() => {
    const size = 12 + Math.floor(Math.random() * 12);
    const corner = Math.floor(Math.random() * 4);

    const positions = [
      { x: "left", y: "top", angle: -45 }, // top left
      { x: "right", y: "top", angle: 45 }, // top right
      { x: "left", y: "bottom", angle: -135 }, // bottom left
      { x: "right", y: "bottom", angle: 135 }, // bottom right
    ];

    const { x, y, angle } = positions[corner];

    return `
      ${x}: -1px;
      ${y}: -1px;
      width: ${size}px;
      height: ${size}px;
      background: linear-gradient(
        ${angle}deg,
        transparent 48%,
        rgba(0,0,0,0.05) 50%
      );
    `;
  }}
  pointer-events: none;


  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfOiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwMA7QiYAxi+IlPdqo+hYHnUt5ZPfnsHJyNiDtnpJyayNBkF6cWoYGAMY92U2hXHF/C1M8uP/ZtYdiuj26UdAdQQSXQErwSOMzt/XWRWAz5GuSBIkwG1H3FabJ2OsUOUhGC6tK4EMtJO0ttC6IBD3kM0ve0tJwMdSfjZo+EEISaeTr9P3wYrGjXqyC1krcKdhMpxEnt5JetoulscpyzhXN5FRpuPHvbeQaKxFAEB6EN+cYN6xD7RYGpXpNndMmZgM5Dcs3YSNFDHUo2LGfZuukSWyUYirJAdYbF3MfqEKmjM+I2EfhA94iG3L7uKrR+GdWD73ydlIB+6hgref1QTlmgmbM3/LeX5GI1Ux1RWpgxpLuZ2+I+IjzZ8wqE4nilvQdkUdfhzI5QDWy+kw5Wgg2pGpeEVeCCA7b85BO3F9DzxB3cdqvBzWcmzbyMiqhzuYqtHRVG2y4x+KOlnyqla8AoWWpuBoYRxzXrfKuILl6SfiWCbjxoZJUaCBj1CjH7GIaDbc9kqBY3W/Rgjda1iqQcOJu2WW+76pZC9QG7M00dffe9hNnseupFL53r8F7YHSwJWUKP2q+k7RdsxyOB11n0xtOvnW4irMMFNV4H0uqwS5ExsmP9AxbDTc9JwgneAT5vTiUSm1E7BSflSt3bfa1tv8Di3R8n3Af7MNWzs49hmauE2wP+ttrq+AsWpFG2awvsuOqbipWHgtuvuaAE+A1Z/7gC9hesnr+7wqCwG8c5yAg3AL1fm8T9AZtp/bbJGwl1pNrE7RuOX7PeMRUERVaPpEs+yqeoSmuOlokqw49pgomjLeh7icHNlG19yjs6XXOMedYm5xH2YxpV2tc0Ro2jJfxC50ApuxGob7lMsxfTbeUv07TyYxpeLucEH1gNd4IKH2LAg5TdVhlCafZvpskfncCfx8pOhJzd76bJWeYFnFciwcYfubRc12Ip/ppIhA1/mSZ/RxjFDrJC5xifFjJpY2Xl5zXdguFqYyTR1zSp1Y9p+tktDYYSNflcxI0iyO4TPBdlRcpeqjK/piF5bklq77VSEaA+z8qmJTFzIWiitbnzR794USKBUaT0NTEsVjZqLaFVqJoPN9ODG70IPbfBHKK+/q/AWR0tJzYHRULOa4MP+W/HfGadZUbfw177G7j/OGbIs8TahLyynl4X4RinF793Oz+BU0saXtUHrVBFT/DnA3ctNPoGbs4hRIjTok8i+algT1lTHi4SxFvONKNrgQFAq2/gFnWMXgwffgYMJpiKYkmW3tTg3ZQ9Jq+f8XN+A5eeUKHWvJWJ2sgJ1Sop+wwhqFVijqWaJhwtD8MNlSBeWNNWTa5Z5kPZw5+LbVT99wqTdx29lMUH4OIG/D86ruKEauBjvH5xy6um/Sfj7ei6UUVk4AIl3MyD4MSSTOFgSwsH/QJWaQ5as7ZcmgBZkzjjU1UrQ74ci1gWBCSGHtuV1H2mhSnO3Wp/3fEV5a+4wz//6qy8JxjZsmxxy5+4w9CDNJY09T072iKG0EnOS0arEYgXqYnXcYHwjTtUNAcMelOd4xpkoqiTYICWFq0JSiPfPDQdnt+4/wuqcXY47QILbgAAAABJRU5ErkJggg==");
    opacity: 0.8;
    mix-blend-mode: multiply;
    pointer-events: none;
  }
`;

export default class Note extends React.PureComponent {
  onClick = () => this.props.onChangeEditId(this.props.data._id);

  render() {
    const { data } = this.props;
    const readable = readableColor(data.color);

    return (
      <StyledNote
        aspectRatio={1}
        backgroundColor={data.color}
        cursor="pointer"
        display="grid"
        gridTemplateRows="auto 1fr"
        onClick={this.onClick}
        p={12}
      >
        <Text color={readable} fontSize={12} justifySelf="start">
          {new Date(data.createdAt).toLocaleDateString()}
        </Text>
        <Text color={readable} overflowX="hidden">
          {data.text}
        </Text>
      </StyledNote>
    );
  }
}
