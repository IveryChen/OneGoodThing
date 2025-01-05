import { map } from "lodash";
import React from "react";
import { Async } from "react-async";
import { LiaArrowLeftSolid } from "react-icons/lia";

import { fetchNotes } from "../../api/fetchNotes";
import Box from "../../components/Box";
import Text from "../../components/Text";
import { theme } from "../../constants/constants";
import { withRouter } from "../../utils/withRouter";

import Note from "./Note";

class Notes extends React.PureComponent {
  onClick = () => {
    this.props.navigate("/home");
  };

  render() {
    const token = localStorage.getItem("token");

    return (
      <Async promiseFn={fetchNotes} token={token}>
        {this.renderBody}
      </Async>
    );
  }
  renderBody = ({ data: notes, error, isPending }) => {
    if (isPending)
      return (
        <Text color={theme.beige} p={16}>
          Loading...
        </Text>
      );
    if (error) return <Text p={16}>Error: {error.message}</Text>;
    if (notes) {
      return (
        <Box
          display="grid"
          gap={16}
          height="100%"
          overflow="hidden"
          p={16}
          pb={0}
        >
          <Box
            alignSelf="center"
            as={LiaArrowLeftSolid}
            color={theme.beige}
            justifySelf="start"
            onClick={this.onClick}
            size={32}
            width="100%"
          />
          <Box
            display="grid"
            gap={16}
            gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))"
            height="100%"
            overflow="auto"
            pb={16}
          >
            {map(notes, (note) => (
              <Note data={note} key={note._id} />
            ))}
          </Box>
        </Box>
      );
    }
  };
}

export default withRouter(Notes);
