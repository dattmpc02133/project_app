import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from '~/assets/scss/Category.module.scss';
import React, { useEffect, useState } from 'react';
import productApi from '~/api/productApi';
import cateProductApi from '~/api/cateProductApi';
import { useMemo } from 'react';
const cx = classNames.bind(style);
const Category = () => {
    const { search } = useLocation();
    const Search = useMemo(() => {
        return new URLSearchParams(search);
    }, [search]);
    // const { state } = useLocation();
    const CateID = Search.get('id');
    const [select, SetSelect] = useState();

    const [dataCategory, setDataCategory] = useState();
    const [listProducts, setListProducts] = useState();
    const [itemProductsActive, setItemColorActive] = useState();
    const [render, setRender] = useState(false);
    const handleSelect = () => {
        SetSelect(!select);
    };

    useEffect(() => {
        const fetchAllCategory = async () => {
            try {
                const Category = await cateProductApi.getAll();
                const ListCategoryData = Category?.data?.filter((item) => item.id == CateID);
                if (ListCategoryData.length > 0) {
                    setDataCategory(ListCategoryData[0].subs);
                }
            } catch (error) {}
        };
        fetchAllCategory();
    }, [CateID]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const resData = await productApi.getAll();
                const ListProductsData = resData?.data?.filter((item) => item?.cartegory_id == CateID);
                setListProducts(ListProductsData);
                setItemColorActive(ListProductsData);
            } catch (error) {}
        };
        fetchAllProducts();
    }, [CateID]);

    const handleChangeTypeSubById = ({ item, index }) => {
        if (listProducts) {
            const resultKQ = listProducts.filter((itemID) => {
                return itemID.subcategory_id == item.id;
            });
            setItemColorActive(resultKQ);
        }
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
            <div className={cx('menuByCategory')}>
                <div className={cx('ft-Category')}>
                    {/* <div className={cx('item-Link')} onClick={()=>{}}>Tất cả sản phẩm</div> */}
                    {dataCategory?.map((item, index) => (
                        <div
                            className={cx('item-Link')}
                            onClick={() => handleChangeTypeSubById({ item, index })}
                            key={index}
                        >
                            {item?.name}
                        </div>
                    ))}
                </div>
                <div className={cx('ft-sort')}>
                    <div className={cx('sortOder')} onClick={handleSelect}>
                        Xếp theo: Mới ra mắt
                    </div>
                    <ul style={{ display: select ? 'block ' : 'none' }}>
                        <li>
                            <a>
                                <span>Mới ra mắt</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span>Bán chạy</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span>Giá thấp đến cao</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span>Giá cao đến thấp</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx('container-productbox')}>
                {itemProductsActive?.map((item, index) => {
                    return (
                        <div className={cx('olw-item')} key={index}>
                            <Link
                                to={`/productdetail?id=${item.id}&slug=${item.slug}`}
                                state={{
                                    id: item?.id,
                                    subcategory_id: item?.subcategory_id,
                                }}
                                className={cx('olw-item-link')}
                                onClick={() =>
                                    window.scroll({
                                        top: 0,
                                        left: 0,
                                        behavior: 'smooth',
                                    })
                                }
                            >
                                <div className={cx('olw-newDiscount-head')}>
                                    <label>Moi</label>
                                </div>
                                <div className={cx('olw-images-box')}>
                                    <img src={item?.url_image} alt={item.meta_title} className={cx('olw-img-slide')} />
                                </div>
                                <div className={cx('prods-group')}>
                                    <ul>
                                        {item.variants.map((variant, i) => (
                                            <li
                                                key={i}
                                                onClick={(e) =>
                                                    e.preventDefault(
                                                        ChangeVariant({
                                                            itemVariant: variant,
                                                            listVariants: item?.variantsDetailsByProduct,
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
                                    &nbsp;
                                </span>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Category;
