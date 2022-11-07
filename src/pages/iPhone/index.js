import { Link, Outlet, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from '~/assets/scss/iPhone.module.scss';
import Slideshow from '../../components/slideshow';
import images from '../../assets/images';
import { useEffect, useState } from 'react';
import SubCategoryProduct from '../../components/SubCategoryProduct';
import { ItemMenu, product_list_store } from '../../services/ApiServices';
const cx = classNames.bind(style);

function Iphone() {
    const params = useParams();
    const [data, setData] = useState(params);
    useEffect(() => {
        setData(data);
    }, []);
    console.log(data);
    // const [data, setData] = useState(product_list_store);
    // const results = ItemMenu.filter((curData) => {
    //     console.log('curData Menu: ', curData);
    //     console.log('data', data);
    // });
    // console.log(results);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-slide-box')}>
                <a href="#" className={cx('content-slide-label')}>
                    <span>
                        <img src={images.logo2} className={cx('personal_auth-logo')} />
                        iPhone
                    </span>
                </a>
                <Slideshow style={{ borderRadius: '20px' }} />
                <>
                    <SubCategoryProduct />
                    <div className={cx('container-productbox')}>
                        {product_list_store.map((item) => (
                            <div className={cx('olw-item')} key={item.id}>
                                <Link className={cx('olw-item-link')}>
                                    <div className={cx('olw-newDiscount-head')}>
                                        <label>{item.new}</label>
                                    </div>
                                    <div className={cx('olw-images-box')}>
                                        <img src={item.img} alt={item.title} className={cx('olw-img-slide')} />
                                    </div>
                                    <div className={cx('prods-group')}>
                                        <ul>
                                            {item.Capacity.map((gb, index) => (
                                                <li key={index}>{gb}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <h3>{item.title}</h3>
                                    <span className={cx('price')}>
                                        {item.price_reducer} <del>{item.price}</del> &nbsp; {item.discount}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            </div>
        </div>
    );
}

export default Iphone;
