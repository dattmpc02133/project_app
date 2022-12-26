import { createContext, useEffect, useState } from 'react';
import loginApi from '~/api/loginApi';
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [user, setUser] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();

    const [modal, setModal] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [statusLogin, setStatusLogin] = useState(true);

    const objDataAd = localStorage.getItem('token');
    useEffect(() => {
        if (objDataAd != null) {
            getUser();
        }
    }, [objDataAd]);

    const getUser = async () => {
        setLoading(true);
        try {
            const resultUser = await loginApi.getUser();
            setUser(resultUser?.data);
            setName(resultUser?.data?.name);
            setPhone(resultUser?.data?.phone);
            setEmail(resultUser?.data?.email);
            setLoading(false);
        } catch (error) {
            console.log('Failed to get user: ', error);
            setLoading(false);
            setUser();
            localStorage.removeItem('token');
        }
    };

    const updateDataUser = async (data) => {
        setLoading(true);
        try {
            const result = await loginApi.updateUser(data);
            getUser();
            setMessStatus(result.message);
            setStatusHandle(true);
            setModal(true);
            setLoading(false);
        } catch (error) {
            console.log('Failed to update user: ', error);
            const res = error.response.data;
            setMessStatus(res.message);
            setLoading(false);
            setModal(true);
            setStatusHandle(false);
        }
    };

    // const logout = async () => {
    //     setLoading(true);
    //     try {
    //         const result = await loginApi.logout();
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('dataAd');
    //         setUser();
    //         setName();
    //         setPhone();
    //         setEmail();
    //         setLoading(false);
    //         setStatusLogin(false);
    //     } catch (error) {
    //         console.log('Failed to log out', error);
    //         setLoading(false);
    //     }
    // };

    const value = {
        email,
        getUser,
        phone,
        user,
        name,
        updateDataUser,
        // logout,
        modal,
        messStatus,
        statusHandle,
        setModal,
        setMessStatus,
        setStatusHandle,
        setUser,
        setName,
        setPhone,
        setEmail,
        loading,
        setLoading,
    };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
