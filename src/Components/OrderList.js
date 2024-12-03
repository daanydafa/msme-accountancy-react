import { ChevronRight } from "../Asset/Icon";
import StatusBadge from "./StatusBadge";
import { useNavigate } from 'react-router-dom';

export default function OrdersList({ orders }) {
    const navigate = useNavigate();
    return !orders ? noOrder() : isOrders(orders, navigate)
}

const isOrders = (orders, navigate) => {
    return orders.map((data, i) => {
        const handleClick = (id) => {
            navigate(`/orders/${data.id}`);
        };

        const handleAddTransaction = (id) => {
            navigate(`/orders/${data.id}/add-transaction`);
        };


        return (
            <div key={i} className="card w-full md:w-3/4 shadow-lg">
                <div className="px-6 py-4 border-t bg-white rounded-xl">
                    <div className="flex justify-between">
                        <div className="inline-block">
                            <p className="text-gray-700 text-lg">
                                Pemesan
                            </p>
                            <div className="font-bold  mb-2">{data.customer_name}</div>
                        </div>
                        <div className="inline-block flex items-start gap-2">
                            <StatusBadge status={data.status} />
                            <button onClick={handleAddTransaction} className="bg-green-600 text-white p-2 rounded text-sm">
                                + Transaksi
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between mb-2">
                        <div className="inline-block">
                            <p className="text-gray-700 text-lg">
                                Estimasi Selesai
                            </p>
                            <div className="font-bold ">{data.completion_date}</div>
                        </div>

                        <div onClick={handleClick} className="inline-block flex items-end">
                            <div>
                                {data.items.map((item, i) => (
                                    <span className="inline-block mx-1" key={i}>{item.item_name} x {item.quantity}</span>
                                ))}
                            </div>
                            <ChevronRight className="h-6 w-fit" />
                        </div>
                    </div>
                </div>
            </div >
        )
    })
}

const noOrder = () => {
    return (
        <div>Belum ada pesanan saat ini</div>
    )
}



