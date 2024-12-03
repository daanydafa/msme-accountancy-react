import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronRight, DashboardIcon, OrderIcon, ReportIcon } from '../Asset/Icon';
import { Outlet, useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeNavItem, setActiveNavItem] = useState(null);
    const { logout, user } = useAuth();
    const [userName, setUserName] = useState(user ? user.name : '');

    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYear = currentDate.getFullYear();

    const navigation = [
        { name: 'Dashboard', href: '/', current: true, icon: DashboardIcon },
        { name: 'Orders', href: '/orders', current: false, icon: OrderIcon },
        {
            name: 'Reports',
            href: `/reports/${currentMonth}/${currentYear}`,
            current: false,
            icon: ReportIcon,
        },
    ];

    const userNavigation = [
        { name: 'Your Profile', href: '/profile', action: () => navigate('/profile') },
        {
            name: 'Sign out', action: async () => {
                await logout();
            }
        },
    ];

    useEffect(() => {
        const currentPath = location.pathname;
        const active = navigation.find((item) => {
            if (currentPath === item.href) return true;
            if (item.href !== '/' && currentPath.startsWith(item.href)) return true;
            return false;
        });
        setActiveNavItem(active || navigation[0]); // Default to Dashboard if no match

        navigation.forEach((item) => {
            item.current =
                item.href === currentPath ||
                (item.href !== '/' && currentPath.startsWith(item.href));
        });
    }, [location.pathname]);

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800 fixed w-full top-0 z-10">
                <div className="mx-auto max-w-7xl px-8 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-10 w-fit"
                                />
                            </div>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative gap-2 flex max-w-xs items-center rounded-full bg-gray-800 text-sm">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <span className="font-bold rounded-full text-stone-50 capitalize">{userName}</span>
                                        <ChevronRight className="rotate-90 bg-white rounded-2xl" />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none"
                                >
                                    {userNavigation.map((item) => (
                                        <MenuItem key={item.name}>
                                            <button
                                                onClick={item.action}
                                                className="block px-4 py-2 text-xl text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                            >
                                                {item.name}
                                            </button>
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>
            </Disclosure>

            <header className="bg-white shadow mt-20 fixed w-full top-0 z-9">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {activeNavItem?.name || 'Dashboard'}
                    </h1>
                </div>
            </header>
            <main className={`mx-auto max-w-7xl pt-40 pb-20 ${activeNavItem?.name !== 'Orders' ? 'bg-gray-200' : 'bg-white'} min-h-screen`}>
                <div>
                    <Outlet context={{ currentMonth, currentYear }} />
                </div>
            </main>

            <Disclosure as="nav" className="block md:hidden bg-gray-800 px-28 w-full fixed bottom-0 z-10">
                <div className="flex w-full h-auto items-center justify-between">
                    {navigation.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.href)}
                            className={classNames(
                                item.current
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md py-2 text-sm font-medium'
                            )}
                        >
                            <div className="flex flex-col items-center mx-2">
                                {<item.icon className="h-14 w-fit" />}
                                {item.name}
                            </div>
                        </button>
                    ))}
                </div>
            </Disclosure>
        </div>
    );
}
