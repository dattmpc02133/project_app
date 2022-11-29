import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import React, { useEffect, useState } from 'react';
import { GoPlus, GoTrashcan } from 'react-icons/go';
import { GrClose } from 'react-icons/gr';
import brandApi from '~/api/brandApi';
import colorApi from '~/api/colorApi';
import subCateProductApi from '~/api/subCateProductApi';
import productApi from '~/api/productApi';
import variantApi from '~/api/variantApi';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [name, setName] = useState();
    const [loading, setLoading] = useState(false);
    const [nameProduct, setNameProduct] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [listBrand, setListBrand] = useState([]);
    const [listColor, setListColor] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [listVariant, setListVariant] = useState([]);
    const [variant, setVariant] = useState([[]]);
    const [colorByVariant, setColorByVariant] = useState([]);
    const [priceByVariant, setPriceByVariant] = useState([]);
    const [discountByVariant, setDiscountByVariant] = useState([]);

    const [product, setProduct] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrand = async () => {
            setLoading(true);
            try {
                const result = await brandApi.getAll();
                setListBrand(result.data.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get brand', error);
                setLoading(false);
            }
        };
        const fetchColor = async () => {
            setLoading(true);
            try {
                const result = await colorApi.getAll();
                setListColor(result.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get brand', error);
                setLoading(false);
            }
        };
        const fetchCateProduct = async () => {
            setLoading(true);
            try {
                const result = await subCateProductApi.getAll();
                setListCategory(result.data.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get brand', error);
                setLoading(false);
            }
        };
        const fetchVariant = async () => {
            setLoading(true);
            try {
                const result = await variantApi.getAll();
                setListVariant(result.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get brand', error);
                setLoading(false);
            }
        };

        fetchBrand();
        fetchColor();
        fetchCateProduct();
        fetchVariant();
    }, []);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const result = await productApi.getById(params.id);
                setProduct(result.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get product: ', error);
                setLoading(false);
                navigate('/admin/pagenotfound');
            }
        };
        getProduct();
    }, []);

    // Logic Form Variant
    const [formSubVariant, setFormSubVariant] = useState([[{ color: '', price: '', discount: '' }]]);
    const [formVariant, setFormVariant] = useState([{ GB: '', data: [...formSubVariant] }]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            meta_title: metaTitle,
            meta_keywords: metaKeywords,
            meta_description: metaDescription,
            name: nameProduct,
            description: description,
            url_image: image,
            specification_infomation: null,
            brand_id: brand,
            subcategory_id: category,
            variant_ids: variant,
            colors_by_variant_id: colorByVariant,
            prices_by_variant_id: priceByVariant,
            discount_by_variant_id: discountByVariant,
        };

        // const createProduct = async () => {
        //     setLoading(true);
        //     try {
        //         const result = await productApi.create(data);
        //         console.log(result);
        //         setLoading(false);
        //     } catch (error) {
        //         console.log('Fail to create product', error);
        //         setLoading(false);
        //     }
        // };
        // createProduct();
        console.log('data', data);

        // setColorByVariant([]);
    };

    useEffect(() => {
        const arrvariant = [];
        let arrColorByvariant = [];
        let arrPriceByvariant = [];
        let arrDiscountByvariant = [];
        formVariant.map((item, index) => {
            arrvariant.push(item.GB);
            // console.log('lenght', item.data.length);
            arrColorByvariant = [...arrColorByvariant, []];
            arrPriceByvariant = [...arrPriceByvariant, []];
            arrDiscountByvariant = [...arrDiscountByvariant, []];
            item.data.map((data, i) => {
                arrColorByvariant[index].push(data.color);
                arrPriceByvariant[index].push(data.price);
                arrDiscountByvariant[index].push(data.discount);
                //     // setColorByVariant([...arrColorByvariant, arrColorByvariant]);
                //     console.log(`arrColorByvariant - ${i}: `, arrColorByvariant);
                setDiscountByVariant(arrDiscountByvariant);
                setColorByVariant(arrColorByvariant);
                setPriceByVariant(arrPriceByvariant);
                setVariant(arrvariant);
            });
        });
    }, [formVariant]);

    useEffect(() => {
        document.title = metaTitle;
    }, [metaTitle]);

    const addFormVariant = () => {
        const newListFormVariant = [...formVariant, { GB: '', data: [{ color: '', price: '', discount: '' }] }];
        setFormVariant(newListFormVariant);
        const newListFormSubVariant = [...formSubVariant, [{ color: '', price: '', discount: '' }]];
        setFormSubVariant(newListFormSubVariant);
    };

    const addFormSubVariant = (index) => {
        const newListFormSubVariant = [...formSubVariant];
        newListFormSubVariant[index] = [...formSubVariant[index], { color: '', price: '', discount: '' }];
        setFormSubVariant(newListFormSubVariant);
        const newListFormVariant = [...formVariant];
        newListFormVariant[index].data = newListFormSubVariant[index];
        setFormVariant(newListFormVariant);
    };

    const handleChangeinputGB = (valueInput, i) => {
        const inputData = [...formVariant];
        inputData[i].GB = valueInput.target.value;
        setFormVariant(inputData);
    };

    const handleChangeInputPrice = (valueInput, i, index) => {
        const inputData = [...formSubVariant];
        const newListFormVariant = [...formVariant];
        inputData[index][i].price = valueInput.target.value;
        setFormSubVariant(inputData);
        newListFormVariant[index].data = formSubVariant[index];
        setFormVariant(newListFormVariant);
    };

    const handleChangeInputColor = (valueInput, i, index) => {
        const inputData = [...formSubVariant];
        inputData[index][i].color = valueInput.target.value;
        setFormSubVariant(inputData);
        const newListFormVariant = [...formVariant];
        newListFormVariant[index].data = formSubVariant[index];
        setFormVariant(newListFormVariant);
    };

    // console.log('formSubVariant', formSubVariant);
    const handleChangeInputDiscount = (valueInput, i, index) => {
        const inputData = [...formSubVariant];
        inputData[index][i].discount = valueInput.target.value;
        setFormSubVariant(inputData);
        const newListFormVariant = [...formVariant];
        newListFormVariant[index].data = formSubVariant[index];
        setFormVariant(newListFormVariant);
    };

    const removeFormSubVarriant = (i, index) => {
        const newFormSubVariant = [...formSubVariant];
        newFormSubVariant[index].splice(i, 1);
        setFormSubVariant(newFormSubVariant);
    };

    const removeFormVarriant = (e, i) => {
        const newFormVariant = [...formVariant];
        newFormVariant.splice(i, 1);
        setFormVariant(newFormVariant);
        const newFormSubVariant = [...formSubVariant];
        newFormSubVariant.splice(i, 1);
        setFormVariant(newFormVariant);
    };

    const getColor = (id) => {
        if (id > 0) {
            let color = listColor.filter((item) => item.id == id);
            return color[0].color_code;
        }
        return null;
    };

    // End Logic Form Variant
    // const arrvariantProduct = [];
    const [arrVariantProduct, setArrvariantProduct] = useState([]);
    useEffect(() => {
        // setNameProduct
        product.name ? setNameProduct(product.name) : console.log('Not Found');
        product.meta_title ? setMetaTitle(product.meta_title) : console.log('Not Found');
        product.meta_keywords ? setMetaKeywords(product.meta_keywords) : console.log('Not Found');
        product.meta_description ? setMetaDescription(product.meta_description) : console.log('Not Found');
        product.url_image ? setImage(product.url_image) : console.log('Not Found');
        product.subcategory_id ? setCategory(product.subcategory_id) : console.log('Not Found');
        product.brand_id ? setBrand(product.brand_id) : console.log('Not Found');
        product.description ? setDescription(product.description) : console.log('Not Found');
        if (Array.isArray(product.variants) && product.variants.length > 0) {
            product.variants.map((item, index) => {
                // const newArr = [...arrVariantProduct, item.id];
                arrVariantProduct.push(item.id);
                setArrvariantProduct([...arrVariantProduct]);
                addFormVariant();
            });
        }
    }, [product]);

    useEffect(() => {
        const inputData = [...formVariant];
        if (
            Array.isArray(arrVariantProduct) &&
            arrVariantProduct.length > 0 &&
            inputData.length == arrVariantProduct.length
        ) {
            inputData.map((item, index) => {
                inputData[index].GB = arrVariantProduct[index];
                setFormVariant(inputData);
                if (Array.isArray(product.dataVariants) && product.dataVariants.length > 0) {
                    product.dataVariants.map((data, i) => {
                        // addFormSubVariant(index);
                        const a = inputData.filter((item, index) => {
                            // console.log('GB', item.GB);
                            return item.GB == data.variant_id;
                        });
                        const newListFormVariant = [...formVariant];
                        newListFormVariant[index].data = newListFormSubVariant[index];
                        setFormVariant(newListFormVariant);
                        console.log(a);
                        //
                        // inputData[index][i].discount = valueInput.target.value;
                        // setFormSubVariant(inputData);
                        // const newListFormVariant = [...formVariant];
                        // newListFormVariant[index].data = formSubVariant[index];
                        // setFormVariant(newListFormVariant);

                        //
                    });
                }
            });
        }
    }, [arrVariantProduct]);
    // console.log('formVariant', formVariant);
    // console.log('product', product);
    // console.log('formVariant', formVariant);

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm mới sản phẩm</h2>
                <p className="content__heading--subtitle">Sản phẩm</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form onSubmit={(e) => handleSubmit(e)} className="form__content">
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="nameProduct">Tên sản phẩm</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={nameProduct}
                                    id="nameProduct"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tên sản phẩm..."
                                    onChange={(e) => setNameProduct(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="metaTitle">Tiêu đề sales</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={metaTitle}
                                    id="metaTitle"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tiêu đề sales..."
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="metaTitle">Từ khóa tìm kiếm</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={metaKeywords}
                                    id="metaTitle"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Từ khóa tìm kiếm..."
                                    onChange={(e) => setMetaKeywords(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="metaTitle">Mô tả sales</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={metaDescription}
                                    id="metaTitle"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Từ khóa tìm kiếm..."
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="imgProduct">Hình ảnh</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={image}
                                    id="imgProduct"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tên sản phẩm..."
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Danh mục sản phẩm</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="input__text--ctrl"
                                    value={category}
                                >
                                    <option>--Chọn danh mục sản phẩm--</option>
                                    {Array.isArray(listCategory)
                                        ? listCategory.map((item, index) => (
                                              <option key={index} value={item.id}>
                                                  {item.name}
                                              </option>
                                          ))
                                        : false}
                                </select>
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="brandProduct">Thương hiệu</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="brandProduct"
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="input__text--ctrl"
                                    value={brand}
                                >
                                    <option>--Chọn danh mục sản phẩm--</option>
                                    {Array.isArray(listBrand)
                                        ? listBrand.map((item, index) => (
                                              <option key={index} value={item.id}>
                                                  {item.brand_name}
                                              </option>
                                          ))
                                        : false}
                                </select>
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Mô tả sản phẩm</label>
                            </div>
                            <CKEditor
                                editor={Editor}
                                data={description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                }}
                            />
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Biến thể sản phẩm</label>
                            </div>
                            {formVariant.map((item, index) => (
                                <div key={index} className="input__block">
                                    <div className="input__block--item">
                                        {formVariant.length > 1 ? (
                                            <div className="input__block--heading-close">
                                                <GrClose
                                                    onClick={(e) => removeFormVarriant(e, index)}
                                                    className="heading-close__icon"
                                                />
                                            </div>
                                        ) : (
                                            false
                                        )}

                                        <div className="input__block--label">
                                            <label htmlFor="ip-name">Bộ nhớ sản phẩm</label>
                                        </div>
                                        <div className="input__text">
                                            <select
                                                onChange={(e) => handleChangeinputGB(e, index)}
                                                className="input__text--ctrl"
                                                value={item.GB}
                                            >
                                                <option>--Chọn bộ nhớ sản phẩm--</option>
                                                {Array.isArray(listVariant)
                                                    ? listVariant.map((item, index) => (
                                                          <option key={index} value={item.id}>
                                                              {item.variant_name}GB
                                                          </option>
                                                      ))
                                                    : false}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="input__block--item">
                                        <div className="input__block--label">
                                            <label htmlFor="ip-name">Biến thể</label>
                                        </div>
                                        <div className="input__block--content">
                                            {item.data.map((data, i) => (
                                                <div key={i} className="input__block--list">
                                                    <div className="input__block--check">
                                                        <div className="input__block--check-title">
                                                            <label htmlFor="">Màu sắc</label>
                                                        </div>
                                                        <div className="input__block--check-content">
                                                            <select
                                                                className="input__text--ctrl"
                                                                onChange={(e) => handleChangeInputColor(e, i, index)}
                                                                required
                                                                value={data.color}
                                                            >
                                                                <option value="">--Chọn màu sản phẩm--</option>
                                                                {Array.isArray(listColor)
                                                                    ? listColor.map((item, index) => (
                                                                          <option key={index} value={item.id}>
                                                                              {item.name}
                                                                          </option>
                                                                      ))
                                                                    : false}
                                                            </select>
                                                            {getColor(data.color) != null ? (
                                                                <div
                                                                    style={{
                                                                        backgroundColor: getColor(data.color),
                                                                        display: 'block',
                                                                        border: '1px solid rgba(0, 0, 0, 0.5)',
                                                                    }}
                                                                    className="check__color"
                                                                ></div>
                                                            ) : (
                                                                <div className="check__color"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="input__block--check">
                                                        <div className="input__block--check-title">
                                                            <label htmlFor="">Giá tiền</label>
                                                        </div>
                                                        <div className="input__block--check-content">
                                                            <input
                                                                type="number"
                                                                required
                                                                value={data.price}
                                                                onChange={(e) => handleChangeInputPrice(e, i, index)}
                                                                className="input__block--check-ctrl"
                                                                placeholder="Giá tiền sản phẩm..."
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="input__block--check">
                                                        <div className="input__block--check-title">
                                                            <label htmlFor="">Giảm giá (%)</label>
                                                        </div>
                                                        <div className="input__block--check-content">
                                                            <input
                                                                value={
                                                                    // formVariant[index].data.length == 1
                                                                    //     ? data[0].discount
                                                                    //     : data.discount
                                                                    data.discount
                                                                }
                                                                type="number"
                                                                required
                                                                className="input__block--check-ctrl"
                                                                onChange={(e) => handleChangeInputDiscount(e, i, index)}
                                                                placeholder="Giảm giá (%)"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="input__block--close">
                                                        {item.data.length > 1 ? (
                                                            <GoTrashcan
                                                                className="close__icon"
                                                                onClick={(e) => removeFormSubVarriant(i, index)}
                                                            />
                                                        ) : (
                                                            false
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="input__block--btn--wp">
                                                <div
                                                    className="input__block--btn"
                                                    onClick={() => addFormSubVariant(index)}
                                                >
                                                    <span>Thêm biến thể phụ</span>
                                                    <GoPlus className="input__block--icon" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="btn__add--form-wp">
                                <div className="btn__add--form" onClick={addFormVariant}>
                                    <span>Thêm biến thể mới</span>
                                    <GoPlus className="btn__add--form--icon" />
                                </div>
                            </div>
                        </div>

                        {/* {message && typeof message == 'string' ? (
                            <div className="input__group">
                                <span className={('input__group--mess', 'suscess')}>{message}</span>
                            </div>
                        ) : (
                            false
                        )} */}
                        <div className="btn__form">
                            <button className="btn__form--ctrl">Thêm sản phẩm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
