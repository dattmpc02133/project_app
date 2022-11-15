import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FiFacebook } from 'react-icons/fi';
import { BsLink45Deg, BsEye } from 'react-icons/bs';
import styles from '../../assets/scss/TekZoneDetail.module.scss';
import images from '../../assets/images';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cx = classNames.bind(styles);
function TekZoneDetail() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('tekZoneDetail')}>
                <div className={cx('tekzone-link')}>
                    <span className={cx('link')}>
                        <a href="#">TekZone</a>
                    </span>
                    <span className={cx('link')}>
                        <a href="#">iPhone</a>
                    </span>
                    <span>
                        <a href="#">Guides</a>
                    </span>
                </div>

                <div className={cx('detail-contents')}>
                    <div className={cx('detail-title-user')}>
                        <div className={cx('detail-title')}>
                            <h1>
                                Tai thỏ iPhone là gì? Cùng mình tìm hiểu và xem cách chỉnh tai thỏ trên iPhone để tránh
                                vuốt nhầm nhé
                            </h1>
                        </div>

                        <div className={cx('detail-user')}>
                            <span>Dương Thành Đạt</span>
                            <span className={cx('time')}>9 giờ trước</span>
                        </div>
                    </div>

                    <div className={cx('detail-content')}>
                        <div className={cx('img-content')}>
                            <img src={images.tekzone__1} alt="ảnh lỗi" />
                        </div>
                        <h2>
                            Nếu bạn là một người dùng <Link to="#">iPhone</Link> hay chỉ đơn giản là một người dùng
                            smartphone thông thường đi chăng nữa, thì chắc hẳn bạn cũng đã nghe rất nhiều về từ khóa
                            "tai thỏ". Vậy thì rốt cuộc tai thỏ iPhone là gì? Có những ưu và nhược điểm như thế nào? Hãy
                            cùng mình đi vào bài viết giải ngố ngay sau đây thôi nào!
                        </h2>

                        <h3>
                            <strong>1. Tai thỏ iPhone là gì?</strong>
                        </h3>

                        <p>
                            Khái niệm "tai thỏ" có thể hiểu là kiểu thiết kế giống như tai thỏ ở phần màn hình, với phần
                            bị khuyết ở giữa sẽ được dùng để chứa camera trước cũng như các cảm biến, loa, micro,...
                            được gọi là Notch tai thỏ.
                        </p>
                        <p>
                            Kiểu thiết kế trên được xuất hiện lần đầu tiên trên iPhone X vào năm 2017 và được Apple sử
                            dụng đến tận <Link to="#">iPhone 14 Pro</Link> và <Link to="#">iPhone 14 Pro Max </Link>
                            thì mới được thay thế bằng kiểu "viên thuốc" hay Dynamic Island.
                        </p>

                        <div className={cx('img-content')}>
                            <img src={images.tekzone__2} alt="ảnh lỗi" />
                        </div>
                        <h3>
                            <strong>2. Lịch sử phát triển của kiểu thiết kế tai thỏ</strong>
                        </h3>
                        <p>
                            Không như nhiều người vẫn lầm tưởng, Apple không phải là hãng đầu tiên tạo ra dạng thiết kế
                            độc đáo này, vị trí này thuộc về chiếc Sharp Aquos S2, chiếc điện thoại tiên phong trong
                            việc sử dụng dạng thiết kế này. Tuy nhiên cũng phải kể đến công lao to lớn của Apple khi
                            mang Notch tai thỏ đến với công chúng người dùng, từ đó mà từ khóa này mới được người dùng
                            trên khắp thế giới biết đến.
                        </p>
                        <p>
                            Về phần của Apple, thiết kế tai thỏ chính lần đầu xuất hiện trên iPhone X chính là một cuộc
                            cách mạng về thiết kế của Apple khi hãng quyết định bỏ đi nút Home vốn đã là thương hiệu,
                            thay vào đó là cảm biến Face ID hiện đại cùng với hai viền trên và dưới mỏng hơn rất nhiều.
                        </p>
                        <div className={cx('img-content')}>
                            <img src={images.tekzone__3} alt="ảnh lỗi" />
                        </div>

                        <h3>
                            <strong>3. Ưu và nhược điểm của tai thỏ iPhone</strong>
                        </h3>
                        <p>
                            <strong>Ưu điểm</strong>
                        </p>
                        <p>Những ưu điểm có thể kể đến về tai thỏ của iPhone như:</p>

                        <ul>
                            <li>
                                Giúp viền trên và dưới của iPhone mỏng hơn rất nhiều so với trước, tối ưu hóa không gian
                                hiển thị.
                            </li>
                            <li>
                                Có được không gian lớn để đặt cảm biến và camera nhưng vẫn tối ưu trải nghiệm sử dụng
                                của người dùng.
                            </li>
                            <li>Giúp người dùng có những trải nghiệm điện ảnh tốt hơn nhờ tận dụng màn hình cỡ dài.</li>
                            <li>Thiết kế bắt mắt và có độ nhận diện thương hiệu cao.</li>
                        </ul>
                        <div className={cx('img-content')}>
                            <img src={images.tekzone__1} alt="ảnh lỗi" />
                        </div>
                        <p>
                            <strong>Nhược điểm</strong>
                        </p>
                        <p>
                            Bên cạnh ưu điểm thì tai thỏ iPhone vẫn có rất nhiều người dùng phàn nàn với những lý do
                            như:
                        </p>
                        <ul>
                            <li>
                                Phần dải đen tạo cảm giác màn hình bị khuyết, gây cảm giác khó chịu cho những ai khó
                                tính.
                            </li>
                            <li>
                                Trải nghiệm chơi game màn hình ngang không được tối ưu hóa như kiểu thiết kế trước đây.
                            </li>
                            <li>Thanh trạng thái bị thu hẹp đi do phần khuyết ở giữa của Notch tai thỏ.</li>
                        </ul>

                        <div className={cx('img-content')}>
                            <img src={images.tekzone__1} alt="ảnh lỗi" />
                        </div>

                        <h3>
                            <strong>4. Có tắt được tai thỏ iPhone đi hay không?</strong>
                        </h3>

                        <p>
                            Việc tắt tai thỏ trên iPhone hiện nay thông qua các ứng dụng bên thứ ba chỉ đơn giản là làm
                            cho phần khuyết này trải đều ra hai bên, việc này không được khuyến khích thực hiện vì có
                            thể sẽ gây ảnh hưởng đến trải nghiệm sử dụng của bạn.
                        </p>

                        <p>
                            Tuy nhiên, nếu bạn muốn ẩn phần tai thỏ đi khi chơi game để thoải mái hơn, bạn có thực hiện
                            với các thao tác theo bài hướng dẫn sau:
                        </p>
                        <ul>
                            <li>
                                <Link to="">Cách tắt tai thỏ khi chơi game trên iPhone</Link>
                            </li>
                        </ul>
                        <div className={cx('img-content')}>
                            <img src={images.tekzone__1} alt="ảnh lỗi" />
                        </div>

                        <p>
                            Trên đây chính là những chia sẻ của mình về thiết kế tai thỏ trên iPhone. Cảm ơn các bạn rất
                            nhiều vì đã dành thời gian theo dõi bài viết này, hẹn gặp lại ở các bài viết tiếp theo!
                        </p>

                        <p>
                            Siêu phẩm smartphone hàng đầu của Apple hiện nay, iPhone 14 Pro với A16 Bionic cùng thiết kế
                            màn hình Dynamic Island đang có mức giá cực kỳ tốt tại TopZone! Click ngay vào nút cam bên
                            dưới để xem và rinh về cho mình chiếc điện thoại thời thượng này thôi nào!
                        </p>

                        <p>
                            <Link className={cx('buy')} to="#">
                                MUA NGAY IPHONE 14 PRO CHÍNH HÃNG TẠI TOPZONE
                            </Link>
                        </p>

                        <p>Xem Thêm:</p>
                        <ul>
                            <li>
                                <Link to="">Hướng dẫn cách chặn quảng cáo khi lướt web trên iPhone không dùng app</Link>
                            </li>
                            <li>
                                <Link to="">Phải làm gì khi iPhone bị rơi xuống nước? Xem ngay cách xử lý nhanh</Link>​
                            </li>
                            <li>
                                <Link to="">Tại sao đèn pin trên iPhone không sáng? Xem ngay cách khắc phục nhé</Link>
                            </li>
                        </ul>
                        <div className={cx('detail-info')}>
                            <span className={cx('info-editor')}>Xét duyệt bởi: Dương Thành Đạt</span>
                            <div className={cx('share-viewtek')}>
                                <span className={cx('info-share')}>
                                    Chia sẻ:
                                    <Link To="">
                                        <FiFacebook className={cx('icon-info')} />
                                    </Link>
                                    <Link to="">
                                        <BsLink45Deg className={cx('icon-info')} />
                                    </Link>
                                </span>
                                <span className={cx('info-view')}>
                                    <BsEye className={cx('icon-info')} />4 Lượt xem
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('related-posts')}>
                    <div className={cx('posts-title')}>
                        <h3>bài viết liên quan</h3>
                    </div>
                    <div className={cx('slider')}>
                        <Slider {...settings}>
                            <div className={cx('posts-row')}>
                                <div className={cx('item-posts')}>
                                    <div className={cx('img-slider')}>
                                        <img src={images.tekzone__1} alt="Ảnh lổi slider" />
                                    </div>
                                    <div className={cx('title-posts')}>
                                        <h3>
                                            Chỉ với vài bước cơ bản sau đây bạn đã có thể kiểm tra được thời hạn bảo
                                            hành chính xác nhất cho iPhone của mình
                                        </h3>
                                    </div>

                                    <span>10/11</span>
                                </div>

                                <div className={cx('item-posts')}>
                                    <div className={cx('img-slider')}>
                                        <img src={images.tekzone__1} alt="Ảnh lổi slider" />
                                    </div>
                                    <div className={cx('title-posts')}>
                                        <h3>
                                            Chỉ với vài bước cơ bản sau đây bạn đã có thể kiểm tra được thời hạn bảo
                                            hành chính xác nhất cho iPhone của mình
                                        </h3>
                                    </div>

                                    <span>10/11</span>
                                </div>

                                <div className={cx('item-posts')}>
                                    <div className={cx('img-slider')}>
                                        <img src={images.tekzone__1} alt="Ảnh lổi slider" />
                                    </div>
                                    <div className={cx('title-posts')}>
                                        <h3>
                                            Chỉ với vài bước cơ bản sau đây bạn đã có thể kiểm tra được thời hạn bảo
                                            hành chính xác nhất cho iPhone của mình
                                        </h3>
                                    </div>

                                    <span>10/11</span>
                                </div>

                                <div className={cx('item-posts')}>
                                    <div className={cx('img-slider')}>
                                        <img src={images.tekzone__1} alt="Ảnh lổi slider" />
                                    </div>
                                    <div className={cx('title-posts')}>
                                        <h3>
                                            Chỉ với vài bước cơ bản sau đây bạn đã có thể kiểm tra được thời hạn bảo
                                            hành chính xác nhất cho iPhone của mình
                                        </h3>
                                    </div>

                                    <span>10/11</span>
                                </div>

                                <div className={cx('item-posts')}>
                                    <div className={cx('img-slider')}>
                                        <img src={images.tekzone__1} alt="Ảnh lổi slider" />
                                    </div>
                                    <div className={cx('title-posts')}>
                                        <h3>
                                            Chỉ với vài bước cơ bản sau đây bạn đã có thể kiểm tra được thời hạn bảo
                                            hành chính xác nhất cho iPhone của mình
                                        </h3>
                                    </div>

                                    <span>10/11</span>
                                </div>

                                <div className={cx('item-posts')}>
                                    <div className={cx('img-slider')}>
                                        <img src={images.tekzone__1} alt="Ảnh lổi slider" />
                                    </div>
                                    <div className={cx('title-posts')}>
                                        <h3>
                                            Chỉ với vài bước cơ bản sau đây bạn đã có thể kiểm tra được thời hạn bảo
                                            hành chính xác nhất cho iPhone của mình
                                        </h3>
                                    </div>

                                    <span>10/11</span>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>

                <div className={cx('posts-mobile')}>
                    <div className={cx('newsest__list')}>
                        <div className={cx('title-new')}>
                            <h1>Bài viết liên quan</h1>
                        </div>
                        <div className={cx('newsest')}>
                            <div className={cx('news-item')}>
                                <Link to={'tekzonedetail'}>
                                    <div className={cx('img-item')}>
                                        <img src={images.tekitem} alt="Anh post" />
                                    </div>
                                    <div className={cx('title-item')}>
                                        <h3>
                                            Săn sale cuối tuần: TopZone giảm mạnh tay với AirPods đến tận 30%, hàng xịn
                                            giá hời, rinh ngay về nhà thôi kẻo lỡ
                                        </h3>

                                        <div className={cx('time-post')}>
                                            <p>11/11</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className={cx('news-item')}>
                                <a href="#">
                                    <div className={cx('img-item')}>
                                        <img src={images.tekitem} alt="Anh post" />
                                    </div>
                                    <div className={cx('title-item')}>
                                        <h3>
                                            Săn sale cuối tuần: TopZone giảm mạnh tay với AirPods đến tận 30%, hàng xịn
                                            giá hời, rinh ngay về nhà thôi kẻo lỡ
                                        </h3>
                                    </div>
                                    <div className={cx('time-post')}>
                                        <p>11/11</p>
                                    </div>
                                </a>
                            </div>

                            <div className={cx('news-item')}>
                                <a href="#">
                                    <div className={cx('img-item')}>
                                        <img src={images.tekitem} alt="Anh post" />
                                    </div>
                                    <div className={cx('title-item')}>
                                        <h3>
                                            Săn sale cuối tuần: TopZone giảm mạnh tay với AirPods đến tận 30%, hàng xịn
                                            giá hời, rinh ngay về nhà thôi kẻo lỡ
                                        </h3>

                                        <div className={cx('time-post')}>
                                            <p>11/11</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className={cx('news-item')}>
                                <a href="#">
                                    <div className={cx('img-item')}>
                                        <img src={images.tekitem} alt="Anh post" />
                                    </div>
                                    <div className={cx('title-item')}>
                                        <h3>
                                            Săn sale cuối tuần: TopZone giảm mạnh tay với AirPods đến tận 30%, hàng xịn
                                            giá hời, rinh ngay về nhà thôi kẻo lỡ
                                        </h3>

                                        <div className={cx('time-post')}>
                                            <p>11/11</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TekZoneDetail;
