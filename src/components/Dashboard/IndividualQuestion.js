import React, { useState } from 'react'

import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDatabase } from '../../contexts/DatabaseContext';

import ShowAnswers from './ShowAnswers'
import AnswerSection from './AnswerSection'
import ShowImageComponent from './ShowImageComponent'

import { Spinner, Button, OverlayTrigger, Tooltip, Modal, Form } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { FaShieldAlt, FaTrash } from 'react-icons/fa'


function IndividualQuestion(props) {

    const qid = useLocation().pathname.slice(10)
    // console.log(qid);

    const { questions, removeQuestion, requestToRemove } = useDatabase()
    // console.log(questions[qid])
    
    // Modal States for Delete
    const [deleteShow, setDeleteShow] = useState(false);
    
    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);
    const handleDelete = () => {
        removeQuestion(qid)
        alert('Question Deleted Successfully')
        history.push('/')
    }
    
    // Modal States for Shield
    const [shieldShow, setShieldShow] = useState(false);
    const [shieldReason, setShieldReason] = useState('spam');
    
    const handleShieldClose= () => setShieldShow(false);
    const handleShieldShow = () => setShieldShow(true);

    const handleShield = () => {
        // console.log(shieldReason)
        requestToRemove(qid, shieldReason)
        alert('Question requested for removal')
        history.push('/')
    }

    const history = useHistory()
    const { currentUser } = useAuth()

    let item = null
    if(questions) {
        item = questions[qid] ? questions[qid] : null
    }
    // useEffect(() => {
    //     getQuestionData(qid)
    //     // setItem(getQuestionData(qid))
    // }, [qid])

    // useEffect(() => {
    //     console.log(individualQuestion);
    //     setItem(individualQuestion)
    // }, [])

    // position: absolute;
    // top: 50%;
    // left: 50%;
    // margin: -25px 0 0 -25px;

    return (
        <div style={{ 
            background:'#e6e6e6', 
            minHeight:'100vh',
            }}>
            <div style={{ }}>
                <Link to="/" style={{ height:'30px', width:'100%', position:'fixed', background:'#286C81'}}>
                    <p style={{ 
                        textDecoration:'none', 
                        color:'white', 
                        fontSize:'14px',
                        position: 'absolute',
                        top:'50%',
                        left:'50%',
                        margin:'-10px 0 0 -35px',
                        }} to="/">Back Home</p>
                </Link>
                {item  
                ? <div>
                    <div style={{height:'30px'}}></div>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center'}}>

                        <div 
                            style={{ 
                                padding:'10px 0 0 10px', 
                                marginBottom:'10px',
                                borderBottom: '1px solid #1B2840',
                                maxWidth:'764px', 
                                width:'100%',
                                }}>
                            <div>
                                <h2 style={{ fontSize:'14px' }}>
                                    <strong>Question: </strong>{item.question}
                                </h2>
                            </div>
                            <div>   
                                <p style={{ fontSize:'12px' }}>
                                    <strong>Description: </strong>{item.description}
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems:'end',justifyContent: 'space-between', marginBottom:'5px'}}>
                                <div>
                                    {/* <span>{finalDateString && finalDateString}</span>
                                    <span style={{ margin:'0 3px'}}>|</span> */}
                                    <span style={{ margin: '0', fontSize:'12px', fontStyle:'italic', marginRight:'20px'}}>Author: {item.username}</span>
                                </div>
                                <div>
                                    <span>
                                        {currentUser.uid === item.uid &&
                                        <OverlayTrigger
                                            key='delete'
                                            placement='bottom'
                                            overlay={
                                                <Tooltip id={`tooltip-sheild`}>
                                                Onclicking this question will be <strong>Deleted</strong>.
                                                </Tooltip>
                                            }
                                        >

                                            <Button 
                                            style={{ 
                                                width:'30px',
                                                height: '30px',
                                                background:'#1B2840', 
                                                border:'none', 
                                                marginRight:'20px',
                                                position: 'relative',
                                            }}>
                                                <FaTrash  
                                                key={item.id} 
                                                onClick={handleDeleteShow}
                                                style={{ 
                                                    width: '15px', 
                                                    height:'15px',
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left:'50%',
                                                    margin:'-7px 0 0 -7px',
                                                }}
                                                />
                                            </Button>
                                        </OverlayTrigger>
                                        }
                                    </span>
                                    <span>
                                        <OverlayTrigger
                                            key='shield'
                                            placement='bottom'
                                            overlay={
                                                <Tooltip id={`tooltip-shield`}>
                                                Feeling this question is offensive <strong>Report</strong>.
                                                </Tooltip>
                                            }
                                        >
                                            <Button style={{ 
                                                width:'30px',
                                                height: '30px',
                                                background:'#1B2840', 
                                                border:'none', 
                                                marginRight:'20px',
                                                position: 'relative',
                                            }}>
                                                <FaShieldAlt 
                                                key={item.id} 
                                                onClick={handleShieldShow}
                                                style={{ 
                                                    width: '15px', 
                                                    height:'15px',
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left:'50%',
                                                    margin:'-7px 0 0 -7px',
                                                }}
                                                />
                                            </Button>
                                        </OverlayTrigger>
                                    </span>
                                </div>                            
                            </div>

                        </div>
                        {/* <ShowTags tags={item.tags} headingBool={true} /> */}
                        <div style={{ maxWidth:'764px', width:'100%'  }}>
                            {/* <ReactionSection 
                                qid={item.id} 
                                likes={item.likes} 
                                dislikes={item.dislikes}
                                status1={false}
                                status2={false}
                            /> */}
                            {item.imgUrl !== 'no-img-url' && <ShowImageComponent imgUrl={item.imgUrl} /> }
                            <ShowAnswers answers={item.answers} qid={qid} authorUid={item.uid}/>
                            <AnswerSection length={item.answers.length} qid={qid} />
                        </div>
                    </div>
                </div>
                : <Spinner style={{ margin:'50% 0 0 50%',}} animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                } 


                {/* Modal for giving options to delete their question */}
                <Modal show={deleteShow} onHide={handleDeleteClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to delete this question?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Yes
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal for giving options to shield question */}
                <Modal show={shieldShow} onHide={handleShieldClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Shield</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Do you want to report this question for removal?
                        </p>
                        <Form.Select 
                        onChange={e => {
                            // console.log(e.target.value)
                            setShieldReason(e.target.value)
                        }}
                        style={{ height: '100%'}}
                        >
                            <option value="spam">Spam</option>
                            <option value="irrelevant">Irrelevant</option> 
                            <option value="offensive">Offensive</option>
                            <option value="age-restriction">Age Restriction</option>
                        </Form.Select>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleShieldClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleShield}>
                        Yes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
)
}

export default IndividualQuestion
