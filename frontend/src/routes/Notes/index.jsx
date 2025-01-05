import React from "react";
import { Async } from "react-async";

import { fetchNotes } from "../../api/fetchNotes";
import Text from "../../components/Text";
import { withRouter } from "../../utils/withRouter";

import Note from "./Note";

class Notes extends React.PureComponent {
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
        <Text color="gray" p={16}>
          Loading...
        </Text>
      );
    if (error) return <Text p={16}>Error: {error.message}</Text>;
    if (notes) {
      return <Note data={notes} />;
    }
  };
}

export default withRouter(Notes);
