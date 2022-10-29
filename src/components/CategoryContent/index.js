import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from '~/assets/scss/CategoryContent.module.scss';
import { ItemMenu } from '../../services/ApiServices';

const cx = classNames.bind(style);

function CategoryContent() {
    const newCategory = ItemMenu.map((index) => {
        return {
            path: index.path,
            image: index.image,
            title: index.title,
        };
    });
    newCategory.splice(6, 7);
    return (
        <div className={cx('warper-box-product')}>
            <div className={cx('wrap-container')}>
                {newCategory.map((category, index) => (
                    <Link to={category.path} className={cx('wrap-item')} key={index}>
                        <div className={cx('wrap-img-content')}>
                            <div className={cx('wrap-img-box')}>
                                <img src={category.image} className={cx('img-product')} />
                            </div>
                            <span>{category.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CategoryContent;
