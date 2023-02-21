import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import './index.css'
import { useState } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import useClickOutside from "../../utils/useClickOutside"

const MessageBox = ({ user }) => {

  //used to conditionally open or close the messageBox
  const [open, setOpen] = useState(false)

  const chatRef = useClickOutside(()=>setOpen(false))
  return (
    <>
      <div
        style={{
          position: 'fixed',
          right: '22rem',
          bottom: '0',
          zIndex: '1'
        }}
      >
        <Card
          className='shadow-lg rounded-3'
          ref={chatRef}
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
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <Row>
              <Col className="chat-col" >
                <img
                  src={user.profilepicture}
                  alt={`${user.name}'s profile picture`}
                  style={{
                    borderRadius: '50%',
                    width: '1rem',
                    height: '1rem',
                    marginRight: '0',
                    paddingRight: '0'
                  }}
                />
              </Col>
              <Col md='auto'
              >
                <div className='gradient-title' style={{fontSize:'small'}}
                >{user.name}</div>
              </Col>
              <Col
                style={{fontSize:'smaller'}}
              >
                {open === false ? '➖' : '🟰'} </Col>
            </Row>
          </Card.Header>

          {!open || (
            <Card.Body className='chrome-scroll' >
              <ListGroup variant='flush'  >
                <ListGroup.Item>

                  <div className="bubble">
                    Lorem ipsum dolor sit ,
                  </div>
                  <div className="bubble">
                    Lorem ipsum dolor sit amet,
                  </div>
                    <Row style={{textAlign:'center'}}>
                    <div style={{fontSize:'x-small',color:'grey',marginBottom:'1rem'}}> 9:20 PM </div>
                  </Row>
                    <Row>
                    <div className="bubble-right"> Lorem ipsum dolor sit amet, </div>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          )}

        </Card>
      </div>
    </>
  )
}

export default MessageBox
