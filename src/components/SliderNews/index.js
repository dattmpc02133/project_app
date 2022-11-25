import React, { Component } from "react";
import Slider from "react-slick";
import classNames from 'classnames/bind';
import styles from '../../assets/scss/TopCare.module.scss';
const cx = classNames.bind(styles);
export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
      <div className={cx('slider')}>
        {/* <h2> Single item-news</h2> */}
        <Slider {...settings}>
          
          <div className={cx('item-news')}>
          <img data-src="https://cdn.tgdd.vn/Files/2022/11/17/1487595/cach-thay-doi-ban-phim-iphone-318x154.jpg" alt="Cách thay đổi bàn phím iPhone cực nhanh chóng, giúp bạn nhắn tin hoặc soạn văn bản bằng ngôn ngữ mới" class=" lazyloaded" width="320" height="160" src="https://cdn.tgdd.vn/Files/2022/11/17/1487595/cach-thay-doi-ban-phim-iphone-318x154.jpg"></img>
            </div>
          <div className={cx('item-news')}>
          <img  className={cx('lazyloaded-news')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG" width="525" height="350" alt="Trung tâm bảo hành TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG"></img>
          </div>
          <div className={cx('item-news')}>
          <img className={cx('lazyloaded-news')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_2-min.JPG" width="525" height="350" alt="Trung tâm bảo hành TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_2-min.JPG"></img>
           
          </div>
          <div className={cx('item-news')}>
          <img  className={cx('lazyloaded-news')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG" width="525" height="350" alt="Trung tâm bảo hành TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG"></img>
           
          </div>
          <div className={cx('item-news')}>
          <img className={cx('lazyloaded-news')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_2-min.JPG" width="525" height="350" alt="Trung tâm bảo hành TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_2-min.JPG"></img>
           
          </div>
          <div className={cx('item-news')}>
          <img  className={cx('lazyloaded-news')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG" width="525" height="350" alt="Trung tâm bảo hành TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG"></img> 
           
          </div>
        </Slider>
      </div>
    );
  }
}