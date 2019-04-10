import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../components/Authentication/Authentication";
import "./Lists.css";
import Navbar from "../../components/Navbar/Navbar";

export default (props) => {
  const context = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [formData, setFormData] = useState({name: '', category: ''});

  useEffect(() => {
    getLists();
  }, [user]);

  useEffect(() => {
    setUser(context.userData);
  });

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
      console.log(res);

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
                <li key={list.id}>
                  <Link to={`/users/${user.id}/lists/${list.id}`}>
                    {list.name}
                  </Link>
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
