import classNames from 'classnames/bind';
import { BiCast, BiChevronDown, BiCollection, BiCreditCardFront, BiIntersect } from 'react-icons/bi';
import { TiSocialInstagram, TiHomeOutline, TiLocationArrowOutline, TiPhoneOutline } from 'react-icons/ti';
import { RiAncientGateLine, RiBankLine, RiCalendarEventLine, RiListUnordered } from 'react-icons/ri';
import { BsGraphUp } from 'react-icons/bs';
import { useState, useContext, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import images from '~/assets/images';
import style from '~/assets/scss/admin/Navbar.module.scss';
import Loading from '~/components/Loading';
import './style.css';
import CommentCount from '../../CommentCount';
import { CommentContext } from '~/Context/CommentContext';
import logoApi from '~/api/logoApi';

const cx = classNames.bind(style);
const Navbar = () => {
    const [openCatePost, setOpenCatePost] = useState(false);
    const [openPost, setOpenPost] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openCateProduct, setOpenCateProduct] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openWareHouse, setOpenWareHouse] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    const [openVariant, setOpenVariant] = useState(false);
    const [openBrand, setOpenBrand] = useState(false);
    const [openBanner, setOpenBanner] = useState(false);
    const [openStore, setOpenStore] = useState(false);
    const [openImportSlip, setOpenImportSlip] = useState(false);
    const [openContact, setOpenContact] = useState(false);
    const [openSubsPost, setOpenSubsPost] = useState(false);
    const [openCateSubsProduct, setCateSubsProduct] = useState(false);
    const [openDashboard, setDashboard] = useState(false);
    const [openUsers, setOpenUsers] = useState(false);
    // comment
    const [openComment, setOpenComment] = useState(false);
    const [admin, setAdmin] = useState(false);
    const { commentCount } = useContext(CommentContext);

    const [logo, setLogo] = useState();

    useEffect(() => {
        fetchCatePost();
    }, []);
    const fetchCatePost = async () => {
        setLoading(true);
        try {
            const result = await logoApi.getAll();
            setLogo(result);

            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Categories: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const dataObject = JSON.parse(localStorage.getItem('dataAd'));
        setAdmin(dataObject);
    }, []);
    return (
        <div className={cx('wrapper')}>
            {loading ? <Loading /> : ''}
            <div className={cx('navbar')}>
                <div className={cx('navbar__top')}>
                    <div className={cx('navbar__logo')}>
                        {logo?.map((item, index) => (
                            <img className={cx('logo__img')} key={index} src={item?.image} />
                        ))}
                    </div>
                    <div className={cx('navbar__user')}>
                        <div className={cx('info__user')}>
                            <span className={cx('info__user--name')}>{admin.name}</span>
                            <span className={cx('info__user--email')}>{admin.email}</span>
                        </div>
                    </div>
                </div>

                <div className={cx('navbar__content')}>
                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>Giao di???n</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Ch???nh s???a c???u tr??c giao di???n</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            {/* <li className={cx('navbar__content--item')}>
                                <NavLink
                                    // style={(isActive) => ({ color: isActive ? 'green' : 'blue' })}
                                    to="layout"
                                    className={cx('navbar__content--link')}
                                >
                                    <TiHomeOutline className={cx('navbar__content--icon')} />
                                    Trang ch???
                                </NavLink>
                            </li> */}
                            <li className={cx('navbar__content--item')}>
                                <NavLink to="dashboard" className={cx('navbar__content--link')}>
                                    <BsGraphUp className={cx('navbar__content--icon')} />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className={cx('navbar__content--item')}>
                                <NavLink to="listlogo" className={cx('navbar__content--link')}>
                                    <TiLocationArrowOutline className={cx('navbar__content--icon')} />
                                    Logo
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    {/* user */}
                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>T??i kho???n</span>
                            {/* <p className={cx('navbar__content--heading-subtitle')}>Ch???nh s???a th????ng hi????u</p> */}
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenUsers(!openUsers);
                                    }}
                                >
                                    <BiCast className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>T??i kho???n </span>
                                    <BiChevronDown
                                        className={
                                            openUsers
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openUsers
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="account/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="account/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* user */}
                    {/* brand */}
                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>TH????NG HI????U</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Ch???nh s???a th????ng hi????u</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenBrand(!openBrand);
                                    }}
                                >
                                    <BiCast className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Th????ng hi????u </span>
                                    <BiChevronDown
                                        className={
                                            openBrand
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openBrand
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="brand/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="brand/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* end */}
                    {/* slider */}
                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>Ba??ng hi????u</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Ch???nh s???a ba??ng hi????u</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenBanner(!openBanner);
                                    }}
                                >
                                    <BiCast className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Ba??ng hi????u </span>
                                    <BiChevronDown
                                        className={
                                            openBanner
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openBanner
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="slideshow/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="slideshow/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch ba??ng hi????u
                                    </NavLink>
                                    <NavLink
                                        to="slideshow/listSub"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch ba??ng hi????u phu??
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* end slider */}
                    {/* Category */}
                    {/* <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>DANH MU??C</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Ch???nh s???a danh mu??c</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenCategories(!openCategories);
                                    }}
                                >
                                    <BiCast className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh m???c </span>
                                    <BiChevronDown
                                        className={
                                            openCategories
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openCategories
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="categoriesproduct/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="categoriesproduct/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>

                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setCateSubsProduct(!openCateSubsProduct);
                                    }}
                                >
                                    <BiCreditCardFront className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh m???c Subs s???n ph???m</span>
                                    <BiChevronDown
                                        className={
                                            openCateSubsProduct
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openCateSubsProduct
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="productsub/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>

                                    <NavLink
                                        to="productsub/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div> */}
                    {/* end */}
                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>Tin t???c</span>
                            <p className={cx('navbar__content--heading-subtitle')}> tin t???c</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenCatePost(!openCatePost);
                                    }}
                                >
                                    <BiCast className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh m???c tin t???c</span>
                                    <BiChevronDown
                                        className={
                                            openCatePost
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openCatePost
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="categoriespost/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="categoriespost/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenSubsPost(!openSubsPost);
                                    }}
                                >
                                    <BiCreditCardFront className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh m???c chi ti???t</span>
                                    <BiChevronDown
                                        className={
                                            openSubsPost
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openSubsPost
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="subs/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>

                                    <NavLink
                                        to="subs/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>

                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenPost(!openPost);
                                    }}
                                >
                                    <BiCreditCardFront className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>B??i Vi???t</span>
                                    <BiChevronDown
                                        className={
                                            openPost
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openPost
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="post/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="post/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>S???n Ph???m</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Ch???nh s???a th??ng tin s???n ph???m</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            {/* <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenCateProduct(!openCateProduct);
                                    }}
                                >
                                    <BiCollection className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh m???c s???n ph???m</span>
                                    <BiChevronDown
                                        className={
                                            openCateProduct
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openCateProduct
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="catepost/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="catepost/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li> */}

                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenCategories(!openCategories);
                                    }}
                                >
                                    <BiCast className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh m???c </span>
                                    <BiChevronDown
                                        className={
                                            openCategories
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openCategories
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="categoriesproduct/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="categoriesproduct/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>

                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setCateSubsProduct(!openCateSubsProduct);
                                    }}
                                >
                                    <BiCreditCardFront className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh m???c Subs s???n ph???m</span>
                                    <BiChevronDown
                                        className={
                                            openCateSubsProduct
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openCateSubsProduct
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="productsub/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>

                                    <NavLink
                                        to="productsub/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenProduct(!openProduct);
                                    }}
                                >
                                    <BiIntersect className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>S???n ph???m</span>
                                    <BiChevronDown
                                        className={
                                            openProduct
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openProduct
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="product/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="product/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>

                            {/* variant */}
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenVariant(!openVariant);
                                    }}
                                >
                                    <BiCast className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Bi????n th???? </span>
                                    <BiChevronDown
                                        className={
                                            openVariant
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openVariant
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="variant/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="variant/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>

                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenColor(!openColor);
                                    }}
                                >
                                    <TiSocialInstagram className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>M??u s???c s???n ph???m</span>
                                    <BiChevronDown
                                        className={
                                            openColor
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openColor
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="color/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="color/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>C???a h??ng</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Danh s??ch to??n b??? c???a h??ng</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenWareHouse(!openWareHouse);
                                    }}
                                >
                                    <RiBankLine className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Kho s???n ph???m</span>
                                    <BiChevronDown
                                        className={
                                            openWareHouse
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openWareHouse
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="warehouse/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="warehouse/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>

                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenStore(!openStore);
                                    }}
                                >
                                    <RiAncientGateLine className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>C???a h??ng</span>
                                    <BiChevronDown
                                        className={
                                            openStore
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openStore
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="store/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="store/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>

                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenImportSlip(!openImportSlip);
                                    }}
                                >
                                    <RiCalendarEventLine className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Phi???u nh???p h??ng</span>
                                    <BiChevronDown
                                        className={
                                            openImportSlip
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openImportSlip
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="importslip/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="importslip/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>????n h??ng</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Danh s??ch ????n h??ng</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <NavLink to="orders/list" className={cx('navbar__content--link')}>
                                    <RiListUnordered className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh s??ch ????n h??ng</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* comment */}
                    {/* brand */}
                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>Bi??nh lu????n</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Ch???nh s???a bi??nh lu????n</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <div
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenComment(!openComment);
                                    }}
                                >
                                    <BiCast className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>
                                        Bi??nh lu????n {commentCount > 0 && <CommentCount />}
                                    </span>
                                    <BiChevronDown
                                        className={
                                            openComment
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </div>
                                <div
                                    className={
                                        openComment
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="comment/listproductcomment"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* end */}
                    {/* end */}

                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>Footer</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Ch???nh s???a footer</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenCatePost(!openCatePost);
                                    }}
                                >
                                    <BiCast className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh m???c footer</span>
                                    <BiChevronDown
                                        className={
                                            openCatePost
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openCatePost
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="footer/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="footer/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenPost(!openPost);
                                    }}
                                >
                                    <BiCreditCardFront className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>N???i quy v?? ch??nh s??ch</span>
                                    <BiChevronDown
                                        className={
                                            openPost
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openPost
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="footer/content/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="footer/content/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>

                            {/* contact */}
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenContact(!openContact);
                                    }}
                                >
                                    <TiPhoneOutline className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Li??n h???</span>
                                    <BiChevronDown
                                        className={
                                            openContact
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openContact
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="contact/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Th??m m???i
                                    </NavLink>
                                    <NavLink
                                        to="contact/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh s??ch
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
