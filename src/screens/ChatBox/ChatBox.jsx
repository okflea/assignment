import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import { useUserInfoContext } from "../../utils/Store.jsx"
// import Collapse from 'react-bootstrap/Collapse'
import './index.css'
import { useEffect, useRef, useState } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const ChatBox = () => {
  const [open, setOpen] = useState(false)

  const { state } = useUserInfoContext();
  const { usersInfo } = state;
  // the ref and useEffect is for closing chat when clicked outside the chatbox
  const chatRef = useRef()
  useEffect(() => {
    const closeChat = (e) => {
      if (!chatRef.current.contains(e.target))
        setOpen(false);
    }
    document.addEventListener('mousedown', closeChat)
    return () => {
      document.removeEventListener('mousedown', closeChat)
    }
  }, [])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          right: '5rem',
          bottom: '0',
          zIndex: '1'
        }}
      >
        <Card
          className='shadow-lg rounded-3'
          style={{
            width: '15rem',
            maxHeight: '18rem',
          }}
        >
          <Card.Header
            style={{
              backgroundImage: 'linear-gradient(0deg,#b597f6,#96c6ea)',
            }}
            ref={chatRef}
            className='text-left pl-3 '
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <Row>
              <Col
              >
                <strong
                  className='gradient-title'
                >Chat</strong>
              </Col>
              <Col xs={6}></Col>
              <Col
              >
                {open === false ? '🐓' : '🦖'} </Col>
            </Row>
          </Card.Header>

          {!open || (
            <Card.Body className='chrome-scroll' >
              <ListGroup variant='flush'  >
                {
                  usersInfo.map((userInfo) => (
                    <ListGroup.Item key={userInfo.id}>
                      <Row
                    >
                        <Col 
                      className="chat-col"
                      >
                          <img
                            src={userInfo.profilepicture}
                            alt={`${userInfo.name}'s profile picture`}
                            style={{
                              borderRadius: '50%',
                              width: '1rem',
                              height: '1rem',
                              marginRight: '0',
                              paddingRight: '0'
                            }}
                          />
                        </Col>
                        <Col
                          md='auto'
                          // xs={8}
                          style={{
                            fontWeight: 'lighted',
                            fontSize:'x-small',
                            paddingRight: '0',
                            alignSelf:'center',
                            // justifyItems:'left',
                          }}
                        >
                          {userInfo.name}</Col>
                        <Col className='status-container'>
                          <div
                          className="status-circle"
                        ></div>
                      </Col>

                      </Row>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
            </Card.Body>
          )}

        </Card>
      </div>
    </>
  )
}

export default ChatBox
