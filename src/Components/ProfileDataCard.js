export default function ProfileDataCard({ data }) {
    return (
        <div className="w-full md:w-3/4 bg-base-100 bg-white rounded-xl p-10">
            <div className="flex flex-col items-center justify-center">
                <span className="text-3xl uppercase tracking-wider font-bold py-4">
                    {data.name}
                </span>
                <span className="text-lg text-gray-600 tracking-wide"> {data.email}</span>
                <p className="py-4">Total Reimburse: <strong className="text-3xl"> Rp{data.reimbursement_data.total_pending_amount},-</strong></p>
            </div>
        </div>
    )
}