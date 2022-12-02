import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '~/assets/scss/AsideFoooter.module.scss';
import { Link } from 'react-router-dom';
import footerApi from '~/api/footerApi';
const cx = classNames.bind(styles);

function AsideFooter() {
    const handleClick = (id) => {
        console.log('id là', id);
    };

    const [footer, setFooter] = useState([]);

    useEffect(() => {
        const FooterContentAll = async () => {
            try {
                const footerConAll = await footerApi.getAllContent();
                setFooter(footerConAll.data);
                console.log('content', footerConAll.data);
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
                    ? footer.map((content, index) => (
                          <li key={index} onClick={() => handleClick(content.id)} className={cx('list-item')}>
                              <Link to={`insurance?=${content.slug}`} state={{ content }}>
                                  {content.title}
                              </Link>
                          </li>
                      ))
                    : false}
            </ul>
        </div>
    );
}

export default AsideFooter;
