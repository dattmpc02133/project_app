import { createContext, useState, useEffect } from 'react';
import commentsApi from '~/api/commentsAPi';
export const CommentContext = createContext();

export const CommentContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    //
    const [modal, setModal] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [commentCount, setCommentCount] = useState();
    const fetchCommentCount = async () => {
        try {
            const result = await commentsApi.getCommentCount();
            setCommentCount(result.data);
        } catch (error) {
            console.log('Failed to fetch Store: ', error);
        }
    };
    useEffect(() => {
        fetchCommentCount();
    }, []);

    const value = {
        setLoading,
        setMessStatus,
        setStatusHandle,
        setModal,
        fetchCommentCount,
        commentCount,
    };

    return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
};
