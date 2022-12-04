import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '~/assets/scss/AsideFoooter.module.scss';
import { Link, useLocation } from 'react-router-dom';
import footerApi from '~/api/footerApi';
const cx = classNames.bind(styles);

function AsideFooter() {
    const [footer, setFooter] = useState([]);

    useEffect(() => {
        const FooterContentAll = async () => {
            try {
                const footerConAll = await footerApi.getAllContent();
                setFooter(footerConAll.data);
            } catch (error) {
                console.log('lỗI CONTENT', error);
            }
        };
        FooterContentAll();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('list-tabs')}>
                {Array.isArray(footer)
                    ? footer.map((items, index) => (
                          <li key={index} className={cx('list-item')}>
                              <Link to={`insurance/id=${items.id}`} state={{ id: items.id }}>
                                  {items.title}
                              </Link>
                          </li>
                      ))
                    : false}
            </ul>
        </div>
    );
}

export default AsideFooter;
