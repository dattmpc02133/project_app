import { useEffect, useState } from 'react';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import footerApi from '~/api/footerApi';
import Modal from '~/components/Modal';
import { useParams } from 'react-router-dom';
function EditContact() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [inputtime , setInputTime] = useState('');
    const [dataselect , setSelected] = useState('');
    const [inputservice , setInputService] = useState('');
    const [inputphone , setInputPhone] = useState('');
    const [cateContact, setContact] = useState([]);
    const params = useParams();
    

    useEffect(() => {
        const getIDContact = async ()=> {
                    try {
                        const byIdFooter = await footerApi.getIdContact(params.id);
                      
                        setSelected(byIdFooter.data.id=1);
                        setInputService(byIdFooter.data.name);
                        setInputPhone(byIdFooter.data.phone);
                        setInputTime(byIdFooter.data.time);
                        console.log('lay cac dichh vu',byIdFooter.data);
                        console.log('lay id' ,byIdFooter.data.id=1);
                    } catch (error) {
                        console.log('lỗi lấy danh mục không thành công', error);
                    }

                };
                const getAllContact = async ()=> {
                    try {
                        const Contact = await footerApi.getAll();
                        setContact(Contact.data);
                        console.log('tat ca danh muc',Contact.data);
                    } catch (error) {
                        console.log('lỗi lấy danh mục không thành công', error);
                    }

                };

        getAllContact();
        getIDContact();
    }, []);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = {
            category_id: dataselect,
            name: inputservice,
            phone: inputphone,
            time: inputtime,   };
        console.log('data', data);
        const updateContacts = async () => {
            try {
                const result = await footerApi.updateContacts(data, params.id);
                setMessStatus(result.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
                
            } catch (error) {
                console.log('update không thành công', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setModal(true);
                setStatusHandle(false);
                setLoading(false);
            }
        };
        updateContacts();
    };

    

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Sửa thông tin liên hệ </h2>
                <p className="content__heading--subtitle">Sửa thông tin liên hệ</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSubmit(e)}>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Danh mục Footer content</label>
                            </div>
                            
                               

                            <div className="input__text">
                                <select
                                    className="input__text--ctrl"
                                    value={dataselect}
                                    onChange={(e) => setSelected(e.target.value)}
                                >
                                    <option value="0" >
                                        Chọn danh mục
                                    </option>

                                    {cateContact.map((data, index) => (
                                        <option key={index} value={data.id} selected>
                                            {data.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            </div>
                        

                        {message && typeof message == 'string' ? (
                            <div className="input__group">
                                <span className={('input__group--mess', 'suscess')}>{message}</span>
                            </div>
                        ) : (
                            false
                        )}
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Dịch vụ </label>
                            </div>
                            <div className="input__text">
                               <input 
                               value={inputservice}
                               onChange= {(e)=> setInputService(e.target.value)}
                                type="name"  className="input__text--ctrl" required="Vui lòng nhập số điện thoại hỗ trợ"
                                 />
                            </div>
                        </div>
                        


                        {message && typeof message == 'string' ? (
                            <div className="input__group">
                                <span className={('input__group--mess', 'suscess')}>{message}</span>
                            </div>
                        ) : (
                            false
                        )}
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Số điện thoại liên hệ</label>
                            </div>
                            <div className="input__text">
                               <input 
                               value={inputphone}
                               onChange = {(e) => setInputPhone(e.target.value)}
                               type="number"  className="input__text--ctrl" required="Vui lòng nhập số điện thoại hỗ trợ" 
                               />
                            </div>
                        </div>
                        
         
                   
                        {message && typeof message == 'string' ? (
                            <div className="input__group">
                                <span className={('input__group--mess', 'suscess')}>{message}</span>
                            </div>
                        ) : (
                            false
                        )}


                           <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Giờ liên hệ</label>
                            </div>
                            <div className="input__text">
                               <input 
                                 value={inputtime}
                                 onChange = {(e) => setInputTime(e.target.value)}
                                 type="name"  className="input__text--ctrl" required="Vui lòng nhập số điện thoại hỗ trợ" 
                                  />
                            </div>
                        </div>            




                        
                                    
                        {message && typeof message == 'string' ? (
                            <div className="input__group">
                                <span className={('input__group--mess', 'suscess')}>{message}</span>
                            </div>
                        ) : (
                            false
                        )}
                     
                        <div className="btn__form">
                            <button className="btn__form--ctrl">Thêm danh mục</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditContact;
