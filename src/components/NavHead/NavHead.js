import React, { useState } from 'react'

import MobileUserProfile from './UserProfile/MobileUserProfile'
import SearchOptions from './SearchOptions/SearchOptions'

import { FaList, FaSearch } from 'react-icons/fa'
import { Navbar, Offcanvas } from 'react-bootstrap'
import { useDatabase } from '../../contexts/DatabaseContext'
import { useAuth } from '../../contexts/AuthContext'

function NavHead({ preference, setPreference, select, setSelect, tag, setTag, tagsData, prefer, setPrefer }) {

    const [userShow, setUserShow] = useState(false)
    const [searchShow, setSearchShow] = useState(false)

    const { addTagsPreference } = useDatabase()
    const { currentUser } = useAuth()

    function updatePreference() {
        // console.log(preference);
        if(preference) {
            return addTagsPreference(currentUser.uid, preference)
        }
    }

    function handleShow(val) {
        if(val === 1) { 
            setUserShow(!userShow)
        } else (
            setSearchShow(!searchShow)
        )
        // console.log('user clicked');
    }

    return (
        <div style={{ 
            background:"#286C81",
            color: 'white',
            maxHeight:'40px',
            display:'flex', 
            justifyContent:'center',
            position: 'fixed',
            zIndex: '10',
            width: '100%',
            }}>
            <div style={{ 
                display:'flex', 
                justifyContent:'space-between',
                alignItems:'center',
                maxWidth:'768px',
                width: '100%',
                padding: '10px',
                }}>
                <FaList 
                    style={{ width:'20px', height:'20px'}} 
                    onClick={ () => {
                        handleShow(1);
                    }}
                />
                <h1 style={{ fontSize:'18px', fontWeight:'700'}}>QandA</h1>
                <FaSearch 
                onClick={ () => {
                    handleShow(2);
                }}
                style={{ width:'20px', height:'20px'}} />
            </div>


            <div>
                <Navbar.Offcanvas 
                show={userShow} 
                onHide={() => {
                    setUserShow(!userShow)
                    updatePreference()
                }} 
                placement="start">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>User Profile</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {/* User Profile */}
                        <MobileUserProfile preference={preference} setPreference={setPreference} />
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </div>

            <div>
                <Navbar.Offcanvas 
                show={searchShow} 
                onHide={() => {
                    setSearchShow(!searchShow)
                    updatePreference()
                }} 
                placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Search</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {/* Search Options */}
                        <SearchOptions 
                        select={select} 
                        setSelect={setSelect}
                        tag={tag}
                        setTag={setTag}
                        tagsData={tagsData}
                        prefer={prefer}
                        setPrefer={setPrefer}
                        setSearchShow={setSearchShow}
                         />
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </div>
        </div>
    )
}

export default NavHead
