import { createContext, useState, useEffect } from 'react';
import cartApi from '~/api/cartApi';
export const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
    const [listCart, setListCart] = useState(null);
    const [listProDettails, setListProDettails] = useState([]);
    const [loading, setLoading] = useState(true);
    //
    const [modal, setModal] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();

    const getCart = async () => {
        setLoading(true);
        // setListProDettails([]);
        try {
            const resultCart = await cartApi.getAll();
            setListCart(resultCart.data);
            // console.log('listProDettails', listProDettails);
            // if (listProDettails.length == 0) {
            const tempList = [];
            resultCart.data?.details?.map((item) => {
                const propertiesProduct = {
                    product_id: item.product_id,
                    quantity: item.quantity,
                    variant_id: item.variant_id,
                    color_id: item.color_id,
                    price: item.price,
                };

                tempList.push(propertiesProduct);
                // console.log('listProDettails--Map', listProDettails);
                setListProDettails(tempList);
            });
            // }

            setLoading(false);
        } catch (error) {
            // console.log('Failed to get Cart', error);
            setListCart([]);
            setLoading(false);
        }
    };

    const objDataAd = localStorage.getItem('token');
    useEffect(() => {
        if (objDataAd != null) {
            // navigate('/login');
            getCart();
        } else {
            getCart();
        }
    }, [objDataAd]);

    const handleChangeVariantId = (idVariant, index) => {
        console.log(idVariant);
        if (listCart?.details != undefined) {
            const inputData = [...listProDettails];
            inputData[index].variant_id = idVariant;
            inputData[index].color_id = '';
            setListProDettails(inputData);
        }
    };

    const updateCart = async (data) => {
        setLoading(true);
        try {
            const result = await cartApi.update(data);
            await getCart();
            setLoading(false);
        } catch (error) {
            console.log('Failed to update cart', error);
            setLoading(false);
        }
    };

    const handleChangeColor = (idColor, index) => {
        if (listCart?.details != undefined) {
            const inputData = [...listProDettails];
            inputData[index].color_id = idColor;
            setListProDettails(inputData);

            const data = { ...listCart };
            data.details = listProDettails;
            updateCart(data);
        }
    };

    const handlePlusNumPro = (index) => {
        if (listCart?.details != undefined) {
            const inputData = [...listProDettails];
            inputData[index].quantity = Number(inputData[index].quantity) + 1;
            setListProDettails(inputData);

            const data = { ...listCart };
            data.details = listProDettails;
            updateCart(data);
        }
    };

    const handlePrevNumPro = (index) => {
        if (listCart?.details != undefined) {
            const inputData = [...listProDettails];
            if (Number(inputData[index].quantity) >= 1) {
                inputData[index].quantity = Number(inputData[index].quantity) - 1;
                setListProDettails(inputData);
                const data = { ...listCart };
                data.details = listProDettails;
                updateCart(data);
            }
        }
    };

    const deleteCartItem = async (listIdDelete) => {
        setLoading(true);
        try {
            const result = await cartApi.delete(
                listIdDelete.current.idPro,
                listIdDelete.current.idVar,
                listIdDelete.current.idColor,
            );
            // setListProDettails([]);
            setMessStatus(result.message);
            setStatusHandle(true);
            setModal(true);
            getCart();
            setLoading(false);
        } catch (error) {
            console.log('Failed to delete cart: ', error);
            const res = error.response;
            setMessStatus(res.message);
            setLoading(false);
            setModal(true);
            setStatusHandle(false);
        }
    };

    // const payCOD = async (data) => {
    //     setLoading(true);
    //     try {
    //         const result = await cartApi.payCOD(data);
    //         deleteCart();
    //         setMessStatus(result.message);
    //         setStatusHandle(true);
    //         setModal(true);
    //         setLoading(false);
    //     } catch (error) {
    //         console.log('Failed to pay: ', error);
    //         const res = error.response.data;
    //         setMessStatus(res.message);
    //         setLoading(false);
    //         setModal(true);
    //         setStatusHandle(false);
    //     }
    // };

    const deleteCart = async () => {
        setLoading(true);
        try {
            const result = await cartApi.deleteAll();
            getCart();
            console.log(result);
            setLoading(false);
        } catch (error) {
            console.log('Failed to delete: ', error);
            setLoading(false);
        }
    };

    const addToCart = async (data) => {
        setLoading(true);
        try {
            const result = await cartApi.addCart(data);
            // listProDettails = [];
            getCart();
            setLoading(false);
            setMessStatus(result.message);
            setStatusHandle(true);
            setModal(true);
        } catch (error) {
            console.log('Failed to add to cart: ', error);
            const res = error.response.data;
            setMessStatus(res.message);
            setLoading(false);
            setModal(true);
            setStatusHandle(false);
        }
    };

    const value = {
        getCart,
        addToCart,
        listCart,
        setListCart,
        listProDettails,
        handleChangeVariantId,
        handleChangeColor,
        handlePlusNumPro,
        handlePrevNumPro,
        deleteCartItem,
        // payCOD,
        deleteCart,
        loading,
        modal,
        messStatus,
        statusHandle,
        setLoading,
        setMessStatus,
        setStatusHandle,
        setModal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
