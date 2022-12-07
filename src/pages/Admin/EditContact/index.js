import { useEffect, useState } from 'react';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import footerApi from '~/api/footerApi';
import Modal from '~/components/Modal';
import { useParams } from 'react-router-dom';

function EditContact() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [getById, setGetById] = useState();
    const [allContact, setAContact] = useState('');
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [inputtime , setInputTime] = useState('');
    const [dataSelect , setDataSelect] = useState('');
    const [inputservice , setInputService] = useState('');
    const [inputphone , setInputPhone] = useState('');
    const [contact, setContact] = useState([]);
    const params = useParams();

    
    console.log('id', dataSelect );
    console.log('service', inputservice );
    console.log('phone', inputphone );
    console.log('time', inputtime );  

    useEffect(() => {
        const getAllContact = async ()=> {
            try {
                const allContact = await footerApi.getAll();
                setContact(allContact.data);
                console.log(allContact.data);
            } catch (error) {
                console.log('lỗi lấy danh mục không thành công', error);
            }

        };
        getAllContact();
    }, []);
    useEffect(() => {
        const getIDContact = async ()=> {
            try {
                const byIdContact = await footerApi.getIdContact(params.id);
                setGetById(byIdContact.data);
                setDataSelect(byIdContact.data.category_id);
                console.log(byIdContact.data.category_id);
                setInputService(byIdContact.data.name);
                setInputPhone(byIdContact.data.phone);
                setInputTime(byIdContact.data.time);
                console.log(byIdContact.data);
            } catch (error) {
                console.log('lỗi lấy danh mục không thành công', error);
            }

        };
        getIDContact();
    }, []);



    useEffect(()=> {});
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = {
            category_id: dataSelect,
            name: inputservice,
            phone: inputphone,
            time: inputtime,
        };
        console.log('data', data);
        
        const updateContact = async () => {
            try {
                const result = await footerApi.updateContact(data, params.id);
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
        updateContact();
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
                                    value={dataSelect}
                                    onChange={(e) => setDataSelect(e.target.value)}
                                >
                                    <option value="0" selected>
                                        Chọn danh mục
                                    </option>

                                    {contact.map((item, index) => (
                                        <option key={index} value={item.id} >
                                            {item.name}
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




                        
                                    
                        {/* {message && typeof message == 'string' ? (
                            <div className="input__group">
                                <span className={('input__group--mess', 'suscess')}>{message}</span>
                            </div>
                        ) : (
                            false
                        )} */}
                     
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
