import classNames from 'classnames/bind';
import styles from '../../assets/scss/TopCare.module.scss';
import SimpleSlider from '~/components/ListSlideStore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';      
const cx = classNames.bind(styles);
 



function TopCare() {
    return <div className={cx('wapper')}>
            <div className={cx('repair-service')}>
                <section>
                    <h2 className={cx('title-big')}>
                    Dịch vụ sửa chữa TopCare 
                    </h2> 
                        <div className={cx('grid wide')}>
                            <div className={cx('row')}>
                                <div className={cx('category col l-4 m-12 c-12')}> 
                                <div className={cx('category-item')}>
                                <img className=" lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/repair_service/iphone.png" width="200" height="200" alt="Dịch vụ sửa chữa iPhone tại TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/repair_service/iphone.png"></img>
                                    <h3>Sửa chữa iphone</h3>    
                                    <div className={cx('type-names')}>Rung | Loa ngoài | Màn hình</div>
                               <a className={cx('type-price')}href='' >Xem bảng giá</a>
                                </div>
                                </div>
                        

                                <div className={cx('category col l-4 m-12 c-12')}> 
                                <div className={cx('category-item')}>
                                <img class=" lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/repair_service/ipad.png" width="200" height="200" alt="Dịch vụ sửa chữa iPad tại TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/repair_service/ipad.png"></img>
                                    <h3>Sửa chữa Ipad</h3>    
                                    <div className={cx('type-names')}>Đổi máy</div>
                                <a className={cx('type-price')}href='' >Xem bảng giá</a>
                                </div>
                                </div>
                                
                                <div className={cx('category col l-4 m-12 c-12')}> 
                                <div className={cx('category-item')}>
                                <img class=" lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/repair_service/macbook.png" width="200" height="200" alt="Dịch vụ sửa chữa MacBook tại TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/repair_service/macbook.png"></img>
                                    <h3>Sửa chữa Macbook</h3>    
                                    <div className={cx('type-names')}>Pin Logic Board Bàn phím</div>
                                <a href='' >Xem bảng giá</a>
                                </div>
                                </div>

                                <div className={cx('category col l-4 m-12 c-12')}> 
                                <div className={cx('category-item')}>
                                <img class=" lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/repair_service/watch.png" width="200" height="200" alt="Dịch vụ sửa chữa Watch tại TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/repair_service/watch.png"></img>
                                    <h3>Sửa chữa Watch</h3>    
                                    <div className={cx('type-names')}>Đổi máy</div>
                                <a href='' >Xem bảng giá</a>
                                </div>
                                </div>


                                <div className={cx('category col l-4 m-12 c-12')}> 
                                <div className={cx('category-item')}>
                                <img class=" lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/repair_service/airpods.png" width="200" height="200" alt="Dịch vụ sửa chữa AirPods tại TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/repair_service/airpods.png"></img>
                                    <h3>Sửa chữa AirPods</h3>    
                                    <div className={cx('type-names')}>Đổi máy</div>
                                <a href='' className={cx('category-item')} >Xem bảng giá</a>
                                </div>
                                </div>
                            

        {/* 
                                <div className={cx('popup-container')} >
                                        <div className={cx('bg-overplay')}></div>
                                        <div className={cx('popup')}>
                                            <p>Bảng giá sửa chữa Aripods</p>
                                            <span className={cx('close')}></span>
                                                <div className={cx('type')}>
                                                <span className={cx('active')} data-id="23">Đổi máy</span>
                                                </div>
                                                <div className={cx('table-container active')} data-id="23">
                                                <table>
                                                    <tbody><tr>
                                                        <th>Dòng máy</th>
                                                        <th>Chi phí</th>
                                                    </tr>
                                                        <tr>
                                                            <td>AirPods Max</td>
                                                                <td>15.000.000₫</td>
                                                        </tr>
                                                    
                                                        
                                                </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>    */}

                                    
                            </div>
                        </div>
                        </section>
            </div>
         
            <div className={cx('why-chooses')}>
                   <section>
                <h2 className={cx('title-big')}>Lý do lựa chọn TopCare</h2>
                <div className={cx('grid wide')}>
                    <div className={cx('row')}>
                        <div className={cx('category col l-4 m-12 c-12')}> 
                                <div className={cx('category-item')}>
                            <div className={cx('why-chooses-item')}>
                            <img class="icon-1 lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_1.png" width="60" height="60" alt="Dịch vụ chính hãng Apple tại TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_1.png"></img>
                            <h3 className={cx('title')}>Chính hãng Apple</h3>
                            <p className={cx('info')}>
                                TopCare là trung tâm dịch vụ ủy quyền chính thức của Apple.
                                Tất cả linh kiện sửa chữa tại TopCare đều do Apple cung cấp chính hãng.
                            </p>
                             </div>
                              </div>
                        
                        
                        </div>

                        <div className={cx('category col l-4 m-12 c-12')}> 
                                <div className={cx('category-item')}>
                            <div className={cx('why-chooses-item')}>
                            <img class="icon-2 lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_2.png" width="60" height="60" alt="Nhân viên TopCare được cấp chứng chỉ Apple" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_2.png"></img>
                            <h3 className={cx('title')}>Chứng chỉ Apple</h3>
                            <p className={cx('info')}>
                               
                                100% đội ngũ chuyên viên và kỹ thuật viên của TopCare được đào tạo và cấp chứng chỉ bởi Apple.

                            </p>
                             </div>
                              </div>
                        
                        
                        </div>

                        <div className={cx('category col l-4 m-12 c-12')}> 
                                <div className={cx('category-item')}>
                            <div className={cx('why-chooses-item')}>
                            <img class="icon-1 lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_1.png" width="60" height="60" alt="Dịch vụ chính hãng Apple tại TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_3.png"></img>
                            <h3 className={cx('title')}>Bảo mật tuyệt đối</h3>
                            <p className={cx('info')}>
                                
                            Thông tin khách hàng cung cấp được bảo vệ nghiêm ngặt theo tiêu chuẩn kiểm soát cao nhất.
            
                            </p>
                             </div>
                              </div>
                        
                        
                        </div>

                        <div className={cx('category col l-4 m-12 c-12')}> 
                                <div className={cx('category-item')}>
                            <div className={cx('why-chooses-item')}>
                            <img class="icon-1 lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_1.png" width="60" height="60" alt="Dịch vụ chính hãng Apple tại TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_4.png"></img>
                            <h3 className={cx('title')}>Dịch vụ đẳng cấp</h3>
                            <p className={cx('info')}>
                            Với phương châm lấy khách hàng làm trọng tâm, TopCare cam kết mang đến chất lượng phục vụ vượt trội dành cho khách hàng.                            </p>
                             </div>
                              </div>
                        
                        
                        </div>

                        <div className={cx('category col l-4 m-12 c-12')}> 
                                <div className={cx('category-item')}>
                            <div className={cx('why-chooses-item')}>
                            <img class="icon-1 lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_1.png" width="60" height="60" alt="Dịch vụ chính hãng Apple tại TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_5.png"></img>
                            <h3 className={cx('title')}>Tiết kiệm  </h3>
                            <p className={cx('info')}>
                            TopCare thường xuyên có những chương trình ưu đãi giúp khách hàng tiết kiệm hơn khi sửa chữa sản phẩm.
                            </p>
                             </div>
                              </div>
                        
                        
                        </div>
                    </div>
                 </div>
            </section>
            </div>
            <div className={cx('accessories')}>
                <section>
                <h2 className={cx('title-big')}>Phụ kiện chính hãng Apple tại TopCare</h2>
                <div className={cx('grid wide')}>
                    <div className={cx('row')}>
                    <div className={cx('category col l-3 m-6 c-6')}> 
                    <div className={cx('accessory')}>
                    <div className={cx('accessory-item')}>
                        <img className={cx('ls-is-cached lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_1.png" width="150" height="150" alt="Tai nghe chinh hãng Apple" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_1.png"></img>
                        <h3 className={cx('title')}>Tai nghe</h3>
                    </div>
                    </div>
                    </div>

                    <div className={cx('category col l-3 m-6 c-6')}> 
                    <div className={cx('accessory')}>
                    <div className={cx('accessory-item')}>
                    <img class=" ls-is-cached lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_2.png" width="150" height="150" alt="Cáp, sạc chính hãng Apple" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_2.png"></img>
                        <h3 className={cx('title')}>Cáp | sạc</h3>
                    </div>
                    </div>
                    </div>

                    <div className={cx('category col l-3 m-6 c-6')}> 
                    <div className={cx('accessory')}>
                    <div className={cx('accessory-item')}>
                    <img class=" ls-is-cached lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_3.png" width="150" height="150" alt="Ốp lưng, bao da chính hãng Apple" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_3.png"></img>
                        <h3 className={cx('title')}>Ốp lưng | Bao da</h3>
                    </div>
                    </div>
                    </div>

                    <div className={cx('category col l-3 m-6 c-6')}> 
                    <div className={cx('accessory')}>
                    <div className={cx('accessory-item')}>
                    <img class=" ls-is-cached lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_4.png" width="150" height="150" alt="Dây Apple Watch chính hãng" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_4.png"></img>
                        <h3 className={cx('title')}>Dây Apple Watch</h3>
                    </div>
                    </div>
                    </div>
                    <div className={cx('category col l-3 m-6 c-6')}> 
                    <div className={cx('accessory')}>
                    <div className={cx('accessory-item')}>
                        <img className={cx('ls-is-cached lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_1.png" width="150" height="150" alt="Tai nghe chinh hãng Apple" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_5.png"></img>
                        <h3 className={cx('title')}>AirTag</h3>
                    </div>
                    </div>
                    </div>
                    <div className={cx('category col l-3 m-6 c-6')}> 
                    <div className={cx('accessory')}>
                    <div className={cx('accessory-item')}>
                        <img className={cx('ls-is-cached lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_1.png" width="150" height="150" alt="Tai nghe chinh hãng Apple" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_6.png"></img>
                        <h3 className={cx('title')}>Chuột | Trackpad</h3>
                    </div>
                    </div>
                    </div>
                    <div className={cx('category col l-3 m-6 c-6')}> 
                    <div className={cx('accessory')}>
                    <div className={cx('accessory-item')}>
                        <img className={cx('ls-is-cached lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_1.png" width="150" height="150" alt="Tai nghe chinh hãng Apple" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_7.png"></img>
                        <h3 className={cx('title')}>Apple TV</h3>
                    </div>
                    </div>
                    </div>
                    <div className={cx('category col l-3 m-6 c-6')}> 
                    <div className={cx('accessory')}>
                    <div className={cx('accessory-item')}>
                        <img className={cx('ls-is-cached lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_1.png" width="150" height="150" alt="Tai nghe chinh hãng Apple" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_8.png"></img>
                        <h3 className={cx('title')}>Bàn phím</h3>


                    </div>
                    </div>
                    </div>

      

                    
                    </div>
                    </div>
                    
                       
                    <p className={cx('note')}>Lưu ý: Các sản phẩm được trưng bày tại TopCare. Quý khách vui lòng đến và mua trực tiếp với nhiều khuyến mãi hấp dẫn.</p>  
                </section>
                
            </div>

            <div className={cx('warranty')}>
                <section>
                    <h2 className={cx('title-big')}>Quy trình bảo hành TopCare</h2>
                    <div className={cx('grid wide')}>
                    <div className={cx('row')}>
                            <div className={cx('category col l-2-4 m-12 c-12')}> 
                            <div className={cx('warranty-process')}>
                                <div className={cx('warranty-step')}>
                                <img class=" ls-is-cached lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_1.png" width="80" height="80" alt="Kiểm tra tổng quan trước sửa chữa" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_1.png"></img>
                                <h3>1. Kiểm tra tổng quan trước sửa chữa</h3>
                                </div>
                        </div> 
                    </div>


                    <div className={cx('category col l-2-4 m-12 c-12')}> 
                            <div className={cx('warranty-process')}>
                                <div className={cx('warranty-step')}>
                                <img class=" ls-is-cached lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_1.png" width="80" height="80" alt="Kiểm tra tổng quan trước sửa chữa" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_2.png"></img>
                                <h3>2. Đặt linh kiện    </h3>
                                </div>
                        </div> 
                    </div>


                    <div className={cx('category col l-2-4 m-12 c-12')}> 
                            <div className={cx('warranty-process')}>
                                <div className={cx('warranty-step')}>
                                <img class=" ls-is-cached lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_1.png" width="80" height="80" alt="Kiểm tra tổng quan trước sửa chữa" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_3.png"></img>
                                <h3>3. Sửa chữa | Thay thế</h3>
                                </div>
                        </div> 
                    </div>


                    <div className={cx('category col l-2-4 m-12 c-12')}> 
                            <div className={cx('warranty-process')}>
                                <div className={cx('warranty-step')}>
                                <img class=" ls-is-cached lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_1.png" width="80" height="80" alt="Kiểm tra tổng quan trước sửa chữa" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_4.png"></img>
                                <h3>4. Kiểm tra tổng quan sau sửa chữa</h3>
                                </div>
                        </div> 
                    </div>


                    <div className={cx('category col l-2-4 m-12 c-12')}> 
                            <div className={cx('warranty-process')}>
                                <div className={cx('warranty-step')}>
                                <img class=" ls-is-cached lazyloaded" data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_1.png" width="80" height="80" alt="Kiểm tra tổng quan trước sửa chữa" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_5.png"></img>
                                <h3>5. Trả sản phẩm</h3>
                                </div>
                        </div> 
                    </div>


                    </div> 
                    
                        </div>  
                        
                </section>
            </div>
            <div className={cx('introduce')}>
                <section>
                <h3 className={cx('tittle-big')}>TopCare Nguyễn Văn Luông - Đẳng cấp khác biệt</h3>
                <div className={cx('grid wide')}>
                    <div className={cx('row')}>
                    <div className={cx('category col l-12 m-12 c-12')}> 
                        <img classNane={cx('big-logo ls-is-cached lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/logo.png" width="469" height="164" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/logo.png"></img>
                        <p className={cx('info')}>
                        Tại TopCare Nguyễn Văn Luông, khách hàng yêu mến hệ sinh thái Apple sẽ trải nghiệm đầy đủ và đa dạng nhất các dịch vụ bảo hành chính hãng Apple từ iPhone, iPad đến những chiếc tai nghe AirPods... trong một không gian đẳng cấp và hiện đại.
                        </p>
               
                    </div>
                    </div>
                    
                </div>
                </section>

<div className={cx('slider')}>
 <SimpleSlider/>
 </div>


{/* roong */}
                <section>
                    <div className={cx('store')}>
                    <p className={cx('title-big')}>TopCare Nguyễn Văn Linh</p>
                    <div className={cx('grid wide')}>
                    <div className={cx('row')}>
                    <div className={cx('category col l-12 m-12 c-12')}> 
                    <div className={cx('store-address')}>
                    <img className={cx('ls-is-cached lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/icon_1.png" width="24" height="24" alt="Địa chỉ TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/icon_1.png"></img>
                    <div>
                        <p>
                            Số 249 Nguyễn Văn Luông, Phường 11, Quận 6, Thành phố Hồ Chí Minh.
                        </p>
                        <a className={cx('adress-map')}href="https://goo.gl/maps/zuFh7ESP6vGtAm6RA">Xem chỉ đường</a>
                    </div>
                    </div>
                    <div className={cx('store-time')}>
                    <div className={cx('store-address')}>
                        <img className={cx('ls-is-cached lazyloaded')} data-src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/icon_2.png" width="24" height="24" alt="Thời gian làm việc TopCare" src="//cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/icon_2.png"></img>
                        <ul>
                            <li>
                                T2 - T7: 8h - 20h (không nghỉ trưa)
                            </li>
                            <li>
                                Chủ Nhật: 8h - 17h (không nghỉ trưa)
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                </section>
            </div>
           
            
        <div className={cx('news')}>
            <section>
            <h2 className={cx('title-big')}>Tin tức TekZone</h2>
            <div className={cx('grid wide')}>
                    <div className={cx('row')}>
                    <div className={cx('category col l-12 m-12 c-12')}> 
{/*                 
                    <SimpleSlider/> */}
                    </div>
                    </div> 
                    </div>
            </section>
        </div>
               
    </div>          
        ;
}

export default TopCare;
