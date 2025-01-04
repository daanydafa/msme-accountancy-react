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
            <div className="min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const { data, transactions } = orderDetail;

    const renderOrderSection = () => transactions.data.length ? (
        <TransactionList transactions={transactions.data} />
    ) : (
        <div className="bg-white w-full rounded-lg p-6 text-center">
            <p className="text-gray-600">Belum ada transaksi pada pesanan ini</p>
        </div>
    );

    return (
        <div className="mx-auto max-w-7xl bg-gray-200 text-gray-900 text-xl tracking-wide pt-24">
            <div className="overflow-hidden  bg-white mb-2 px-8 py-4">
                <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center'>
                    <OrderStatus
                        status={data.status}
                        id={data.id}
                        date={data.created_at} />
                </div>
            </div>
            <div className="overflow-hidden bg-white mb-2 px-8 py-4">
                <h2 className="text-2xl font-bold mb-6 mt-2">
                    Daftar Pesanan</h2>
                <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center'>
                    <ItemList items={data.items} />
                </div>
            </div>
            <div className="overflow-hidden bg-white mb-2 px-8 py-4">
                <h2 className="text-2xl font-bold mb-6 mt-2">
                    Info Pesanan</h2>
                <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center'>
                    <OrderIinfo
                        name={data.customer_name}
                        num={data.customer_phone}
                        price={data.price_agreement}
                        date={data.completion_date}
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