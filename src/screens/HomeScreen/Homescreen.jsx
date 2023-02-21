import ListGroup from "react-bootstrap/ListGroup"
import Card from 'react-bootstrap/Card';
import './index.css'
import { useEffect, useState } from "react";
import { useUserInfoContext } from "../../utils/Store";
import { Link, useNavigate } from "react-router-dom";
import slugify from "../../utils/slugify";
import axios from "axios";

const url='https://panorbit.in/api/users.json'
const Homescreen = () => {
  const { state, dispatch } = useUserInfoContext();
  const { usersInfo, selectedUser } = state;
// console.log(selectedUser)
  const navigate = useNavigate();

  const selectUserHandler = (user) => {
    dispatch({ type: 'SET_SELECTED_USER', payload: user })
    navigate(`/profile/${slugify(user.name)}`)
  }
  useEffect(() => {
  if(usersInfo.length===0){
      console.log('calling again')
  axios.get(url).then((response) => {
      dispatch({type:'FETCH_SUCCESS',payload:response.data.users})
      });
    }

  }, [])
  return (
    <div>
      {/* <MessageBox user={usersInfo[3]}/> */}
      <Card
        className='shadow-lg rounded-4'
        border='light'
        style={{ width: '40rem', height: '30rem' }}
      >
        <Card.Header
          className='text-center p-4'>
          <strong > Select an account </strong>
        </Card.Header>
        <Card.Body className="chrome-scroll" >
          <ListGroup variant='flush'  >
            {
              usersInfo.map((userInfo) => (

                <ListGroup.Item
                  onClick={() => selectUserHandler(userInfo)}
                  
                  key={userInfo.id}>
                  <span>
                    <img
                      src={userInfo.profilepicture}
                      alt={`${userInfo.name}'s profile picture`}
                      // className="img-thumbnail"
                      style={{ borderRadius: '50%', width: '2rem', height: '2rem', marginRight: '1rem' }}
                    />
                  </span>
                  <span>{userInfo.name}</span>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Homescreen
