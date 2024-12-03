import { useState } from "react";
import TransactionDetailCard from "./TransactionDetailCard";

const TransactionTable = ({ transactions = [], isMinimize }) => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const getTextColor = (type) => {
        return type === 'income' ? "text-green-700" : "text-red-700";
    };

    return (
        <>
            <div className={`overflow-x-auto ${isMinimize ? 'max-h-96' : ''} rounded-lg`}>
                <table className="min-w-full overflow-auto rounded-lg bg-white">
                    <thead className="bg-white text-gray-600 sticky top-0 shadow-md">
                        <tr>
                            <th className="p-4 text-left text-base font-medium uppercase tracking-wider">Tanggal</th>
                            <th className="p-4 text-left text-base font-medium uppercase tracking-wider">Jumlah</th>
                            <th className="p-4 text-left text-base font-medium uppercase tracking-wider">Tipe</th>
                            <th className="p-4 text-left text-base font-medium uppercase tracking-wider">Kategori</th>
                            <th className="p-4 text-left text-base font-medium uppercase tracking-wider">Oleh</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} onClick={() => handleClick(transaction)} className="hover:bg-gray-50">
                                <td className="p-4 whitespace-nowrap text-gray-900">
                                    {transaction.date}
                                </td>
                                <td className={`p-4 whitespace-nowrap ${getTextColor(transaction.type)} text-end`}>
                                    {transaction.amount}
                                </td>
                                <td className="p-4 whitespace-nowrap text-gray-900 capitalize">
                                    {transaction.type == 'expense' ? transaction.detailed_type : 'Income'}
                                </td>
                                <td className="p-4 whitespace-nowrap text-gray-900 capitalize">
                                    {transaction.category || '-'}
                                </td>
                                <td className="p-4 whitespace-nowrap text-gray-900 capitalize">
                                    {transaction.user_name || '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedTransaction && (
                <TransactionDetailCard
                    transaction={selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                />
            )}
        </>
    );
};

export default TransactionTable;
