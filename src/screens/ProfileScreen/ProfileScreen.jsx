import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ChatBox from '../ChatBox/ChatBox.jsx'
import './index.css'
import { useUserInfoContext } from '../../utils/Store.jsx';
import ProfileLogoutModal from './ProfileLogoutModal';
import { useNavigate } from 'react-router-dom';
// import GMap from './GMap';
const ProfileScreen = () => {
  const { state, dispatch } = useUserInfoContext();
  const { usersInfo, selectedUser } = state;
  const navigate = useNavigate();
  useEffect(() => {
    console.log(selectedUser.slug)
    if(!selectedUser)
      navigate('/')
  }, [])
  // const selectedUser = usersInfo[usersInfo.findIndex((user) => user.id === selectedId)];
  console.log(selectedUser)

  const userGeoLocation = {
    lat: parseFloat(selectedUser.address.geo.lat),
    lng: parseFloat(selectedUser.address.geo.lng)
  }
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <Container>
      <div className="navigation">
        <ul>
          <li
            className={selectedTab === 1 ? "list active" : "list"}
            onClick={selectedTab !== 1 ? () => setSelectedTab(1) : () => { }} >
            <b></b>
            <b></b>
            <span className="title">Profile</span>
          </li>
          <li>
            <hr className='rounded' />
          </li>
          <li
            className={selectedTab === 2 ? "list active" : "list"}
            onClick={selectedTab !== 2 ? () => setSelectedTab(2) : () => { }} >
            <b></b>
            <b></b>
            <span className="title">Post</span>
          </li>
          <li>
            <hr className='rounded' />
          </li>
          <li
            className={selectedTab === 3 ? "list active" : "list"}
            onClick={selectedTab !== 3 ? () => setSelectedTab(3) : () => { }}
          >
            <b></b>
            <b></b>
            <span className="title">Gallery</span>
          </li>
          <li>
            <hr className='rounded' />
          </li>
          <li
            className={selectedTab === 4 ? "list active" : "list"}
            onClick={selectedTab !== 4 ? () => setSelectedTab(4) : () => { }}
          >
            <b></b>
            <b></b>
            <span className="title">ToDo</span>
          </li>
        </ul>
      </div>
      <Container className='detail-container' >
        <Row>
          <Col className='detail-title' >
            <Row>
              <Col>
                <strong style={{ fontSize: '1.2rem' }} >
                  {selectedTab === 1 && 'Profile'}
                  {selectedTab === 2 && 'Post'}
                  {selectedTab === 3 && 'Gallery'}
                  {selectedTab === 4 && 'ToDo'}
                </strong>
              </Col>
              <ProfileLogoutModal />
            </Row>
          </Col>
          <hr className='rounded' />
        </Row>
        {selectedTab === 1 && (
          <Row>
            <Col className='detail-info' >
              <Row className='details-info-1' >
                <Row>
                  <Col></Col>
                  <Col>
                    <img
                      className='main-picture'
                      src={selectedUser.profilepicture}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <Row >
                  <Col></Col>
                  <Col md='auto' >
                    <strong>
                      {selectedUser.name}
                    </strong>
                  </Col>
                  <Col></Col>
                  <Row >
                    <Col style={{ textAlign: 'right' }} >Username:</Col>
                    <Col>
                      <strong> {selectedUser.username} </strong>
                    </Col>
                  </Row>
                  <Row >
                    <Col style={{ textAlign: 'right' }} >e-mail: </Col>
                    <Col>
                      <strong> {selectedUser.email} </strong>
                    </Col>
                  </Row>
                  <Row >
                    <Col style={{ textAlign: 'right' }} >Phone:</Col>
                    <Col>
                      <strong> {selectedUser.phone} </strong>
                    </Col>
                  </Row>
                  <Row >
                    <Col style={{ textAlign: 'right' }} >Website:</Col>
                    <Col>
                      <strong> {selectedUser.website} </strong>
                    </Col>
                  </Row>
                </Row>
              </Row>
              <hr className='rounded' />
              <Row className='details-info-2' >
                <Col></Col>
                <Col> Company </Col>
                <Col></Col>
                <Row >
                  <Col style={{ textAlign: 'right' }} >Name:</Col>
                  <Col>
                    <strong> {selectedUser.company.name} </strong>
                  </Col>
                </Row>
                <Row > <Col style={{ textAlign: 'right' }} >catchphrase:</Col>
                  <Col>
                    <strong> {selectedUser.company.catchPhrase} </strong>
                  </Col>
                </Row>
                <Row > <Col style={{ textAlign: 'right' }} >bs:</Col>
                  <Col>
                    <strong> {selectedUser.company.bs} </strong>
                  </Col>
                </Row>
              </Row>
            </Col>
            <Col className='detail-map' >
              <Row>
                <Col> Address: </Col>
              </Row>
              <Row>
                <Row>
                  <Col style={{ textAlign: 'right' }} >Street:</Col>
                  <Col>
                    <strong> {selectedUser.address.street} </strong>
                  </Col>
                </Row>
                <Row > <Col style={{ textAlign: 'right' }} >Suite:</Col>
                  <Col>
                    <strong> {selectedUser.address.suite} </strong>
                  </Col>
                </Row>
                <Row > <Col style={{ textAlign: 'right' }} >City:</Col>
                  <Col>
                    <strong> {selectedUser.address.city} </strong>
                  </Col>
                </Row>
                <Row > <Col style={{ textAlign: 'right' }} >Zipcode:</Col>
                  <Col>
                    <strong> {selectedUser.address.zipcode} </strong>
                  </Col>
                </Row>
              </Row>
              <Row style={{ paddingLeft: '5vw' }} >
                <MapContainer center={[userGeoLocation.lat, userGeoLocation.lng]} zoom={4} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[userGeoLocation.lat, userGeoLocation.lng]}>
                    <Popup>
                    </Popup>
                  </Marker>
                </MapContainer>
              </Row>
              <Row>
                <Col></Col>
                <Col></Col>
                <Col style={{ textAlign: 'right' }} >{`lat:${userGeoLocation.lat}`}</Col>
                <Col style={{ textAlign: 'right' }} >{`long:${userGeoLocation.lng}`}</Col>
              </Row>
            </Col>
          </Row>
        )}
        {selectedTab === 1 || (<Row md='auto' className="coming-soon" >Coming Soon</Row>)}
      </Container>
        <ChatBox/>
    </Container>
  )
}

export default ProfileScreen
