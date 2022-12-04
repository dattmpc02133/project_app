import classNames from 'classnames/bind';
import styles from '../../assets/scss/Insurance.module.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import footerApi from '../../api/footerApi';
const cx = classNames.bind(styles);

function Insurance() {
    const [byIdContent, setBsyIdContent] = useState();

    const { state } = useLocation();
    const Search = useMemo(() => {
        return new URLSearchParams(state);
    }, [state]);
    // const { state } = useLocation();
    const CateID = Search.get('id');
    console.log(CateID);

    useEffect(() => {
        const getById = async () => {
            try {
                const byId = await footerApi.getByIdContent(CateID);
                setBsyIdContent(byId.data);
                console.log(byId.data);
            } catch (error) {
                console.log('Lỗi lấy id', error);
            }
        };
        getById();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-container')}>
                <div className={cx('wrapper-title')}>{/* <h1>{byIdContent.title}</h1> */}</div>
                <div className={cx('wrapper-content')}>
                    {/* <p dangerouslySetInnerHTML={{ __html: byIdContent.content }}></p> */}
                </div>
            </div>
        </div>
    );
}
export default Insurance;
