import React, { Component } from "react";
import {
  Table,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";
import { API_URL } from "../utils/misc";

// import AddModal from "./AddModal";

class Data extends Component {
  state = {
    // array
    books: [],
    newBookData: {
      title: "",
      rating: ""
    },
    editBookData: {
      id: "",
      title: "",
      rating: ""
    },
    newBookModal: false,
    editBookModal: false
  };

  componentDidMount() {
    this._refreshBooks();
  }

  toggleNewBookModal() {
    // set state modal opposite
    this.setState({ newBookModal: !this.state.newBookModal });
  }

  toggleEditBookModal() {
    this.setState({ editBookModal: !this.state.editBookModal });
  }

  addBook() {
    axios.post(API_URL, this.state.newBookData).then(response => {
      // call book out from state
      let { books } = this.state;
      console.log(response.data);
      // push a new a new book onto book array
      books.push(response.data);
      //reset the state with current books
      this.setState({
        books,
        newBookModal: false,
        newBookData: {
          title: "",
          rating: ""
        }
      });
    });
  }

  updateBook() {
    let { title, rating } = this.state.editBookData;
    axios
      .put(API_URL + this.state.editBookData.id, {
        title,
        rating
      })
      .then(response => {
        this._refreshBooks();
        this.setState({
          editBookModal: false,
          editBookData: { id: "", title: "", rating: "" }
        });
      });
  }
  _refreshBooks() {
    axios.get(API_URL).then(response => {
      this.setState({
        // get data from backend and add to state
        books: response.data
      });
    });
  }

  editBook(id, title, rating) {
    this.setState({
      editBookData: { id, title, rating },
      editBookModal: !this.state.editBookModal
    });
  }

  deleteBook(id, title) {
    axios.delete(API_URL + id).then(response => {
      alert(title + " Deleted");
      this._refreshBooks();
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
          <Button
            color="success"
            size="sm"
            className="mr-2"
            onClick={this.editBook.bind(this, book.id, book.title, book.rating)}
          >
            Edit
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={this.deleteBook.bind(this, book.id, book.title)}
          >
            Delete
          </Button>
        </tr>
      );
    });
    return (
      <React.Fragment>
        <Button
          color="primary"
          onClick={this.toggleNewBookModal.bind(this)}
          className="mb-3"
        >
          Add Book
        </Button>
        <Modal
          isOpen={this.state.newBookModal}
          toggle={this.toggleNewBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>
            Add a new Book
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={this.state.newBookData.title}
                onChange={e => {
                  let { newBookData } = this.state;
                  newBookData.title = e.target.value;
                  this.setState({ newBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input
                type="text"
                id="rating"
                value={this.state.newBookData.rating}
                onChange={e => {
                  let { newBookData } = this.state;
                  newBookData.rating = e.target.value;
                  this.setState({ newBookData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>
              Add Book
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* edit modal  */}
        <Modal
          isOpen={this.state.editBookModal}
          toggle={this.toggleEditBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>
            Edit a new Book
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={this.state.editBookData.title}
                onChange={e => {
                  let { editBookData } = this.state;
                  editBookData.title = e.target.value;
                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input
                type="text"
                id="rating"
                value={this.state.editBookData.rating}
                onChange={e => {
                  let { editBookData } = this.state;
                  editBookData.rating = e.target.value;
                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook.bind(this)}>
              Update Book
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleEditBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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
