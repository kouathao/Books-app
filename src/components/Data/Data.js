import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import { API_URL } from "../utils/misc";

import AddModal from "./AddModal";

class Data extends Component {
  state = {
    // array
    books: []
  };

  componentDidMount() {
    axios.get(API_URL).then(response => {
      this.setState({
        // get data from backend and add to state
        books: response.data
      });
    });
  }

  passedFunction() {
    alert("Hello");
  }

  render() {
    // loop over each array
    let books = this.state.books.map(book => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.rating}</td>
          <Button color="success" size="sm" className="mr-2">
            Edit
          </Button>
          <Button color="danger" size="sm">
            Delete
          </Button>
        </tr>
      );
    });
    return (
      <React.Fragment>
        <AddModal passedFunction={this.passedFunction} />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* display books  */}
            {books}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default Data;
