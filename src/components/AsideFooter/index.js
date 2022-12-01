import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../../assets/scss/AsideFoooter.module.scss';
import { NavLink } from 'react-router-dom';
import { cateFooter } from '../../services/ApiServices';
const cx = classNames.bind(styles);
function AsideFooter() {
    const handleClick = (id) => {
        console.log('id là', id);
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('list-tabs')}>
                {cateFooter.map((footer) => (
                    <li key={footer.id} onClick={() => handleClick(footer.id)} className={cx('list-item')}>
                        <NavLink to="#">{footer.name}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AsideFooter;
