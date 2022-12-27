import classNames from 'classnames/bind';
import styles from '../../assets/scss/Insurance.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import footerApi from '../../api/footerApi';
const cx = classNames.bind(styles);

function Insurance() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    // const { state } = useLocation();
    // const contentId = state.items;
    const params = useParams();
    useEffect(() => {
        const getIdContents = async () => {
            try {
                const idContent = await footerApi.getIdContentClient(params.id);
                // console.log('content', idContent.data);
                setContent(idContent.data.content);
                setTitle(idContent.data.title);
            } catch (error) {
                console.log('lỗi lấy danh mục', error);
            }
        };
        getIdContents();
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-container')}>
                <div className={cx('wrapper-titles')}>
                    <h2 className={cx(title)}>{title}</h2>
                </div>
                <div className={cx('wrapper-content')}>
                    <p dangerouslySetInnerHTML={{ __html: content }}></p>
                </div>
            </div>
        </div>
    );
}
export default Insurance;
