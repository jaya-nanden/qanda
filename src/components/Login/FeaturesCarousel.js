import React from 'react'

import './FeaturesCarousel.css'

import { Carousel, Card } from 'react-bootstrap'

function FeaturesCarousel() {
    return (
        <div>
            <Carousel style={{ marginBottom: '5px'}}>
                <Carousel.Item>
                    <Card style={{height:'200px', background:'#1B2840', padding:'0'}}></Card>
                    <Carousel.Caption style={{textAlign:'left'}}>
                        <p>Did a weird question hit your brain in the interval and you want to know the answer for it. </p>
                        <span className="tag-line">we got you</span>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Card style={{height: '200px', background:'#1B2840', padding:'0'}}></Card>
                    <Carousel.Caption style={{textAlign:'left'}}>
                        <p>Do like to share information and answer some interesting questions</p>
                        <span className="tag-line">you got us</span>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Card style={{height: '200px', background:'#1B2840', padding:'0'}}></Card>
                    <Carousel.Caption style={{textAlign:'left'}}>
                        <p>Working on a project and stuck with some technical issues. Need to ask any unspoken senior's</p>
                        <span className="tag-line">we got you</span>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Card style={{height: '200px', background:'#1B2840', padding:'0'}}></Card>
                    <Carousel.Caption style={{textAlign:'left'}}>
                        <p>Feel bored in between classes or exploring stuffs. Answer few curious questions.</p>
                        <span className="tag-line">you got us</span>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default FeaturesCarousel
