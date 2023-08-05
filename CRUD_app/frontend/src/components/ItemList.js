import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const apiEndPoint = 'http://localhost:5000';
const MySwal = withReactContent(Swal);

class ItemList extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    // Fetch all items from the backend
    axios
      .get(`${apiEndPoint}/items`)
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleDeleteItem = (itemId) => {
    // Show SweetAlert 
    MySwal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // If user clicks 'Yes', proceed with the deletion
        axios
          .delete(`${apiEndPoint}/items/${itemId}`)
          .then(() => {
            this.setState({ items: this.state.items.filter((item) => item._id !== itemId) });
            MySwal.fire('Deleted!', 'The item has been deleted.', 'success');
          })
          .catch((error) => {
            console.error(error);
            MySwal.fire('Error!', 'Failed to delete the item.', 'error');
          });
      }
    });
  };

  render() {
    const { items } = this.state;

    return (
      <div className="container mx-auto p-4" >
        <h1 className="text-3xl font-bold mb-4 text-center underline">MERN STACK CRUD APP</h1>
        <h2 className="text-2xl font-bold mb-4 text-center">Item List</h2>
        <div className="w-full lg:w-2/3 mx-auto">
        <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
            <table className="w-full border-collapse border">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border-2 p-2 border-gray-800" style={{ width: '25%' }}>
                    Name
                  </th>
                  <th className="border-2 p-2 border-gray-800" style={{ width: '25%' }}>
                    Description
                  </th>
                  <th className="border-2 p-2 border-gray-800 text-center" style={{ width: '25%' }}>
                    Edit
                  </th>
                  <th className="border-2 p-2 border-gray-800 text-center" style={{ width: '25%' }}>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td className="border-2 p-2 border-gray-800 break-all text-center" style={{ width: '25%' }}>
                      {item.name}
                    </td>
                    <td className="border-2 p-2 border-gray-800 break-word text-center" style={{ width: '25%' }}>
                      {item.description}
                    </td>
                    <td className="border-2 p-2 border-gray-800 text-center" style={{ width: '25%' }}>
                      <Link to={`/edit/${item._id}`}>
                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td className="border-2 p-2 border-gray-800 text-center" style={{ width: '25%' }}>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                        onClick={() => this.handleDeleteItem(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 font-bold text-white px-6 py-3 text-lg rounded-md">
            <Link to="/add">Add Item</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default ItemList;
