import { branch } from "baobab-react/higher-order";
import React from "react";
import { LiaPlusSolid } from "react-icons/lia";

import { theme } from "../../constants/constants";
import { withRouter } from "../../utils/withRouter";

import Box from "../../components/Box";
import Text from "../../components/Text";

class Header extends React.PureComponent {
  state = { isDropdownOpen: false };

  handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  openModal = () => this.props.onChangeIsOpen(true);

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  render() {
    const { user } = this.props;
    const { isDropdownOpen } = this.state;

    return (
      <Box
        alignItems="center"
        display="flex"
        height={36}
        justifyContent="space-between"
        width="100%"
      >
        <Box
          as={LiaPlusSolid}
          color={theme.darkgray}
          cursor="pointer"
          onClick={this.openModal}
          size={32}
        />
        <Box position="relative">
          <Text
            color={theme.darkgray}
            cursor="pointer"
            onClick={this.toggleDropdown}
            textTransform="uppercase"
          >
            {user.name}
          </Text>
          {isDropdownOpen && (
            <Box
              bg="white"
              cursor="pointer"
              display="grid"
              justifyContent="center"
              onClick={this.handleLogout}
              p="8px"
              position="absolute"
              right={0}
              top="100%"
              width={64}
            >
              <Text color={theme.darkgray}>Logout</Text>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
}

export default withRouter(branch({ user: ["user"] }, Header));
