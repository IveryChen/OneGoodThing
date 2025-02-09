import { branch } from "baobab-react/higher-order";
import React from "react";
import { LiaPlusSolid } from "react-icons/lia";

import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";
import formatDateString from "../../utils/formatDateString";
import { withRouter } from "../../utils/withRouter";

const today = formatDateString(new Date());

class Header extends React.PureComponent {
  state = { isDropdownOpen: false };

  handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  openModal = () => this.props.onChangeDate(today);

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  render() {
    const { onChangeDate, user, ...restProps } = this.props;
    const { isDropdownOpen } = this.state;

    return (
      <Box
        alignItems="center"
        display="flex"
        height={36}
        justifyContent="space-between"
        width="100%"
        {...restProps}
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
              zIndex={1}
            >
              <Text color={theme.darkgray} fontSize="12px">
                Logout
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
}

export default withRouter(branch({ user: ["user"] }, Header));
