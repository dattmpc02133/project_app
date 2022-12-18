import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import styles from '~/assets/scss/Footer.module.scss';
import images from '~/assets/images';
import footerApi from '~/api/footerApi';
import 'axios';
import { Link } from 'react-router-dom';
import logoApi from '../../api/logoApi';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function Footer() {
    const [active, setActive] = useState();
    const [footerAll, setFooterAll] = useState([]);
    const [logo, setLogo] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const allFooter = async () => {
            try {
                const footer = await footerApi.getAll();
                setFooterAll(footer.data);
                const getAllLogo = await logoApi.getAllClient();
                setLogo(getAllLogo);
            } catch (error) {
                console.log('lỗi footer', error);
            }
        };

        allFooter();
    }, []);

    const handleOpenActive = (index) => {
        if (index == active) {
            setActive();
        } else {
            setActive(index);
        }
    };

    const handleSroll = () =>
        window.scroll({
            top: 0,
            left: 100,
            behavior: 'smooth',
        });

    return (
        <div className={cx('wrapper')}>
            {loading ? <Loading /> : ''}

            <footer className={cx('footer')}>
                <div className={cx('footer__gird')}>
                    <div className={cx('footer__logo')}>
                        <a href="/">
                            {logo?.map((item, index) => (
                                <img
                                    src={item?.image}
                                    key={index}
                                    onClick={handleSroll}
                                    className={cx('logo-left')}
                                    alt="logo1"
                                />
                            ))}
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
                                            <Link
                                                to={`footer/insurance/${items.id}`}
                                                onClick={handleSroll}
                                                state={{ items }}
                                                key={index}
                                            >
                                                {items.title}
                                            </Link>
                                        );
                                    })}
                                    {item.contact.map((items, index) => (
                                        <Link to="tel:0905015900" key={index}>
                                            <span>{items.name}:</span>
                                            <b>{items.phone}</b>({items.time})
                                        </Link>
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
                        {footerAll.map((mobi, index) => (
                            <li key={index}>
                                <span onClick={() => handleOpenActive(index)}> {mobi.name}</span>

                                <div className={active == index ? cx('show-active') : cx('show-none')}>
                                    {mobi.footerContent.map((items, index) => (
                                        <Link
                                            to={`footer/insurance/${items.id}`}
                                            onClick={handleSroll}
                                            state={{ items }}
                                            key={index}
                                        >
                                            {items.title}
                                        </Link>
                                    ))}
                                </div>
                                {mobi.contact.map((items, index) => (
                                    <Link to="tel:0905015900" key={index}>
                                        <span>{items.name}:</span>
                                        <b>{items.phone}</b>({items.time})
                                    </Link>
                                ))}
                            </li>
                        ))}
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
