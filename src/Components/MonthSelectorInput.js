import { useMemo } from 'react';

const MonthSelectorInput = ({
    selectedMonth,
    onChangeMonth
}) => {
    const months = useMemo(() =>
        [...Array(12)].map((_, i) => ({
            value: i + 1,
            label: new Date(0, i).toLocaleString('id-ID', { month: 'long' })
        })),
        []
    );

    return (
        <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Bulan:</label>
            <select
                value={selectedMonth}
                onChange={onChangeMonth}
                className="rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
                {months.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MonthSelectorInput;