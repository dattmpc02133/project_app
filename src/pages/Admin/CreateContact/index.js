import { useEffect, useState } from 'react';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import footerApi from '~/api/footerApi';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Modal from '~/components/Modal';

import { CKEditor } from '@ckeditor/ckeditor5-react';

function CreateContact() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [dataselect, setDateSelect] = useState('');
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [contact, setContact] = useState([]);
    const [inputservice, setDataservice] = useState('');
    const [inputphone , setDataphone] = useState('');
    const [inputtime, setDatatime] = useState('');



    // console.log('Editor', editContent);
    console.log('id', dataselect);
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

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
      const data = {
        category_id: dataselect,
        name: inputservice,
        phone: inputphone,
        time: inputtime,
      
    };
      console.log('datas', data);
    const addContact = async () => {
        setLoading(true);
        try {
            const result = await footerApi.createContact(data); 
            setMessStatus(result.status);
            setStatusHandle(true);
            setModal(true);
            setLoading(false);
        } catch (error) {
            console.log('Thêm không thành công: ', error);
            const res = error.response.data;
            setMessStatus(res.message);
            setModal(true);
            setStatusHandle(false);
            setLoading(false);
        }
    };
    addContact();
    };
    

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm nội duy và chính sách</h2>
                <p className="content__heading--subtitle">Thêm nội duy và chính sách</p>
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
                                    onChange={(e) => setDateSelect(e.target.value)}
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


                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Dịch vụ </label>
                            </div>
                            <div className="input__text">
                               <input 
                               value={inputservice}
                               onChange= {(e)=> setDataservice(e.target.value)}
                                type="name"  className="input__text--ctrl" required="Vui lòng nhập số điện thoại hỗ trợ"
                                 />
                            </div>
                        </div>



                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Số điện thoại liên hệ</label>
                            </div>
                            <div className="input__text">
                               <input 
                               value={inputphone}
                               onChange = {(e) => setDataphone(e.target.value)}
                               type="name"  className="input__text--ctrl" required="Vui lòng nhập số điện thoại hỗ trợ" 
                               />
                            </div>
                        </div>



                        
                   



                           <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Giờ liên hệ</label>
                            </div>
                            <div className="input__text">
                               <input 
                                 value={inputtime}
                                 onChange = {(e) => setDatatime(e.target.value)}
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

export default CreateContact;
