import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../../components/Navbar/Navbar';
import getUser from '../../components/getUser';

export default ({match}) => {
  const [user] = useState(getUser());
  const [list, setList] = useState({name: '', category: '', items: []});

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    console.log(match);
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

  return (
    <div>
      <Navbar />
      <h1>{list.name}</h1>
      <h2>{list.category}</h2>
    </div>
  )
}