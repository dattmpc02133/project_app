import classNames from 'classnames/bind';
import styles from '../../assets/scss/LoginUpdate.module.scss';
import { AiTwotoneTool } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
const cx = classNames.bind(styles);
function LoginUpdate() {

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
                            <h3>  <AiTwotoneTool className={cx('icon_setting')} />Cập nhật tài khoản  </h3>
                            </div>
                            <div className={cx('caterogy-name')}>
                                <h3><AiOutlineShoppingCart  className={cx('icon_shopping')}/> Các đơn đã đặt </h3>
                            </div>
                            </div>
                </div>
               </div>
               <div className={cx('l-9 m-6  c-12')}>  
               <div className={cx('info')}>
                   <div className={cx('info-group')}>
                   <h4 className={cx('type-name')} >Họ và tên</h4>
                    <input autocomplete="username" id="login__username" type="text" name="username" className={cx('form__input')} placeholder="VD: Nguyễn Văn A" required></input>
                    </div> 


                    <div className={cx('info-group')}>
                   <h4 className={cx('type-name')} >Chứng minh nhân dân</h4>
                    <input autocomplete="username" id="login__username" type="text" name="username" className={cx('form__input')} placeholder="VD: 123456789" required></input>
                    </div>

                    <div className={cx('info-group')}>
                   <h4 className={cx('type-name')} >Số điện thoại</h4>
                    <input autocomplete="username" id="login__username" type="text" name="username" className={cx('form__input')} placeholder="VD: 123456789" required></input>
                    </div>

                    <div className={cx('info-group')}>
                   <h4 className={cx('type-name')} >Ảnh</h4>
                    <input autocomplete="username" id="uploadfile" type="file" name="username" className={cx('form__inputfile')} required></input>
                    </div>
                
                        <div className={cx('adress')}>    <lable> 
                            <div className={cx('adress-s')}>
                            <h2> 23123123</h2>
                            <select id="cars">
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                    </select>
                          </div>
                          <div className={cx('adress-s')}>
                            <h2> 23123123</h2>
                            <select id="cars">
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                    </select>
                          </div>
                          <div className={cx('adress-s')}>
                            <h2> 23123123</h2>
                            <select id="cars">
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                    </select>
                          </div>
                          <div className={cx('adress-s')}>
                            <h2> 23123123</h2>
                            <select id="cars">
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                    </select>
                          </div>
                          </lable> </div>
                   
               </div>
               </div>
                
               
               </div>
           
         </div>
        </div>

       </section>
    </div>
);
}
export default LoginUpdate;