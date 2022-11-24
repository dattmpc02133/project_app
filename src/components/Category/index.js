import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from '~/assets/scss/Category.module.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMemo } from 'react';
const cx = classNames.bind(style);
function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Category = () => {
    const navigate = useNavigate();

    const [select, SetSelect] = useState();
    const [dataCategory, setDataCategory] = useState();
    const [listProducts, setListProducts] = useState();
    const [listProductsID, setListProductsID] = useState();
    const [render, setRender] = useState(false);
    const handleSelect = () => {
        SetSelect(!select);
    };
    const { state } = useLocation();
    const CateID = state.CateID;
    const subCategoryId = useMemo(() => {
        const result = dataCategory?.filter((item, i) => item?.id === CateID);
        if (result) {
            return result[0]?.subs;
        }
    }, [CateID, dataCategory]);

    useEffect(() => {
        axios
            .get('https://duynh404.cf/api/client/categories')
            .then((res) => {
                const related = res?.data?.data?.map((data) => {
                    return data;
                });
                setDataCategory(related);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        axios.get('https://duynh404.cf/api/client/products').then((resData) => {
            const ListProductsData = resData?.data?.data?.map((item) => {
                return item;
            });
            setListProducts(ListProductsData);
        });
    }, []);
    const handleSelectProduct = (id) => {
        const filProducts = listProducts.filter((product) => {
            product.price = product.variantsDetailsByProduct[0].price;

            return Number(product.subcategory_id) === id;
        });
        setListProductsID(filProducts);
        return filProducts;
    };
    const ChangeVariant = ({ itemVariant, listVariants, itemProduct }) => {
        // let priceByVariant = 0;
        const result = listVariants?.filter((element) => {
            if (element?.variant_id == itemVariant?.id) {
                return element;
            }
        });
        console.log('itemProduct', itemProduct);
        if (result.length > 0) {
            itemProduct.price = result[0].price;
            setRender(!render);
        }
    };
    return (
        <>
            <div className={cx('menuByCategory')}>
                <div className={cx('ft-Category')}>
                    {/* <div className={cx('item-Link')} onClick={()=>{}}>Tất cả sản phẩm</div> */}
                    {subCategoryId?.map((item, index) => (
                        <div className={cx('item-Link')} onClick={() => handleSelectProduct(item.id)} key={index}>
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
                {listProducts &&
                    listProductsID?.map((item, index) => (
                        <div className={cx('olw-item')} key={item.id}>
                            <div
                                onClick={() => {
                                    navigate(`/productDetail?id=${item.slug}`, {
                                        state: {
                                            productID: item.id,
                                        },
                                    });
                                }}
                                className={cx('olw-item-link')}
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
                                    {/* {item.price_reducer */}
                                    <del>{item?.price}</del> &nbsp;
                                    {/* {item.discount} */}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Category;
