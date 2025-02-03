import React from "react";
import { map } from "lodash";

export default class FontLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  componentDidMount() {
    const fonts = {
      Montserrat: [
        {
          weight: "300",
          url: "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Hw5aXp-p7K4KLg.woff2",
        },
        {
          weight: "400",
          url: "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXp-p7K4KLg.woff2",
        },
        {
          weight: "500",
          url: "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Hw5aXp-p7K4KLg.woff2",
        },
        {
          weight: "600",
          url: "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu173w5aXp-p7K4KLg.woff2",
        },
        {
          weight: "700",
          url: "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w5aXp-p7K4KLg.woff2",
        },
      ],
      Inter: [
        {
          weight: "300",
          url: "https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
        },
        {
          weight: "400",
          url: "https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7.woff2",
        },
        {
          weight: "500",
          url: "https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7.woff2",
        },
        {
          weight: "600",
          url: "https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7.woff2",
        },
        {
          weight: "700",
          url: "https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7.woff2",
        },
      ],
    };

    const loadAllFonts = Object.entries(fonts).map(([fontFamily, weights]) =>
      Promise.all(
        map(weights, ({ weight, url }) =>
          new FontFace(fontFamily, `url(${url})`, { weight })
            .load()
            .then((font) => {
              document.fonts.add(font);
              return font;
            })
            .catch((err) =>
              console.error(`Failed to load ${fontFamily} ${weight}:`, err)
            )
        )
      )
    );

    Promise.all(loadAllFonts)
      .then(() => {
        this.setState({ fontsLoaded: true });
      })
      .catch((err) => {
        console.error("Error loading fonts:", err);
      });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }

    return this.props.children;
  }
}
