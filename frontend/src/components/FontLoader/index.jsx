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
    const fontWeights = [
      {
        weight: "300",
        url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
      },
      {
        weight: "400",
        url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
      },
      {
        weight: "500",
        url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2ZL7.woff2",
      },
      {
        weight: "600",
        url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7.woff2",
      },
      {
        weight: "700",
        url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7.woff2",
      },
    ];

    Promise.all(
      map(fontWeights, ({ weight, url }) =>
        new FontFace("Inter", `url(${url})`, { weight })
          .load()
          .then((font) => {
            document.fonts.add(font);
            return font;
          })
          .catch((err) => console.error(`Failed to load Inter ${weight}:`, err))
      )
    )
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
