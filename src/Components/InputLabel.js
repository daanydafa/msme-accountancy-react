export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-xl md:text-sm text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    );
}