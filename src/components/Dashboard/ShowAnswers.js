import React, { useState } from 'react'

import { useAuth } from '../../contexts/AuthContext';
import { useDatabase } from '../../contexts/DatabaseContext';

import { v4 as uuidv4 } from 'uuid';

import { Container, ListGroup } from 'react-bootstrap'

import { FaTrash } from 'react-icons/fa'

function createUniqueCode() {
    return uuidv4()
}

function ShowAnswers({ qid, authorUid, answers }) {

    // console.log(answers);

    const { removeAnswerWithIndex } = useDatabase()

    const { currentUser } = useAuth()

    // console.log(authorUid);

    return (
        <Container style={{ paddingLeft:'10px', margin:'0'}}>
            <strong>Answers:</strong>
            {answers.length !== 1 // initial answer given by questionare is empty or not
                ?  answers.map((item, index) => 
                    (
                    <ListGroup 
                    key={createUniqueCode()}
                    variant='flush'
                    >
                        {item.ans && 
                        <>
                            <ListGroup.Item
                            className="d-flex justify-content-between align-items-start"
                            style={{ 
                                background:'transparent', 
                                fontSize:'12px', 
                                padding: '0',
                                paddingBottom: '5px',
                                paddingTop: '5px',
                                borderBottom:'0.5px solid #1B2840',
                            }}
                            >
                            <div className="ms-2 me-auto">
                                <span 
                                className="fw-bold"
                                style={{ fontSize:'12px', margin:'0'}}
                                >
                                    {item.ans && item.ans}
                                </span>
                                <br></br>
                                <span style={{ fontSize:'10px', margin:'0'}}>
                                    Author: {item.username && item.username}
                                </span>
                            </div>
                            {/* <Badge variant="primary" pill>
                                Most Liked Answer
                            </Badge> */}
                                                                
                            {((item.uid === currentUser.uid) || (currentUser.uid === authorUid))
                                && <button 
                                    key={index} 
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                    }}
                                    onClick={() => {
                                    // console.log(index);
                                    // console.log(authorUid);
                                    // console.log(currentUser.uid);
                                    // console.log(item.uid);

                                        removeAnswerWithIndex(qid, index)
                                    }} >
                                        <FaTrash style={{ 
                                            color:'#1B2840',
                                            width: '15px',
                                            height: '15px',
                                            }}/>
                                    </button>
                            }
                            {/* border: 0;
                            border-top: 1px solid #CCC; */}
                            
                            </ListGroup.Item>
                        </>
                        }
                    </ListGroup>
                    ))
                    : <p style={{padding:'15px 0 0 10px', fontSize:'12px'}}>No answers. Be the first to one answer it</p>
                }
            <div style={{ height:'60px'}}></div>
        </Container>
    )
}

export default ShowAnswers
