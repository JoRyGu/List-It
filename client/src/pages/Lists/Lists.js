import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Lists.css";
import Navbar from "../../components/Navbar/Navbar";
import getUser from '../../components/getUser';

export default (props) => {
  const [user] = useState(getUser());
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [formData, setFormData] = useState({name: '', category: ''});
  const [editListIsVisible, setEditListIsVisible] = useState(false);

  useEffect(() => {
    getLists();
  }, [user]);

  useEffect(() => {
    if (user.id && parseInt(props.match.params.userId) !== user.id) {
      props.history.replace(`/users/${user.id}/lists`);
    }
  }, [user]);

  const getLists = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `/api/users/${user.id}/lists`,
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setLists(res.data.lists);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(true);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: 'post',
        url:`/api/users/${user.id}/lists`,
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        data: {
          name: formData.name,
          category: formData.category
        }
      });

      await getLists();
      setFormData({name: '', category: ''});
      setFormIsVisible(false);
    } catch (err) {
      console.log(err.response);
    }
  }

  const handleInputChange = (event) => {
    const newFormData = {...formData};
    newFormData[event.target.name] = event.target.value;
    setFormData(newFormData);
  }

  const handleDelete = async (event) => {
    const listId = parseInt(event.target.id);
    try {
      await axios({
        method: 'delete',
        url: `/api/users/${user.id}/lists/${listId}`,
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const newLists = [...lists].filter(list => list.id !== listId);
      setLists(newLists);
    } catch (err) {
      console.log(err.response);
    }
  }

  return (
    <div className="Lists">
      <Navbar />
      <div className="main-container">
        <h1>My Lists</h1>
        <div className="list-section">
          {isLoading ? (
            <p>Loading your lists...</p>
          ) : (
            <ul>
              {lists.map(list => (
                <li key={list.id} className="list-of-lists">
                  <Link to={`/users/${user.id}/lists/${list.id}`}>
                    {list.name}
                  </Link>
                  <div>
                    <i className="fas fa-edit"></i>
                    <i className="fas fa-trash" id={list.id} onClick={handleDelete}></i>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {
            formIsVisible ?
              <form className="new-list-form" onSubmit={handleFormSubmit}>
                <input type="text" name="name" placeholder="List Name" value={formData.name} onChange={handleInputChange} />
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} />
                <button type="submit">Add List</button>
              </form> :
              <button className="new-list" onClick={() => setFormIsVisible(true)}>Add New List</button>
          }
        </div>
      </div>
    </div>
  );
};
