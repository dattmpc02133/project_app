import React, { Component } from "react";

import classNames from 'classnames/bind';
import styles from '../../assets/scss/TopCare.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const cx = classNames.bind(styles);
export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
          {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                  dots: true,
              },
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  initialSlide: 1,
              },
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
              },
          },
      ],
  };
    return ( 
      <div className={cx('slider')}>
        {/* <h2> Single Item</h2> */}
        <Slider {...settings}>
      
          <div className={cx('item')}>
            <img className={cx('lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_2-min.JPG" width="525" height="350" alt="Trung tâm bảo hành TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_2-min.JPG"></img>
            </div>
     
          <div className={cx('item')}>
          <img  className={cx('lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG" width="525" height="350" alt="Trung tâm bảo hành TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG"></img>
          </div>
          
      

          <div className={cx('item')}>
          <img className={cx('lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_2-min.JPG" width="525" height="350" alt="Trung tâm bảo hành TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_2-min.JPG"></img>
          
          </div>
     
          <div className={cx('item')}>
          <img  className={cx('lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG" width="525" height="350" alt="Trung tâm bảo hành TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG"></img>
        
          </div>
   
          <div className={cx('item')}>
          <img className={cx('lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_2-min.JPG" width="525" height="350" alt="Trung tâm bảo hành TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_2-min.JPG"></img>
       
          </div>
    
          <div className={cx('item')}>
          <img  className={cx('lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG" width="525" height="350" alt="Trung tâm bảo hành TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG"></img> 
          
          </div>
        

        </Slider>
      </div>
    );
  }
}