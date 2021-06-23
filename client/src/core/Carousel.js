import Carousel from 'react-bootstrap/Carousel';
import Carousel1 from '../images/christin-hume-08tX2fsuSLg-unsplash.jpg'
import Carousel2 from '../images/louis-reed-pwcKF7L4-no-unsplash.jpg'
import Carousel3 from '../images/scott-evans-ScoYEG5LEgc-unsplash.jpg'

import React, { Component } from 'react'

export default class CarouselComp extends Component {
    render() {
        return (
            <div>
                <Carousel>
                <Carousel.Item interval={2500}>
                    <img
                    className="d-block w-100"
                    src={Carousel1}
                    alt="First slide"
                    style={{height: '500px'}}
                    />
                    {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item interval={2500}>
                    <img
                    className="d-block w-100"
                    src={Carousel2}
                    alt="Second slide"
                    style={{height: '500px'}}
                    />
                    {/* <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item interval={2500}> 
                    <img
                    className="d-block w-100"
                    src={Carousel3}
                    alt="Third slide"
                    style={{height: '500px'}}
                    />
                    {/* <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}


