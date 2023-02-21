import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import { useUserInfoContext } from "../../utils/Store.jsx"
import './index.css'
import { useState } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import MessageBox from "./MessageBox.jsx"
import useClickOutside from "../../utils/useClickOutside.js"


const ChatBox = () => {
  const [open, setOpen] = useState(false)
  const [openMessageBox, setOpenMessageBox] = useState();
  let domNode = useClickOutside(()=>{ setOpen(false) })

  const { state } = useUserInfoContext();
  const { usersInfo } = state;

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
          ref={domNode}
          style={{
            width: '15rem',
            maxHeight: '18rem',
          }}
        >
          <Card.Header
            style={{
              backgroundImage: 'linear-gradient(0deg,#b597f6,#96c6ea)',
            }}
            className='text-left pl-3 '
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <Row
            >
              <Col
                onClick={() => setOpen((o) => !o)}
              >
                <strong
                  className='gradient-title'
                >Chat</strong>
              </Col>
              <Col 
                onClick={() => setOpen((o) => !o)}
                xs={4}></Col>
              <Col 
                onClick={()=>setOpenMessageBox('')}
              > {openMessageBox ? '✖️' : ''} </Col>
              <Col 
                onClick={() => setOpen((o) => !o)}
              > {open === false ? '➖' : '🟰'} </Col>
            </Row>
          </Card.Header>

          {!open || (
            <Card.Body className='chrome-scroll' >
              <ListGroup variant='flush'  >
                {
                  usersInfo.map((userInfo) => (
                    <ListGroup.Item key={userInfo.id}
                      onClick={() => setOpenMessageBox(userInfo)}
                    >
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
                            fontSize: 'x-small',
                            paddingRight: '0',
                            alignSelf: 'center',
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
      {openMessageBox && (
        <MessageBox user={openMessageBox} />
      )}
    </>
  )
}

export default ChatBox
