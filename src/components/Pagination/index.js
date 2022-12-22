import classNames from 'classnames/bind';
import { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import style from '~/assets/scss/Pagination.module.scss';
const cx = classNames.bind(style);

const Pagination = ({ curentPage, totalPages, handlePrevPage, handleChangePage, handleNextPage }) => {
    const [arrPagination, setArrPagination] = useState([]);
    if (Array.isArray(arrPagination) && arrPagination.length <= 0) {
        for (let i = 0; i < totalPages; i++) {
            const item = i + 1;
            arrPagination.push(item);
            setArrPagination(arrPagination);
        }
    }
    return (
        <div className={cx('order__pagination')}>
            <div className={cx('pagination__list')}>
                <div className={cx('pagination__prev', 'pagination__ctrl')}>
                    {curentPage > 1 && (
                        <button className={cx('pagination__ctrl--btn')} onClick={() => handlePrevPage()}>
                            <RiArrowLeftSLine className={cx('icon__pagination')} />
                            Trang trước
                        </button>
                    )}
                </div>
                <div className={cx('pagination__num')}>
                    {Array.isArray(arrPagination) &&
                        arrPagination?.map((item, index) => (
                            <div
                                key={index}
                                className={cx('pagination__num--item')}
                                onClick={() => handleChangePage(item)}
                            >
                                <button className={curentPage == item ? cx('btn__num', 'active') : cx('btn__num')}>
                                    {item}
                                </button>
                            </div>
                        ))}
                </div>
                <div className={cx('pagination__next', 'pagination__ctrl')}>
                    {curentPage < totalPages && (
                        <button className={cx('pagination__ctrl--btn')} onClick={() => handleNextPage()}>
                            Trang sau
                            <RiArrowRightSLine className={cx('icon__pagination')} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pagination;
