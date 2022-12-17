import { useEffect, useState } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import {Editor as ClassicEditor} from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '~/assets/scss/admin/Content.scss';
import Modal from '~/components/Modal';
import postsApi from '~/api/postApi';
import catePostApi from '~/api/catePostApi';
import Loading from '~/components/Loading';
import TableImage from '~/components/TableImage';

const CreatePost = () => {
    const [subsCategoiries, setSubCategories] = useState('');
    const [allSubs, setAllSubs] = useState([]);
    const [titlePost, setTitlePost] = useState('');
    const [describe, setDescribe] = useState('');
    const [titleMeta, setTitleMeta] = useState();
    const [metaKeyWord, setMetaKeyWord] = useState('');
    const [imgPost, setImgPost] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState('');
    const [showImgTbl, setShowImgTbl] = useState(false);
    const [statusImg, setStatusImg] = useState();

    useEffect(() => {
        const getAllSubs = async () => {
            try {
                const allSubs = await catePostApi.getAll();
                setAllSubs(allSubs.data.data);
                console.log(allSubs.data.data);
            } catch (error) {
                console.log('Lỗi lấy subs', error);
            }
        };
        getAllSubs();
    }, []);

    const handleSummit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = {
            subcategory_id: subsCategoiries,
            title: titlePost,
            short_des: describe,
            image: imgPost,
            meta_title: titleMeta,
            meta_keywords: metaKeyWord,
            content_post: content,
        };

        console.log('data', data);
        const createPost = async () => {
            try {
                const post = await postsApi.createPost(data);
                setMessStatus(post.status);
                setMessage(post.message);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);

                setSubCategories('');
                setTitlePost('');
                setDescribe('');
                setImgPost('');
                setTitleMeta('');
                setMetaKeyWord('');
                setContent('');
            } catch (error) {
                console.log('lỗi khi thêm', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        createPost();
    };

    const handleShowFormListImg = () => {
        setShowImgTbl(true);
        setStatusImg(false);
    };

    const handleShowFormImg = () => {
        setShowImgTbl(true);
        setStatusImg(true);
    };

    const handleGetImg = (img) => {
        setImgPost(...img);
        setShowImgTbl(false);
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            {showImgTbl && <TableImage closeForm={setShowImgTbl} actionOne={handleGetImg} status={statusImg} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm bài viết mới</h2>
                <p className="content__heading--subtitle">Bài viết</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSummit(e)}>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Danh mục chi tiết</label>
                            </div>
                            <div className="input__text">
                                <select
                                    className="input__text--ctrl"
                                    value={subsCategoiries}
                                    onChange={(e) => setSubCategories(e.target.value)}
                                >
                                    <option value="">Chọn danh mục chi tiết</option>

                                    {allSubs?.map((item) =>
                                        item?.subs?.map((items, i) => (
                                            <option key={i} value={items.id}>
                                                {items.name}
                                            </option>
                                        )),
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tiêu đề bài viết</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={titlePost}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tiêu đề bài viết..."
                                    required
                                    onChange={(e) => setTitlePost(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tóm tắt</label>
                            </div>
                            <div className="input__text">
                                <input
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tóm tắt"
                                    required
                                    value={describe}
                                    onChange={(e) => setDescribe(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="imgProduct">Hình ảnh </label>
                            </div>
                            <div className="input__text list__img">
                                {imgPost ? (
                                    <div className="img__box" onClick={() => handleShowFormImg()}>
                                        <img className="img__box--item" src={imgPost} />
                                    </div>
                                ) : (
                                    <div className="img__choose" onClick={() => handleShowFormImg()}>
                                        Chọn ảnh...
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* {statusHandle == false && messErr.url_image ? (
                            <div className="mess__block">
                                <span className="messErrr">{messErr.url_image}</span>
                            </div>
                        ) : (
                            false
                        )} */}

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tiêu đề meta</label>
                            </div>
                            <div className="input__text">
                                <input
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    value={titleMeta}
                                    onChange={(e) => setTitleMeta(e.target.value)}
                                    placeholder="Tóm tắt"
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Meta Keywords</label>
                            </div>
                            <div className="input__text">
                                <input
                                    id="ip-name"
                                    type="text"
                                    value={metaKeyWord}
                                    onChange={(e) => setMetaKeyWord(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="Từ khóa tìm kiếm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Nội dung bài viết</label>
                            </div>
                            <CKEditor
                                editor={Editor}
                                data="Nội dung bài viết tại đây"
                                required
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                    setContent(data);
                                }}
                            />
                        </div>
                        <div className="btn__form">
                            <button className="btn__form--ctrl">Thêm tin tức mới</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
