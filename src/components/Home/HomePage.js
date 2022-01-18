import React, { useState, useEffect } from 'react'

import { useDatabase } from '../../contexts/DatabaseContext'


import Dashboard from '../Dashboard/Dashboard'
import NavHead from '../NavHead/NavHead'

function HomePage() {

    // const [show, setshow] = useState(false)
    const [preference, setPreference] = useState()
    const [preferedTags, setpreferedTags] = useState()

    // Search State
    const [select, setSelect] = useState("0")
    const [tag, setTag] = useState('')
    const [prefer, setPrefer] = useState("0")

    
    const { tagsData, initialPreference } = useDatabase()

    // function updatePreference() {
    //     // console.log(preference);
    //     if(preference) {
    //         return addTagsPreference(currentUser.uid, preference)
    //     }
    // }


    useEffect(() => {
        // write to data the list of tags liked by user
        // console.log(initialPreference);
        setPreference(initialPreference)
    }, [initialPreference])

    // useEffect(() => {
    //     if(preference) {
    //         return addTagsPreference(currentUser.uid, preference)
    //     }
    // }, [preference])

    useEffect(() => {
        // console.log(preference)
        const temp = []
        preference?.map(item => {
            // console.log(selected, tag);
            if(item.selected === true) {
                temp.push(item.tag)
            }
            return null
        })
        // console.log(temp);
        setpreferedTags(temp)
    }, [preference])
    
    return (
        <div style={{ background:'#286C81' }}>
            {/* Nav Bar */}
            <NavHead 
                preference={preference} 
                setPreference={setPreference}
                select={select} 
                setSelect={setSelect}
                tag={tag}
                setTag={setTag}
                tagsData={tagsData}
                prefer={prefer}
                setPrefer={setPrefer}
                 />
            {/* Dashboard */}
            <Dashboard 
                preferedTags={preferedTags}
                select={select} 
                setSelect={setSelect}
                tag={tag}
                setTag={setTag}
                tagsData={tagsData}
                prefer={prefer}
                setPrefer={setPrefer}
            />
        </div>
    )
}

export default HomePage


// Bugs:

// First Spinner Keeps on going no data fetched till refresh
// First question entered by the user is not coming in the dashboard

// Review

// Change Provider from Google to Microsoft