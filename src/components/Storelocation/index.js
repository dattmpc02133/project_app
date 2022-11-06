import React, { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from '../../assets/scss/Storelocation.module.scss';
import '../../assets/scss/Grid.scss';
const cx = classNames.bind(styles);
function StoreLocation() {
    const [show, setShow] = useState('');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('store-location')}>
                <div className={cx('store__center')}>
                    <div className={cx('store-select')}>
                        <b>Mở bán tại 50 của hàng</b>
                        {/* <Tippy
                            render={(attrs) => (
                                <div className={cx('show-store')} tabIndex="-1" {...attrs}>
                                    <h1>Xin vhao</h1>
                                </div>
                            )}
                        > */}
                        <div className={cx('select-list')}>
                            <span className={cx('select-item')} onClick={() => setShow(!show)}>
                                Chọn tỉnh thành
                            </span>
                            <div className={cx('list-item')}>
                                <ul className={!show ? cx('show-none') : cx('show-active')}>
                                    <li>Hồ Chí Minh</li>
                                    <li>Hà nội</li>
                                    <li>Cần thơ</li>
                                    <li>Hồ Chí Minh</li>
                                    <li>Hà nội</li>
                                    <li>Cần thơ</li>
                                    <li>Hồ Chí Minh</li>
                                    <li>Hà nội</li>
                                    <li>Cần thơ</li>
                                    <li>Hồ Chí Minh</li>
                                    <li>Hà nội</li>
                                    <li>Cần thơ</li>
                                    <li>Hồ Chí Minh</li>
                                    <li>Hà nội</li>
                                    <li>Cần thơ</li>
                                    <li>Hồ Chí Minh</li>
                                    <li>Hà nội</li>
                                    <li>Cần thơ</li>
                                </ul>
                            </div>
                        </div>
                        {/* </Tippy> */}
                    </div>

                    <div className={cx('list-store')}>
                        <p>
                            <a href="#">
                                <span>
                                    TopZone An khánh
                                    <span>Xem chỉ đường </span>
                                </span>
                                <span>345 Nguyễn Văn Linh, Phường An Khánh ,Quận Ninh Kiều, TP.Cần Thơ TP.Cần Thơ</span>
                            </a>
                        </p>

                        <p>
                            <a href="#">
                                <span>
                                    TopZone An khánh
                                    <span>Xem chỉ đường </span>
                                </span>
                                <span>
                                    345 Nguyễn Văn Linh, Phường An Khánh ,Quận Ninh Kiều, TP.Cần Thơ Phường An Khánh
                                    ,Quận Ninh Kiều, TP.Cần Thơ
                                </span>
                            </a>
                        </p>

                        <p>
                            <a href="#">
                                <span>
                                    TopZone An khánh
                                    <span>Xem chỉ đường </span>
                                </span>
                                <span>
                                    345 Nguyễn Văn Linh, Phường An Khánh ,Quận Ninh Kiều, TP.Cần Thơ Phường An Khánh
                                    ,Quận Ninh Kiều, TP.Cần Thơ
                                </span>
                            </a>
                        </p>

                        <p>
                            <a href="#">
                                <span>
                                    TopZone An khánh
                                    <span>Xem chỉ đường </span>
                                </span>
                                <span>
                                    345 Nguyễn Văn Linh, Phường An Khánh ,Quận Ninh Kiều, TP.Cần Thơ Phường An Khánh
                                    ,Quận Ninh Kiều, TP.Cần Thơ
                                </span>
                            </a>
                        </p>

                        <p>
                            <a href="#">
                                <span>
                                    TopZone An khánh
                                    <span>Xem chỉ đường </span>
                                </span>
                                <span>
                                    345 Nguyễn Văn Linh, Phường An Khánh ,Quận Ninh Kiều, TP.Cần Thơ Phường An Khánh
                                    ,Quận Ninh Kiều, TP.Cần Thơ
                                </span>
                            </a>
                        </p>

                        <p>
                            <a href="#">
                                <span>
                                    TopZone An khánh
                                    <span>Xem chỉ đường </span>
                                </span>
                                <span>
                                    345 Nguyễn Văn Linh, Phường An Khánh ,Quận Ninh Kiều, TP.Cần Thơ Phường An Khánh
                                    ,Quận Ninh Kiều, TP.Cần Thơ
                                </span>
                            </a>
                        </p>

                        <p>
                            <a href="#">
                                <span>
                                    TopZone An khánh
                                    <span>Xem chỉ đường </span>
                                </span>
                                <span>
                                    345 Nguyễn Văn Linh, Phường An Khánh ,Quận Ninh Kiều, TP.Cần Thơ Phường An Khánh
                                    ,Quận Ninh Kiều, TP.Cần Thơ
                                </span>
                            </a>
                        </p>

                        <p>
                            <a href="#">
                                <span>
                                    TopZone An khánh
                                    <span>Xem chỉ đường </span>
                                </span>
                                <span>
                                    345 Nguyễn Văn Linh, Phường An Khánh ,Quận Ninh Kiều, TP.Cần Thơ Phường An Khánh
                                    ,Quận Ninh Kiều, TP.Cần Thơ
                                </span>
                            </a>
                        </p>
                    </div>

                    <div className={cx('seemore-store')}>
                        <a href="#">Xêm thêm cửa hàng</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoreLocation;
