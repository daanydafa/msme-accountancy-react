import { useEffect, useState } from "react";
import { getTransactionsByList, updateReimbursementStatus } from "../Services/Api";
import TransactionDetailCard from "./TransactionDetailCard";
import Loading from "./Loading";
import { ChevronRight } from "../Asset/Icon";

const ReimbursementList = ({ transactionIds, onClose, onUpdate }) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reimbursementList, setReimbursementList] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const fetchReimbursementList = async () => {
            try {
                const data = await getTransactionsByList(transactionIds);
                setReimbursementList(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch reimbursement list');
            } finally {
                setIsLoading(false);
            }
        };

        fetchReimbursementList()
    }, [])


    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(null);

    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleButton = async (transactionId) => {
        try {
            setLoading(transactionId);
            await updateReimbursementStatus({ transaction_id: transactionId });
            setLoading(null);
            if (onUpdate) {
                await onUpdate();
            }
        } catch (error) {
            setLoading(null);
            setErrors(error.message || "Terjadi kesalahan saat memperbarui status.");
        }
    };

    return (
        < div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-20" >
            <div className="flex flex-col bg-white rounded-t-3xl shadow-lg items-center px-5 w-full h-1/2">
                <h2 className="text-xl uppercase font-medium my-10">Daftar Transaksi Reimburse</h2>
                <button
                    className="absolute right-0 my-10 mr-12 text-3xl uppercase text-gray-500"
                    onClick={onClose}
                >
                    X
                </button>
                <div className="w-full h-full overflow-x-auto">
                    {isLoading ? (
                        <div className="h-full flex justify-center">
                            <Loading />
                        </div>
                    ) :
                        <table className="min-w-full bg-white rounded-lg">
                            <thead className="bg-white text-gray-600 sticky top-0 shadow-md">
                                <tr className="text-left text-base font-medium uppercase tracking-wider">
                                    <th className="p-2">Tanggal</th>
                                    <th className="p-2">Jumlah</th>
                                    <th className="p-2">Kategori</th>
                                    <th className="p-2 hidden">Deskripsi</th>
                                    <th className="p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {reimbursementList.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50 ">
                                        <td className="px-2 py-4 whitespace-nowrap">
                                            {transaction.date}
                                        </td>
                                        <td className="px-2 whitespace-nowrap text-end text-red-700">
                                            {transaction.amount}
                                        </td>
                                        <td className="px-2 whitespace-nowrap capitalize">
                                            {transaction.category || "-"}
                                        </td>
                                        <td className="px-2 whitespace-nowrap capitalize hidden">
                                            {transaction.description || "-"}
                                        </td>
                                        <td className="px-2 whitespace-nowrap capitalize">
                                            {transaction.reimbursement_status || "-"}
                                        </td>
                                        <td className="p-4 whitespace-nowrap flex justify-end">
                                            <div
                                                onClick={() => handleClick(transaction)}
                                                role="button"
                                                tabIndex={0}
                                                className="inline-block flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200 group"
                                            >
                                                <ChevronRight className="h-6 w-fit transform group-hover:translate-x-1 transition-transform duration-200" />
                                            </div>
                                        </td>
                                        {transaction.reimbursement_status == "pending" && (
                                            <td className="p-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleButton(transaction.id)}
                                                    disabled={loading === transaction.id}
                                                    className={`px-4 py-2 text-white font-medium rounded ${loading === transaction.id
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-blue-500 hover:bg-blue-600"
                                                        }`}
                                                >
                                                    {loading === transaction.id ? "Updating..." : "Update"}
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                    {selectedTransaction && (
                        <TransactionDetailCard
                            transaction={selectedTransaction}
                            onClose={() => setSelectedTransaction(null)}
                            context="reimburse"
                        />
                    )}
                </div>
                {errors && <div className="text-red-500 mt-2">{errors}</div>}
            </div>
        </div >

    );
};

export default ReimbursementList;
