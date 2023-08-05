import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import backgroundImg from '../images/jess-bailey-q10VITrVYUM-unsplash.jpg';

const apiEndPoint = 'http://localhost:5000';

class AddItemForm extends Component {
  state = {
    name: '',
    description: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = this.state;

    if (!name || name.length > 20) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Name should not be empty and should be 20 characters or less.',
      });
      return;
    }

    const words = description.split(' ');
    if (!description || words.length > 200) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Description should not be empty and should be 200 words or less.',
      });
      return;
    }

    axios
      .post(`${apiEndPoint}/items`, { name, description })
      .then((response) => {
        this.props.onAddItem(response.data);
        this.setState({ name: '', description: '' });
        Swal.fire({
          icon: 'success',
          title: 'Item Added!',
          text: 'The item has been added successfully.',
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Unable to add the item.',
        });
      });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { name, description } = this.state;

    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.5' }}></div>
        <div className="w-full max-w-xl p-6 relative z-10">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Item</h2>
            <form onSubmit={this.handleSubmit} className="space-y-6">
              <div className="mb-4">
                <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
                  Name (Max 20 characters)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  className="w-full border border-gray-700 px-4 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="mb-2 font-semibold text-gray-700">
                  Description (Max 200 words)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => this.setState({ description: e.target.value })}
                  className="w-full border border-gray-700 px-4 py-2 rounded"
                  rows="4" 
                />
                <p className="mt-2 text-gray-600">
                  {description.split(' ').length}/200 words
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={this.handleBack}
                  className="bg-gray-500 hover:bg-gray-700 text-white px-6 py-3 rounded"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={description.split(' ').length > 200 || name.length > 20}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded"
                >
                  {description.split(' ').length > 200 || name.length > 20
                    ? 'Not more than 200 words and 20 characters'
                    : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddItemForm);
