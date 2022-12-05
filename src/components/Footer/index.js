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
    const [footerAll, setFooterAll] = useState([]);
    const [contactAll, setContactAll] = useState([]);
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

        const allContact = async () => {
            try {
                const contact = await footerApi.getAllContact();
                setContactAll(contact.data);
            } catch (error) {
                console.log('lỗi lấy liên hệ', error);
            }
        };
        allFooter();
        allContact();
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
                        {footerAll?.map((item, index) => {
                            return (
                                <li key={index}>
                                    <span>{item.name}</span>
                                    {item.footerContent.map((items, index) => {
                                        return (
                                            <Link to={`footer/insurance?id=${items.id}`} state={{ items }} key={index}>
                                                {items.title}
                                            </Link>
                                        );
                                    })}
                                    {item.contact.map((items, index) => (
                                        <a href="tel:0905015900" key={index}>
                                            <span>{items.name}:</span>
                                            <b>{items.phone}</b>
                                            (7:30 - 22:00)
                                        </a>
                                    ))}
                                </li>
                            );
                        })}
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

                        {footerAll.map((mobi, index) => (
                            <li key={index}>
                                <label htmlFor="contentid">
                                    <span onClick={() => setActive(!active)}> {mobi.name}</span>
                                    <input type="checkbox" id="contentid" hidden />
                                    <div className={!active ? cx('show-active') : cx('show-none')}>
                                        {mobi.footerContent.map((items, index) => (
                                            <Link to={`footer/insurance?=${items.slug}`} state={{ items }} key={index}>
                                                {items.title}
                                            </Link>
                                        ))}
                                    </div>
                                </label>
                            </li>
                        ))}

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
