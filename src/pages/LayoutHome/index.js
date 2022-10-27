import Header from '~/components/header';
import Footer from '~/components/Footer';
import { Layout } from 'antd';
import { Link, Outlet } from 'react-router-dom';

function LayoutHome()
{
    const ItemMenu = [
        {
            title: 'iPhone',
            to: '/iphone',
        },
        {
            title: 'Mac',
            to: '/mac',
        },
        {
            title: 'iPad',
            to: '/ipad',
        },
        {
            title: 'Watch',
            to: '/watch',
        },
        {
            title: 'Âm thanh',
            to: '/sound',
        },
        {
            title: 'Phụ kiện',
            to: '/accessories',
        },
        {
            title: 'TekZone',
            to: '/tekzone',
        },
        {
            title: 'TopCare',
            to: '/topcare',
        },
    ];
    return (
        // <Layout>
        <>
            <Header ItemMenu={ItemMenu} />
            <main>
                <Outlet />
            </main>

            <Footer />

        </>
        // </Layout>
    );
}

export default LayoutHome;
