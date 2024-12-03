export default function OrderInfo({ name, num, price, date }) {
    return (
        <div className="w-full md:w-3/4 bg-base-100 tracking-wide">
            <div className="flex items-center mb-2 ">
                <span className="w-1/2">Pemesan</span>
                <span className="text-gray-900 font-bold">{name}</span>
            </div>
            <div className="flex items-center mb-2">
                <span className="w-1/2">Kontak Pemesan</span>
                <span className="text-gray-900 font-bold">{num}</span>
            </div>
            <div className="flex items-center mb-2">
                <span className="w-1/2">Kesepakatan Harga</span>
                <span className="text-gray-900 font-bold">Rp{price}</span>
            </div>
            <div className="flex items-center mb-2">
                <span className="w-1/2">Estimasi Selesai</span>
                <span className="text-gray-900 font-bold">{date}</span>
            </div>
        </div>

    )
}
