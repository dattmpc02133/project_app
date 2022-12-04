import classNames from 'classnames/bind';
import styles from '../../assets/scss/LoginUser.module.scss';

const cx = classNames.bind(styles);
function LoginUser() {

    return(
    <div className={cx('wapper')}>
       <section>
       <div className={cx('grid')}>
         <h1 className='title-big'> Tài khoản khách hàng </h1>
            <div className={cx('grid wide')}>
            <div className={cx('row')}>
              
                     <div className={cx('l-3 m-6 c-12')}>  
               <div className={cx('layout')}>
                        <div className={cx('caterogy')}>
                            <div className={cx('caterogy-name')}>
                                <h3> Cập nhật tài khoản  </h3>
                            </div>
                            <div className={cx('caterogy-name')}>
                                <h3> Cập nhật tài khoản  </h3>
                            </div>
                            <div className={cx('caterogy-name')}>
                                <h3> Cập nhật tài khoản  </h3>
                            </div>
                            <div className={cx('caterogy-name')}>
                                <h3> Cập nhật tài khoản  </h3>
                            </div>
                            </div>
                </div>
               </div>
               <div className={cx('l-9 m-6  c-12')}>  
               <div className={cx('info')}>
                   <div className={cx('info-group')}>
                   <h4 className={cx('type-name')} > hoj vaf ten</h4>
                    <input autocomplete="username" id="login__username" type="text" name="username" className={cx('form__input')} placeholder="Vui lòng nhập số điện thoại" required></input>
                    </div> 


                    <div className={cx('info-group')}>
                   <h4 className={cx('type-name')} > hoj vaf ten</h4>
                    <input autocomplete="username" id="login__username" type="text" name="username" className={cx('form__input')} placeholder="Vui lòng nhập số điện thoại" required></input>
                    </div>

                    <div className={cx('info-group')}>
                   <h4 className={cx('type-name')} > hoj vaf ten</h4>
                    <input autocomplete="username" id="login__username" type="text" name="username" className={cx('form__input')} placeholder="Vui lòng nhập số điện thoại" required></input>
                    </div>

                    <div className={cx('info-group')}>
                   <h4 className={cx('type-name')} > hoj vaf ten</h4>
                    <input autocomplete="username" id="login__username" type="text" name="username" className={cx('form__input')} placeholder="Vui lòng nhập số điện thoại" required></input>
                    </div>
               </div>
               </div>
                
               
               </div>
           
         </div>
        </div>

       </section>
    </div>
);
}
export default LoginUser;