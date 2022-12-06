import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import {Editor as ClassicEditor} from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import '~/assets/scss/admin/Content.scss';

const EditPost = () => {
    return (
        <div className="wrapper">
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm bài viết mới</h2>
                <p className="content__heading--subtitle">Bài viết</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content">
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tiêu đề bài viết</label>
                            </div>
                            <div className="input__text">
                                <input
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tiêu đề bài viết..."
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Danh mục tin tức</label>
                            </div>
                            <div className="input__text">
                                <select className="input__text--ctrl">
                                    <option value="">Chọn danh mục</option>
                                </select>
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Danh mục chi tiết</label>
                            </div>
                            <div className="input__text">
                                <select className="input__text--ctrl">
                                    <option value="">Chọn danh mục chi tiết</option>
                                </select>
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Nội dung bài viết</label>
                            </div>
                            <CKEditor
                                editor={Editor}
                                data="Nội dung bài viết tại đây..."
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
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

export default EditPost;
