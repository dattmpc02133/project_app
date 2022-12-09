import classNames from 'classnames/bind';
import { useEffect } from 'react';
import style from '~/assets/scss/TableImage.module.scss';
const cx = classNames.bind(style);

const TableImage = () => {
    useEffect(() => {
        const getImg = async () => {};
        getImg();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('table__wrapper')}>
                    <div className={cx('table__heading')}>
                        <div className={cx('table__heading--item')}>
                            <p>Danh sách hình ảnh</p>
                        </div>
                        <div className={cx('table__heading--item')}>
                            <p>Upload hình mới</p>
                        </div>
                    </div>

                    <div className={cx('table__content')}>
                        <div className={cx('image__item')}>
                            <img
                                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/289691/s16/iPhone-14-Pro-topzone%20(3)-650x650.png"
                                className={cx('image__item--img')}
                            />
                        </div>
                        <div className={cx('image__item')}>
                            <img
                                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/289691/s16/iPhone-14-Pro-topzone%20(3)-650x650.png"
                                className={cx('image__item--img')}
                            />
                        </div>
                        <div className={cx('image__item')}>
                            <img
                                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/289691/s16/iPhone-14-Pro-topzone%20(3)-650x650.png"
                                className={cx('image__item--img')}
                            />
                        </div>
                        <div className={cx('image__item')}>
                            <img
                                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/289691/s16/iPhone-14-Pro-topzone%20(3)-650x650.png"
                                className={cx('image__item--img')}
                            />
                        </div>
                        <div className={cx('image__item')}>
                            <img
                                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/289691/s16/iPhone-14-Pro-topzone%20(3)-650x650.png"
                                className={cx('image__item--img')}
                            />
                        </div>
                        <div className={cx('image__item')}>
                            <img
                                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/289691/s16/iPhone-14-Pro-topzone%20(3)-650x650.png"
                                className={cx('image__item--img')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableImage;
