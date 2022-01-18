import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { Container, Row, Col, FloatingLabel, Form, ListGroup, Button } from 'react-bootstrap'
import { FaSearch, FaUndo } from 'react-icons/fa'

function SearchOptions( { setSelect, tag, setTag, tagsData, prefer, setPrefer, setSearchShow} ) {

    // Filter Data
    const [filteredData, setFilteredData] = useState([])
    const [showFilter, setshowFilter] = useState(false)
    
    function handleFilter(tag) {
        setshowFilter(true)
        const data = tagsData.tags.list
        const searchWord = tag;
        const newFilter = data.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase());
          });

        // console.log(newFilter);
    
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
      };

    function handleSearch() {
        setSearchShow(false)
    }

    function handleReset() {
        setSelect("0")
        setTag('')
        setPrefer("0")
    }

    return (
        <div style={{ width:'100%', position: 'relative'}}>
        <Row className="g-2" style={{ marginRight:'20px'}}>
            <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Search Tags">
                    <Form.Control 
                    type="text" 
                    placeholder="general" 
                    value={tag}
                    onChange={e => {
                        handleFilter(e.target.value)
                        setTag(e.target.value) 
                    }}
                    
                    />
                </FloatingLabel>
            </Col>
            <Col md>
                <Form.Select 
                onChange={e => {
                    // console.log(e.target.value)
                    setSelect(e.target.value)
                }}
                style={{ height: '100%'}}
                >
                    <option value="0">Recent</option>
                    <option value="1">Unanswered</option>
                    <option value="2">Answered</option>
                </Form.Select>
            </Col>
            <Col md>
                <Form.Select 
                onChange={e => {
                    // console.log(e.target.value)
                    setPrefer(e.target.value)
                }}
                style={{ height: '100%'}}
                >
                    <option value="0">All Tags</option>
                    <option value="1">Followed Tags</option>
                </Form.Select>
            </Col>
        </Row>

        <Row style={{ width: '100%'}}>
            {showFilter && filteredData.length !== 0 && (
                <Container style={{ background:'#868e9c', padding:'0', display:'flex', flexDirection:'column', alignItems:'center', position:'absolute', zIndex:'10', top:'100px'}}>
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                        <ListGroup.Item 
                        key={key}
                        style={{ minWidth: '200px', cursor:'pointer', background:'grey', color:'white', borderRadius: '5px', margin:'10px'}} 
                        onClick={ e => {
                            // console.log(value);
                            setTag(value)
                            setshowFilter(false)
                        }}>
                            {value}
                        </ListGroup.Item>
                        );
                    })}
                </Container>
            )}
        </Row>
        <div style={{ display:'flex', alignItems:'center' , justifyContent:'space-around', marginTop:'20px'}}>
            <div>
                <Button 
                variant='secondary'
                onClick={handleReset}
                style={{ margin:'0', display:'flex', alignItems:'center' , justifyContent:'space-around'}}>
                    {/* <FaUndo 
                    style={{ marginTop: '10px', height:'25px', color:'black'}}
                    /> */}
                    <p style={{ margin:'0', }} >Reset</p>
                </Button>
            </div>
            <div>
                <Button 
                onClick={handleSearch}
                style={{ margin:'0', marginRight:'10px', display:'flex', alignItems:'center' , justifyContent:'space-around'}}>
                    {/* <FaSearch 
                    style={{ marginTop: '10px', height:'25px', color:'black'}}
                    /> */}
                    <p style={{ margin:'0', }} >Search</p>
                </Button>
            </div>

        </div>
        
    </div>
    )
}

export default SearchOptions
