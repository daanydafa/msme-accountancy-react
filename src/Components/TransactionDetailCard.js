import StatusBadge from "./StatusBadge";

const TransactionDetailCard = ({ transaction, onClose, context }) => {
    if (context == 'reimburse') {
        
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-20">
            <div className="flex flex-col bg-white rounded-t-3xl shadow-lg items-center px-10 w-full h-1/2 ">
                <h2 className="text-xl uppercase font-medium text-gray-500 my-10">Detail Transaksi</h2>
                <button
                    className="absolute right-0 my-10 mr-12 text-3xl uppercase text-gray-500"
                    onClick={onClose}
                >
                    X
                </button>
                <div className="flex flex-col bg-gray-100 w-full h-fit rounded-3xl p-10 text-2xl space-y-3">
                    <div className="pb-4 border-b-2 border-gray-400">
                        <StatusBadge status={transaction.type} />
                        <p className="text-xl"> <span className="uppercase"> {transaction.detailed_type} |</span> {transaction.description || '-'}</p>
                    </div>
                    <p className="flex justify-between">Tanggal <strong>{transaction.date}</strong></p>
                    <p className="flex justify-between">Oleh <strong>{transaction.user_id || '-'}</strong></p>
                    {transaction.detailed_type == 'operational' && (
                        <p className="flex justify-between capitalize">Kategori <strong>{transaction.category || '-'}</strong></p>
                    )}
                    <p className="flex justify-between pt-4 border-t-2 border-gray-400">Jumlah <strong className="text-4xl">Rp{transaction.amount},-</strong></p>
                    {transaction.detailed_type == 'operational' && (
                        <p>Status Reimburse: <strong className="capitalize">{transaction.reimbursement_status}</strong></p>
                    )}
                </div>
                <p className="flex justify-end w-full py-5 px-10">Order Id: <strong className="pl-1">{transaction.order_id} </strong></p>
            </div>
        </div>
    );
};

export default TransactionDetailCard;
