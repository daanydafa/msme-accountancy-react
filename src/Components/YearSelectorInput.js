const YearSelectorInput = ({
    selectedYear,
    onChangeYear,
    minYear = 2000,
    maxYear = 2100
}) => {
    return (
        <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Tahun:</label>
            <input
                type="number"
                value={selectedYear}
                onChange={onChangeYear}
                className="rounded-md border border-gray-300 shadow-sm p-2 w-24 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                min={minYear}
                max={maxYear}
            />
        </div>
    );
};

export default YearSelectorInput;