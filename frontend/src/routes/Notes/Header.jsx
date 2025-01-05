import React from "react";
import { LiaArrowLeftSolid } from "react-icons/lia";
import { AiOutlineEdit, AiTwotoneEdit } from "react-icons/ai";

import Box from "../../components/Box";
import { theme } from "../../constants/constants";
import { withRouter } from "../../utils/withRouter";

class Header extends React.PureComponent {
  onClick = () => {
    this.props.navigate("/home");
  };

  toggleEditMode = () => this.props.onChangeEditMode(true);

  render() {
    const { editMode } = this.props;

    return (
      <Box display="grid" gridTemplateColumns="1fr auto">
        <Box
          alignSelf="center"
          as={LiaArrowLeftSolid}
          color={theme.darkgray}
          cursor="pointer"
          justifySelf="start"
          onClick={this.onClick}
          size={32}
        />
        <Box
          alignSelf="center"
          as={editMode ? AiOutlineEdit : AiTwotoneEdit}
          color={theme.darkgray}
          cursor="pointer"
          justifySelf="start"
          onClick={this.toggleEditMode}
          size={32}
        />
      </Box>
    );
  }
}

export default withRouter(Header);
