import { Slide } from 'react-slideshow-image';
import { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
import slideShowApi from '../../api/slideShowApi';
import { Link } from 'react-router-dom';
import axios from 'axios';
// const slideImages = [
//     {
//         image: 'https://cdn.tgdd.vn/2022/10/banner/ws8-2880-800-1920x533-2.png',
//         caption: 'Slide 1',
//     },
//     {
//         image: 'https://cdn.tgdd.vn/2022/09/banner/mac-2880-800-1920x533.png',
//         caption: 'Slide 2',
//     },
//     {
//         image: 'https://cdn.tgdd.vn/2022/10/banner/phukien-2880-800-1920x533.png',
//         caption: 'Slide 3',
//     },
// ];

const Slideshow = () => {
    const [slideImagesMain, setSlideImagesMain] = useState();
    // useEffect(() => {
    //     const fetchSlide = async () => {
    //         try {
    //             const resData = await slideShowApi.getAll();
    //             const ResSlide = resData?.data?.data;
    //             const slideDetail = ResSlide?.map((slide) => slide?.details?.map((item) => item));
    //             if (slideDetail.length > 0) {
    //                 setSlideImagesMain(slideDetail[0]);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchSlide();
    // }, []);
    useEffect(() => {
        const fetchSlide = async () => {
            try {
                const resData = await slideShowApi.getById('13');
                const ResSlide = resData?.data;
                const slideDetail = ResSlide?.details?.map((item) => item);
                setSlideImagesMain(slideDetail);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSlide();
    }, []);

    // const Images = slideImagesMain?.map((slideImages) => {
    //     return { image: slideImages.image, url: slideImages.url };
    // });
    // console.log('Images', Images);
    return (
        <div className="slide-container">
            <Slide>
                {slideImagesMain?.map((slideImage, index) => (
                    <div className="each-slide" key={index}>
                        <Link to={slideImage?.url}>
                            <img style={{ width: '100%' }} src={slideImage?.image} />
                        </Link>
                    </div>
                ))}
            </Slide>
        </div>
    );
};
export default Slideshow;
