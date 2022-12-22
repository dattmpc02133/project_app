import classNames from 'classnames/bind';
// import styles from '../../assets/scss/LoginHistoryCart.module.scss';
import { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading';
import styles from '../../assets/scss/LoginUpdate.module.scss';

import cartApi from '~/api/cartApi';
import AsideAccount from '~/components/AsideAccount';

import { TbShoppingCartOff } from 'react-icons/tb';

import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);
function LoginHistoryCart() {
    const [loading, setLoading] = useState(false);
    const [listOrder, setListOrder] = useState(false);
    const [openTap, setOpenTap] = useState();
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const objDataAd = localStorage.getItem('token');
    if (objDataAd == null) {
        navigate('/login');
    }

    useEffect(() => {
        const objDataAd = localStorage.getItem('token');
        if (objDataAd == null) {
            navigate('/login');
        } else {
            getOrders();
        }
    }, []);
    const getOrders = async (param) => {
        setLoading(true);
        try {
            const result = await cartApi.getOrders(param);
            // console.log(result);
            setPagination(result.paginator);
            setListOrder(result.data);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch orders: ', error);
            setLoading(false);
        }
    };

    const handleOpentTap = (index) => {
        if (index == openTap) {
            setOpenTap();
        } else {
            setOpenTap(index);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            getOrders(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pagination?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            getOrders(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        getOrders(`?page=${page}`);
    };

    return (
        <div className={cx('wapper')}>
            {loading && <Loading />}
            <section>
                <div className={cx('grid')}>
                    <h1 className="title-big"> Tài khoản khách hàng </h1>
                    <div className={cx('grid wide')}>
                        <div className={cx('row')}>
                            {/* <div className={cx('l-3 m-6 c-12')}>
                                <div className={cx('layout')}>
                                    <div className={cx('caterogy')}>
                                        <div className={cx('caterogy-name__item')}>
                                            <Link to="/uplogin" className={cx('caterogy-name')}>
                                                <AiTwotoneTool className={cx('icon_setting', 'icon__cate')} />
                                                <h3>Cập nhật tài khoản</h3>
                                            </Link>
                                        </div>
                                        <div className={cx('caterogy-name__item')}>
                                            <Link to="/hislogin" className={cx('caterogy-name')}>
                                                <AiOutlineShoppingCart className={cx('icon_shopping', 'icon__cate')} />
                                                <h3>Các đơn đã đặt </h3>
                                            </Link>
                                        </div>
                                        <div className={cx('caterogy-name__item')}>
                                            <div className={cx('caterogy-name')} onClick={() => logout()}>
                                                <RiLogoutBoxLine className={cx('icon_shopping', 'icon__cate')} />
                                                <h3>Đăng xuất</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <AsideAccount />

                            <div className={cx('l-9 m-6 c-12')}>
                                <div className={cx('order__wrapper')}>
                                    <div className={cx('order__block')}>
                                        {Array.isArray(listOrder) && listOrder?.length != 0 ? (
                                            listOrder?.map((item, index) => (
                                                <div key={index} className={cx('order__list')}>
                                                    <div className={cx('order__list--heading')}>
                                                        <div className={cx('order__item')}>
                                                            <div className={cx('order__item--heading')}>
                                                                <h2>Mã đơn hàng</h2>
                                                            </div>
                                                            <div className={cx('order__item--content')}>
                                                                <p>{item.code}</p>
                                                            </div>
                                                        </div>
                                                        <div className={cx('order__item')}>
                                                            <div className={cx('order__item--heading')}>
                                                                <h2>Tổng giá</h2>
                                                            </div>
                                                            <div className={cx('order__item--content')}>
                                                                <p>{item.total_formatted}</p>
                                                            </div>
                                                        </div>
                                                        <div className={cx('order__item')}>
                                                            <div className={cx('order__item--heading')}>
                                                                <h2>PTTT</h2>
                                                            </div>
                                                            <div className={cx('order__item--content')}>
                                                                <p>{item.payment_method_code}</p>
                                                            </div>
                                                        </div>
                                                        <div className={cx('order__item')}>
                                                            <div className={cx('order__item--heading')}>
                                                                <h2>Trạng thái</h2>
                                                            </div>
                                                            <div className={cx('order__item--content')}>
                                                                <p>{item.status_name}</p>
                                                            </div>
                                                        </div>
                                                        <div className={cx('order__item')}>
                                                            <div className={cx('order__item--heading')}>
                                                                <h2>Ngày thanh toán</h2>
                                                            </div>
                                                            <div className={cx('order__item--content')}>
                                                                <p>{item.created_at}</p>
                                                            </div>
                                                        </div>

                                                        <div className={cx('order__item')}>
                                                            <div
                                                                className={cx('order__btn')}
                                                                onClick={() => handleOpentTap(index)}
                                                            >
                                                                <RiAddLine className={cx('order__btn--icon')} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {item?.details != undefined && (
                                                        <div
                                                            className={
                                                                openTap == index
                                                                    ? cx('order__list--details', 'active')
                                                                    : cx('order__list--details')
                                                            }
                                                        >
                                                            {item?.details?.map((data, i) => (
                                                                <div key={i} className={cx('details__item')}>
                                                                    <div className={cx('details__img')}>
                                                                        <img src={data.product_image} />
                                                                    </div>
                                                                    <div className={cx('details__variant')}>
                                                                        <div
                                                                            className={cx('details__variant--heading')}
                                                                        >
                                                                            <p>Tên sản phẩm</p>
                                                                        </div>
                                                                        <div
                                                                            className={cx('details__variant--content')}
                                                                        >
                                                                            <p>{data.product_name}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className={cx('details__variant')}>
                                                                        <div
                                                                            className={cx('details__variant--heading')}
                                                                        >
                                                                            <p>Dung lượng</p>
                                                                        </div>
                                                                        <div
                                                                            className={cx('details__variant--content')}
                                                                        >
                                                                            <p>{data.variant_name}GB</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className={cx('details__variant')}>
                                                                        <div
                                                                            className={cx('details__variant--heading')}
                                                                        >
                                                                            <p>Màu sắc</p>
                                                                        </div>
                                                                        <div
                                                                            className={cx('details__variant--content')}
                                                                        >
                                                                            <p>{data.color_name}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className={cx('details__variant')}>
                                                                        <div
                                                                            className={cx('details__variant--heading')}
                                                                        >
                                                                            <p>Giá</p>
                                                                        </div>
                                                                        <div
                                                                            className={cx('details__variant--content')}
                                                                        >
                                                                            <p>
                                                                                {Number(data.price).toLocaleString()}đ
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className={cx('emty__cart')}>
                                                <TbShoppingCartOff className={cx('emty__cart--icon')} />
                                                <p className={cx('emty__cart--text')}>Bạn chưa có đơn hàng nào !</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* <div className={cx('order__pagination')}>
                                        <div className={cx('pagination__list')}>
                                            <div className={cx('pagination__prev', 'pagination__ctrl')}>
                                                {page > 1 && (
                                                    <button
                                                        className={cx('pagination__ctrl--btn')}
                                                        onClick={() => handlePrevPage()}
                                                    >
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
                                                            <button className={cx('btn__num')}>{item}</button>
                                                        </div>
                                                    ))}
                                            </div>
                                            <div className={cx('pagination__next', 'pagination__ctrl')}>
                                                {page < pagination?.totalPages && (
                                                    <button
                                                        className={cx('pagination__ctrl--btn')}
                                                        onClick={() => handleNextPage()}
                                                    >
                                                        Trang sau
                                                        <RiArrowRightSLine className={cx('icon__pagination')} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div> */}
                                    {listOrder?.length != 0 && (
                                        <Pagination
                                            curentPage={page}
                                            totalPages={pagination?.totalPages}
                                            handlePrevPage={handlePrevPage}
                                            handleChangePage={handleChangePage}
                                            handleNextPage={handleNextPage}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default LoginHistoryCart;
