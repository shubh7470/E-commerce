import Carousel from 'react-bootstrap/Carousel';
import Slider1 from '../assets/Slider/Slider1.png';
import Slider2 from '../assets/Slider/Slider2.png';
import Slider3 from '../assets/Slider/Slider3.png';

function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={Slider1} alt="First slide" className="d-block w-100" height={'500px'} />
       
      </Carousel.Item>

      <Carousel.Item>
        <img src={Slider2} alt="Second slide" className="d-block w-100" height={'500px'} />
       
      </Carousel.Item>

      <Carousel.Item>
        <img src={Slider3} alt="Third slide" className="d-block w-100"  height={'500px'}/>
        
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
