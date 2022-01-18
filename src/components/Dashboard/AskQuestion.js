import React, { useState } from 'react'

import { useAuth } from '../../contexts/AuthContext'
import { useDatabase } from '../../contexts/DatabaseContext';

import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


import Tags from './Tags';
import ImageUpload from './ImageUpload';

import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'


function createUniqueCode() {
    return uuidv4()
}


function getDateTime() {
    return Date.parse(new Date())
}

function AskQuestion() {

    // Modals state and functions
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        // setQuestion('')
        // setAnswer('')
        // setTags([])
    }
    const handleShow = () => setShow(true);

    // User Question
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    // const [category, setCategory] = useState('general')
    const [tags, setTags] = useState([])
    
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");
    
    const [adding, setAdding] = useState(false)


    const { currentUser } = useAuth()
    const { writeUserData, addQuestionIDToUser } = useDatabase()

    function handleModal(e) {
        e.preventDefault()
        // console.log(question, category)
        // console.log(currentUser.uid);
        const questionID = createUniqueCode()
        // console.log(questionID);

        const dateTime = getDateTime()
        // console.log(dateTime);

        // Add the question to database
        const tagsList = tags.length > 0 ? tags : [null] 
        if(question.trim() !== '') {
            setAdding(true)

            // Add question ID to uid question list and increment the question count
            addQuestionIDToUser(
                questionID
            )
            
            if(file) {
                const storage = getStorage()
                const storageRef = ref(storage, `/${currentUser.uid}/${questionID}/images/${file.name}`)
                // const path = storageRef.fullPath
                // const name = storageRef.name
                // const imagesRefAgain = storageRef.parent;
            
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress + '% done');
                    // setAdding(true)
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        console.log('');
                    }
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // console.log('File available at', downloadURL);
                        setURL(downloadURL)
                        writeUserData(
                            questionID,
                            currentUser.uid,
                            currentUser.displayName,
                            question.trim(),
                            answer.trim(),
                            dateTime,
                            tagsList,
                            downloadURL
                        )
    
                        setAdding(false)
                        handleClose()
                    });
                }
                );
            } else {
                writeUserData(
                    questionID,
                    currentUser.uid,
                    currentUser.displayName,
                    question.trim(),
                    answer.trim(),
                    dateTime,
                    tagsList,
                    'no-url'
                )

                setAdding(false)
                handleClose()
            }

        }

        // Reseting to default values
        setQuestion('')
        setAnswer('')
        // setCategory('general')
        setTags([])
    }


    return (
        <div style={{ maxWidth:'800px', padding:'0'}}>  
            

            {/* Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Question</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleModal}>
                    <Modal.Body>
                        <>
                            {adding && 
                                <Spinner style={{ margin:'50% 0 0 50%',}} animation="border" role="status"></Spinner>
                            }
                            <textarea 
                            name="question" 
                            type="text" 
                            placeholder="Your Question Here" 
                            value={question} 
                            onChange={(e) => {setQuestion(e.target.value)}}
                            style={{ width: '100%', height: '100px', marginBottom:'10px'}}
                            required/>
                            <textarea 
                            name="answer" 
                            type="text" 
                            placeholder="Description or Your initial findings" 
                            value={answer} 
                            onChange={(e) => {setAnswer(e.target.value)}}
                            style={{ width: '100%', height: '150px', marginBottom:'10px'}}
                            />
                        </>
                        <ImageUpload file={file} setFile={setFile} url={url} setURL={setURL} />
                        <Tags tags={tags} setTags={setTags} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <button 
            style={{
                position: 'fixed',
                zIndex: '10',
                bottom: '0',
                right: '0',
                marginBottom: '15px',
                marginRight:'20px',
                padding: '15px',
                borderRadius: '50%',
                background: '#1B2840',
                border: 'none',
                color: 'white',
                textDecoration: 'none',
            }}
            onClick={handleShow}>
                <FaPen style={{ width:'15px', height:'15px'}} />
            </button>
        </div>
    )
}

export default AskQuestion

