import StatusBadge from "./StatusBadge";

export default function ItemList({ items }) {
    return !items ? noItem() : isItems(items)
}

const isItems = (items) => {
    return items.map((data, i) => {

        return (
            <div key={i} className="w-full md:w-3/4 bg-base-100 pb-6">
                <div  className="card border border-gray-200 rounded-2xl shadow shadow-lg">
                    <div className="p-8">
                        <div className="flex justify-between items-end pb-1">
                            <div className="inline-block">
                                <p className="text-gray-700 text-2xl font-bold">
                                    {data.item_name}
                                </p>
                                <p className="text-gray-700 text-lg">
                                    x {data.quantity}
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <div>
                                    <p className="text-gray-700 text-lg">
                                        Biaya
                                    </p>
                                </div>
                                <div className="font-bold">
                                    {data.items_price}
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        )
    })
}

const noItem = () => {
    return (
        <div>Belum ada transaksi pada pesanan ini</div>
    )
}