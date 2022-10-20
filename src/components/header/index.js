import classNames from 'classnames/bind';
import images from '../../assets/images';
import styles from './header.module.scss';
import { CiSearch, CiShoppingBasket } from "react-icons/ci";
const cx = classNames.bind(styles)
function Header() {
  const ItemMenu =  [
    {
      title: 'iPhone',
    },
    {
      title: 'Mac',
    },
    {
      title: 'iPad',
    },
    {
      title: 'Watch',
    },
    {
      title: 'Âm thanh',
    },
    {
      title: 'Phụ kiện',
    },
    {
      title: 'TekZone',
    },
    {
      title: 'TopCare',
    },
  ]
    return ( 
        <div className={cx('header')}>
          <div className={cx('head')}>
            {/* Logo */}
                <div className={cx('logo-personal')}>
                    <a href="#">
                      <img className={cx('personal-logo')}
                      src={images.logo} alt="Logo"/>
                    </a>
                    <a href="#">
                      <img className={cx('personal_auth-logo')}
                      src={images.logo2} alt="Logo"/>
                    </a>
                </div>
                {/* Menu */}
                <ul className={cx('menu')}>
                  {ItemMenu.map((data,index)=> (
                        <li className={cx('menu-item')} key={index}>
                        <a href="#" className={cx('menu-link')}>
                            <span>
                              {data.title}
                            </span>
                        </a>
                        </li>
                  ))}
                </ul>
                {/* search + cart */}
                <div className={cx('search-cart')}>
                      <div className={cx('search-product')}>
                      <CiSearch className={cx('icon-search')} />
                      </div>
                      <div className={cx('cart-product')}>
                      <CiShoppingBasket className={cx('icon-cart')} />
                      </div>
                </div>
          </div>
        </div>
     );
}

export default Header;