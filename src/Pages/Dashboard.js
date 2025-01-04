import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import OrderList from '../Components/OrderList';
import DonutChart from '../Components/DonutChart';
import { ongoingOrders, showReportsByMonth } from "../Services/Api";
import Loading from '../Components/Loading';

export default function Dashboard() {
  const [monthlyReports, setMonthlyReports] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { currentMonth, currentYear } = useOutletContext();

  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      try {
        setMonthlyReports(await showReportsByMonth(currentMonth, currentYear));
        setOrderList(await ongoingOrders());
      } catch (err) {
        setError(err.message || 'Gagal mengambil data laporan');
        console.error('Error fetching reports:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, [currentMonth, currentYear]);


  const renderTransactionsSection = () =>
    transactions ? (
      <DonutChart percentage={data.percentage} />
    ) : (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-600">Belum ada transaksi pada bulan ini</p>
      </div>
    );

  const renderOrderSection = () =>
    orderList.length ? (
      <OrderList orders={orderList} />
    ) : (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-600">Belum ada pesanan dalam proses</p>
      </div>
    );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl bg-red-100 py-10 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!monthlyReports) {
    return null;
  }

  const { data, transactions } = monthlyReports;

  return (
    <div className="min-h-screen bg-gray-200 pt-40 pb-20">
      <div className="mx-auto max-w-7xl py-10">
        <div className="space-y-5 mx-10 text-xl">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-900">
            Sebaran Arus Kas Bulan Ini
          </h2>
          {renderTransactionsSection()}
          <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-900">
            Pesanan Dalam Proses
          </h2>
          {renderOrderSection()}
        </div>
      </div>
    </div>
  );
}
