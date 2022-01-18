import React, { useEffect, useState } from 'react'

import { useDatabase } from '../../contexts/DatabaseContext'

import ShowAnswers from './ShowAnswers'
import AnswerSection from './AnswerSection'
import ShowTags from './ShowTags'


import { Card, OverlayTrigger, Button, Tooltip } from 'react-bootstrap'
import { FaTrash, FaShieldAlt } from 'react-icons/fa';
import ShowImageComponent from './ShowImageComponent'

function AdminPage() {

    const [questList, setQuestList] = useState([])
    const [reasons, setReasons] = useState([])

    const { questions, removeQuestion, shieldRequests, removeShieldRequest } = useDatabase()

    useEffect(() => {
        // console.log(tag);
        // console.log(shieldRequests);
        
        const list = []
        if(questions) {
            // console.log(questions);
            Object.keys(questions).forEach(id => {
                const data = questions[id]
                data['id'] = id
                let tempCount = 0
                if(shieldRequests) {
                    shieldRequests.forEach(shieldID => {
                        // console.log(shieldID);
                        // console.log(userPreferTag);
                        // console.log(data);
                        if(shieldID.qid === id) {
                            tempCount += 1
                        }
                    })
                    if(tempCount >= 1) {
                        list.push(data)
                    }
                }
            })
        }
        // console.log(select);
        // console.log(list);
        const sortedList = list.slice().sort((a, b) => b.createdAt - a.createdAt)
        // console.log(sortedList);
        setQuestList(sortedList)
    }, [shieldRequests, questions])


    return (
        <div style={{display:'flex', alignItems:'center',flexDirection:'column',minHeight:'100vh', backgroundColor: '#286C81'}}>
            <h3 style={{ marginTop:'30px' }}>Shield Question Requests</h3>
            {questList.length !== 0 
            ? questList.map(item => {
                        return (
                        <Card 
                        key={item.id}
                        style={{ margin: '10px'}}
                        >
                            <Card.Header>
                                <div>
                                    <h4 style={{ fontWeight:'bold',}}>
                                        Q: {item.question}
                                    </h4>
                                </div>
                                <div style={{ display: 'flex', alignItems:'end',justifyContent: 'space-between'}}>
                                    <div>
                                        {/* <span>{finalDateString && finalDateString}</span>
                                        <span style={{ margin:'0 3px'}}>|</span> */}
                                        <span style={{ margin: '0'}}>By: {item.username}</span>
                                    </div>
                                    <div>
                                        <span>
                                            
                                            <OverlayTrigger
                                                key='delete'
                                                placement='bottom'
                                                overlay={
                                                    <Tooltip id={`tooltip-sheild`}>
                                                    Onclicking this question will be <strong>Deleted</strong>.
                                                    </Tooltip>
                                                }
                                            >

                                                <Button style={{ background:'#6bb5ff', border:'none', marginRight:'20px'}}>
                                                    <FaTrash  
                                                    key={item.id} 
                                                    onClick={() => {
                                                        // console.log("Deleted");
                                                        removeQuestion(item.id, true)
                                                    }} 
                                                    style={{ width: '20px', height:'20px'}}
                                                    />
                                                </Button>
                                            </OverlayTrigger>
                                            
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
                                                <Button style={{ background:'#6bb5ff', border:'none'}}>
                                                    <FaShieldAlt 
                                                    key={item.id} 
                                                    onClick={() => {
                                                        removeShieldRequest(item.id)
                                                        alert(`Shielded - Question by ${item.username} is safe adding back`)
                                                    }} 
                                                    style={{ width: '20px', height:'20px'}}
                                                    />
                                                </Button>
                                            </OverlayTrigger>
                                            
                                        </span>
                                    </div>
                                </div>
                            </Card.Header>
                            <ShowTags tags={item.tags} headingBool={true} />
                            <Card.Body style={{ paddingTop: '10px'}}>
                                {/* <ReactionSection 
                                    qid={item.id} 
                                    likes={item.likes} 
                                    dislikes={item.dislikes}
                                    status1={false}
                                    status2={false}
                                /> */}
                                <ShowImageComponent imgUrl={item.imgUrl} />
                                <ShowAnswers answers={item.answers} qid={item.id} />
                                <AnswerSection length={item.answers.length} qid={item.id} />
                            </Card.Body>
                        </Card>
                    )})
            : <p>No Questions to shield</p>    }
        </div>
    )
}

export default AdminPage
