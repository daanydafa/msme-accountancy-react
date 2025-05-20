import React from 'react';

const YearSelectorInput = ({
    selectedYear,
    onChangeYear,
    minYear = 2000,
    maxYear = 2100
}) => {
    const yearOptions = Array.from(
        { length: maxYear - minYear + 1 },
        (_, i) => minYear + i
    );

    return (
        <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Tahun:</label>
            <select
                value={selectedYear}
                onChange={e => onChangeYear(Number(e.target.value))}
                className="rounded-md border border-gray-300 shadow-sm p-2 w-28 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
                {yearOptions.map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default YearSelectorInput;
