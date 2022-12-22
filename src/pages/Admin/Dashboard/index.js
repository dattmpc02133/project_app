
import dashboardApi from '~/api/dashboardApi';
import style from '~/assets/scss/admin/DashBoard.module.scss';
import classNames from 'classnames/bind';
import { useState,useEffect } from 'react';
const cx = classNames.bind(style);

const Dashboard = () => {
    const [dashBoardTotal,setDashBoardTotal] = useState()
    useEffect(()=>{

        const FechDashboard = async (params) => {
            try {
                const respon = await dashboardApi.get();
                setDashBoardTotal(respon)
            } catch (error) {
                console.log('Lỗi lất tin tức', error);
            }
        };
        FechDashboard()
    },[])
    console.log("dashBoardTotal",dashBoardTotal);
    return ( 
      
      
           <div className={cx('wapper')}>
       
            <div className={cx('dashboard')}>
                
            <div className="content__heading">
              
                <h2 className="content__heading--title">DashBoard</h2>
                <p className="content__heading--subtitle">Thống kê</p>
            </div>

           <div className={cx('row')}>
            <div className={cx('box')}>
              <div className={cx('box-category')}>Total Cagegory  </div>
              <div className={cx('box-content')}>{dashBoardTotal?.data_total_categories}</div>
              <div className={cx('box-view')}>Chi tiết</div>
                
            </div>
            <div className={cx('box-post')}>
              
              <div className={cx('box-category')}>Total Post  </div>
              <div className={cx('box-content')}>{dashBoardTotal?.data_total_posts}</div>
              <div className={cx('box-view')}>Chi tiết</div>
                
            </div>
            <div className={cx('box-user')}>
              <div className={cx('box-category')}>Total User  </div>
              <div className={cx('box-content')}>{dashBoardTotal?.data_total_user}</div>
              <div className={cx('box-view')}>Chi tiết</div>
                
            </div>
            <div className={cx('box-admin')}>
              <div className={cx('box-category')}>Total Amdin  </div>
              <div className={cx('box-content')}>{dashBoardTotal?.data_total_admin  }</div>
              <div className={cx('box-view')}>Chi tiết</div>
                
            </div>
            <div className={cx('box-product')}>
              <div className={cx('box-category')}>Total Product  </div>
              <div className={cx('box-content')}>{dashBoardTotal?.data_total_product}</div>
              <div className={cx('box-view')}>Chi tiết</div>
                
            </div>
            <div className={cx('box-revenue')}>
              <div className={cx('box-category')}>Total Revenue  </div>
              <div className={cx('box-content')}>{dashBoardTotal?.data_total_revenue}</div>
              <div className={cx('box-view')}>Chi tiết</div>
                
            </div>
    
            </div>
            </div>
           </div>
      
    



     );
};
 
export default Dashboard;