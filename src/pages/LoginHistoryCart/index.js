import classNames from 'classnames/bind';
import styles from '../../assets/scss/LoginHistoryCart.module.scss';
import { AiTwotoneTool } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";

const cx = classNames.bind(styles);
function LoginHistoryCart() {

    return(
    <div className={cx('wapper')}>
       <section>
       <div className={cx('grid')}>
         <h1 className='title-big'> Tài khoản khách hàng </h1>
            <div className={cx('grid wide')}>
            <div className={cx('row')}>
              
                     <div className={cx('l-3 m-12 c-12')}>  
                            <div className={cx('layout')}>
                                        <div className={cx('caterogy')}>
                                            <div className={cx('caterogy-name')}>
                                            <h3>  <AiTwotoneTool className={cx('icon_setting')} /> Cập nhật tài khoản  </h3>
                                            </div>
                                            <div className={cx('caterogy-name')}>
                                                <h3><AiOutlineShoppingCart  className={cx('icon_shopping')}/> Các đơn đã đặt </h3>
                                            </div>
                                        
                                            </div>
                                </div>
                     </div>



         
            
            <div className={cx(' shopping col l-2 m-3  c-3')}>  
                    
                            <div className={cx('history_group')}>  Mã hóa đơn </div> 
                            <div  className={cx('history_name')}>1</div>
                        
             </div>
                  
             <div className={cx(' shopping col l-2 m-3  c-3')}>  
                         
                            <div className={cx('history_group')}> Ngày mua hàng </div> 
                            <div  className={cx('history_name')}>Hồ Nhưt Huỳnh</div>
                        
             </div>
             <div className={cx(' shopping col l-2 m-3 c-3')}>  
                         
                            <div className={cx('history_group')}>  Tổng tiền</div> 
                            <div  className={cx('history_name')}>111.11</div>
                        
             </div>
             <div className={cx('shopping col l-2 m-3  c-3')}>  
                         
                            <div className={cx('history_group')}> Trạng thái </div> 
                            <div  className={cx('history_name')}>Đang giao hàng</div>
                        
             </div>
            

            
               </div>

         </div>
        </div>

       </section>
    </div>
);
}
export default LoginHistoryCart;