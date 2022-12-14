import { createContext, useState, useEffect } from 'react';
import cartApi from '~/api/cartApi';
import productApi from '~/api/productApi';
export const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
    const [listCart, setListCart] = useState(null);
    const [listCartLocal, setListCartLocal] = useState(null);
    const [listProDettails, setListProDettails] = useState([]);
    const [loading, setLoading] = useState(true);
    //
    const [modal, setModal] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();

    const getCart = async () => {
        setLoading(true);
        const objDataAd = localStorage.getItem('token');
        if (objDataAd != null) {
            try {
                const resultCart = await cartApi.getAll();
                setListCart(resultCart.data);
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
                    setListProDettails(tempList);
                });
                setLoading(false);
            } catch (error) {
                // console.log('Failed to get Cart', error);
                setListCart([]);
                setLoading(false);
            }
        } else {
            const cartLocal = JSON.parse(localStorage.getItem('listCart'));
            setListCartLocal(cartLocal);
            setListCart([]);
            setLoading(false);
        }
    };

    const handleChangeVariantId = (idVariant, index) => {
        if (listCart?.details != undefined) {
            const inputData = [...listProDettails];
            inputData[index].variant_id = idVariant;
            inputData[index].color_id = '';
            setListProDettails(inputData);
        } else if (listCartLocal != undefined) {
            listCartLocal[index].variant_id = idVariant;
            listCartLocal[index].color_id = '';
            updateCart(listCartLocal);
        }
    };

    const updateCart = async (data) => {
        if (listCart?.details != undefined) {
            setLoading(true);
            try {
                const result = await cartApi.update(data);
                await getCart();
                setLoading(false);
            } catch (error) {
                console.log('Failed to update cart', error);
                setLoading(false);
            }
        } else if (listCartLocal != undefined) {
            localStorage.removeItem('listCart');
            localStorage.setItem('listCart', JSON.stringify(data));
            getCart();
        }
    };

    const handleChangeColor = (idColor, index, idProduct, idVariant) => {
        if (listCart?.details != undefined) {
            const inputData = [...listProDettails];
            inputData[index].color_id = idColor;
            setListProDettails(inputData);

            const data = { ...listCart };
            data.details = listProDettails;
            updateCart(data);
        } else if (listCartLocal != undefined) {
            const productID = async () => {
                setLoading(true);
                try {
                    const result = await productApi.get(idProduct);
                    const productDetails = result?.data?.dataVariants.filter(
                        (item) =>
                            item.product_id == idProduct && item.color_id == idColor && item.variant_id == idVariant,
                    );
                    let PriceDisCount = productDetails[0].price * ((100 - productDetails[0].discount) / 100);
                    console.log('productDetails', PriceDisCount);
                    listCartLocal[index].color_id = idColor;
                    listCartLocal[index].price = PriceDisCount;
                    listCartLocal[index].originalPrice = productDetails[0].price;
                    updateCart(listCartLocal);
                    setLoading(false);
                } catch (error) {
                    console.log('Failed to get product', error);
                    setLoading(false);
                }
            };
            productID();
            // listCartLocal[index].color_id = idColor;
            // updateCart(listCartLocal);
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
        } else if (listCartLocal != undefined) {
            listCartLocal[index].quantity += 1;
            updateCart(listCartLocal);
        }
    };

    const handlePrevNumPro = (index) => {
        if (listCart?.details != undefined) {
            const inputData = [...listProDettails];
            console.log(inputData[index].quantity);
            if (Number(inputData[index].quantity) > 1) {
                inputData[index].quantity = Number(inputData[index].quantity) - 1;
                setListProDettails(inputData);
                const data = { ...listCart };
                data.details = listProDettails;
                updateCart(data);
            }
        } else if (listCartLocal != undefined) {
            if (Number(listCartLocal[index].quantity) > 1) {
                listCartLocal[index].quantity -= 1;
                updateCart(listCartLocal);
            }
        }
    };

    const deleteCartItem = async (listIdDelete) => {
        if (listCart?.details != undefined) {
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
        } else if (listCartLocal != undefined) {
            listCartLocal.splice(listIdDelete.current, 1);
            updateCart(listCartLocal);
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
        setListCartLocal,
        listCart,
        listCartLocal,
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
