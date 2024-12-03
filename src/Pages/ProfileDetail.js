import { useEffect, useState } from "react";
import { getUserData } from "../Services/Api";
import TransactionTable from "../Components/TransactionTable";
import Loading from "../Components/Loading";
import ProfileDataCard from "../Components/ProfileDataCard";

export default function ProfileDetail() {
    const [userData, setuserData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            setIsLoading(true);
            try {
                const data = await getUserData();
                console.log(data);
                setuserData(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch order detail');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetail();
    }, []);

    if (isLoading) {
        return (
            <Loading />
        );
    }
    const { data, transactions } = userData;

    return (
        <div className="mx-auto max-w-7xl  ">
            <div className="space-y-10 mx-10 text-xl">
                <section className="bg-white rounded-xl shadow mt-10">
                    <ProfileDataCard data={data} />
                </section>
                <section className=" overflow-hidden bg-white  ounded-xl shadow">
                    <h2 className="text-md font-medium uppercase tracking-wide text-gray-900 p-4 border-b">
                        Daftar Pengeluaran Oleh Anda
                    </h2>
                    <TransactionTable transactions={transactions} minimize={false} />
                </section>
            </div>
        </div>
    )
}   