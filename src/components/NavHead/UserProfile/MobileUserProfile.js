import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import { useAuth } from '../../../contexts/AuthContext'
import { useDatabase } from '../../../contexts/DatabaseContext'


import { Button, Container, ToggleButton } from 'react-bootstrap'


function MobileUserProfile({ preference, setPreference}) {

    // const [error, setError] = useState('initialState')
    const [tags, setTags] = useState([])
    // console.log(currentUser);

    const { tagsData } = useDatabase()

    const { currentUser, userSignOut} = useAuth()

    const history = useHistory()

    function handleOut() {
        // setError('')
        userSignOut().then(res => {
            history.push("/login")
        }).catch(error => {
            // setError(`${error}`)
        })
    }



    // const imgPath = currentUser.photoURL
    // console.log(imgPath);

    function handleCheck(index) {
        let items = [...preference];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...items[index]};
        // 3. Replace the property you're intested in
        item.selected = !item.selected;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[index] = item;
        // 5. Set the state to our new copy
        // console.log(items);
        setPreference(items);
    }


    useEffect(() => {
        setTags(tagsData.tags?.list)
    }, [tagsData])

    useEffect(() => {
        // console.log(preference);
    }, [preference])

    return (
        <div className='tags'>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom:'10px'}}>
                <h2>Welcome !</h2>
                <img src={currentUser.photoURL} alt="img-user" style={{ width:'100px', height:'100px', borderRadius:'50%'}}/>
                
                <p>Name: {currentUser.displayName}</p>
                <p>Email: {currentUser.email}</p>
                <Button variant='secondary' onClick={handleOut}>Sign out</Button>
            </div>
            
            <Container fluid>
                <h3>Follow Tags:</h3>
                {preference && tags && tags.map((tag, index) => (
                    <div 
                    key={tag} 
                    style={{
                        display:'inline-block',
                        padding:'5px',
                        marginLeft: '5px',
                        marginBottom:'3px',
                    }}
                    >
                        <ToggleButton
                        key={tag}
                        id={index}
                        variant={preference && preference[index].selected ? "primary": "secondary"}
                        type="checkbox"
                        className="mb-2"
                        onChange={(e) => {
                            // console.log(e.target.id)
                            // console.log(index)
                            handleCheck(e.target.id)
                        }}
                        >
                            {tag}
                        </ToggleButton>
                    </div>
                ))}
            </Container>
        </div>
    )
}

export default MobileUserProfile
