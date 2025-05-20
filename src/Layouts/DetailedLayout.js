import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { ChevronRight } from "../Asset/Icon";
import { useState, useEffect } from 'react';

const routeTitles = {
    '/orders/:id': 'Detail Pesanan',
    '/profile': 'Profil Pengguna',
    '/orders/:id/add-transaction': 'Tambah Transaksi',
    '/orders': 'Buat Pesanan Baru'
};

export default function DetailedLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState('Detail');

    const handleClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        const matchingRoute = Object.keys(routeTitles).find(route => {
            const regexRoute = route
                .replace(/:\w+/g, '[^/]+')
                .replace(/\//g, '\\/');

            const regex = new RegExp(`^${regexRoute}$`);
            console.log(regex);
            
            return regex.test(location.pathname);
        });

        setPageTitle(matchingRoute ? routeTitles[matchingRoute] : 'Detail');
    }, [location.pathname]);

    return (
        <div className="min-h-full bg-gray-100">
            <header className="bg-white border-b border-gray-400 fixed w-full top-0 z-10">
                <div
                    onClick={handleClick}
                    className="flex mx-auto max-w-7xl p-8 items-center cursor-pointer"
                >
                    <ChevronRight className='rotate-180 w-9 h-fit mr-2' />
                    <h1 className="text-3xl font-bold tracking-wide text-gray-900">
                        {pageTitle}
                    </h1>
                </div>
            </header>
            <main className='min-h-screen'>
                <div className="max-w-7xl">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}