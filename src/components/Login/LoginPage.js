import React, { useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'
import { useDatabase } from '../../contexts/DatabaseContext'

import useMounted from '../../hooks/useMount'

import { Button, Card, Container } from 'react-bootstrap'

import FeaturesCarousel from './FeaturesCarousel'

import './LoginPage.css'

function LoginPage() {
    
    const [loading, setLoading] = useState(false)
    // const [error, setError] = useState("")
    
    const { googleSignIn } = useAuth()
    const { createNewUser } = useDatabase()

    const mounted = useMounted()

    const history = useHistory()
    const location = useLocation()


    function handleSignIn(e) {
        e.preventDefault()
        setLoading(true)
        // Google Sign In;
        googleSignIn().then(res => {
            // console.log(res)
            // console.log(res.user)

            createNewUser(res.user)
            history.push(location.state?.from ?? '/')
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            // console.log(mounted.current)

            mounted.current && setLoading(false)
        })
    }

    return (
        <div style={{ background:'#286C81'}}>
            <Container style={{color:'white', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', minHeight:'100vh'}}>
                <div>
                    <h3 style={{ }}>Welcome to the</h3>
                    <h2 className="title">QandA</h2>
                    <FeaturesCarousel />
                    <Card bg='dark' text='white'>
                        <Card.Body>
                            Q & A platform where "curious minds" answers the questions asked by "curious minds"
                        </Card.Body>
                        <Card.Footer>
                            <Button disabled={loading} variant="primary" onClick={handleSignIn}> Sign in With Google</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </div>
    )
}

export default LoginPage
