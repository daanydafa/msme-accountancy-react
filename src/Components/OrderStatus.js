export default function OrderStatus({ status, date, id }) {
    return (
        <div className="w-full md:w-3/4 bg-base-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-4 mt-2 border-b border-gray-300 ">
                {(() => {
                    switch (status) {
                        case 'pending':
                            return 'Menunggu Pembayaran DP';
                        case 'processing':
                            return 'Sedang Dalam Masa Produksi';
                        case 'finished':
                            return 'Pesanan Selesai';
                        default:
                            return 'Tidak Diketahui';
                    }
                })()}
            </h2>
            <span className="flex">
                ID: <div className="font-bold ml-2">{id}</div>
            </span>
            <div className="flex justify-between items-center">
                <span className="">Tanggal Pesanan</span>
                <span className="text-gray-900 font-bold">{date}</span>
            </div>
        </div>
    )
}
