import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { TbShoppingCartX } from 'react-icons/tb';
import { Link } from 'react-router-dom';

import locationApi from '~/api/locationApi';
import productApi from '~/api/productApi';
import cartApi from '~/api/cartApi';
import loginApi from '~/api/loginApi';

import style from '~/assets/scss/Cart.module.scss';
import Dialog from '~/components/Dialog';
import Loading from '~/components/Loading';
import Modal from '~/components/Modal';
import FormOTP from '~/components/FormOTP';
import { CartContext } from '~/Context/CartContext';
import { UserContext } from '~/Context/UserContext';

import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);
const Cart = () => {
    // const [modal, setModal] = useState(false);
    // const [messStatus, setMessStatus] = useState();
    // const [statusHandle, setStatusHandle] = useState();
    const [cart, setCart] = useState();
    const [listProducts, setListProducts] = useState([]);
    const [allProducts, setAllProducts] = useState();
    const [variantId, setVariantId] = useState([]);
    const [colorId, setColorId] = useState([]);

    const [address, setAddress] = useState();
    const [provinceId, setProvinceId] = useState();
    const [provinceList, setProvinceList] = useState();
    const [wardId, setWardId] = useState();
    const [wardList, setWardList] = useState();
    const [districtId, setDistrictId] = useState();
    const [districtList, setDistrictList] = useState();
    const [newListDistrict, setNewListDistrict] = useState();
    const [newListWarn, setNewListWarn] = useState();
    const [payMethod, setPayMethod] = useState(2);

    const [comfirm, setComfirm] = useState(false);
    const [totalLocal, setTotalLocal] = useState(0);

    const [phone, setPhone] = useState();
    const [name, setName] = useState();
    const [gender, setGender] = useState('Anh');
    const [note, setNote] = useState();
    const [couponCode, setCouponCode] = useState();
    const [showForm, setShowForm] = useState(false);
    const [otp, setOtp] = useState();

    // const [modal, setModal] = useState(false);
    // const [messStatus, setMessStatus] = useState();
    // const [statusHandle, setStatusHandle] = useState();

    const navigate = useNavigate();

    const {
        getCart,
        listCart,
        setListCart,
        setListCartLocal,
        addToCart,
        listCartLocal,
        listProDettails,
        handleChangeVariantId,
        handleChangeColor,
        handlePlusNumPro,
        handlePrevNumPro,
        deleteCartItem,
        loading,
        modal,
        messStatus,
        statusHandle,
        setLoading,
        deleteCart,
        // payCOD,
        setMessStatus,
        setStatusHandle,
        setModal,
    } = useContext(CartContext);

    const { getUser, user } = useContext(UserContext);

    useEffect(() => {
        if (listCart != undefined) {
            const getLocation = async () => {
                setLoading(true);
                try {
                    const resultProduct = await productApi.getAll();
                    setAllProducts(resultProduct.data);

                    const resultProvince = await locationApi.getAllProvince();
                    setProvinceList(resultProvince.data);
                    //
                    const resultDistricts = await locationApi.getAllDistricts();
                    setDistrictList(resultDistricts.data);

                    setProvinceId(listCart.province_id);
                    const fillerDis = resultDistricts?.data?.filter((item) => item.province_id == listCart.province_id);
                    setNewListDistrict(fillerDis);
                    //

                    const resultWard = await locationApi.getAllWard();
                    setWardList(resultWard.data);

                    setDistrictId(listCart.district_id);
                    const fillerWard = wardList?.filter((item) => item.district_id == listCart.district_id);
                    setNewListWarn(fillerWard);
                    setWardId(listCart.ward_id);
                    setAddress(listCart.address);
                    setLoading(false);
                } catch (error) {
                    console.log('Failed to get location: ', error);
                    setLoading(false);
                }
            };
            getLocation();
        }
    }, [listCart, user]);

    useEffect(() => {
        if (listCartLocal != undefined) {
            let total = 0;
            listCartLocal?.map((item, index) => {
                total += item.price * item.quantity;
            });
            setTotalLocal(total);
        }
    }, [listCartLocal]);

    const getVariantProduct = (id) => {
        const variantProduct = allProducts?.filter((item) => item.id == id);
        if (variantProduct != undefined) {
            return variantProduct[0]?.variants;
        }
    };

    const getVariantDetails = (idVariant, idProduct) => {
        const variantDetails = allProducts?.filter((item) => item.id == idProduct);
        if (variantDetails != undefined) {
            const listVariants = variantDetails[0]?.variantsDetailsByProduct?.filter(
                (item) => item.variant_id == idVariant,
            );
            return listVariants;
        }
    };

    const listIdDelete = useRef();
    const handleDeleteCartItem = (idPro, idVar, idColor, index) => {
        if (listCart?.details != undefined) {
            const listID = { idPro, idVar, idColor };
            listIdDelete.current = listID;
            setComfirm(true);
        } else if (listCartLocal != undefined) {
            listIdDelete.current = index;
            setComfirm(true);
        }
    };

    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            deleteCartItem(listIdDelete);
        }
    };

    const handlePay = (e) => {
        e.preventDefault();
        const data = { ...listCart };
        data.details = listProDettails;
        data.shipping_method_id = 5;
        if (payMethod == 2) {
            data.payment_method_id = payMethod;

            payCOD(data);
        } else if (payMethod == 5) {
            data.payment_method_id = payMethod;

            vnPay(data);
        }
    };

    const payCOD = async (data) => {
        setLoading(true);
        try {
            const result = await cartApi.payCOD(data);
            console.log(result);
            // setMessStatus(result.message);
            // setStatusHandle(true);
            // setModal(true);

            navigate(`/paycucess?madh=${result.data.order_code}`);
            getCart();
            setLoading(false);
        } catch (error) {
            console.log('Failed to pay: ', error);
            const res = error.response.data;
            setMessStatus(res.message);
            setLoading(false);
            setModal(true);
            setStatusHandle(false);
        }
    };

    const vnPay = async (data) => {
        try {
            const result = await cartApi.vnPay(data.total);
            localStorage.setItem('cartInfo', JSON.stringify(data));
            const url = result?.url;
            window.location = url;
        } catch (error) {
            console.log('Failed to pay: ', error);
        }
    };

    const cartLocal = JSON.parse(localStorage.getItem('listCart'));

    const payLoacal = async () => {
        const data = {
            coupon_code: couponCode,
            details: '',
            discount: 0,
            discount_formatted: '',
            email: '',
            fee_ship: '18000',
            fee_ship_formatted: '18,000đ',
            payment_method: null,
            payment_method_id: payMethod,
            phone: phone,
            province_id: provinceId,
            district_id: districtId,
            ward_id: wardId,
            shipping_method: null,
            shipping_method_id: 5,
            total: totalLocal,
            address: address,
        };

        data.details = cartLocal;
        data.shipping_method_id = 5;
        if (payMethod == 2) {
            data.payment_method_id = payMethod;

            payCOD(data);
        } else if (payMethod == 5) {
            data.payment_method_id = payMethod;

            vnPay(data);
        }
    };

    const [statusLogin, setStatusLogin] = useState();
    const handlePayLocal = (e) => {
        e.preventDefault();

        // console.log('data', data);
        const checkLogin = async () => {
            try {
                const result = await loginApi.callsms(phone);
                setShowForm(true);
                setStatusLogin(true);
            } catch (error) {
                console.log('Check Error', error);
                if (error.response.status == 404) {
                    getSmsRegister(phone);
                    setStatusLogin(false);
                }

                if (error.response.status != 404) {
                    setMessStatus(error.response.data.message);
                    setStatusHandle(false);
                    setModal(true);
                }
            }
        };

        if (phone.length == 10) {
            checkLogin();
        } else {
            setMessStatus('Số điện thoại không đúng định dạng!');
            setStatusHandle(false);
            setModal(true);
        }

        const getSmsRegister = async (phone) => {
            setLoading(true);
            try {
                const resultSms = await loginApi.callsmsRT(phone);
                setShowForm(true);
                setLoading(false);
            } catch (error) {
                console.log('Failed to Register', error);
                setLoading(false);
                setMessStatus(error.response.data.message);
                setStatusHandle(false);
                setModal(true);
            }
        };
    };

    // console.log('listCart', listCart);
    const [time, setTime] = useState(60);
    if (time == 0) {
        setMessStatus('Mã OTP hết hiệu lực');
        setStatusHandle(false);
        setModal(true);
    }

    const handleConfirmPay = (e) => {
        e.preventDefault();
        setShowForm(false);
        const dataRegister = {
            name,
            address,
            ward_id: wardId,
            district_id: districtId,
            province_id: provinceId,
            phone,
            password: otp,
        };

        const dataLogin = { phone, password: otp };

        if (statusLogin) {
            login(dataLogin);
        } else {
            register(dataRegister, dataLogin);
        }
    };

    const register = async (dataRegister, dataLogin) => {
        setLoading(true);
        console.log(dataRegister);
        try {
            const resultRegister = await loginApi.register(dataRegister);
            console.log(resultRegister);
            login(dataLogin);
            setLoading(false);
        } catch (error) {
            console.log('Failed to Register', error);
            setLoading(false);
        }
    };

    const login = async (dataLogin) => {
        setLoading(true);
        try {
            const result = await loginApi.login(dataLogin);
            const token = result.token.Bearer;
            localStorage.setItem('token', token);
            setShowForm(false);
            setLoading(false);
            getUser();
            payLoacal();
            // addCartLocalToDB();
        } catch (error) {
            console.log('Login failed: ', error);
            const res = error.response.data;
            setMessStatus(res.message.password);
            setLoading(false);
            setModal(true);
            setStatusHandle(false);
        }
    };

    useEffect(() => {
        provinceId != cart?.province_id && setDistrictId('');
        const fillerDis = districtList?.filter((item) => item.province_id == provinceId);
        setNewListDistrict(fillerDis);
    }, [provinceId]);

    const changeDistrictId = (id) => {
        setDistrictId(id);
    };

    const changeProvinceId = (id) => {
        setProvinceId(id);
    };

    const changeWardId = (id) => {
        setWardId(id);
    };

    useEffect(() => {
        provinceId != cart?.province_id && setDistrictId('');
        const fillerDis = districtList?.filter((item) => item.province_id == provinceId);
        setNewListDistrict(fillerDis);
    }, [provinceId]);

    useEffect(() => {
        const fillerWard = wardList?.filter((item) => item.district_id == districtId);
        setNewListWarn(fillerWard);
    }, [districtId]);

    return (
        <div className={cx('wrapper')}>
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}

            {/* OTP */}
            {showForm && (
                <FormOTP
                    action={handleConfirmPay}
                    phone={phone}
                    setOtp={setOtp}
                    setShowForm={setShowForm}
                    showform={showForm}
                    time={time}
                    setTime={setTime}
                />
            )}

            {/* {showForm && (
                <div className={cx('modal__container')}>
                    <form className={cx('modal__form')} onSubmit={(e) => handleConfirmPay(e)}>
                        <div className={cx('modal__heading')}>
                            <h2>Nhập mã OTP</h2>
                            <p>Mã OTP đã được gửi vào số điện thoại {phone}</p>
                        </div>
                        <div className={cx('modal__main')}>
                            <div className={cx('modal__content')}>
                                <input type="text" onChange={(e) => setOtp(e.target.value)} placeholder="Mã OTP" />
                            </div>
                            <div className={cx('modal__btn--block')}>
                                <div className={cx('modal__btn--close')} onClick={(e) => setShowForm(false)}>
                                    Hủy
                                </div>
                                <button className={cx('modal__btn')}>Xác nhận</button>
                            </div>
                        </div>
                    </form>
                </div>
            )} */}

            {listCart?.details?.length > 0 && (
                <div className={cx('content-pay')}>
                    <div className={cx('yourCartBuyMore')}>
                        <Link to="/" className={cx('BuyMore')}>
                            <SlArrowLeft style={{ fontSize: '1.3rem' }} /> Mua thêm sản phẩm khác
                        </Link>
                    </div>
                    <form onSubmit={(e) => handlePay(e)}>
                        <div className={cx('middleCart')}>
                            <ul className={cx('listing-cart')}>
                                {listProDettails?.map((item, index) => (
                                    <li key={index} className={cx('prd-item')}>
                                        <div className={cx('imgsp')}>
                                            <Link to="/iphone" className={cx('imgsp__link')}>
                                                <img src={listCart?.details[index].product_image} />
                                            </Link>
                                            <div
                                                className={cx('btn__delete--cart')}
                                                onClick={() => {
                                                    handleDeleteCartItem(
                                                        item.product_id,
                                                        item.variant_id,
                                                        item.color_id,
                                                    );
                                                }}
                                            >
                                                <span>&times;</span>
                                                Xóa
                                            </div>
                                        </div>
                                        <div className={cx('prd-infosp')}>
                                            <div className={cx('prd-name-price')}>
                                                <Link>{listCart?.details[index].product_name}</Link>
                                                <span>
                                                    {listCart?.details[index].price_formatted}
                                                    <del>{listCart?.details[index].original_price_formatted}</del>
                                                </span>
                                            </div>
                                            {/* <div className={cx('prd-promo')}>
                                        <aside>
                                            <small className={cx('prd-promotionName')}></small>
                                            <label>
                                                6 khuyến mãi <SlArrowDown style={{ fontSize: '1.3rem' }} />
                                            </label>
                                        </aside>
                                    </div> */}
                                            <div className={cx('prd-choose-color')}>
                                                <div className={cx('prd-size-and-color')}>
                                                    <select
                                                        className={cx('prd-size-and-color')}
                                                        onChange={(e) => handleChangeVariantId(e.target.value, index)}
                                                        value={item.variant_id}
                                                    >
                                                        {getVariantProduct(item.product_id)?.map((variant, index) => (
                                                            <option key={index} value={variant.id}>
                                                                {variant.variant_name}GB
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        className={cx('prd-size-and-color')}
                                                        onChange={(e) => handleChangeColor(e.target.value, index)}
                                                        value={item?.color_id}
                                                    >
                                                        <option value="">Chọn màu sắc</option>
                                                        {getVariantDetails(item?.variant_id, item.product_id)?.map(
                                                            (item, i) => (
                                                                <option key={i} value={item.color_id}>
                                                                    {item.color_name}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                    <aside>
                                                        {/* <label>
                                                    <span className={cx('prd-text-color')}>{item.color_name}</span>
                                                    <SlArrowDown style={{ fontSize: '1.3rem' }} />
                                                </label> */}
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
                                                    <div
                                                        className={cx('minus')}
                                                        onClick={() => handlePrevNumPro(index)}
                                                    >
                                                        -
                                                    </div>
                                                    <input
                                                        type="number"
                                                        value={item?.quantity}
                                                        min="1"
                                                        className={cx('number')}
                                                    />
                                                    <div className={cx('plus')} onClick={() => handlePlusNumPro(index)}>
                                                        +
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className={cx('total-provisional')}>
                                <span className={cx('total-quantity')}>
                                    <label>Tạm tính </label>({listCart?.details?.length} sản phẩm) :
                                </span>
                                <div className={cx('total-money__block')}>
                                    <span className={cx('total-money')}>{listCart?.total_formatted}</span>
                                    {listCart?.discount > 0 && (
                                        <span className={cx('total-submoney')}>- {listCart?.discount_formatted}</span>
                                    )}
                                    <span className={cx('total-submoney')}>+ {listCart?.fee_ship_formatted}</span>
                                </div>
                            </div>

                            <div className={cx('infor-customer')}>
                                <h4>Thông tin khách hàng</h4>
                                <form className={cx('form-customer')}>
                                    <div className={cx('sex-customer')}>
                                        <span>
                                            <input
                                                id="checkMale"
                                                type="radio"
                                                value="male"
                                                name="gender"
                                                checked
                                                className={cx('cartnew-choose')}
                                            />
                                            <label htmlFor="checkMale">Anh</label>
                                        </span>
                                        <span>
                                            <input
                                                id="checkFemale"
                                                type="radio"
                                                value="female"
                                                name="gender"
                                                className={cx('cartnew-choose')}
                                            />
                                            <label htmlFor="checkFemale">Chị</label>
                                        </span>
                                    </div>

                                    <div className={cx('form')}>
                                        <div className={cx('fillname')}>
                                            <input
                                                type="text"
                                                id="fullname"
                                                className={cx('form__input')}
                                                placeholder=" "
                                                disabled
                                                value={listCart?.user_name}
                                            />
                                            <label htmlFor="fullname" className={cx('form__label')}>
                                                Họ và tên
                                            </label>
                                        </div>
                                        <div className={cx('fillname')}>
                                            <input
                                                type="number"
                                                id="phone"
                                                value={listCart?.phone}
                                                disabled
                                                className={cx('form__input')}
                                                placeholder=" "
                                            />
                                            <label htmlFor="phone" className={cx('form__label')}>
                                                Số điện thoại
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={cx('choosegetgoods')}>
                                <h4> Chọn hình thức thanh toán </h4>
                                <div className={cx('click-choose')}>
                                    <span>
                                        <input
                                            type="radio"
                                            value=""
                                            id="cod"
                                            name="checkPayMethoad"
                                            onChange={() => setPayMethod(2)}
                                            checked={payMethod == 2}
                                            className={cx('cartnew-choose')}
                                        />
                                        <label for="cod">Ship COD</label>
                                    </span>
                                    <span>
                                        <input
                                            type="radio"
                                            value=""
                                            id="vnpay"
                                            checked={payMethod == 5}
                                            name="checkPayMethoad"
                                            onChange={() => setPayMethod(5)}
                                            className={cx('cartnew-choose')}
                                        />
                                        <label for="vnpay">Thanh toán VNPay</label>
                                    </span>
                                </div>
                                <h4> Chọn địa chỉ giao hàng </h4>
                                <div className={cx('choose-content')}>
                                    <div className={cx('deli-address')}>
                                        <form>
                                            <div className={cx('cntry-district')}>
                                                <div className={cx('form__address--haspass')}>
                                                    <div className={cx('form__address', 'mr-16')}>
                                                        <label className={cx('form__address--label')}>
                                                            Tỉnh, thành phố
                                                        </label>
                                                        <select
                                                            className={cx('form__address--ctrl')}
                                                            onChange={(e) => changeProvinceId(e.target.value)}
                                                            value={provinceId}
                                                        >
                                                            <option value>--Chọn tỉnh thành phố</option>
                                                            {Array.isArray(provinceList) &&
                                                                provinceList.map((item, index) => (
                                                                    <option value={item.id}>{item.name}</option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                    <div className={cx('form__address', 'ml-16')}>
                                                        <label className={cx('form__address--label')}>
                                                            Quận, huyện
                                                        </label>
                                                        <select
                                                            className={cx('form__address--ctrl')}
                                                            onChange={(e) => changeDistrictId(e.target.value)}
                                                            value={districtId}
                                                        >
                                                            <option value>--Chọn quận huyện--</option>
                                                            {Array.isArray(newListDistrict) &&
                                                                newListDistrict.map((item, index) => (
                                                                    <option value={item.id}>{item.name}</option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={cx('form__address--haspass')}>
                                                    <div className={cx('form__address', 'mr-16')}>
                                                        <label className={cx('form__address--label')}>
                                                            Phường xã, thị trấn
                                                        </label>
                                                        <select
                                                            className={cx('form__address--ctrl')}
                                                            onChange={(e) => changeWardId(e.target.value)}
                                                            value={wardId}
                                                        >
                                                            <option value>--Chọn phường, xã, thị trấn</option>
                                                            {Array.isArray(newListWarn) &&
                                                                newListWarn.map((item, index) => (
                                                                    <option value={item.id}>{item.name}</option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                    <div className={cx('form__address', 'ml-16')}>
                                                        <label className={cx('form__address--label')}>
                                                            Địa chỉ cụ thể
                                                        </label>
                                                        <input
                                                            className={cx('form__address--ctrl')}
                                                            value={address}
                                                            placeholder="271 Nguyễn Văn Linh"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        {/* <div className={cx('latch-order')}>
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
                                    </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className={cx('anotheroption')}>
                                <div className={cx('customer-note')}>
                                    <div className={cx('fillname')}>
                                        <input
                                            type="text"
                                            id="notexeria"
                                            className={cx('form__input')}
                                            placeholder=" "
                                        />
                                        <label htmlFor="notexeria" className={cx('form__label')}>
                                            Nhập ghi chú (nếu có)
                                        </label>
                                    </div>
                                </div>
                                {/* <ul>
                                <li>
                                    <label>
                                        <input type="checkbox" />
                                        <span>Xuất hóa đơn công ty</span>
                                    </label>
                                    <div className={cx('infocompany')}>
                                        <div className={cx('fillinput')}>
                                            <input placeholder="Tên công ty" className={cx('untouched')} required />
                                        </div>
                                        <div className={cx('fillinput')}>
                                            <input placeholder="Địa chỉ công ty" className={cx('untouched')} required />
                                        </div>
                                        <div className={cx('fillinput')}>
                                            <input placeholder="Mã số thuế" className={cx('untouched')} required />
                                        </div>
                                    </div>
                                </li>
                            </ul> */}
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
                                <div className={cx('submitorder')}>
                                    <button className={cx('btn__submit')}>THANH TOÁN</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {listCart?.details == undefined && user != undefined && (
                <div className={cx('content-pay')}>
                    <div className={cx('empty__cart')}>
                        <TbShoppingCartX className={cx('empty__cart--icon')} />
                        <p className={cx('empty__cart--text')}>Giỏ hàng của bạn chưa có sản phẩm nào !</p>
                    </div>
                </div>
            )}

            {(listCartLocal == undefined || listCartLocal.length == 0) && user == undefined && (
                <div className={cx('content-pay')}>
                    <div className={cx('empty__cart')}>
                        <TbShoppingCartX className={cx('empty__cart--icon')} />
                        <p className={cx('empty__cart--text')}>Giỏ hàng của bạn chưa có sản phẩm nào !</p>
                    </div>
                </div>
            )}

            {user == undefined && listCartLocal?.length > 0 && (
                <div className={cx('content-pay')}>
                    <div className={cx('yourCartBuyMore')}>
                        <Link to="/" className={cx('BuyMore')}>
                            <SlArrowLeft style={{ fontSize: '1.3rem' }} /> Mua thêm sản phẩm khác
                        </Link>
                    </div>
                    <form onSubmit={(e) => handlePayLocal(e)}>
                        <div className={cx('middleCart')}>
                            <ul className={cx('listing-cart')}>
                                {listCartLocal?.map((item, index) => (
                                    <li key={index} className={cx('prd-item')}>
                                        <div className={cx('imgsp')}>
                                            <Link to="/iphone" className={cx('imgsp__link')}>
                                                <img src={item?.image} />
                                            </Link>
                                            <div
                                                className={cx('btn__delete--cart')}
                                                onClick={() => {
                                                    handleDeleteCartItem(
                                                        item.product_id,
                                                        item.variant_id,
                                                        item.color_id,
                                                        index,
                                                    );
                                                }}
                                            >
                                                <span>&times;</span>
                                                Xóa
                                            </div>
                                        </div>
                                        <div className={cx('prd-infosp')}>
                                            <div className={cx('prd-name-price')}>
                                                <Link>{item.name}</Link>
                                                <span>
                                                    {Number(item.price).toLocaleString()} đ
                                                    <del>{Number(item.originalPrice).toLocaleString()} đ</del>
                                                </span>
                                            </div>

                                            <div className={cx('prd-choose-color')}>
                                                <div className={cx('prd-size-and-color')}>
                                                    <select
                                                        className={cx('prd-size-and-color')}
                                                        onChange={(e) => handleChangeVariantId(e.target.value, index)}
                                                        value={item.variant_id}
                                                    >
                                                        {getVariantProduct(item.product_id)?.map((variant, index) => (
                                                            <option key={index} value={variant.id}>
                                                                {variant.variant_name}GB
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        className={cx('prd-size-and-color')}
                                                        onChange={(e) =>
                                                            handleChangeColor(
                                                                e.target.value,
                                                                index,
                                                                item.product_id,
                                                                item.variant_id,
                                                            )
                                                        }
                                                        value={item?.color_id}
                                                    >
                                                        <option value="">Chọn màu sắc</option>
                                                        {getVariantDetails(item?.variant_id, item.product_id)?.map(
                                                            (item, i) => (
                                                                <option key={i} value={item.color_id}>
                                                                    {item.color_name}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </div>
                                                <div className={cx('prd-choosenumber')}>
                                                    <div
                                                        className={cx('minus')}
                                                        onClick={() => handlePrevNumPro(index)}
                                                    >
                                                        -
                                                    </div>
                                                    <input
                                                        type="number"
                                                        value={item?.quantity}
                                                        min="1"
                                                        className={cx('number')}
                                                    />
                                                    <div className={cx('plus')} onClick={() => handlePlusNumPro(index)}>
                                                        +
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className={cx('total-provisional')}>
                                <span className={cx('total-quantity')}>
                                    <label>Tạm tính </label>({listCartLocal?.length} sản phẩm) :
                                </span>
                                <div className={cx('total-money__block')}>
                                    <span className={cx('total-money')}>{Number(totalLocal).toLocaleString()} đ</span>
                                    {listCartLocal?.discount > 0 && (
                                        <span className={cx('total-submoney')}>- {listCart?.discount_formatted}</span>
                                    )}
                                    {listCartLocal?.fee_ship > 0 && (
                                        <span className={cx('total-submoney')}>+ {listCart?.fee_ship_formatted}</span>
                                    )}
                                </div>
                            </div>

                            <div className={cx('infor-customer')}>
                                <h4>Thông tin khách hàng</h4>
                                <form className={cx('form-customer')}>
                                    <div className={cx('sex-customer')}>
                                        <span>
                                            <input
                                                id="checkMale"
                                                type="radio"
                                                value="male"
                                                name="gender"
                                                checked={gender == 'Anh'}
                                                onChange={() => setGender('Anh')}
                                                className={cx('cartnew-choose')}
                                            />
                                            <label htmlFor="checkMale">Anh</label>
                                        </span>
                                        <span>
                                            <input
                                                id="checkFemale"
                                                type="radio"
                                                value="female"
                                                name="gender"
                                                onChange={() => setGender('Chị')}
                                                checked={gender == 'Chị'}
                                                className={cx('cartnew-choose')}
                                            />
                                            <label htmlFor="checkFemale">Chị</label>
                                        </span>
                                    </div>

                                    <div className={cx('form')}>
                                        <div className={cx('fillname')}>
                                            <input
                                                type="text"
                                                id="fullname"
                                                className={cx('form__input')}
                                                placeholder=""
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
                                            />
                                            <label htmlFor="fullname" className={cx('form__label')}>
                                                Họ và tên
                                            </label>
                                        </div>
                                        <div className={cx('fillname')}>
                                            <input
                                                type="number"
                                                id="phone"
                                                className={cx('form__input')}
                                                placeholder=""
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                            <label htmlFor="phone" className={cx('form__label')}>
                                                Số điện thoại
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={cx('choosegetgoods')}>
                                <h4> Chọn hình thức thanh toán </h4>
                                <div className={cx('click-choose')}>
                                    <span>
                                        <input
                                            type="radio"
                                            value=""
                                            id="cod"
                                            name="checkPayMethoad"
                                            onChange={() => setPayMethod(2)}
                                            checked={payMethod == 2}
                                            className={cx('cartnew-choose')}
                                        />
                                        <label for="cod">Ship COD</label>
                                    </span>
                                    <span>
                                        <input
                                            type="radio"
                                            value=""
                                            id="vnpay"
                                            checked={payMethod == 5}
                                            name="checkPayMethoad"
                                            onChange={() => setPayMethod(5)}
                                            className={cx('cartnew-choose')}
                                        />
                                        <label for="vnpay">Thanh toán VNPay</label>
                                    </span>
                                </div>
                                <h4> Chọn địa chỉ giao hàng </h4>
                                <div className={cx('choose-content')}>
                                    <div className={cx('deli-address')}>
                                        <form>
                                            <div className={cx('cntry-district')}>
                                                <div className={cx('form__address--haspass')}>
                                                    <div className={cx('form__address', 'mr-16')}>
                                                        <label className={cx('form__address--label')}>
                                                            Tỉnh, thành phố
                                                        </label>
                                                        <select
                                                            className={cx('form__address--ctrl')}
                                                            onChange={(e) => changeProvinceId(e.target.value)}
                                                            value={provinceId}
                                                        >
                                                            <option value>--Chọn tỉnh thành phố</option>
                                                            {Array.isArray(provinceList) &&
                                                                provinceList.map((item, index) => (
                                                                    <option value={item.id}>{item.name}</option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                    <div className={cx('form__address', 'ml-16')}>
                                                        <label className={cx('form__address--label')}>
                                                            Quận, huyện
                                                        </label>
                                                        <select
                                                            className={cx('form__address--ctrl')}
                                                            onChange={(e) => changeDistrictId(e.target.value)}
                                                            value={districtId}
                                                        >
                                                            <option value>--Chọn quận huyện--</option>
                                                            {Array.isArray(newListDistrict) &&
                                                                newListDistrict.map((item, index) => (
                                                                    <option value={item.id}>{item.name}</option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={cx('form__address--haspass')}>
                                                    <div className={cx('form__address', 'mr-16')}>
                                                        <label className={cx('form__address--label')}>
                                                            Phường xã, thị trấn
                                                        </label>
                                                        <select
                                                            className={cx('form__address--ctrl')}
                                                            onChange={(e) => changeWardId(e.target.value)}
                                                            value={wardId}
                                                        >
                                                            <option value>--Chọn phường, xã, thị trấn</option>
                                                            {Array.isArray(newListWarn) &&
                                                                newListWarn.map((item, index) => (
                                                                    <option value={item.id}>{item.name}</option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                    <div className={cx('form__address', 'ml-16')}>
                                                        <label className={cx('form__address--label')}>
                                                            Địa chỉ cụ thể
                                                        </label>
                                                        <input
                                                            className={cx('form__address--ctrl')}
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            placeholder="271 Nguyễn Văn Linh"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('anotheroption')}>
                                <div className={cx('customer-note')}>
                                    <div className={cx('fillname')}>
                                        <input
                                            type="text"
                                            id="notexeria"
                                            className={cx('form__input')}
                                            placeholder=" "
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        />
                                        <label htmlFor="notexeria" className={cx('form__label')}>
                                            Nhập ghi chú (nếu có)
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('finaltotal')}>
                                {/* <div className={cx('area-total')}>
                                    <div className={cx('discountcode')}>
                                        <div className={cx('coupon-code ')}>
                                            <span>Sử dụng mã giảm giá</span>
                                        </div>
                                        <div className={cx('applycode')}>
                                            <div className={cx('applycode__text-input')}>
                                                <input
                                                    type="text"
                                                    placeholder="Nhập mã giảm giá/ Phiếu mua hàng"
                                                    value={couponCode}
                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                />
                                            </div>
                                            <div className={cx('applycode__button')}>
                                                <button type="button" className={'disabledbtn'}>
                                                    Áp dụng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className={cx('submitorder')}>
                                    <button className={cx('btn__submit')}>THANH TOÁN</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Cart;
