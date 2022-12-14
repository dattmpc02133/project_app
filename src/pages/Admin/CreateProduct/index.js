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
import Modal from '~/components/Modal';
import TableImage from '~/components/TableImage';

const CreateProduct = () => {
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
    const [listSubCategory, setListSubCategory] = useState([]);
    //
    const [specification, setSpecification] = useState([]);
    // /
    const [listCategory, setListCategory] = useState([]);
    const [newSubListCategory, setNewSubListCategory] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState([]);
    const [listVariant, setListVariant] = useState([]);
    const [variant, setVariant] = useState([[]]);
    const [colorByVariant, setColorByVariant] = useState([]);
    const [priceByVariant, setPriceByVariant] = useState([]);
    const [discountByVariant, setDiscountByVariant] = useState([]);

    const [modal, setModal] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [messErr, setMessErr] = useState();
    //
    const [showImgTbl, setShowImgTbl] = useState(false);
    const [urlImage, setUrlImage] = useState();
    const [statusImg, setStatusImg] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const resultBrand = await brandApi.getAll();
                setListBrand(resultBrand.data);
                const resultColor = await colorApi.getAllClient();
                setListColor(resultColor.data);
                const resultSubCate = await subCateProductApi.getAll();
                setListSubCategory(resultSubCate.data);
                const resultCate = await cateProductApi.getAll();
                setListCategory(resultCate.data);
                const resultVariant = await variantApi.getAllClient();
                setListVariant(resultVariant.data);

                setLoading(false);
            } catch (error) {
                console.log('Failed to get data', error);
                setLoading(false);
            }
        };

        fetchData();
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
            url_image: urlImage,
            collection_images: image,
            specification_infomation: specification,
            subcategory_id: subCategoryId,

            variant_ids: variant,
            colors_by_variant_id: colorByVariant,
            prices_by_variant_id: priceByVariant,
            discount_by_variant_id: discountByVariant,
        };

        const createProduct = async () => {
            setLoading(true);
            try {
                const result = await productApi.create(data);
                setMessStatus(result.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
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
        // createProduct();
        console.log('Data', data);
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
    }, [formVariant, formSubVariant]);

    useEffect(() => {
        document.title = metaTitle;
    }, [metaTitle]);

    const addFormVariant = () => {
        const newListFormVariant = [...formVariant, { GB: '', data: [{ color: '', price: '', discount: '' }] }];
        setFormVariant(newListFormVariant);
        const newListFormSubVariant = [...formSubVariant, [{ color: '', price: '', discount: '' }]];
        setFormSubVariant(newListFormSubVariant);
    };

    const addFormSubVariant = (e, index) => {
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

    function is_numeric(str) {
        return /^\d+$/.test(str);
    }

    const handleChangeInputPrice = (valueInput, i, index) => {
        // console.log('valueInput', typeof);

        // if (is_numeric(valueInput.target.value)) {
        const inputData = [...formSubVariant];
        const newListFormVariant = [...formVariant];
        inputData[index][i].price = valueInput.target.value;
        setFormSubVariant(inputData);
        newListFormVariant[index].data = formSubVariant[index];
        setFormVariant(newListFormVariant);
        // }
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

    const formmatNumber = (number) => {
        if (number) {
            // console.log(Number(number).toLocaleString());
            // console.log(Number(number).toLocaleString());
            const xuli = number.replaceAll('.', '');
            number = xuli.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            console.log('number', number);
            return number;
        }
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
                <h2 className="content__heading--title">Th??m m???i s???n ph???m</h2>
                <p className="content__heading--subtitle">S???n ph???m</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form onSubmit={(e) => handleSubmit(e)} className="form__content">
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="nameProduct">T??n s???n ph???m</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={nameProduct}
                                    id="nameProduct"
                                    required
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="T??n s???n ph???m..."
                                    onChange={(e) => setNameProduct(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="metaTitle">Ti??u ????? sales</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={metaTitle}
                                    id="metaTitle"
                                    type="text"
                                    required
                                    className="input__text--ctrl"
                                    placeholder="Ti??u ????? sales..."
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="metaTitle">T??? kh??a t??m ki???m</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={metaKeywords}
                                    id="metaTitle"
                                    type="text"
                                    required
                                    className="input__text--ctrl"
                                    placeholder="T??? kh??a t??m ki???m..."
                                    onChange={(e) => setMetaKeywords(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="metaTitle">M?? t??? sales</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={metaDescription}
                                    id="metaTitle"
                                    type="text"
                                    required
                                    className="input__text--ctrl"
                                    placeholder="T??? kh??a t??m ki???m..."
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="imgProduct">H??nh ???nh ch??nh</label>
                            </div>
                            <div className="input__text list__img">
                                {urlImage ? (
                                    <div className="img__box" onClick={() => handleShowFormImg()}>
                                        <img className="img__box--item" src={urlImage} />
                                    </div>
                                ) : (
                                    <div className="img__choose" onClick={() => handleShowFormImg()}>
                                        Ch???n ???nh...
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="imgProduct">H??nh ???nh ph??? (danh s??ch)</label>
                            </div>
                            <div className="input__text list__img">
                                {image ? (
                                    image.map((data, index) => (
                                        <div className="img__box" onClick={() => handleShowFormListImg()}>
                                            <img className="img__box--item" src={data} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="img__choose" onClick={() => handleShowFormListImg()}>
                                        Ch???n ???nh...
                                    </div>
                                )}
                            </div>
                        </div>

                        {statusHandle == false && messErr.url_image ? (
                            <div className="mess__block">
                                <span className="messErrr">{messErr.url_image}</span>
                            </div>
                        ) : (
                            false
                        )}

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="brandProduct">Th????ng hi???u</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="brandProduct"
                                    onChange={(e) => changeBrandId(e)}
                                    className="input__text--ctrl"
                                    required
                                >
                                    <option>--Ch???n danh th????ng hi???u--</option>
                                    {Array.isArray(listBrand)
                                        ? listBrand.map((item, index) => (
                                              <option key={index} value={item.id}>
                                                  {item.brand_name}
                                              </option>
                                          ))
                                        : console.log('Ko ph???i Arr')}
                                </select>
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Danh m???c s???n ph???m</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    onChange={(e) => changeCategoryId(e)}
                                    className="input__text--ctrl"
                                    required
                                >
                                    <option>--Ch???n danh m???c s???n ph???m--</option>
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
                                <label htmlFor="CateProduct">Danh m???c chi ti???t s???n ph???m</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    required
                                    onChange={(e) => setSubCategoryId(e.target.value)}
                                    className="input__text--ctrl"
                                >
                                    <option>--Ch???n danh m???c chi ti???t s???n ph???m--</option>
                                    {Array.isArray(newSubListCategory)
                                        ? newSubListCategory.map((item, index) => (
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
                                <label htmlFor="ip-name">Th??ng s??? k??? thu???t</label>
                            </div>
                            <CKEditor
                                editor={Editor}
                                data="Th??ng s??? k??? thu???t..."
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setSpecification(data);
                                }}
                                required
                            />
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">M?? t??? s???n ph???m</label>
                            </div>
                            <CKEditor
                                editor={Editor}
                                data="N???i dung b??i vi???t t???i ????y..."
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setDescription(data);
                                }}
                                required
                            />
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Bi???n th??? s???n ph???m</label>
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
                                            <label htmlFor="ip-name">B??? nh??? s???n ph???m</label>
                                        </div>
                                        <div className="input__text">
                                            <select
                                                onChange={(e) => handleChangeinputGB(e, index)}
                                                className="input__text--ctrl"
                                                value={item.GB}
                                                required
                                            >
                                                <option>--Ch???n b??? nh??? s???n ph???m--</option>
                                                {Array.isArray(listVariant)
                                                    ? listVariant.map((item, index) => (
                                                          <option key={index} value={item.id}>
                                                              {item.variant_name}
                                                          </option>
                                                      ))
                                                    : false}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="input__block--item">
                                        <div className="input__block--label">
                                            <label htmlFor="ip-name">Bi???n th???</label>
                                        </div>
                                        <div className="input__block--content">
                                            {item.data.map((data, i) => (
                                                <div key={i} className="input__block--list">
                                                    <div className="input__block--check">
                                                        <div className="input__block--check-title">
                                                            <label htmlFor="">M??u s???c</label>
                                                        </div>
                                                        <div className="input__block--check-content">
                                                            <select
                                                                className="input__text--ctrl"
                                                                onChange={(e) => handleChangeInputColor(e, i, index)}
                                                                required
                                                                value={data.color}
                                                            >
                                                                <option value="">--Ch???n m??u s???n ph???m--</option>
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
                                                            <label htmlFor="">Gi?? ti???n</label>
                                                        </div>
                                                        <div className="input__block--check-content">
                                                            <input
                                                                type="number"
                                                                required
                                                                // value={formmatNumber(data.price)}
                                                                value={data.price}
                                                                min={0}
                                                                onChange={(e) => handleChangeInputPrice(e, i, index)}
                                                                className="input__block--check-ctrl"
                                                                placeholder="Gi?? ti???n s???n ph???m..."
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="input__block--check">
                                                        <div className="input__block--check-title">
                                                            <label htmlFor="">Gi???m gi?? (%)</label>
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
                                                                placeholder="Gi???m gi?? (%)"
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
                                                    onClick={(e) => addFormSubVariant(e, index)}
                                                >
                                                    <span>Th??m bi???n th??? ph???</span>
                                                    <GoPlus className="input__block--icon" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="btn__add--form-wp">
                                <div className="btn__add--form" onClick={addFormVariant}>
                                    <span>Th??m bi???n th??? m???i</span>
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
                            <button className="btn__form--ctrl">Th??m s???n ph???m</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
