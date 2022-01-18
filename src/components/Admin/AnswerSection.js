import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useDatabase } from '../../contexts/DatabaseContext'

import { Container, Button } from 'react-bootstrap'

function AnswerSection({ length, qid }) {

    const [answer, setAnswer] = useState('')
    
    const { currentUser } = useAuth()
    const { writeAnswer } = useDatabase()

    function handleSubmit(e) {
        e.preventDefault()

        // console.log(answer)
        // console.log(qid);  
        // console.log(length);
        // console.log(currentUser);
        
        if(answer.trim() !== '') {
            writeAnswer(qid, currentUser.uid, answer.trim(), currentUser.displayName, length++)
        }

        setAnswer('')
    }

    return (
        <Container style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0'}}>
            <label style={{flex: '1'}}> Your Answer: 
                <input 
                    name="question" 
                    type="text" 
                    placeholder="Type to answer..."
                    value={answer} 
                    onChange={(e) => {setAnswer(e.target.value)}}
                    style={{ margin:'2px', width: '80%'}}
                    required/>
            </label>
           <Button variant={answer !== '' ? 'primary' : 'secondary'} onClick={handleSubmit}>Submit</Button>
        </Container>
    )
}

export default AnswerSection
