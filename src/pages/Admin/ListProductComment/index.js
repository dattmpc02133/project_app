import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import commentsApi from '../../../api/commentsAPi';

const ListProductComment = () => {
    const [loading, setLoading] = useState(false);
    const [listComment, setListComment] = useState();
    useEffect(() => {
        const ListComment = async () => {
            setLoading(true);
            try {
                const result = await commentsApi.getAll();
                setListComment(result.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to createL: ', error);
                setLoading(false);
            }
        };
        ListComment();
    }, []);
    return (
        <div className="wrapper">
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách sản phẩm có bình luận</h2>
                <p className="content__heading--subtitle">Bình luận</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Sản phẩm</th>
                                    <th className="text-center">Số bình luận</th>
                                    <th>Mới nhất</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listComment?.map((comment, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{comment.name}</td>
                                        <td className="text-center">{comment.countComment}</td>
                                        <td>{comment.created_at}</td>

                                        <td className="text-center btn__tbl">
                                            <Link
                                                to={`/admin/comment/listcomment`}
                                                state={{
                                                    id: comment.id,
                                                    comment: comment,
                                                }}
                                            >
                                                Xem bình luận
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProductComment;
