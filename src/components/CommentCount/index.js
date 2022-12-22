import { useEffect, useState } from 'react';
import Loading from '~/components/Loading';

import commentsApi from '../../api/commentsAPi';
const CommentCount = () => {
    const [loading, setLoading] = useState(false);
    const [commentCount, setCommentCount] = useState();
    const fetchCommentCount = async () => {
        try {
            const result = await commentsApi.getCommentCount();
            setCommentCount(result.data);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Store: ', error);
            setLoading(false);
        }
    };
    fetchCommentCount();
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
