import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import carasoul1 from '../../assets/images/carasoul/1.png';
import carasoul2 from '../../assets/images/carasoul/2.png';
import carasoul3 from '../../assets/images/carasoul/3.png';
import carasoul4 from '../../assets/images/carasoul/4.png';
import carasoul5 from '../../assets/images/carasoul/5.png';
import carasoul6 from '../../assets/images/carasoul/6.png';
import './Carousel.scss';

const CarouselPage = () => {
  return (
    <Carousel className="carousel">
      <div>
        <img src={carasoul1} />
        <p className="legend">
          Adopt the pace of nature. Her secret is patience." –Ralph Waldo
          Emerson
        </p>
      </div>
      <div>
        <img src={carasoul2} />
        <p className="legend">
          "I firmly believe that nature brings solace in all troubles." –Anne
          Frank
        </p>
      </div>
      <div>
        <img src={carasoul3} />
        <p className="legend">
          "Nature does not hurry, yet everything is accomplished." –Lao Tzu
        </p>
      </div>
      <div>
        <img src={carasoul4} />
        <p className="legend">
          "Where flowers bloom, so does hope." –Lady Bird Johnson
        </p>
      </div>
      <div>
        <img src={carasoul5} />
        <p className="legend">
          "Storms make trees take deeper roots." –Dolly Parton
        </p>
      </div>
      <div>
        <img src={carasoul6} />
        <p className="legend">
          "Keep your face to the sunshine and you cannot see a shadow." –Helen
          Keller
        </p>
      </div>
    </Carousel>
  );
};

export default CarouselPage;
