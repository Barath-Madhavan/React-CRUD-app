import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import backgroundImg from '../images/joanna-kosinska-1_CMoFsPfso-unsplash.jpg';
const apiEndPoint = 'http://localhost:5000'; 

class EditItemForm extends Component {
  state = {
    name: '',
    description: '',
  };

  componentDidMount() {
    const { item } = this.props;
    if (item) {
      this.setState({
        name: item.name,
        description: item.description,
      });
    }
  }

  handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      this.setState({ name: value });
    }
  };

  handleDescriptionChange = (e) => {
    const value = e.target.value;
    this.setState({ description: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = this.state;

    if (!name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Name field is required.',
      });
      return;
    }

    if (!description) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Description field is required.',
      });
      return;
    }

    const words = description.split(' ');
    if (words.length > 200) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Description should not exceed 200 words.',
      });
      return;
    }

    const { match, history } = this.props;
    const itemId = match.params.id;

    axios
      .put(`${apiEndPoint}/items/${itemId}`, { name, description })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Item Updated!',
          text: 'The item has been updated successfully.',
        }).then(() => {
          this.props.onUpdateItem(response.data);
          // Redirect to the ItemList page after successful update
          history.push('/');
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Unable to update the item.',
        });
      });
  };

  render() {
    const { name, description } = this.state;

    if (!this.props.item) {
      
      return <div>Loading...</div>;
    }

    
    return (
      <div className="fixed inset-0 flex items-center justify-center " style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        <div className="w-full max-w-xl p-6"> 
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Item</h2>
          <form onSubmit={this.handleSubmit} className="w-full max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
                Name (Max 20 characters)
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={this.handleNameChange}
                className="w-full border border-gray-300 px-4 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="mb-2 font-semibold text-gray-700">
                Description (Max 200 words)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={this.handleDescriptionChange}
                className="w-full border border-gray-300 px-4 py-2 rounded"
                rows="4"
              />
              <p className="mt-2 text-gray-600">
                {description.split(' ').length}/200 words
              </p>
            </div>
            <div className="mt-4 text-center">
              <button
                type="submit"
                disabled={description.split(' ').length > 200}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                {description.split(' ').length > 200 ? 'Not more than 200 words' : 'Update Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(EditItemForm);
