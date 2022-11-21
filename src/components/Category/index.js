import { Link, useLocation } from 'react-router-dom';
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
    let query = useQuery();
    let cateID = Number(query.get('id'));

    const [select, SetSelect] = useState();
    const [dataCategory, setDataCategory] = useState();
    const [listProducts, setListProducts] = useState();
    const [listProductsID, setListProductsID] = useState();
    const [showProducts, setShowProducts] = useState();
    const handleSelect = () => {
        SetSelect(!select);
    };
    const subCategoryId = useMemo(() => {
        const result = dataCategory?.filter((item, i) => item?.id === cateID);
        if (result) {
            return result[0]?.subs;
        }
    }, [cateID, dataCategory]);
    console.log('subCategoryId', subCategoryId);

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
                return item?.product;
            });
            setListProducts(ListProductsData);
        });
    }, []);
    const handleSelectProduct = (id) => {
        const filProducts = listProducts.filter((product) => {
            return Number(product.subcategory_id) === id;
        });

        setListProductsID(filProducts);
        return filProducts;
    };

    return (
        <>
            <div className={cx('menuByCategory')}>
                <div className={cx('ft-Category')}>
                    {/* <div className={cx('item-Link')} onClick={()=>{}}>Tất cả sản phẩm</div> */}
                    {subCategoryId?.map(
                        (item, index) => (
                            console.log('SubID', item),
                            (
                                <div
                                    className={cx('item-Link')}
                                    onClick={() => handleSelectProduct(item.id)}
                                    key={index}
                                >
                                    {item?.name}
                                </div>
                            )
                        ),
                    )}
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
                {listProductsID
                    ? listProductsID?.map((item, index) => (
                          <div className={cx('olw-item')} key={item.id}>
                              <Link className={cx('olw-item-link')}>
                                  <div className={cx('olw-newDiscount-head')}>
                                      <label>Moi</label>
                                  </div>
                                  <div className={cx('olw-images-box')}>
                                      <img src={item.url_image} alt={item.meta_title} className={cx('olw-img-slide')} />
                                  </div>
                                  <div className={cx('prods-group')}>
                                      <ul>
                                          {item.variantsByProduct.map((variant, i) => (
                                              <li key={i}>{variant.variant_name}</li>
                                          ))}
                                      </ul>
                                  </div>
                                  <h3>{item.name}</h3>
                                  <span className={cx('price')}>
                                      {/* {item.price_reducer */}
                                      <del>{item.variantsByProduct[0].price}</del> &nbsp;
                                      {/* {item.discount} */}
                                  </span>
                              </Link>
                          </div>
                      ))
                    : listProducts?.map((item, index) => (
                          <div className={cx('olw-item')} key={item.id}>
                              <Link className={cx('olw-item-link')}>
                                  <div className={cx('olw-newDiscount-head')}>
                                      <label>Moi</label>
                                  </div>
                                  <div className={cx('olw-images-box')}>
                                      <img src={item.url_image} alt={item.meta_title} className={cx('olw-img-slide')} />
                                  </div>
                                  <div className={cx('prods-group')}>
                                      <ul>
                                          {item.variantsByProduct.map((variant, i) => (
                                              <li key={i}>{variant.variant_name}</li>
                                          ))}
                                      </ul>
                                  </div>
                                  <h3>{item.name}</h3>
                                  <span className={cx('price')}>
                                      {/* {item.price_reducer */}
                                      <del>{item.variantsByProduct[0].price}</del> &nbsp;
                                      {/* {item.discount} */}
                                  </span>
                              </Link>
                          </div>
                      ))}
            </div>
        </>
    );
};

export default Category;
