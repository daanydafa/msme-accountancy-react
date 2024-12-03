export default function AmountSummary({ type, amount, qty }) {
    const getAmountType = (type) => {
        switch (type) {
            case 'income':
                return {
                    textColor: 'text-green-700',
                    label: 'Uang Masuk'
                };
            case 'expense':
                return {
                    textColor: 'text-red-700',
                    label: 'Uang Keluar'
                };
            default:
                return {
                    textColor: 'text-gray-700',
                    label: 'Unknown'
                };
        }
    };

    const amountType = getAmountType(type);

    return (
        <div className="w-full md:w-3/4 bg-base-100 bg-white rounded-lg">
            <div className="flex flex-col p-4">
                <h2 className="text-md font-medium uppercase tracking-wide text-gray-900 border-b pb-4"> {amountType.label}  </h2>
                <span
                    className={`text-3xl ${amountType.textColor} font-bold pt-4`}
                >
                    Rp{amount},-
                </span>
                <span className="pt-2">{qty} x Transaksi</span>
            </div>
        </div>
    )
}