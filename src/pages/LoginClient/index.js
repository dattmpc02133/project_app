import classNames from 'classnames/bind';
import styles from '../../assets/scss/LoginClient.module.scss';
import { BiUserPin } from "react-icons/bi";
const cx = classNames.bind(styles);

function LoginClient() {
    return <div className={cx('wapper')}>
        <section>
     <div className={cx('grid')}>
        <div className={cx('grid wide')}>
        <div className={cx(' header col l-12 m-12 c-12')}> 
               <div className={cx('from')}>
               <h1 className={cx('big-title')}> Đăng kí tài khoản</h1>
            
                  <form  className={cx('form_login')}>
                     <label  className={cx('icon')}>
                       <BiUserPin className={cx('icons')}/> 
                    </label>  
                   <input autocomplete="username" id="login__username" type="text" name="username" className={cx('form__input')} placeholder="Vui lòng nhập số điện thoại" required></input>
                  </form>
            
                  <form  className={cx('form_login')}>
                   <button  type='submit' className={cx('submit')}>Đăng kí</button>
         
                  </form>
                  </div>
          
         </div>
      </div>
      </div>
      </section>
   </div>
           
        ;
}

export default LoginClient;