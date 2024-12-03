import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showOrder } from '../Services/Api';
import TransactionList from "../Components/TransactionList";
import OrderStatus from "../Components/OrderStatus";
import OrderIinfo from "../Components/OrderInfo";
import ItemList from "../Components/ItemList";
import { useNavigate } from 'react-router-dom';
import Loading from "../Components/Loading";

export default function OrderDetail() {
    const [orderDetail, setOrderDetail] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams()
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/orders/${id}/add-transaction`);
    };

    useEffect(() => {
        const fetchOrderDetail = async () => {
            setIsLoading(true);
            try {
                const data = await showOrder(id);
                setOrderDetail(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch order detail');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetail();
    }, []);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const renderOrderSection = () =>
        orderDetail.transactions.length ? (
            <TransactionList transactions={orderDetail.transactions} />

        ) : (
            <div className="bg-white w-full rounded-lg shadow p-6 text-center">
                <p className="text-gray-600">Belum ada transaksi pada pesanan ini</p>
            </div>
        );

    return (
        <div className="mx-auto max-w-7xl bg-gray-200 text-gray-900 text-xl tracking-wide">
            <div className="overflow-hidden  bg-white mb-2 px-8 py-4">
                <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center'>
                    <OrderStatus
                        status={orderDetail.status}
                        id={orderDetail.id}
                        date={orderDetail.created_at} />
                </div>
            </div>
            <div className="overflow-hidden bg-white mb-2 px-8 py-4">
                <h2 className="text-2xl font-bold mb-6 mt-2">
                    Daftar Pesanan</h2>
                <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center'>
                    <ItemList items={orderDetail.items} />
                </div>
            </div>
            <div className="overflow-hidden bg-white mb-2 px-8 py-4">
                <h2 className="text-2xl font-bold mb-6 mt-2">
                    Info Pesanan</h2>
                <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center'>
                    <OrderIinfo
                        name={orderDetail.customer_name}
                        num={orderDetail.customer_phone}
                        price={orderDetail.price_agreement}
                        date={orderDetail.completion_date}
                    />
                </div>
            </div>
            <div className="overflow-hidden bg-white mb-2 px-8 py-4">
                <div className="flex justify-between items-center mb-6 mt-2">
                    <h2 className="text-2xl font-bold ">
                        Daftar Transaksi</h2>
                    <div className="flex items-center">
                        <button onClick={handleClick} className="bg-green-700 text-white p-2 rounded text-sm">
                            + Tambah Transaksi
                        </button>
                    </div>
                </div>
                <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center'>
                    {renderOrderSection()}
                </div>
            </div>
        </div >
    );
}