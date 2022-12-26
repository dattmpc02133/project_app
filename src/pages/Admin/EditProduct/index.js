import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import React, { useEffect, useState } from 'react';
import { GoPlus, GoTrashcan } from 'react-icons/go';
import { GrClose } from 'react-icons/gr';
import brandApi from '~/api/brandApi';
import colorApi from '~/api/colorApi';
import subCateProductApi from '~/api/subCateProductApi';
import cateProductApi from '~/api/cateProductApi';
import productApi from '~/api/productApi';
import variantApi from '~/api/variantApi';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import TableImage from '~/components/TableImage';
import Modal from '~/components/Modal';
const EditProduct = () => {
    const [name, setName] = useState();
    const [loading, setLoading] = useState(false);
    const [nameProduct, setNameProduct] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [listBrand, setListBrand] = useState([]);
    const [listColor, setListColor] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [listSubCategory, setListSubCategory] = useState([]);
    const [listVariant, setListVariant] = useState([]);
    const [variant, setVariant] = useState([[]]);
    const [colorByVariant, setColorByVariant] = useState([]);
    const [priceByVariant, setPriceByVariant] = useState([]);
    const [discountByVariant, setDiscountByVariant] = useState([]);

    const [product, setProduct] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    //
    const [newSubListCategory, setNewSubListCategory] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState([]);

    //
    const [modal, setModal] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [messErr, setMessErr] = useState();
    const [showImgTbl, setShowImgTbl] = useState(false);
    const [urlImage, setUrlImage] = useState();
    const [statusImg, setStatusImg] = useState();

    const fetchData = async () => {
        setLoading(true);
        try {
            const resultBrand = await brandApi.getAll();
            // console.log();
            setListBrand(resultBrand.data);
            const resultColor = await colorApi.getAll();
            setListColor(resultColor.data.data);
            const resultListSubCate = await subCateProductApi.getAll();
            setListSubCategory(resultListSubCate.data);
            const resultCate = await cateProductApi.getAll();
            setListCategory(resultCate.data);
            const resultVariant = await variantApi.getAllClient();
            console.log('resultVariant', resultVariant);
            setListVariant(resultVariant.data);

            const resultProduct = await productApi.getById(params.id);
            setProduct(resultProduct.data);
            const resultSubCateById = await subCateProductApi.getById(resultProduct.data.subcategory_id);
            // setOldSubCate(resultSubCate.data);
            setBrand(resultSubCateById.data.brand_id);
            setCategory(resultProduct.data.category);

            const newListSubCate = resultListSubCate?.data?.filter(
                (item) =>
                    item.category_id == resultProduct.data.category && item.brand_id == resultSubCateById.data.brand_id,
            );
            setNewSubListCategory(newListSubCate);
            setSubCategoryId(resultSubCateById.data.id);

            setLoading(false);
        } catch (error) {
            console.log('Failed to get data', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     const getProduct = async () => {
    //         setLoading(true);
    //         try {
    //             const resultProduct = await productApi.getById(params.id);
    //             setProduct(resultProduct.data);
    //             const resultSubCate = await subCateProductApi.getById(resultProduct.data.subcategory_id);
    //             // setOldSubCate(resultSubCate.data);
    //             setBrand(resultSubCate.data.brand_id);
    //             console.log('resultSubCate', resultSubCate.data);
    //             setCategory(resultProduct.data.category);
    //             setLoading(false);
    //         } catch (error) {
    //             console.log('Failed to get product: ', error);
    //             setLoading(false);
    //             // navigate('/admin/pagenotfound');
    //         }
    //     };
    //     getProduct();
    // }, []);

    // Logic Form Variant
    // const [formSubVariant, setFormSubVariant] = useState([[{ color: '', price: '', discount: '' }]]);
    // const [formVariant, setFormVariant] = useState([{ GB: '', data: [...formSubVariant] }]);
    const [formSubVariant, setFormSubVariant] = useState([]);
    const [formVariant, setFormVariant] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            meta_title: metaTitle,
            meta_keywords: metaKeywords,
            meta_description: metaDescription,
            name: nameProduct,
            description: description,
            url_image: urlImage,
            collection_images: image,
            delete_variant_details: deleteVrDetails,

            specification_infomation: specification,
            subcategory_id: subCategoryId,
            variant_ids: variant,
            colors_by_variant_id: colorByVariant,
            prices_by_variant_id: priceByVariant,
            discount_by_variant_id: discountByVariant,
        };

        const updateProduct = async () => {
            setLoading(true);
            try {
                const result = await productApi.update(data, params.id);
                // console.log(result);
                setMessStatus(result.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
                // fetchData();
                setMessErr();
            } catch (error) {
                console.log('Fail to create product', error);
                const res = error.response.data;
                setMessStatus(res.status);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
                setMessErr(res.message);
            }
        };
        updateProduct();
        // console.log(data);
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
        const newListFormVariant = [
            ...formVariant,
            { GB: '', data: [{ color: '', price: '', discount: '', idSubVr: '' }] },
        ];
        setFormVariant(newListFormVariant);
        const newListFormSubVariant = [...formSubVariant, [{ color: '', price: '', discount: '', idSubVr: '' }]];
        setFormSubVariant(newListFormSubVariant);
    };

    const addFormSubVariant = (index) => {
        const newListFormSubVariant = [...formSubVariant];
        newListFormSubVariant[index] = [...formSubVariant[index], { color: '', price: '', discount: '', idSubVr: '' }];
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

    const [deleteVrDetails, setDeleteVrDetails] = useState([]);
    const removeFormSubVarriant = (i, index, id) => {
        const newFormSubVariant = [...formSubVariant];
        newFormSubVariant[index].splice(i, 1);
        setFormSubVariant(newFormSubVariant);
        if (id) {
            const result = deleteVrDetails.filter((item) => item === id);
            if (result.length === 0) {
                const arrDelete = [...deleteVrDetails];
                arrDelete.push(id);
                setDeleteVrDetails(arrDelete);
            }
        }
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
            let color = listColor?.filter((item) => item.id == id);
            return color[0]?.color_code;
        }
        return null;
    };

    // End Logic Form Variant
    // const arrvariantProduct = [];
    const [arrVariantProduct, setArrvariantProduct] = useState([]);
    useEffect(() => {
        const newFormVR = [...formVariant];
        const newFormSubVR = [...formSubVariant];
        // setNameProduct
        product.name && setNameProduct(product.name);
        product.meta_title && setMetaTitle(product.meta_title);
        product.meta_keywords && setMetaKeywords(product.meta_keywords);
        product.meta_description && setMetaDescription(product.meta_description);
        product.url_image && setUrlImage(product.url_image);
        product.collection_images && setImage(product.collection_images);

        product.description && setDescription(product.description);
        product.description && setSpecification(product.specification_infomation);
        if (Array.isArray(product.variants) && product.variants.length > 0 && newFormVR.length == 0) {
            product.variants.map((item, index) => {
                // const newArr = [...arrVariantProduct, item.id];

                // addFormVariant();
                // const newListFormVariant = [...newFormVR, { GB: '', data: [{ color: '', price: '', discount: '' }] }];
                newFormVR.push({ GB: '', data: [{ color: '', price: '', discount: '', idSubVr: '' }] });
                setFormVariant(newFormVR);
                // const newListFormSubVariant = [...newFormSubVR, [{ color: '', price: '', discount: '' }]];
                newFormSubVR.push([{ color: '', price: '', discount: '', idSubVr: '' }]);
                setFormSubVariant(newFormSubVR);
                arrVariantProduct.push(item.id);
                setArrvariantProduct([...arrVariantProduct]);
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
            });
        }

        // const [formSubVariant, setFormSubVariant] = useState([[{ color: '', price: '', discount: '' }]]);
        if (Array.isArray(product.dataVariants) && product.dataVariants.length > 0) {
            const newListFormSubVariant = [...formSubVariant];
            // const newListFormSubVariant = [];
            product.dataVariants.map((data, i) => {
                inputData.map((item, index) => {
                    // if (inputData[index].GB == data.variant_id) {
                    //     console.log('newListFormSubVariant', newListFormSubVariant);
                    //     // console.log('formSubVariant', formSubVariant[index]);
                    //     newListFormSubVariant[index] = [
                    //         ...formSubVariant[index],
                    //         { color: '', price: '', discount: '' },
                    //     ];
                    //     newListFormSubVariant[index].push({ color: '', price: '', discount: '' });
                    //     setFormSubVariant(newListFormSubVariant);
                    //     // const newListFormVariant = [...formVariant];
                    //     // newListFormVariant[index].data = newListFormSubVariant[index];
                    //     // setFormVariant(newListFormVariant);
                    //     console.log('newListFormSubVariant', newListFormSubVariant);
                    // }
                });
            });

            inputData.map((item, index) => {
                const listVByID = product.dataVariants.filter((variant) => {
                    return item.GB == variant.variant_id;
                });
                const tempArr = [];
                listVByID.map((data, i) => {
                    tempArr.push({ color: '', price: '', discount: '', idSubVr: '' });
                    newListFormSubVariant[index] = tempArr;
                    setFormSubVariant(newListFormSubVariant);
                    const newListFormVariant = [...formVariant];
                    newListFormVariant[index].data = newListFormSubVariant[index];
                    setFormVariant(newListFormVariant);

                    // Set Value
                    item.data[i].price = data.price;
                    item.data[i].color = data.color_id;
                    item.data[i].discount = data.discount;
                    item.data[i].idSubVr = data.product_variant_detail_id;
                });
            });
        }
    }, [arrVariantProduct]);

    const changeCategoryId = (e) => {
        const idCate = e.target.value;
        setCategory(idCate);
        const newListSubCate = listSubCategory.filter((item) => item.category_id == idCate && item.brand_id == brand);
        setNewSubListCategory(newListSubCate);
    };

    const changeBrandId = (e) => {
        const idBrand = e.target.value;
        setBrand(idBrand);
        const newListSubCate = listSubCategory.filter(
            (item) => item.category_id == category && item.brand_id == idBrand,
        );
        setNewSubListCategory(newListSubCate);
    };

    const handleShowFormListImg = () => {
        setShowImgTbl(true);
        setStatusImg(false);
    };

    const handleShowFormImg = () => {
        setShowImgTbl(true);
        setStatusImg(true);
    };

    const handleGetListImg = (img) => {
        setImage(img);
        setShowImgTbl(false);
    };

    const handleGetImg = (img) => {
        setUrlImage(...img);
        setShowImgTbl(false);
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            {showImgTbl && (
                <TableImage
                    closeForm={setShowImgTbl}
                    action={handleGetListImg}
                    actionOne={handleGetImg}
                    status={statusImg}
                />
            )}
            <div className="content__heading">
                <h2 className="content__heading--title">Cập nhật sản phẩm</h2>
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
                                <label htmlFor="imgProduct">Hình ảnh chính</label>
                            </div>
                            <div className="input__text list__img">
                                {urlImage ? (
                                    <div className="img__box" onClick={() => handleShowFormImg()}>
                                        <img className="img__box--item" src={urlImage} />
                                    </div>
                                ) : (
                                    <div className="img__choose" onClick={() => handleShowFormImg()}>
                                        Chọn ảnh...
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="imgProduct">Hình ảnh phụ (danh sách)</label>
                            </div>
                            <div className="input__text list__img">
                                {image ? (
                                    image?.map((data, index) => (
                                        <div className="img__box" onClick={() => handleShowFormListImg()}>
                                            <img className="img__box--item" src={data} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="img__choose" onClick={() => handleShowFormListImg()}>
                                        Chọn ảnh...
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="brandProduct">Thương hiệu</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="brandProduct"
                                    onChange={(e) => changeBrandId(e)}
                                    className="input__text--ctrl"
                                    value={brand}
                                    required
                                >
                                    <option>--Chọn danh thương hiệu--</option>
                                    {listBrand &&
                                        listBrand.map((item, index) => (
                                            <option key={index} value={item.id}>
                                                {item.brand_name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Danh mục sản phẩm</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    onChange={(e) => changeCategoryId(e)}
                                    className="input__text--ctrl"
                                    value={category}
                                    required
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
                                <label htmlFor="CateProduct">Danh mục chi tiết sản phẩm</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    required
                                    onChange={(e) => setSubCategoryId(e.target.value)}
                                    value={subCategoryId}
                                    className="input__text--ctrl"
                                >
                                    <option>--Chọn danh mục chi tiết sản phẩm--</option>
                                    {Array.isArray(newSubListCategory) &&
                                        newSubListCategory.map((item, index) => (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
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
                                <label htmlFor="ip-name">Thông số</label>
                            </div>
                            <CKEditor
                                editor={Editor}
                                data={specification}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setSpecification(data);
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
                                                                disabled={data.idSubVr}
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
                                                                onClick={(e) =>
                                                                    removeFormSubVarriant(i, index, data.idSubVr)
                                                                }
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
                            <button className="btn__form--ctrl">Cập nhật sản phẩm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
