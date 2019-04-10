import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './Item.css';
import getUser from '../getUser';

const Item = (props) => {
  const [isComplete, setIsComplete] = useState(props.data.isComplete);
  const [editIsVisible, setEditIsVisible] = useState(false);
  const [description, setDescription] = useState(props.data.description);
  const [formData, setFormData] = useState('');

  const handleComplete = async () => {
    const {userId, listId} = props.match.params;
    try {
      await axios({
        method: 'patch',
        url: `/api/users/${userId}/lists/${listId}/items/${props.data.id}`,
        headers: {
          Authorization: `Bearer ${getUser().token}`
        },
        data: {
          isComplete: !isComplete
        }
      });
      setIsComplete(!isComplete);
    } catch (err) {
      console.log(err.response);
    }
  }

  const handleEditItem = async (event) => {
    event.preventDefault();
    const {userId, listId} = props.match.params;
    try {
      await axios({
        method: 'patch',
        url: `/api/users/${userId}/lists/${listId}/items/${props.data.id}`,
        headers: {
          Authorization: `Bearer ${getUser().token}`
        },
        data: {
          description: formData
        }
      });
      setDescription(formData);
      setEditIsVisible(false);
    } catch (err) {
      console.log(err.response);
    }
  }

  const handleDeleteItem = async () => {
    const {userId, listId} = props.match.params;
    try {
      await axios({
        method: 'delete',
        url: `/api/users/${userId}/lists/${listId}/items/${props.data.id}`,
        headers: {
          Authorization: `Bearer ${getUser().token}`
        }
      });
      props.delete(props.data.id);
    } catch (err) {
      console.log(err.response);
    }
  }

  const handleFormChange = (event) => {
    let newFormData = formData;
    newFormData = event.target.value;
    setFormData(newFormData);
  }
  
  return (
    <li className="Item">
      <div>
        {
          editIsVisible ?
          <form onSubmit={handleEditItem} className="edit-form ">
            <input type="text" name="description" placeholder={description} value={formData} onChange={handleFormChange} />
            <button id="edit-item" type="submit">Update</button>
          </form> :
          <p className={isComplete ? 'complete' : 'not-complete'}>{description}</p>
        }
      </div>
      <div className="actions">
        {
          isComplete ?
          <i className="fas fa-undo" onClick={handleComplete}></i> :
          <i className="fas fa-check" onClick={handleComplete}></i>
        }
        <i className="fas fa-edit" onClick={() => setEditIsVisible(!editIsVisible)}></i>
        <i className="fas fa-trash" onClick={handleDeleteItem}></i>
      </div>
    </li>
  )
};

export default withRouter(Item);