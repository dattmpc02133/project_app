import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import styles from '~/assets/scss/Footer.module.scss';
import images from '~/assets/images';
import footerApi from '~/api/footerApi';
import 'axios';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer() {
    const [active, setActive] = useState('');
    const [activeTow, setActiveTow] = useState('');
    const [activeThere, setActiveThere] = useState('');
    const [activeFor, setActiveFor] = useState('');
    const [footerAll, setFooterAll] = useState([]);

    useEffect(() => {
        const allFooter = async () => {
            try {
                const footer = await footerApi.getAll();
                setFooterAll(footer.data);
                console.log('danh muc', footer.data);
            } catch (error) {
                console.log('lỗi footer', error);
            }
        };
        allFooter();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <footer className={cx('footer')}>
                <div className={cx('footer__gird')}>
                    <div className={cx('footer__logo')}>
                        <a href="#">
                            <img src={images.logotest} className={cx('logo-left')} alt="logo1" />
                        </a>
                    </div>
                    {/* desktop */}
                    <ul className={cx('list-info')}>
                        <li>
                            <span>Tổng đài</span>
                            <a href="tel:0905015900">
                                <span>Mua hàng:</span>
                                <b>0905.0159.00</b>
                                (7:30 - 22:30)
                            </a>
                            <a href="tel:0905015900">
                                <span>CSKH:</span>
                                <b>0905.0159.00</b>
                                (7:30 - 22:30)
                            </a>
                            <a href="tel:0905015900">
                                <span>Kỹ thuật:</span>
                                <b>0905.0159.00</b>
                                (7:30 - 22:30)
                            </a>

                            <div className={cx('footer__social')}>
                                {}
                                <p className={cx('text')}>Kết nối với chúng tôi</p>
                                <a href="#" className={cx('icon-item')}>
                                    <i>
                                        <FaFacebookF />
                                    </i>
                                </a>
                                <a href="#" className={cx('icon-item')}>
                                    <i>
                                        <FaYoutube />
                                    </i>
                                </a>
                                <a href="#" className={cx('icon-item')}>
                                    <i>
                                        <SiZalo />
                                    </i>
                                </a>
                            </div>
                        </li>
                        {footerAll?.map((item, index) => {
                            return (
                                <li key={index}>
                                    <span>{item.name}</span>
                                    {item.footerContent.map((items, index) => {
                                        return (
                                            <Link to={`footer/insurance?=${item.slug}`} state={items} key={index}>
                                                {items.title}
                                            </Link>
                                        );
                                    })}
                                </li>
                            );
                        })}
                        {/* {cateFooter?.map((title, index) => (
                                    <Link key={index}>{title.title}</Link>
                                ))} */}
                    </ul>
                    <div className={cx('footer-text__certify')}>
                        <div className={cx('footer-text')}>
                            <p>
                                © 2018. Công ty cổ phần . GPDKKD: 0303217354 do sở KH & ĐT TP.HCM cấp ngày 02/01/2007.
                                <br />
                                Địa chỉ: 128 Trần Quang Khải, P. Tân Định, Q.1, TP. Hồ Chí Minh. Điện thoại: 028
                                38125960.
                            </p>
                        </div>
                        <div className={cx('footer-certify')}>
                            <span>
                                <img src={images.footer_bct} alt="Bộ công thương" />
                            </span>
                            <span>
                                <img src={images.footer_tnm} alt="Tín nhiệm mạng" />
                            </span>
                            <span>
                                <img src={images.footer_dmca} alt="DMAC" />
                            </span>
                        </div>
                    </div>

                    {/* mobi */}
                    <ul className={cx('list-info__mobile')}>
                        <li>
                            <span>Tổng đài</span>
                            <a href="tel:0905015900">
                                <span>Mua hàng:</span>
                                <b>0905.0159.00</b>
                                (7:30 - 22:30)
                            </a>
                            <a href="tel:0905015900">
                                <span>CSKH:</span>
                                <b>0905.0159.00 </b>
                                (7:30 - 22:30)
                            </a>
                            <a href="tel:0905015900">
                                <span>Kỹ thuật:</span>
                                <b>0905.0159.00 </b>
                                (7:30 - 22:30)
                            </a>
                        </li>

                        <li>
                            <a href="#" className={cx('color-active')}>
                                Tích điểm quà tặng VIP
                            </a>
                        </li>

                        <li>
                            <span onClick={() => setActive(!active)}>Hệ thống cửa hàng</span>
                            <div className={!active ? cx('show-none') : cx('show-active')}>
                                <a href="#">Xem cửa hàng</a>
                                <a href="#">Nội quy cửa hàng</a>
                                <a href="#">Chất lượng phục vụ</a>
                                <a href="#">Chính sách đổi hành & đổi trả</a>
                            </div>
                        </li>
                        <li>
                            <span onClick={() => setActiveTow(!activeTow)}>Hỗ trợ khách hàng</span>
                            <div className={!activeTow ? cx('show-none') : cx('show-active')}>
                                <a href="#">Điều kiện giao dịch chung</a>
                                <a href="#">Xem cửa hàng</a>
                                <a href="#">Nội quy cửa hàng</a>
                                <a href="#">Chất lượng phục vụ</a>
                                <a href="#">Chính sách đổi hành & đổi trả</a>
                            </div>
                        </li>
                        <li>
                            <span onClick={() => setActiveThere(!activeThere)}>Về thương hiệu TopZone</span>
                            <div className={!activeThere ? cx('show-none') : cx('show-active')}>
                                <a href="#">Giới thiệu TopZone</a>
                                <a href="#">Bán hàng doanh nghiệp </a>
                                <a href="#">Chính sách bảo mật thông tin</a>
                            </div>
                        </li>
                        <li>
                            <span onClick={() => setActiveFor(!activeFor)}>Trung tâm bảo hành TopCare</span>
                            <div className={!activeFor ? cx('show-none') : cx('show-active')}>
                                <a href="#">Giới thiệu TopCare</a>
                            </div>
                        </li>
                        <div className={cx('footer__social')}>
                            <p className={cx('text')}>Kết nối với chúng tôi</p>
                            <a href="#" className={cx('icon-item')}>
                                <i>
                                    <FaFacebookF />
                                </i>
                            </a>
                            <a href="#" className={cx('icon-item')}>
                                <i>
                                    <FaYoutube />
                                </i>
                            </a>
                            <a href="#" className={cx('icon-item')}>
                                <i>
                                    <SiZalo />
                                </i>
                            </a>
                        </div>
                    </ul>

                    <div className={cx('footer-certify__mobile', 'mobile')}>
                        <span>
                            <img src={images.footer_bct} alt="Bộ công thương" />
                        </span>
                        <span>
                            <img src={images.footer_tnm} alt="Tín nhiệm mạng" />
                        </span>
                        <span>
                            <img src={images.footer_dmca} alt="DMAC" />
                        </span>
                    </div>
                    <div className={cx('footer-text__mobile')}>
                        <p>
                            © 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM cấp ngày
                            02/01/2007.
                            <br />
                            Địa chỉ: 128 Trần Quang Khải, P. Tân Định, Q.1, TP. Hồ Chí Minh. Điện thoại: 028 38125960.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
