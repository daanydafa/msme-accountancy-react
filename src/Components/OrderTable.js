import React from 'react';
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "../Asset/Icon";
import StatusBadge from './StatusBadge';

const OrderTable = React.memo(({ orders = [], status }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/orders/${id}`);
    };

    return (
        <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full overflow-auto rounded-lg bg-white">
                <thead className="bg-white text-gray-600 sticky top-0 shadow-md">
                    <tr>
                        <th className="p-4 text-left text-base font-medium uppercase tracking-wider">Pemesan</th>
                        <th className="p-4 text-left text-base font-medium uppercase tracking-wider">Kontak</th>
                        <th className="p-4 text-left text-base font-medium uppercase tracking-wider">Item</th>
                        <th className="p-4 text-left text-base font-medium uppercase tracking-wider">Status</th>
                        <th className="p-4 text-left text-base font-medium uppercase tracking-wider"></th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="p-4 whitespace-nowrap font-medium">
                                    {order.customer_name}
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                    {order.customer_phone}
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                    {order.items.map((item, i) => (
                                        <span className="inline-block mx-1" key={i}>
                                            {item.item_name} x {item.quantity}
                                        </span>
                                    ))}
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm text-gray-900">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="p-4 whitespace-nowrap flex justify-end">
                                    <div
                                        onClick={() => handleClick(order.id)}
                                        role="button"
                                        tabIndex={0}
                                        className="inline-block flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200 group"
                                    >
                                        <ChevronRight className="h-6 w-fit transform group-hover:translate-x-1 transition-transform duration-200" />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="p-10 text-center text-gray-600">
                                Tidak ada data dengan status "{status}".
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
});

export default OrderTable;
