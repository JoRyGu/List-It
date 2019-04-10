import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../../components/Navbar/Navbar';
import getUser from '../../components/getUser';
import Item from '../../components/Item/Item';
import './ListDetail.css';

export default ({match}) => {
  const [user] = useState(getUser());
  const [list, setList] = useState({name: '', category: '', items: []});
  const [newItemIsVisible, setNewItemIsVisible] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `/api/users/${user.id}/lists/${match.params.listId}`,
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setList({
        name: res.data.name,
        category: res.data.category,
        items: res.data.items
      });
    } catch (err) {
      console.log(err.response);
    }
  }

  const handleListDelete = (id) => {
    const newList = {...list};
    newList.items = list.items.filter(item => item.id !== id);
    setList(newList);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: 'post',
        url: `/api/users/${user.id}/lists/${match.params.listId}/items`,
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        data: {
          description: description
        }
      });
      const updatedList = {...list};
      updatedList.items.push(res.data.newItem);
      setList(updatedList);
      clearForm();
      setNewItemIsVisible(false);
    } catch (err) {
      console.log(err.response);
    }
    console.log(typeof description);
  }

  const handleFormChange = (event) => {
    let newDescription = description;
    newDescription = event.target.value;
    setDescription(newDescription);
  }

  const clearForm = () => {
    setDescription('');
  }

  return (
    <div className="List">
      <Navbar />
      <div className="main-container">
        <h1 className="list-name">{list.name}</h1>
        <h2 className="list-category">{list.category}</h2>
        <ul className="list-container">
          {
            list && list.items.map(item => (
              <Item key={item.id} data={item} delete={handleListDelete} />
            ))
          }
        </ul>
        {
          newItemIsVisible ?
            <form className="new-item-form" onSubmit={handleFormSubmit}>
              <input type="text" placeholder="Item Description" value={description} onChange={handleFormChange}/>
              <button type="submit">Add Item</button>
            </form> :
            <button onClick={() => setNewItemIsVisible(true)}>Add New Item</button>
        }
      </div>
    </div>
  )
}