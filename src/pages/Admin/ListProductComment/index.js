import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import commentsApi from '../../../api/commentsAPi';
import Pagination from '~/components/Pagination';

const ListProductComment = () => {
    const [loading, setLoading] = useState(false);
    const [listComment, setListComment] = useState();
    const [page, setPage] = useState(1);
    const [searchComment, setSearchComment] = useState('');
    const [pageComment, setPageComment] = useState([]);
    useEffect(() => {
        const params = `?name=${searchComment}`;
        console.log(params);
        if (searchComment.length > 3) {
            ListComment(params);
        } else if (searchComment.length === 0) {
            ListComment();
        }
    }, [searchComment]);

    const ListComment = async (params) => {
        // setLoading(true);
        try {
            const result = await commentsApi.getAll(params);
            setListComment(result.data);
            setPageComment(result.paginator);
            // setLoading(false);

            console.log(result.data);
        } catch (error) {
            console.log('Failed to createL: ', error);
            // setLoading(false);
        }
    };
    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            ListComment(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pageComment?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            ListComment(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        ListComment(`?page=${page}`);
    };

    return (
        <div className="wrapper">
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách sản phẩm có bình luận</h2>
                <p className="content__heading--subtitle">Bình luận</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__search row" onSubmit={(e) => handleSearch(e)}>
                        <div className="input__group">
                            <div className="input__text">
                                <input
                                    value={searchComment}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tìm kiếm danh mục..."
                                    onChange={(e) => setSearchComment(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
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

                    <Pagination
                        curentPage={page}
                        totalPages={pageComment?.totalPages}
                        handlePrevPage={handlePrevPage}
                        handleChangePage={handleChangePage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListProductComment;
