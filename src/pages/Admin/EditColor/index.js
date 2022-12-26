import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect } from 'react';
import colorApi from '~/api/colorApi';
import { useParams } from 'react-router-dom';
import Modal from '~/components/Modal';

function EditColor() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [nameColor, setNameColor] = useState([]);
    const [colorId, setColorId] = useState([]);
    


    const params = useParams();
    useEffect(() => {
        const getById = async () => {
            try {
                const byIdColor = await colorApi.getById(params.id);
                console.log(byIdColor);
              
                setNameColor(byIdColor.data.name);
                setColorId(byIdColor.data.color_code);
            } catch (error) {
                console.log('Lỗi màu theo id', error);
            }
        };
        getById();
    }, []);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = { 
            name: nameColor, 
            color_code: colorId,
            is_active: 1,
        }; 
        

        console.log('data', data);
        const EditColor = async () => {
            try {
                const result = await colorApi.update(data, params.id);
                setMessStatus(result.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
                setNameColor('');
                setColorId('');
            } catch (error) {
                console.log('Failed to Edit: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        EditColor();
    };


    // const handleChangeSelections = (id) => {
    //     setBrandsId(id);
    // };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Cập nhật màu sắc</h2>
                <p className="content__heading--subtitle">Cập nhật màu sắc</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSubmit(e)}>
              
                      
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên danh màu sắc</label>
                            </div>
                            <select hidden
                            is_active='0,1'
                            > </select>
                            <div className="input__text">
                                <input
                                    value={nameColor}
                                    // id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="VD: đỏ..."
                                    required
                                    onChange={(e) => setNameColor(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* )} */}
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name"> Màu sắc</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={colorId}
                                    // id="name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="1VD: #fff"
                                    required
                                    onChange={(e) => setColorId(e.target.value)}
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
                            <button className="btn__form--ctrl">Cập nhật màu sắc</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditColor;
