import React, { useEffect, useState } from 'react'
import { useDatabase } from '../../contexts/DatabaseContext'
import { useAuth } from '../../contexts/AuthContext'

import ShowAnswers from './ShowAnswers'
import AnswerSection from './AnswerSection'
import ShowTags from './ShowTags'
import ShowImageComponent from './ShowImageComponent'


import { Card, Container, OverlayTrigger, Button, Tooltip } from 'react-bootstrap'
import { FaTrash, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'


function QuestionSection({ select, questions, tag, prefer, preferedTags }) {
    
    const [questList, setQuestList] = useState([])

    const { currentUser } = useAuth()
    // console.log(questions);

    function renderAllQuestions(questions, tag, select) {
        // console.log(tag);
        const list = []
        if(questions) {
            Object.keys(questions).forEach(id => {
                const data = questions[id]
                data['id'] = id
                if(tag && data.tags && data.tags.includes(tag.toLowerCase())) {
                    // console.log(data.tags.includes(tag.toLowerCase()));
                    if(select === '1') {
                        // UnAnswered
                        if(data.answers.length === 1) {
                            list.push(data)
                        }
                    } else if(select === '2') {
                        // Answered
                        if(data.answers.length !== 1) {
                            list.push(data)
                        }
                    } else {
                        // Recent
                        list.push(data)
                    }   
                } else if(tag === '') {
                    if(select === '1') {
                        // UnAnswered
                        if(data.answers.length === 1) {
                            list.push(data)
                        }
                    } else if(select === '2') {
                        // Answered
                        if(data.answers.length !== 1) {
                            list.push(data)
                        }
                    } else {
                        // Recent
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
    }

    function renderPreferQuestions(questions, tag, select, preferedTags) {
        const list = []
        if(questions) {
            Object.keys(questions).forEach(id => {
                let tempCount = 0
                const data = questions[id]
                data['id'] = id
                preferedTags.forEach(userPreferTag => {
                    // console.log(userPreferTag);
                    // console.log(data);
                    if(data.tags && data.tags.includes(userPreferTag)) {
                        tempCount += 1
                    }
                })
                if(tempCount >= 1) {
                    if(tag && data.tags && data.tags.includes(tag.toLowerCase())) {
                        // console.log(data.tags.includes(tag.toLowerCase()));
                        if(select === '1') {
                            // UnAnswered
                            if(data.answers.length === 1) {
                                list.push(data)
                            }
                        } else if(select === '2') {
                            // Answered
                            if(data.answers.length !== 1) {
                                list.push(data)
                            }
                        } else {
                            // Recent
                            list.push(data)
                        }   
                    } else if(tag === '') {
                        if(select === '1') {
                            // UnAnswered
                            if(data.answers.length === 1) {
                                list.push(data)
                            }
                        } else if(select === '2') {
                            // Answered
                            if(data.answers.length !== 1) {
                                list.push(data)
                            }
                        } else {
                            // Recent
                            list.push(data)
                        }
                    }
                }
                // console.log(tempCount);
            });
            
        }
        // console.log(select);
        // console.log(list);
        const sortedList = list.slice().sort((a, b) => b.createdAt - a.createdAt)
        // console.log(sortedList);
        setQuestList(sortedList)
    }

    const RecentQuestions = ({ questList }) => {
        if(questList.length !== 0) {
            // console.log(questList[0].tags);
            return (
            <>
                {questList.map(item => {
                    // const dateString = Date(item.createdAt)
                    // var n = new Date(dateString);
                    // console.log(item.createdAt);
                    // console.log(Date(item.createdAt));
                    // console.log(dateString);
                    // console.log(n);
                    // var options = {
                    //     month: "short",
                    //     day: "numeric", 
                    //     timeZone: 'IST',
                    //   }
                    // var a = n.toLocaleString("en-EN", options)
                    // var b = n.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                    // const finalDateString = a + ", " +b
                    // console.log(finalDateString)
                    // console.log(item);
                    return (
                            <Link
                            key={item.id}
                            to={`/question=${item.id}`}
                            style={{ 
                                marginBottom: '2px', 
                                textDecoration:'none', 
                                color:'#000', }}
                            >
                                <div  style={{ height:'70px', background:'#e6e6e6', padding:'10px 0 0 10px', margin:'2px 2px 5px 2px', borderRadius:'3px' ,}}>

                                    <div>
                                        <div>
                                            <h2 style={{ fontSize:'14px' }}>
                                                <strong>Q: </strong> {item.question}
                                            </h2>
                                        </div>
                                        <div style={{ display: 'flex', alignItems:'end',justifyContent: 'space-between'}}>
                                            <div>
                                                {/* <span>{finalDateString && finalDateString}</span>
                                                <span style={{ margin:'0 3px'}}>|</span> */}
                                                {/* <span style={{ margin: '0', fontSize:'12px', fontStyle:'italic'}}>Author: {item.username}</span> */}
                                            </div>
                                            {/* <div>
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
                                                    
                                                    <Button style={{ background:'#6bb5ff', border:'none', marginRight:'20px'}}>
                                                    <FaTrash  
                                                    key={item.id} 
                                                    onClick={() => {
                                                        removeQuestion(item.id)
                                                    }} 
                                                    style={{ width: '20px', height:'20px'}}
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
                                                <Button style={{ background:'#6bb5ff', border:'none'}}>
                                                <FaShieldAlt 
                                                key={item.id} 
                                                onClick={() => {
                                                    requestToRemove(item.id)
                                                    alert(`Question by ${item.username} is requested for removal`)
                                                }} 
                                                style={{ width: '20px', height:'20px'}}
                                                />
                                                </Button>
                                                </OverlayTrigger>
                                                
                                                </span>
                                            </div> */}
                                        </div>
                                    </div>
                                    <ShowTags tags={item.tags} headingBool={true} />
                                    <div style={{ }}>
                                        {/* <ReactionSection 
                                            qid={item.id} 
                                            likes={item.likes} 
                                            dislikes={item.dislikes}
                                            status1={false}
                                            status2={false}
                                        /> */}
                                        {/* {item.imgUrl !== 'no-url' && <ShowImageComponent imgUrl={item.imgUrl} /> } */}
                                        {/* <ShowAnswers answers={item.answers} qid={item.id} />
                                        <AnswerSection length={item.answers.length} qid={item.id} /> */}
                                    </div>
                                </div>
                            </Link>
                )})}
            </>
            )
        } else {
            return (
                <Container style={{ display:'flex', alignItems:'center',justifyContent:'center', height:'100px'}}>
                    <h3>
                        No questions yet. Be the first to ask
                    </h3>
                </Container>
            )
        }
    }

    useEffect(() => {
        // readData()
        // console.log(questions);
        // console.log(prefer, preferedTags);
        if(prefer === "0") {
            renderAllQuestions(questions, tag, select)
        } else {
            renderPreferQuestions(questions, tag, select, preferedTags)
        }
        // renderAllQuestions(questions, tag, select)

    }, [questions, tag, select, prefer, preferedTags])

    // useEffect(() => {
    //     renderAllQuestions(questions, '', '0')
    // }, [])


    return (
        <div>
            <RecentQuestions questList={questList} />
        </div>
    )
}

export default QuestionSection
