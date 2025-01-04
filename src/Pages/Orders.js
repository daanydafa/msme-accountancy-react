import { useEffect, useState } from 'react';
import { orders } from '../Services/Api';
import OrderTable from '../Components/OrderTable';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

export default function Orders() {
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeStatus, setActiveStatus] = useState('Semua Pesanan');

    const handleClick = () => {
        navigate(`/orders/add`);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const data = await orders();
                setOrderList(data);
                setFilteredOrders(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch orders');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const filterOrders = (status) => {
        setActiveStatus(status);

        if (status === 'Semua Pesanan') {
            setFilteredOrders(orderList);
        } else {
            const filtered = orderList.filter(order => {
                switch (status) {
                    case 'Selesai':
                        return order.status === 'finished';
                    case 'Dalam Produksi':
                        return order.status === 'processing';
                    case 'Pending':
                        return order.status === 'pending';
                    default:
                        return true;
                }
            });
            setFilteredOrders(filtered);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-white pt-40 pb-20">
            <div className="mx-auto max-w-7xl py-10">
                <div className="mx-5 text-xl">
                    <div className='flex justify-between items-center px-4 border-b'>
                        <div className="flex space-x-4">
                            {['Semua Pesanan', 'Selesai', 'Dalam Produksi', 'Pending'].map((status) => (
                                <span
                                    key={status}
                                    onClick={() => filterOrders(status)}
                                    className={`
                            cursor-pointer 
                            py-2 
                            ${activeStatus === status
                                            ? 'text-blue-700 border-b-2 border-blue-600 font-medium '
                                            : 'text-gray-500 font-normal '}
                            transition-colors duration-300
                            `}
                                >
                                    {status}
                                </span>
                            ))}
                        </div>
                        <button onClick={handleClick} className="bg-green-600 text-white py-1 px-3 h-fit rounded-xl text-lg">
                            + Pesanan
                        </button>
                    </div>
                    <OrderTable orders={filteredOrders} status={activeStatus} />
                </div>
            </div>
        </div>
    );
}