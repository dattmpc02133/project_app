import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from '~/assets/scss/SubCategoryProduct.module.scss';
import { useState } from 'react';
import { subCategoryProduct } from '../../services/ApiServices';
const cx = classNames.bind(style);
const SubCategoryProduct = () => {
    const [select, SetSelect] = useState();
    const handleSelect = () => {
        SetSelect(!select);
    };
    return (
        <div className={cx('menuByCategory')}>
            <div className={cx('ft-Category')}>
                {subCategoryProduct.map((item) => (
                    <Link className={cx('item-Link')} key={item.id}>
                        {item.name}
                    </Link>
                ))}
            </div>
            <div className={cx('ft-sort')}>
                <div className={cx('sortOder')} onClick={handleSelect}>
                    Xếp theo: Mới ra mắt
                </div>
                <ul style={{ display: select ? 'block ' : 'none' }}>
                    <li>
                        <a>
                            <span>Mới ra mắt</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>Bán chạy</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>Giá thấp đến cao</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>Giá cao đến thấp</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SubCategoryProduct;
