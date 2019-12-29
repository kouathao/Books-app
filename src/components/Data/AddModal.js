import React, { Component } from "react";
import {
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

class AddModal extends Component {
  state = {
    newBookData: {
      title: "",
      rating: ""
    },
    editBookData: {
      id: "",
      title: "",
      rating: ""
    },
    newBookModal: false
  };

  toggleNewBookModal() {
    // set state modal opposite
    this.setState({ newBookModal: !this.state.newBookModal });
  }

  addBook() {
    axios.post(API_URL, this.state.newBookData).then(response => {
      // call book out from state
      let { books } = this.state;
      console.log(response.data);
      // push a new a new book onto book array
      // !books.push(response.data);
      //reset the state with current books
      this.setState({
        books,
        newBookModal: false,
        newBookData: {
          title: "",
          rating: ""
        }
      });
      window.location.reload();
    });
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default AddModal;
