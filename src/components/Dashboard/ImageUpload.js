import React from "react"


function ImageUpload({ file, setFile, url, setURL}) {

    function handleChange(e) {
        setFile(e.target.files[0]);
    }
  
  
    return (
      <div>
          <input type="file" onChange={handleChange} />
      </div>
    );
}

export default ImageUpload
