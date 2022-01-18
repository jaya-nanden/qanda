import React from 'react'


function ShowTags({ tags, headingBool }) {
    if(tags) {

        return (
            <div style={{ margin:'10px 0 0 16px', padding:'0'}}>
                {tags && headingBool && <span>Tags:</span>}
                {tags && tags.map(tag => (
                    <div 
                    key={tag} 
                    style={{
                        display:'inline-block',
                        padding:'5px',
                        marginLeft: '5px',
                        marginBottom:'3px',
                        background: 'grey',
                        borderRadius: '3px',
                    }}
                    >
                        <span style={{color:'white'}}>{tag} </span>
                    </div>
                ))}
            </div>
        )
    } else {
        return (<></>)
    }
}

export default ShowTags
