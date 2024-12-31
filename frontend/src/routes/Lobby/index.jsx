import React from "react";

import IconButton from "../../components/IconButton";
import { withRouter } from "../../utils/withRouter";

class Lobby extends React.PureComponent {
  onClick = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URL;
    const scope = "email profile";

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = googleAuthUrl;
  };

  render() {
    return (
      <IconButton borderStyle="none" label="Sign in" onClick={this.onClick} />
    );
  }
}

export default withRouter(Lobby);
