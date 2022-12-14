import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import style from '~/assets/scss/TableImage.module.scss';
import imageApi from '~/api/imageApi';
import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';
import ImageUpload from '~/components/ImageUpload';
import { RiCloseFill } from 'react-icons/ri';
const cx = classNames.bind(style);

const TableImage = ({ closeForm, action, actionOne, status }) => {
    const [listImage, setListImage] = useState();
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(1);
    const [upload, setUpload] = useState(false);
    const [listImg, setListImg] = useState([]);

    useEffect(() => {
        getImg();
    }, []);

    const getImg = async (params) => {
        setLoading(true);
        try {
            const result = await imageApi.getAll(params);
            setListImage(result.data);
            setPagination(result.paginator);
            setLoading(false);
        } catch (error) {
            console.log('Fail to get all images', error);
            setLoading(false);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            getImg(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pagination?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            getImg(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        getImg(`?page=${page}`);
    };

    const handleChangeTap = (page) => {
        setUpload(false);
        getImg();
    };

    const addImgToArrr = (path) => {
        console.log('status', status);
        if (status) {
            const newArr = [];
            newArr.push(path);
            setListImg([...newArr]);
        } else {
            if (Array.isArray(listImg) && listImg.length > 0) {
                const result = listImg.filter((item) => item === path);
                if (result.length > 0) {
                    const newArr = listImg.filter((item) => item != path);
                    setListImg([...newArr]);
                } else {
                    listImg.push(path);
                    setListImg([...listImg]);
                }

                // listImg.map((item, index) => {
                //     const tempArr = [...listImg];
                //     console.log('Số', item === path, index);
                //     if (item === path) {
                //         tempArr.splice(index, 1);
                //         console.log('Ảnh trùng', tempArr, index);
                //         setListImg(tempArr);
                //         return false;
                //     } else {
                //         tempArr.push(path);
                //         setListImg(tempArr);
                //         console.log('Ảnh mới', tempArr, index);
                //         return false;
                //     }
                // });
            } else {
                listImg.push(path);
                setListImg([...listImg]);
            }
        }
    };

    const handleSubmit = () => {
        // action(listImg);
        // state(listImg);
        if (status) {
            actionOne(listImg);
        } else {
            action(listImg);
        }
        console.log(status);
    };

    const getPathActive = (path) => {
        if (Array.isArray(listImg) && listImg.length > 0) {
            const result = listImg.filter((item, index) => item == path);
            if (result.length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            console.log('Không Phải mãng');
            return false;
        }
    };

    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}

            <div className={cx('content')}>
                <div className={cx('table__wrapper')}>
                    <div className={cx('table__heading')}>
                        <div className={cx('table__heading')}>
                            <div className={cx('table__heading--item')} onClick={handleChangeTap}>
                                <p>Danh sách hình ảnh</p>
                            </div>
                            <div className={cx('table__heading--item')} onClick={() => setUpload(true)}>
                                <p>Upload hình mới</p>
                            </div>
                        </div>

                        <div className={cx('table__heading--right')}>
                            <div className={cx('table__heading--btn')} onClick={() => handleSubmit()}>
                                <p>Chọn</p>
                            </div>
                            <div className={cx('table__heading--close')} onClick={() => closeForm(false)}>
                                <RiCloseFill className={cx('close__icon')} />
                            </div>
                        </div>
                    </div>

                    {!upload ? (
                        <div className={cx('table__content', 'grid')}>
                            <div className={cx('table__content--img', 'row')}>
                                {Array.isArray(listImage) &&
                                    listImage.map((item, index) => (
                                        <div
                                            key={index}
                                            className={cx('image__item', 'col l-2')}
                                            onClick={() => addImgToArrr(item.path)}
                                        >
                                            <img
                                                src={item.path}
                                                className={
                                                    getPathActive(item.path) == true
                                                        ? cx('image__item--img', 'active')
                                                        : cx('image__item--img')
                                                }
                                            />
                                        </div>
                                    ))}
                            </div>
                            <Pagination
                                curentPage={page}
                                totalPages={pagination?.totalPages}
                                handlePrevPage={handlePrevPage}
                                handleChangePage={handleChangePage}
                                handleNextPage={handleNextPage}
                            />
                        </div>
                    ) : (
                        <div className={cx('form__upload')}>
                            <ImageUpload />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TableImage;
