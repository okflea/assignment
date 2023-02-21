import { useState } from 'react';
import './index.css'
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import { useUserInfoContext } from '../../utils/Store.jsx';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import slugify from '../../utils/slugify';

export default function ProfileLogoutModal() {
  const [show, setShow] = useState(false);
  const { state, dispatch } = useUserInfoContext();
  const { usersInfo, selectedUser } = state;

  const otherTwoUsers = [];
  // console.log(selectedUser)
  otherTwoUsers.push(usersInfo.find((user)=>user.id!==selectedUser.id));
  otherTwoUsers.push(usersInfo.find((user)=>user.id!==selectedUser.id&&user.id!==otherTwoUsers[0].id));
  const navigate = useNavigate();
  const changeUserHandler = (user) => {
    dispatch({type:'SET_SELECTED_USER',payload:user});
    navigate(`/profile/${slugify(user.name)}`)
  }
  return (
    <>

      <Col onClick={() => setShow(true)} style={{ textAlign: 'right', }} >
        <span>
          <img
            src={selectedUser.profilepicture}
            alt={`${selectedUser.name}'s profile picture`}
            className='top-profile-image' />
        </span>
        <span className='top-right-name' >{selectedUser.name}</span>
      </Col>
      <Modal size="sm" show={show} onHide={() => setShow(false)} aria-labelledby="example-modal-sizes-title-sm" >
        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-sm">
            <img
              src={selectedUser.profilepicture}
              alt={`${selectedUser.name}'s profile picture`}
              className='modal-picture' />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ justifyContent: 'center', color: '#494949' }} >
            {selectedUser.name}
          </Row>
          <Row style={{ justifyContent: 'center' }} >
            {selectedUser.email}
          </Row>
          <ListGroup>
            {otherTwoUsers.map(user => (
              <ListGroup.Item 
                onClick={()=>changeUserHandler(user)}
                key={user.id} 
                style={{ justifyContent: 'center', marginTop: '3px', }} >
                <img
                  src={user.profilepicture}
                  alt={`${user.name}'s profile picture`}
                  style={{ borderRadius: '50%', width: '2rem', height: '2rem', marginRight: '1rem' }} />
                <span style={{ color: 'grey', fontWeight: 'lighter' }} >
                  {user.name}
                </span>
              </ListGroup.Item>
            ))}
            <Row style={{ justifyContent: 'center', }} >
              <Button 
                variant='danger'
                onClick={()=>{
                dispatch({type:'CLEAR_SELECTED_USER'});
                navigate('/');
              }}
                style={{ marginTop: '2px', borderRadius: '2rem', width: '6rem', color: 'white', fontWeight: 'bold', backgroundImage: 'linear-gradient(0deg,#ba6868,#c82727)', }} >
                Sign out
              </Button>
            </Row>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

