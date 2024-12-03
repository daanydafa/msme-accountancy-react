export default function FormLayout({ children }) {
    return (
        <div className="flex">
            <div className="flex w-full  justify-center bg-gray-100 font-medium">
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
