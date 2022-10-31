import classNames from "classnames/bind";
import styles from '../../assets/scss/TekZone.module.scss';
import '../../assets/scss/Grid.scss';
import images from "../../assets/images";
const cx = classNames.bind(styles);

function TekZone()
{
    return (
        <div className={cx('wrapper')}>
            <div className={cx('tekzone')}>
                <div className={cx('tekzone__imgtitle', "row", "no-gutters")}>

                    <div className={cx('tekimg-one', "c-8")}>
                        <div className={cx('tekzone-img')}>
                            <img className={cx('itemsl')} src={images.tekzone__1} alt="iphone12 " />
                        </div>

                    </div>

                    <div className={"c-4"} >
                        <div className={cx('tekimg-tow')}>
                            <div className={cx('tekzone-img')}>
                                <img className={cx('items1')} src={images.tekzone__2} alt="iphone12 " />
                            </div>
                        </div>

                        <div className={cx('tekimg-tow')}>
                            <div className={cx('tekzone-img')}>
                                <img className={cx('items2')} src={images.tekzone__3} alt="iphone12 " />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default TekZone;
