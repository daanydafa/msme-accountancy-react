import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AmountSummary from '../Components/AmountSummary';
import TransactionTable from "../Components/TransactionTable";
import ReimbursmentSummary from "../Components/ReimbursmentSummary";
import DonutChart from '../Components/DonutChart';
import { showReportsByMonth } from "../Services/Api";
import Loading from '../Components/Loading';
import MonthSelectorInput from '../Components/MonthSelectorInput';
import YearSelectorInput from '../Components/YearSelectorInput';

export default function Reports() {
    const [monthlyReports, setMonthlyReports] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { month, year } = useParams();

    const handleChangeMonth = (e) => {
        const newMonth = e.target.value;
        navigate(`/reports/${newMonth}/${year}`);
    };

    const handleChangeYear = (e) => {
        const newYear = e.target.value;
        if (newYear >= 2000 && newYear <= 2100) {
            navigate(`/reports/${month}/${newYear}`);
        }
    };

    const fetchReportData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await showReportsByMonth(month, year);
            setMonthlyReports(data);
            console.log(data);

        } catch (err) {
            setError(err.message || 'Gagal mengambil data laporan');
            console.error('Error fetching reports:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReportData();
    }, [month, year]);

    if (isLoading) {
        return (
            <div className='h-96'>
                <Loading />
            </div>
        );
    }

    const getMonthName = () => {
        return new Date(0, parseInt(month) - 1).toLocaleString('id-ID', { month: 'long' });
    };

    if (!monthlyReports.transactions) {
        return (
            <div className="min-h-screen bg-gray-200 pt-40 pb-20">
                <div className="mx-auto max-w-7xl py-10 tracking-wide text-xl text-gray-900">
                    <div className="space-y-5 mx-10">
                        <div className="flex justify-end gap-4">
                            <MonthSelectorInput
                                selectedMonth={month}
                                onChangeMonth={handleChangeMonth}
                            />
                            <YearSelectorInput
                                selectedYear={year}
                                onChangeYear={handleChangeYear}
                            />
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <p className="text-gray-600">Belum ada transaksi pada bulan {getMonthName()} tahun {year}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const { data, transactions } = monthlyReports;

    return (
        <div className="min-h-screen bg-gray-200 pt-40 pb-20">
            <div className="mx-auto max-w-7xl py-10 tracking-wide text-xl text-gray-900">
                <div className="space-y-5 mx-10">
                    <div className="flex justify-end gap-4">
                        <MonthSelectorInput
                            selectedMonth={month}
                            onChangeMonth={handleChangeMonth}
                        />
                        <YearSelectorInput
                            selectedYear={year}
                            onChangeYear={handleChangeYear}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <AmountSummary
                            type="income"
                            amount={data.totalIncome}
                            qty={data.incomeCount}
                        />
                        <AmountSummary
                            type="expense"
                            amount={data.totalExpense}
                            qty={data.expenseCount}
                        />
                    </div>
                    <section className="bg-white rounded-lg shadow ">
                        <h2 className="text-md font-medium uppercase p-4 border-b">
                            Sebaran Arus Kas
                        </h2>
                        <DonutChart percentage={data.percentage} />
                    </section>

                    <section className="bg-white rounded-lg shadow">
                        <h2 className="text-md font-medium uppercase p-4 border-b">
                            Daftar Transaksi
                        </h2>
                        <TransactionTable transactions={transactions.data} isMinimize={true} />
                    </section>

                    <section className="bg-white rounded-lg shadow">
                        <h2 className="text-md font-medium uppercase p-4 border-b">
                            Ringkasan Reimbursement
                        </h2>
                        <ReimbursmentSummary reimbursements={data.reimbursements} onUpdate={fetchReportData} />
                    </section>
                </div>
            </div>
        </div>
    );
}