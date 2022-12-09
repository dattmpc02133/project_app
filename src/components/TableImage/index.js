import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import style from '~/assets/scss/TableImage.module.scss';
import imageApi from '~/api/imageApi';
import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';
import ImageUpload from '~/components/ImageUpload';
import { RiCloseFill } from 'react-icons/ri';
const cx = classNames.bind(style);

const TableImage = ({ closeForm, action }) => {
    const [listImage, setListImage] = useState();
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(1);
    const [upload, setUpload] = useState(false);
    const [img, setImg] = useState();

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

                        <div className={cx('table__heading--close')} onClick={() => closeForm(false)}>
                            <RiCloseFill className={cx('close__icon')} />
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
                                            onClick={() => action(item.path)}
                                        >
                                            <img src={item.path} className={cx('image__item--img')} />
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
