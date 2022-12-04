import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from '~/assets/scss/Cart.module.scss';
import { SlArrowLeft, SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { CiSearch } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import cartApi from '~/api/cartApi';
import Loading from '~/components/Loading';
const cx = classNames.bind(style);
const Cart = () => {
    const [loading, setLoading] = useState(false);
    // const [modal, setModal] = useState(false);
    // const [messStatus, setMessStatus] = useState();
    // const [statusHandle, setStatusHandle] = useState();
    const [cart, setCart] = useState();
    const [listProducts, setListProducts] = useState();

    useEffect(() => {
        const getCart = async () => {
            setLoading(true);
            try {
                const result = await cartApi.getAll();
                setCart(result.data);
                setListProducts(result.data.details);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get Cart', error);
                setLoading(false);
            }
        };
        getCart();
    }, []);
    console.log(listProducts);
    return (
        <div className={cx('wrapper')}>
            {loading ? <Loading /> : ''}
            <div className={cx('content-pay')}>
                <div className={cx('yourCartBuyMore')}>
                    <Link to="/" className={cx('BuyMore')}>
                        <SlArrowLeft style={{ fontSize: '1.3rem' }} /> Mua thêm sản phẩm khác
                    </Link>
                </div>
                <div className={cx('middleCart')}>
                    <ul className={cx('listing-cart')}>
                        {listProducts?.map((item, index) => (
                            <li key={index} className={cx('prd-item')}>
                                <div className={cx('imgsp')}>
                                    <Link to="/iphone">
                                        <img src={item.product_image} />
                                    </Link>
                                    <button>
                                        <span>&times;</span>
                                        Xóa
                                    </button>
                                </div>
                                <div className={cx('prd-infosp')}>
                                    <div className={cx('prd-name-price')}>
                                        <Link>iPhone 14 Plus 256GB </Link>
                                        <span>
                                            26.990.000₫
                                            <del>30.990.000₫</del>
                                        </span>
                                    </div>
                                    <div className={cx('prd-promo')}>
                                        <aside>
                                            <small className={cx('prd-promotionName')}></small>
                                            <label>
                                                6 khuyến mãi <SlArrowDown style={{ fontSize: '1.3rem' }} />
                                            </label>
                                        </aside>
                                    </div>
                                    <div className={cx('prd-choose-color')}>
                                        <div className={cx('prd-size-and-color')}>
                                            <aside>
                                                <label>
                                                    <span className={cx('prd-text-color')}>Xám</span>
                                                    <SlArrowDown style={{ fontSize: '1.3rem' }} />
                                                </label>
                                                {/* <div className={cx('prd-listColor')}>
                                                <div className={cx('select-color')}>
                                                    <img src="https://cdn.tgdd.vn/Products/Images/42/247508/s16/iPhone-14-Pro-topzone%20(4)-200x200.png" />
                                                    <small>Vàng</small>
                                                </div>
                                                <div className={cx('select-color')}>
                                                    <img src="https://cdn.tgdd.vn/Products/Images/42/247508/s16/iPhone-14-Pro-topzone%20(4)-200x200.png" />
                                                    <small>Đỏ</small>
                                                </div>
                                            </div> */}
                                            </aside>
                                        </div>
                                        <div className={cx('prd-choosenumber')}>
                                            <div className={cx('minus')}>-</div>
                                            <input type="text" defaultValue="1" className={cx('number')} />
                                            <div className={cx('plus')}>+</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={cx('total-provisional')}>
                        <span className={cx('total-quantity')}>
                            <label>Tạm tính </label>
                            (3 sản phẩm) :
                        </span>
                        <span className={cx('total-money')}>84.970.000₫</span>
                    </div>
                    <div className={cx('infor-customer')}>
                        <h4>Thông tin khách hàng</h4>
                        <form className={cx('form-customer')}>
                            <div className={cx('sex-customer')}>
                                <span>
                                    <input type="checkbox" value="male" name="" className={cx('cartnew-choose')} />
                                    Anh
                                </span>
                                <span>
                                    <input type="checkbox" value="female" name="" className={cx('cartnew-choose')} />
                                    Chị
                                </span>
                            </div>

                            <div className={cx('form')}>
                                <div className={cx('fillname')}>
                                    <input type="text" id="fullname" className={cx('form__input')} placeholder=" " />
                                    <label htmlFor="fullname" className={cx('form__label')}>
                                        Họ và tên
                                    </label>
                                </div>
                                <div className={cx('fillname')}>
                                    <input type="number" id="phone" className={cx('form__input')} placeholder=" " />
                                    <label htmlFor="phone" className={cx('form__label')}>
                                        Số điện thoại
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={cx('choosegetgoods')}>
                        <h4> Chọn hình thức nhận hàng </h4>
                        <div className={cx('click-choose')}>
                            <span>
                                <input type="checkbox" value="" name="" className={cx('cartnew-choose')} />
                                Giao tận nơi
                            </span>
                            <span>
                                <input type="checkbox" value="" name="" className={cx('cartnew-choose')} />
                                Nhận tại cửa hàng
                            </span>
                        </div>
                        <div className={cx('choose-content')}>
                            <div className={cx('deli-address')}>
                                <form>
                                    <div className={cx('cntry-district')}>
                                        <div className={cx('country')}>
                                            <button type="button">
                                                Hồ Chí Minh
                                                <SlArrowDown />
                                            </button>
                                            <div className={cx('select-country')}>
                                                <div className={cx('boxsearch')}>
                                                    <input type="text" placeholder="Tìm kiếm tỉnh thành" />
                                                    <Link className={cx('ciSearch')}>
                                                        <CiSearch />
                                                    </Link>
                                                </div>
                                                <div className={cx('listName')}>
                                                    <aside>
                                                        <p>Hồ Chí Minh</p> <p>Hà Nội</p>
                                                        <p>Đà Nẵng</p>
                                                        <p>An Giang</p>
                                                        <p>Bà Rịa - Vũng Tàu</p>
                                                        <p>Bắt Giang</p>
                                                    </aside>
                                                    <article>
                                                        <p>Hồ Chí Minh</p> <p>Hà Nội</p>
                                                        <p>Đà Nẵng</p>
                                                        <p>An Giang</p>
                                                        <p>Bà Rịa - Vũng Tàu</p>
                                                        <p>Bắt Giang</p>
                                                    </article>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('district')}>
                                            <button type="button">
                                                TP. Thủ Đức (Gồm Q2, Q9, Q.TĐ)
                                                <SlArrowDown />
                                            </button>
                                            <div className={cx('select-country')}>
                                                <div className={cx('boxsearch')}>
                                                    <input type="text" placeholder="Tìm kiếm tỉnh thành" />
                                                    <Link className={cx('ciSearch')}>
                                                        <CiSearch />
                                                    </Link>
                                                </div>
                                                <div className={cx('listName')}>
                                                    <aside>
                                                        <p>Hồ Chí Minh</p> <p>Hà Nội</p>
                                                        <p>Đà Nẵng</p>
                                                        <p>An Giang</p>
                                                        <p>Bà Rịa - Vũng Tàu</p>
                                                        <p>Bắt Giang</p>
                                                    </aside>
                                                    <article>
                                                        <p>Hồ Chí Minh</p> <p>Hà Nội</p>
                                                        <p>Đà Nẵng</p>
                                                        <p>An Giang</p>
                                                        <p>Bà Rịa - Vũng Tàu</p>
                                                        <p>Bắt Giang</p>
                                                    </article>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('wards')}>
                                            <button type="button">
                                                Phường An Khánh
                                                <SlArrowDown />
                                            </button>
                                            <div className={cx('select-country')}>
                                                <div className={cx('boxsearch')}>
                                                    <input type="text" placeholder="Tìm kiếm tỉnh thành" />
                                                    <Link className={cx('ciSearch')}>
                                                        <CiSearch />
                                                    </Link>
                                                </div>
                                                <div className={cx('listName')}>
                                                    <aside>
                                                        <p>Hồ Chí Minh</p> <p>Hà Nội</p>
                                                        <p>Đà Nẵng</p>
                                                        <p>An Giang</p>
                                                        <p>Bà Rịa - Vũng Tàu</p>
                                                        <p>Bắt Giang</p>
                                                    </aside>
                                                    <article>
                                                        <p>Hồ Chí Minh</p> <p>Hà Nội</p>
                                                        <p>Đà Nẵng</p>
                                                        <p>An Giang</p>
                                                        <p>Bà Rịa - Vũng Tàu</p>
                                                        <p>Bắt Giang</p>
                                                    </article>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('filladdress')}>
                                            <div className={cx('fillname')}>
                                                <input
                                                    type="number"
                                                    id="phone"
                                                    className={cx('form__input')}
                                                    placeholder=" "
                                                />
                                                <label htmlFor="phone" className={cx('form__label')}>
                                                    Số điện thoại
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className={cx('latch-order')}>
                                    <div className={cx('box-order')}>
                                        <div className={cx('rowtime')}>
                                            <span>Giao trước 10h ngày mai (12/11)</span>
                                            <span>Chọn thời gian khác</span>
                                        </div>
                                        <ul>
                                            <li>
                                                <Link className={cx('imgnm')}>
                                                    <img src="https://cdn.tgdd.vn/Products/Images/42/289710/s16/iPhone-14-plus-topzone%20(2)-200x200.png" />
                                                </Link>
                                                <div className={cx('text-order')}>
                                                    <Link className={cx('text-order__product-name')}>
                                                        iPhone 14 Plus 256GB
                                                    </Link>
                                                    <div className={cx('amount-color')}>
                                                        <small>Màu: Đỏ</small>
                                                        <small>Số lượng: 2</small>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className={cx('lastrow')}>
                                            <span className={cx('freeship')}>Miễn phí giao hàng</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('anotheroption')}>
                        <div className={cx('customer-note')}>
                            <div className={cx('fillname')}>
                                <input type="text" id="notexeria" className={cx('form__input')} placeholder=" " />
                                <label htmlFor="notexeria" className={cx('form__label')}>
                                    Nhập ghi chú (nếu có)
                                </label>
                            </div>
                        </div>
                        <ul>
                            <li>
                                <label>
                                    <input type="checkbox" />
                                    <span>Xuất hóa đơn công ty</span>
                                </label>
                                <form className={cx('infocompany')}>
                                    <div className={cx('fillinput')}>
                                        <input placeholder="Tên công ty" className={cx('untouched')} required />
                                    </div>
                                    <div className={cx('fillinput')}>
                                        <input placeholder="Địa chỉ công ty" className={cx('untouched')} required />
                                    </div>
                                    <div className={cx('fillinput')}>
                                        <input placeholder="Mã số thuế" className={cx('untouched')} required />
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('finaltotal')}>
                        <div className={cx('area-total')}>
                            <div className={cx('discountcode')}>
                                <div className={cx('coupon-code ')}>
                                    <span>Sử dụng mã giảm giá</span>
                                </div>
                                <div className={cx('applycode')}>
                                    <div className={cx('applycode__text-input')}>
                                        <input placeholder="Nhập mã giảm giá/ Phiếu mua hàng" />
                                    </div>
                                    <div className={cx('applycode__button')}>
                                        <button type="button" className={'disabledbtn'}>
                                            Áp dụng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('submitorder')}>Thanh toán</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
