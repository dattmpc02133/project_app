import { useEffect, useState } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import {Editor as ClassicEditor} from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '~/assets/scss/admin/Content.scss';
import Modal from '~/components/Modal';
import postsApi from '~/api/postApi';
import catePostApi from '~/api/catePostApi';
import Loading from '~/components/Loading';

const CreateCatePost = () => {
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

    useEffect(() => {
        const getAllSubs = async () => {
            try {
                const allSubs = await catePostApi.getAll();
                setAllSubs(allSubs.data);
                console.log(allSubs.data);
            } catch (error) {
                console.log('Lỗi lấy subs', error);
            }
        };
        getAllSubs();
    }, []);
    console.log('subs', subsCategoiries);
    console.log('title', titlePost);
    console.log('describe', describe);
    console.log('imgpost', imgPost);
    console.log('titlemeta', titleMeta);
    console.log('content', content);

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
                console.log(post);
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

    return (
        <div className="wrapper">
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
                                data="Nội dung bài viết tại đây"
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

export default CreateCatePost;
