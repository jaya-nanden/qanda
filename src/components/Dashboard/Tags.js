import React, { useState, useEffect } from 'react'


import { Button } from 'react-bootstrap'

function Tags({ tags, setTags }) {

  const [tag, setTag] = useState('')
  const [limit, setLimit] = useState(true)
  
  const removeTag = (i) => {
    const newTags = [ ...tags ];
    newTags.splice(i, 1);

    // Call the defined function setTags which will replace tags with the new value.
    setTags(newTags);
  };

  const inputKeyDown = (e) => {
    if(limit === false) {
      const val = e.target.value.replace(/ /g, "").toLowerCase()
      // console.log(e.key);
      if (e.key === ',' && val) {
        if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
          return;
        }
        setTags([...tags, val]);
        setTag('')
      } else if(e.key === ' ' && val) {
          if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
              return;
          }
          setTags([...tags, val]);
          setTag('')
      } 
      // else if (e.key === 'Backspace' && !val) {
      //   removeTag(tags.length - 1);
      // }
    }
  };

  function addTag(e) {
    e.preventDefault()
    if(tag.replace(/ /g, "").toLowerCase() !== '') {
        if (tags.find(t => t.toLowerCase() === tag.toLowerCase())) {
          return;
        }
        setTags([...tags, tag]);
        setTag('')
    }
  }

  useEffect(() => {
    if(tags.length >= 4) {
      setLimit(true)
    } else {
      setLimit(false)
    }
  }, [tags])
  
  
  return (
    <div className="input-tag">
      <div className="tags-list" >
        <div style={{  marginTop: '10px', marginBottom:'10px'}}>
          <p>
            Related Tags (limit upto 4) separate by space or click add:
          </p>
          { tags.map((tag, i) => (
            <span key={tag} style={{ margin: '5px'}}>
              <div style={{ display:'inline' ,margin: '2px'}}>
                {tag}
              </div>
              <Button type="button" onClick={() => { removeTag(i); }}> x</Button>
            </span>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center'}}>
            <input 
            type="text" 
            onKeyDown={inputKeyDown}
            value={tag} 
            onChange={e => setTag(e.target.value)}
            style={{ width:'200px',}}
            placeholder="Add your related tags here"
            disabled={limit}
            />
            <Button disabled={limit} onClick={addTag} style={{ marginLeft:'10px', background:'#1B2840'}}>Add</Button>
        </div>
      </div>
    </div>
  );
}

export default Tags

    // Using