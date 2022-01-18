import React, { useState} from 'react'

import { Modal } from 'react-bootstrap'

function ShowImageComponent({ imgUrl }) {

    const [show, setShow] = useState(false)

    return (
        <div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <img src={imgUrl} alt="img-demo" style={{ width:'100%', height:'100%'}}/>

            </Modal>
                
            {imgUrl !== 'no-url' 
            && <img 
                onClick={() => setShow(true)} 
                src={imgUrl} 
                alt="img-demo" 
                style={{width:'300px', height:'150px', objectFit:'cover', marginBottom:'10px'}}
            />}
            
                                    
        </div>
    )
}

export default ShowImageComponent
