import { useEffect, useRef, useState } from 'react';
import Slideshow from '../../components/slideshow';
import classNames from 'classnames/bind';
import style from '~/assets/scss/Home.module.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import productApi from '../../api/productApi';
import { useMemo } from 'react';
const cx = classNames.bind(style);
function Home() {
    const [listProducts, setListProducts] = useState();
    const [render, setRender] = useState(false);

    useEffect(() => {
        const fetchHome = async () => {
            const dataHome = await productApi.getHomeAll();
            setListProducts(dataHome.data);
        };
        fetchHome();

        document.title = 'Trang chủ';
    }, []);
    // const ListProductsData = useMemo(() => {
    //     listProducts?.map((ListProductsLabels) => {
    //         console.log('ListProductsLabels', ListProductsLabels);
    //     });
    // }, [listProducts]);
    // console.log('ListProductsData', ListProductsData);
    const ChangeVariant = ({ itemVariant, listVariants, itemProduct }) => {
        const result = listVariants?.filter((element) => {
            console.log('itemVariant', itemVariant?.id);
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
                                {ListPrd?.products?.map((item, indexProduct) => {
                                    if (!ListPrd?.showMore && indexProduct < 4) {
                                        return (
                                            <div className={cx('olw-item')} key={indexProduct}>
                                                <Link
                                                    to={`/productdetail?id=${item.id}&slug=${item.slug}`}
                                                    key={indexProduct}
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
                                                                    className={variant.id == 1 ? cx('active') : ''}
                                                                    // style={{ border: '1px solid #ccc' }}
                                                                >
                                                                    {variant.variant_name}
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
                                    }
                                    if (ListPrd?.showMore) {
                                        return (
                                            <div className={cx('olw-item')} key={indexProduct}>
                                                <Link
                                                    to={`/productdetail?id=${item.id}&slug=${item.slug}`}
                                                    key={indexProduct}
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
                                                                    {variant.variant_name}
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
                                    }
                                })}
                            </div>
                        </div>
                        <div className={cx('btn-class')}>
                            <span
                                onClick={() => {
                                    const showMore = ListPrd?.showMore;
                                    console.log('itemCate', ListPrd);
                                    showMore
                                        ? (listProducts[index].showMore = false)
                                        : (listProducts[index].showMore = true);
                                    setRender(!render);
                                    console.log('ListPrd', ListPrd);
                                }}
                                className={cx('btn-add-More')}
                            >
                                {ListPrd?.showMore ? 'Rút gọn' : 'Xem thêm'}
                            </span>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Home;
