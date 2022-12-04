import { useEffect, useRef, useState } from 'react';
import Slideshow from '../../components/slideshow';
import classNames from 'classnames/bind';
import style from '~/assets/scss/Home.module.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import productApi from '../../api/productApi';
const cx = classNames.bind(style);
function Home() {
    const [listProducts, setListProducts] = useState();
    const [listProductItem, setListProductItem] = useState();
    const [render, setRender] = useState(false);
    // const [cars] = useState(carsList);
    const [numberOfitemsShown, setNumberOfItemsToShown] = useState(5);

    useEffect(() => {
        const fetchHome = async () => {
            const dataHome = await productApi.getHomeAll();
            setListProducts(dataHome.data);
        };
        fetchHome();
    }, [listProducts]);
    const showMore = () => {
        // if (numberOfitemsShown + 4 <= cars.length) {
        //     setNumberOfItemsToShown(numberOfitemsShown + 3);
        // } else {
        //     setNumberOfItemsToShown(cars.length);
        // }
    };
    const ChangeVariant = ({ itemVariant, listVariants, itemProduct }) => {
        const result = listVariants?.filter((element) => {
            if (element?.variant_id == itemVariant?.id) {
                return element;
            }
        });
        if (result.length > 0) {
            itemProduct.price = result[0]?.price;
            setRender(!render);
        }
    };

    return (
        <>
            <Slideshow />
            {listProducts?.map((ListPrd, index) => {
                return (
                    <div className={cx('carousel-slide-box')} key={index}>
                        <a href="#" className={cx('logo-slide')} key={index}>
                            <span>{ListPrd.name}</span>
                        </a>
                        <div className={cx('slide-cate-product')}>
                            <div className={cx('slide-owl-stage')}>
                                {ListPrd?.products?.map((item, index) => {
                                    return (
                                        <div className={cx('olw-item')} key={index}>
                                            <Link
                                                // to={`/${product.path}/${item.slug}`}
                                                key={index}
                                                className={cx('olw-item-link')}
                                            >
                                                <div className={cx('olw-newDiscount-head')}>
                                                    {/* <label>{item.news}</label> */}
                                                    {/* <div className={cx('olw-percent')}>{item.discount}</div> */}
                                                </div>
                                                <div className={cx('olw-images-box')}>
                                                    <img
                                                        src={item.url_image}
                                                        // alt={item.title}
                                                        className={cx('olw-img-slide')}
                                                    />
                                                </div>
                                                <div className={cx('prods-group')}>
                                                    <ul>
                                                        {item?.variants?.map((variant, i) => (
                                                            <li
                                                                key={i}
                                                                onClick={(e) =>
                                                                    e.preventDefault(
                                                                        ChangeVariant({
                                                                            itemVariant: variant,
                                                                            listVariants:
                                                                                item?.variantsDetailsByProduct,
                                                                            itemProduct: item,
                                                                        }),
                                                                    )
                                                                }
                                                            >
                                                                {variant.variant_name}GB
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <h3>{item.name}</h3>

                                                <span className={cx('price')}>
                                                    <>
                                                        {Number(
                                                            item.price || item?.variantsDetailsByProduct[0]?.price,
                                                        ).toLocaleString()}
                                                        đ
                                                    </>
                                                </span>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div onClick={() => showMore()}>Xem thêm</div>
                    </div>
                );
            })}
        </>
    );
}

export default Home;
