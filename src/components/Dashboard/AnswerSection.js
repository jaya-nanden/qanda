import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useDatabase } from '../../contexts/DatabaseContext'

import { Button } from 'react-bootstrap'

function AnswerSection({ length, qid }) {

    const [answer, setAnswer] = useState('')
    
    const { currentUser } = useAuth()
    const { writeAnswer } = useDatabase()

    function handleSubmit(e) {
        e.preventDefault()

        // console.log(qid, currentUser.uid, answer.trim(), currentUser.displayName, length)
        // console.log(qid);  
        // console.log(length);
        // console.log(currentUser);
        
        if(answer.trim() !== '') {
            writeAnswer(qid, currentUser.uid, answer.trim(), currentUser.displayName, length++)
        }

        setAnswer('')
    }

    return (
        // left:'50%', marginLeft:'-150px'
        <div style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', position:'fixed', bottom:'10px', left:'0', marginLeft:'0'  }}>
            <div style={{ display:'flex', alignItems:'center'}}>
                <input 
                    name="question" 
                    type="text" 
                    placeholder="Type to answer..."
                    value={answer} 
                    onChange={(e) => {setAnswer(e.target.value)}}
                    style={{ width:'230px' , height:'40px', borderRadius:'0', border:'none', paddingLeft:'10px'}}
                    required/>
                <Button 
                    variant={answer !== '' ? 'primary' : 'secondary'} 
                    onClick={handleSubmit}
                    style={{ height:'40px', width: '70px' ,borderRadius:'0' }}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default AnswerSection
