import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
    {
        image: 'https://cdn.tgdd.vn/2022/10/banner/ws8-2880-800-1920x533-2.png',
        caption: 'Slide 1',
    },
    {
        image: 'https://cdn.tgdd.vn/2022/09/banner/mac-2880-800-1920x533.png',
        caption: 'Slide 2',
    },
    {
        image: 'https://cdn.tgdd.vn/2022/10/banner/phukien-2880-800-1920x533.png',
        caption: 'Slide 3',
    },
];

const Slideshow = () => {
    return (
        <div className="slide-container">
            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div className="each-slide" key={index}>
                        <img style={{ width: '100%' }} src={slideImage.image} />
                    </div>
                ))}
            </Slide>
        </div>
    );
};
export default Slideshow;
