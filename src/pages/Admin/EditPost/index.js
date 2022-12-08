import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import {Editor as ClassicEditor} from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Loading from '~/components/Loading';
import '~/assets/scss/admin/Content.scss';
import { useState, useEffect } from 'react';
import catePostApi from '~/api/catePostApi';
import postApi from '~/api/postApi';
import { useParams } from 'react-router-dom';
import Modal from '~/components/Modal';

const EditPost = () => {
    const [subsCategoiries, setSubCategories] = useState('');
    const [allSubs, setAllSubs] = useState([]);
    const [titlePost, setTitlePost] = useState('');
    const [describe, setDescribe] = useState('');
    const [titleMeta, setTitleMeta] = useState('');
    const [metaKeyWord, setMetaKeyWord] = useState('');
    const [imgPost, setImgPost] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState('');
    const params = useParams();
    useEffect(() => {
        const getAllSubs = async () => {
            try {
                const allSubs = await catePostApi.getAll();
                setAllSubs(allSubs.data);
            } catch (error) {
                console.log('Lỗi lấy subs', error);
            }
        };

        const getByIdPost = async () => {
            try {
                const byId = await postApi.get(params.id);
                console.log(byId);
                setSubCategories(byId.data.subcategory_id);
                setTitlePost(byId.data.title);
                setDescribe(byId.data.short_des);
                setImgPost(byId.data.image);
                setTitleMeta(byId.data.meta_title);
                setMetaKeyWord(byId.data.meta_keywords);
                setContent(byId.data.content_post);
                console.log('i', byId.data.content_post);
            } catch (error) {
                console.log('lỗi lấy danh id');
            }
        };
        getByIdPost();
        getAllSubs();
    }, []);

    const handleSummit = (e) => {
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
        const EditPost = async () => {
            setLoading(true);
            try {
                const post = await postApi.editPost(data, params.id);
                setMessage(post.message);
                setMessStatus(post.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
            } catch (error) {
                console.log('lỗi khi thêm', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        EditPost();
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Cập nhậtbài viết mới</h2>
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

                                    {allSubs?.map((item, index) =>
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
                                    value={describe}
                                    onChange={(e) => setDescribe(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Ảnh</label>
                            </div>
                            <div className="input__text">
                                <input
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tóm tắt"
                                    value={imgPost}
                                    onChange={(e) => setImgPost(e.target.value)}
                                />
                            </div>
                        </div>

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
                                    placeholder=""
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Nội dung bài viết</label>
                            </div>
                            <CKEditor
                                editor={Editor}
                                value={content}
                                data={content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                    setContent(data);
                                }}
                            />
                        </div>
                        <div className="btn__form">
                            <button className="btn__form--ctrl">Cập nhật tin tức mới</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
