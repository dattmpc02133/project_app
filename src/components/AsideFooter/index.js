import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '~/assets/scss/AsideFoooter.module.scss';
import { Link, useLocation } from 'react-router-dom';
import footerApi from '~/api/footerApi';
const cx = classNames.bind(styles);

function AsideFooter() {
    const [footer, setFooter] = useState([]);
    const [idBy, setIdBy] = useState([]);
    const { state } = useLocation();
    const idContent = state.items;
    const idContents = idContent.id;
    console.log('id', idContents);
    useEffect(() => {
        const FooterContentAll = async () => {
            try {
                const footerConAll = await footerApi.getAllContent();
                const idBy = footerConAll.data.filter((items) => items.id === idContents);
                console.log('xin chào', idBy);
                setIdBy(idBy);
                setFooter(footerConAll.data);
            } catch (error) {
                console.log('lỗI CONTENT', error);
            }
        };
        FooterContentAll();
    }, [idContents]);

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('list-tabs')}>
                {Array.isArray(footer)
                    ? footer.map((items, index) => (
                          <li key={index} className={cx('list-item')}>
                              <Link to={`insurance?=${items.id}`} state={{ items }}>
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
