import React from "react";

export default class FontLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  componentDidMount() {
    const interFont = new FontFace(
      "Inter",
      "url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2)",
      { weight: "400" }
    );

    interFont
      .load()
      .then((font) => {
        document.fonts.add(font);
        this.setState({ fontsLoaded: true });
      })
      .catch((err) => console.error("Failed to load Inter font:", err));
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }

    return this.props.children;
  }
}
