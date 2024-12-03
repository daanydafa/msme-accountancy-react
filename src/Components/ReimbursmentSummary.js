import { useState } from "react";
import { ChevronRight } from "../Asset/Icon";
import ReimbursementList from "./ReimbursementList";

const ReimbursementSummary = ({ reimbursements = [], onUpdate }) => {
    const [selectedRow, setSelectedRow] = useState(null);

    const handleClick = (data) => {
        setSelectedRow(data);
    };

    if (reimbursements.length == 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-600">Belum ada data reimburse pada bulan ini</p>
            </div>
        )
    }
    return (
        <>
            <div className="overflow-x-auto max-h-96 rounded-lg">
                <table className="min-w-full overflow-auto rounded-lg bg-white">
                    <thead className="bg-white text-gray-600 sticky top-0 shadow-md">
                        <tr>
                            <th className="p-4 text-left text-base font-medium uppercase tracking-wide">Nama</th>
                            <th className="p-4 text-left text-base font-medium uppercase tracking-wide">Banyak Transaksi</th>
                            <th className="p-4 text-left text-base font-medium uppercase tracking-wider">Jumlah</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {reimbursements.map((reimbursement) => (
                            <tr key={reimbursement.id} className="hover:bg-gray-50">
                                <td className="p-4 whitespace-nowrap capitalize font-medium">
                                    {reimbursement.name}
                                </td>
                                <td className="p-4 whitespace-nowrap text-end">
                                    {reimbursement.count}
                                </td>
                                <td className="p-4 whitespace-nowrap font-medium text-end">
                                    {reimbursement.amount}
                                </td>
                                <td className="p-4 whitespace-nowrap text-xl flex justify-end">
                                    <div
                                        onClick={() => handleClick(reimbursement.transaction_list)}
                                        role="button"
                                        tabIndex={0}
                                        className="inline-block flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200 group"
                                    >
                                        <ChevronRight className="h-6 w-fit transform group-hover:translate-x-1 transition-transform duration-200" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedRow && (
                <ReimbursementList
                    transactionIds={selectedRow}
                    onClose={() => setSelectedRow(null)}
                    onUpdate={onUpdate}
                />
            )}
        </>
    );
};

export default ReimbursementSummary;
