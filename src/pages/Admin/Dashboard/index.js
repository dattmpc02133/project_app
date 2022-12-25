import Loading from '~/components/Loading';
import '~/assets/scss/admin/Content.scss';
import { useState, useEffect } from 'react';
import analyticApi from '~/api/analyticApi';
import postApi from '~/api/postApi';
import { useParams } from 'react-router-dom';
import Modal from '~/components/Modal';
import TableImage from '~/components/TableImage';

import classNames from 'classnames/bind';
import style from '~/assets/scss/admin/Dashboard.module.scss';

import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line, Legend } from 'recharts';
const cx = classNames.bind(style);

const DashBroad = () => {
    const [loading, setLoading] = useState(false);
    //
    const [revenue, setRevenue] = useState();
    const [revenueList, setRevenueList] = useState();
    const [revenueStatus, setRevenueStatus] = useState(1);
    const [revenueTitle, setRevenueTitle] = useState();
    //
    const [order, setOrder] = useState();
    const [orderList, setOrderList] = useState();
    const [orderStatus, setOrderStatus] = useState(1);
    const [orderTitle, setOrderTitle] = useState(1);
    //
    const [productPL, setProductPL] = useState();
    //
    const [revenueDay, setRevenueDay] = useState();
    //
    const [toltalOrder, setToltalOrder] = useState();
    const [toltalOrderList, setToltalOrderList] = useState();

    const dataToltalPrice = [
        {
            name: '1/1/2022',
            toltal: 120000000,
            pv: 2900,
            amt: 2400,
        },
        {
            name: '1/1/2022',
            toltal: 20000000,
            pv: 2900,
            amt: 2400,
        },
        {
            name: '1/1/2022',
            toltal: 90000000,
            pv: 2900,
            amt: 2400,
        },
        {
            name: '1/1/2022',
            toltal: 220000000,
            pv: 2900,
            amt: 2400,
        },
    ];

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const getData = async () => {
        setLoading(true);
        try {
            const resultRevenue = await analyticApi.getRevenue();
            setRevenueList(resultRevenue.data);
            //
            const resultOrders = await analyticApi.getOrder();
            setOrderList(resultOrders.data);
            //
            const resultProductPl = await analyticApi.getProductPL();
            const tempArrProductPL = Object.entries(resultProductPl.data);
            setProductPL(convertObjToArr(tempArrProductPL));
            //
            const resultRevenueDay = await analyticApi.getRevenueDay();
            setRevenueDay(resultRevenueDay.data);
            //

            const resultToltalOrder = await analyticApi.getTotalOrder();
            setToltalOrder(resultToltalOrder.data.total_order);
            delete resultToltalOrder.data.total_order;
            const tempArrToltalOrder = Object.entries(resultToltalOrder.data);
            setToltalOrderList(convertObjToArr(tempArrToltalOrder));
            setLoading(false);
        } catch (error) {
            console.log('Fail to get Data', error);
            setLoading(false);
        }
    };

    console.log('toltalOrderList', toltalOrderList);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (revenueList) {
            if (revenueStatus == 1) {
                const objectInArray = Object.entries(revenueList.daily);
                const tempArr = convertObjToArr(objectInArray.reverse());
                setRevenue(tempArr);
                setRevenueTitle('ngày');
            } else if (revenueStatus == 2) {
                const objectInArray = Object.entries(revenueList.monthly);
                const tempArr = convertObjToArr(objectInArray.reverse());
                setRevenue(tempArr);
                setRevenueTitle('tháng');
            } else if (revenueStatus == 3) {
                const objectInArray = Object.entries(revenueList.yearly);
                const tempArr = convertObjToArr(objectInArray);
                setRevenue(tempArr);
                setRevenueTitle('năm');
            }
        }
    }, [revenueStatus, revenueList]);

    useEffect(() => {
        if (orderList) {
            if (orderStatus == 1) {
                const objectInArray = Object.entries(orderList.daily);
                const tempArr = convertObjToArr(objectInArray.reverse());
                setOrder(tempArr);
                setOrderTitle('ngày');
            } else if (orderStatus == 2) {
                const objectInArray = Object.entries(orderList.monthly);
                const tempArr = convertObjToArr(objectInArray.reverse());
                setOrder(tempArr);
                setOrderTitle('tháng');
            } else if (orderStatus == 3) {
                const objectInArray = Object.entries(orderList.yearly);
                const tempArr = convertObjToArr(objectInArray);
                setOrder(tempArr);
                setOrderTitle('năm');
            }
        }
    }, [orderStatus, orderList]);

    const convertObjToArr = (objectInArray) => {
        if (objectInArray) {
            const tempArrr = [];
            objectInArray.forEach(([key, value]) => {
                let currentArr = { name: key, toltal: value };
                tempArrr.push(currentArr);
            });
            return tempArrr;
        }
    };

    // console.log('revenue', revenue && Object.keys(revenue).length);

    const handleChangeRenvenue = (status) => {
        setRevenueStatus(status);
    };

    const handleChangeOrder = (status) => {
        setOrderStatus(status);
    };

    const getColorOrder = (id) => {
        if (id == 10) {
            // Chờ xác nhận
            return '#21759B';
        } else if (id == 11) {
            // Đã xác nhận
            return '#09B83E';
        } else if (id == 12) {
            // Đang giao hàng
            return '#1877F2';
        } else if (id == 13) {
            // Đã giao hàng
            return '#AA00FF';
        } else if (id == 14) {
            // Hoàng thành
            return '#3AAF85';
        } else if (id == 15) {
            // Đã hủy
            return '#FF3300';
        } else if (id == 16) {
            // Trả hàng
            return '#EE1D51';
        }
    };

    return (
        <div className="wrapper">
            {loading && <Loading />}
            <div className="content__heading">
                <h2 className="content__heading--title">Thống kê</h2>
                <p className="content__heading--subtitle">Phân tích và thống kê trạng thái cửa hàng</p>
            </div>

            <div className="content__wrapper">
                {/* <div className="content__main"> */}
                <div className={cx('analytics__block', 'grid')}>
                    <div className={cx('analytics__list', 'row')}>
                        <div className={cx('col l-4')}>
                            <div className={cx('analytics__item')}>
                                <div className={cx('analytics__heading')}>
                                    <h3>Tổng đơn hàng</h3>
                                </div>
                                <div className={cx('analytics__num')}>
                                    <p>{toltalOrder && Number(toltalOrder).toLocaleString()}</p>
                                </div>
                                <div className={cx('analytics__sub--list', 'grid')}>
                                    {toltalOrderList?.map((item, index) => (
                                        <div className={cx('analytics__sub--item', 'full')}>
                                            <p
                                                style={{ color: getColorOrder(item?.toltal?.id) }}
                                                className={cx('analytics__sub--ttitle')}
                                            >
                                                {item?.toltal?.name}
                                            </p>
                                            <span className={cx('analytics__sub--price')}>
                                                {Number(item?.toltal?.value).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                    {/* <div className="row">
                                        {toltalOrderList?.map((item, index) => (
                                            <div key={index} className="col l-4">
                                                <div className={cx('analytics__sub--item')}>
                                                    <p>{item.toltal.name}</p>
                                                    <span>120</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className={cx('col l-4')}>
                            <div className={cx('analytics__item')}>
                                <div className={cx('analytics__heading', 'flex')}>
                                    <h3>Doanh thu hôm nay</h3>
                                    <span>{revenueDay?.today}</span>
                                </div>
                                <div className={cx('analytics__num')}>
                                    <p>
                                        {Number(revenueDay?.total_revenue_today).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </p>
                                </div>
                                <div className={cx('analytics__sub--list', 'grid')}>
                                    <div className={cx('analytics__sub--item', 'full')}>
                                        <p className={cx('analytics__sub--ttitle')}>Doanh thua hôm qua</p>
                                        <span className={cx('analytics__sub--price')}>
                                            {Number(revenueDay?.total_revenue_yesterday).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                    </div>
                                    <div className={cx('analytics__sub--item', 'full')}>
                                        <p className={cx('analytics__sub--ttitle', 'strong')}>Tổng doanh thu</p>
                                        <span className={cx('analytics__sub--price', 'strong')}>
                                            {Number(revenueDay?.total_revenue).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('col l-4')}>
                            <div className={cx('analytics__item')}>
                                <div className={cx('analytics__heading', 'flex')}>
                                    <h3>Sản phẩm bán chạy</h3>
                                    {/* <span>26/12/2022</span> */}
                                </div>
                                {/* <div className={cx('analytics__num')}>
                                    <p>
                                        {Number(12500000).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </p>
                                </div> */}
                                <div className={cx('analytics__sub--list', 'non-bd')}>
                                    <div className={cx('analytics__sub--item', 'full', 'tbl')}>
                                        <p className={cx('analytics__sub--titlePro')}>Tên sản phẩm</p>
                                        <p className={cx('analytics__sub--titleNum')}>Số lượng mua</p>
                                    </div>
                                    {productPL?.map((item, index) => (
                                        <div key={index} className={cx('analytics__sub--item', 'full', 'border-bt')}>
                                            <p className={cx('analytics__sub--titlePro')}>{item.toltal.name}</p>
                                            <p className={cx('analytics__sub--titleNum')}>{item.toltal.count}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('chart__block')}>
                    <div className={cx('chart__heading')}>
                        <div className={cx('chart__heading--title')}>
                            <h3>Tổng doanh thu</h3>
                            <span>Doanh thu theo {revenueTitle} (Đơn vị: VNĐ)</span>
                        </div>
                        <div className={cx('chart__heading--list')}>
                            <div
                                className={
                                    revenueStatus == 1
                                        ? cx('chart__heading--item', 'active')
                                        : cx('chart__heading--item')
                                }
                                onClick={() => handleChangeRenvenue(1)}
                            >
                                Theo ngày
                            </div>
                            <div
                                className={
                                    revenueStatus == 2
                                        ? cx('chart__heading--item', 'active')
                                        : cx('chart__heading--item')
                                }
                                onClick={() => handleChangeRenvenue(2)}
                            >
                                Theo tháng
                            </div>
                            <div
                                className={
                                    revenueStatus == 3
                                        ? cx('chart__heading--item', 'active')
                                        : cx('chart__heading--item')
                                }
                                onClick={() => handleChangeRenvenue(3)}
                            >
                                Theo năm
                            </div>
                        </div>
                    </div>

                    <div className={cx('chart__item')}>
                        <ResponsiveContainer width="100%" aspect={3}>
                            <AreaChart
                                width={500}
                                height={400}
                                data={revenue}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis
                                    dataKey="toltal"
                                    tickFormatter={(toltal) =>
                                        new Intl.NumberFormat('en-US', {
                                            notation: 'compact',
                                            compactDisplay: 'short',
                                        }).format(toltal)
                                    }
                                />
                                <Tooltip formatter={(toltal) => `${Number(toltal).toLocaleString()} VNĐ`} />

                                <Area type="monotone" dataKey="toltal" stroke="#8884d8" fill="#4f46e5" />
                                {/* <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" /> */}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={cx('chart__block')}>
                    <div className={cx('chart__heading')}>
                        <div className={cx('chart__heading--title')}>
                            <h3>Tổng số đơn hàng</h3>
                            <span>Số đơn hàng theo {orderTitle} (Đơn vị: đơn)</span>
                        </div>
                        <div className={cx('chart__heading--list')}>
                            <div
                                className={
                                    orderStatus == 1 ? cx('chart__heading--item', 'active') : cx('chart__heading--item')
                                }
                                onClick={() => handleChangeOrder(1)}
                            >
                                Theo ngày
                            </div>
                            <div
                                className={
                                    orderStatus == 2 ? cx('chart__heading--item', 'active') : cx('chart__heading--item')
                                }
                                onClick={() => handleChangeOrder(2)}
                            >
                                Theo tháng
                            </div>
                            <div
                                className={
                                    orderStatus == 3 ? cx('chart__heading--item', 'active') : cx('chart__heading--item')
                                }
                                onClick={() => handleChangeOrder(3)}
                            >
                                Theo năm
                            </div>
                        </div>
                    </div>
                    <div className={cx('chart__item')}>
                        <ResponsiveContainer width="100%" aspect={3}>
                            <LineChart
                                width={500}
                                height={300}
                                data={order}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="toltal"
                                    formatter={(toltal) => `${Number(toltal).toLocaleString()} đơn`}
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                />
                                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBroad;
