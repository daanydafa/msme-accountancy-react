import { useState } from "react";
import StatusBadge from "./StatusBadge";
import TransactionDetailCard from "./TransactionDetailCard";

export default function TransactionList({ transactions }) {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    return !transactions ? noTransaction() : isTransactions(transactions, selectedTransaction, setSelectedTransaction)
}

const isTransactions = (transactions, selectedTransaction, setSelectedTransaction) => {

    return transactions.map((data, i) => {
        const handleClick = () => {
            setSelectedTransaction(data);
        };

        return (
            <div key={i} className="w-full md:w-3/4 bg-base-100 pb-6">
                <div onClick={handleClick} className="card border border-gray-200 rounded-2xl shadow shadow-lg">
                    <div className="p-8">
                        <div className="flex justify-between border-b border-gray-300 pb-1">
                            <div className="inline-block">
                                <p className="text-gray-700 text-base font-bold">
                                    {data.type === 'income' ? data.income_type : data.expanse_type}
                                </p>
                                <p className="text-gray-700 text-sm">
                                    {data.date}
                                </p>
                            </div>
                            <div className="inline-block flex items-center">
                                <StatusBadge status={data.type} />
                            </div>
                        </div>
                        <div className="flex justify-between mt-2">
                            <div className="flex font-bold items-center">
                                {data.description}
                            </div>
                            <div className="flex flex-col items-end">
                                <div>
                                    <p className="text-gray-700 text-sm">
                                        Jumlah
                                    </p>
                                </div>
                                <div className="font-bold">
                                    {data.amount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                {selectedTransaction && (
                    <TransactionDetailCard
                        transaction={selectedTransaction}
                        onClose={() => setSelectedTransaction(null)}
                    />
                )}
            </div>
        )
    })
}

const noTransaction = () => {
    return (
        <div>Belum ada transaksi pada pesanan ini</div>
    )
}