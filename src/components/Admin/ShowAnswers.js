import React, { useState } from 'react'

import { v4 as uuidv4 } from 'uuid';

import { Container, ListGroup } from 'react-bootstrap'

function createUniqueCode() {
    return uuidv4()
}

function ShowAnswers({ qid, answers }) {

    const [open, setOpen] = useState(false);

    // console.log(answers.length);

    return (
        <Container style={{ marginTop:'3px', padding:'0'}}>
            <details onClick={() => setOpen(!open)}>
                <summary>Show Answer</summary>
                {answers[0].ans.length !== 0 // initial answer given by questionare is empty or not
                    ?  answers.map(item => 
                        (<ListGroup 
                        key={createUniqueCode()}
                        variant='flush'
                        >
                            {item.ans && 
                            <>
                                <ListGroup.Item
                                className="d-flex justify-content-between align-items-start"
                                >
                                    
                                    {/* {item.uid === currentUser.uid 
                                    && <button onClick={() => {
                                        // removeAnswer(qid, )
                                    }} >Delete</button>} */}
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">
                                        {item.ans && item.ans}
                                    </div>
                                    Written By: {item.username && item.username}
                                </div>
                                {/* <Badge variant="primary" pill>
                                    Most Liked Answer
                                </Badge> */}
                                </ListGroup.Item>
                            </>
                            }
                        </ListGroup>
                        )
                    )
                    : <p style={{padding:'8px 0 0 16px'}}>No answers. Be the first to one answer it</p>
                }
            </details>
        </Container>
    )
}

export default ShowAnswers
