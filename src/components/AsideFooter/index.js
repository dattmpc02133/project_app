import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '~/assets/scss/AsideFoooter.module.scss';
import { Link, useLocation } from 'react-router-dom';
import footerApi from '~/api/footerApi';
import Loading from '~/components/Loading';
const cx = classNames.bind(styles);

function AsideFooter() {
    const [footer, setFooter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState();

    useEffect(() => {
        const FooterContentAll = async () => {
            setLoading(true);
            try {
                const footerConAll = await footerApi.getAllContent();
                setFooter(footerConAll.data);
                setLoading(false);
                // console.log('data', footerConAll.data);
            } catch (error) {
                console.log('lỗI CONTENT', error);
                setLoading(false);
            }
        };
        FooterContentAll();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {loading ? <Loading /> : ''}
            <ul className={cx('list-tabs')}>
                {Array.isArray(footer)
                    ? footer.map((items, index) => (
                          <li key={index} className={cx('list-item')}>
                              <Link to={`insurance/${items.id}`} state={{ items }}>
                                  {items.title}
                              </Link>
                          </li>
                      ))
                    : false}
            </ul>

            <div className={cx('list-tabs-mobile')} onClick={() => setActive(!active)}>
                <ul className={!active ? cx('active-mobi') : cx('active-none')}>
                    <span>xin chaof</span>
                    {Array.isArray(footer)
                        ? footer.map((items, index) => (
                              <li key={index} className={cx('list-item')}>
                                  <Link to={`insurance/${items.id}`} state={{ items }}>
                                      {items.title}
                                  </Link>
                              </li>
                          ))
                        : false}
                </ul>
            </div>
        </div>
    );
}

export default AsideFooter;
