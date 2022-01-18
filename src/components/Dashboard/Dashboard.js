import React, { useState, useEffect } from 'react'

import AskQuestion from './AskQuestion'
import QuestionSection from './QuestionSection'

import { useDatabase } from '../../contexts/DatabaseContext'

import { Spinner } from 'react-bootstrap'



function Dashboard({ preferedTags, select, setSelect, tag, setTag, prefer, setPrefer }) {

    const { questions, fetchQuestions} = useDatabase()

    // Initial Call for fetching the questions
    useEffect(() => {
        // console.log(select);
        // console.log(questions);
        // console.log(preferedTags)
        // console.log(questions);
        fetchQuestions()
    }, [])

    return (
        <div 
            style={{ 
                background:'#286C81', 
                minHeight:'100vh',
                display: 'flex',
                justifyContent:'center',
                }}>
            {/* Question Cards */}
            <div style={{height:'45px'}}></div>
            {questions
            ? (
            <div style={{ maxWidth:'762px', width:'100%', marginTop:'45px' }}>
                <QuestionSection 
                questions={questions} 
                select={select} 
                tag={tag} 
                prefer={prefer}
                preferedTags={preferedTags}
                />
                {questions.length >= 10 && <div style={{height:'40px', textAlign:'center'}}>The End</div>} 
            </div>
            )
            : <Spinner style={{ margin:'50% 0 0 0',}} animation="border" role="status"></Spinner> }
            {/* Asking Question */}
            <AskQuestion />
        </div>
    )
}

export default Dashboard
