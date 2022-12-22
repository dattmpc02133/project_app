import { useEffect, useState, useContext } from 'react';
import { CommentContext } from '~/Context/CommentContext';

import commentsApi from '../../api/commentsAPi';
const CommentCount = () => {
    const { setLoading, setMessStatus, setStatusHandle, setModal, fetchCommentCount, commentCount } =
        useContext(CommentContext);

    useEffect(() => {
        fetchCommentCount();
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: '0',
                right: '70px',
                borderRadius: '50%',
                width: '15%',
                textAlign: 'center',
                color: 'red',
                fontSize: '1rem',
                border: '1px solid #ffffffb3',
            }}
        >
            {commentCount}
        </div>
    );
};
export default CommentCount;
