import {  Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

import React, { useEffect, useState } from 'react'

const Main = () => {
  
  const [addUser, setAddUser] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/usersAdmin",{
      headers: {
        'x-access-token': localStorage.getItem('token'),
    }
    })
    console.warn(response)
    console.log(response.data.data);
    if (response.status === 200) {
      setAddUser(response.data.data)
      setLoading(false);
    }
    
  }

  const onDeleteUser = async (id) => {
    console.warn(id)
    if (window.confirm("Are you sure that you wanted to delete the user record")) {
      console.log(id);
      const res = await axios.delete(`http://localhost:5000/deleteMember/${id}`,{
        headers: {
          'x-access-token': localStorage.getItem('token'),
      }
      })
      if (res.status === 200) {
        console.log(res.data)
        getUsers();
      }
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

return (
 <div>
 <nav className={styles.navbar}>
      <h1>Recovero</h1>
        <h1>Welcome to Admin section</h1>

        <Link to="/addMember">
             <button type="button" className={styles.white_btn}>
             Add member
           </button>
         </Link>
        <button className={styles.white_btn} onClick={handleLogout}>
             Logout
          </button>
        </nav>

  <div>
    {addUser.length === 0
      ? <h3 className='text-danger'><i>No any user available...</i></h3>
      : <div className='container'>
        <div className='App'>
          <table border='1'>
         
          <tr>
          <td>S.no</td>
            <td>Email</td>
            <td>designation</td>
            <td>Billing Details</td>
            <td>Delete</td>
          </tr>
            {
              loading
            ? (<p>Loading....</p>)
            : (addUser.map((item, index) => (
              <tr key={item._id}>
                <td >{index + 1}</td>
                <td >{item.email}</td>
                <td >{item.designation}</td>
                <td >{Math.floor(Math.random() * 1000) + 1}</td>
                
<button className="btn btn-delete" onClick={()=> onDeleteUser(item.id)}>Delete</button>
              </tr>
            )))
            }


          </table>
        </div>
</div>}
  </div>
</div>  )
};

export default Main;
