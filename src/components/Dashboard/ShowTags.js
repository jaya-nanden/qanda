import React from 'react'


function ShowTags({ tags, headingBool }) {
    if(tags) {

        return (
            <div style={{ margin:'0', padding:'0'}}>
                {tags && tags.map(tag => (
                    <div 
                    key={tag} 
                    style={{
                        display:'inline-block',
                        padding:'2px 4px 2px 4px',
                        marginLeft: '5px',
                        marginBottom:'3px',
                        background: '#286C81',
                        borderRadius: '3px',
                    }}
                    >
                        <span style={{color:'white', fontSize:'10px',}}>{tag} </span>
                    </div>
                ))}
            </div>
        )
    } else {
        return (<></>)
    }
}

export default ShowTags
