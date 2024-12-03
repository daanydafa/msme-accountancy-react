export default function LoginLayout({ children }) {
    return (
        <div className="flex bg-gray-900 min-h-screen items-center">
            <div className="flex flex-col w-3/4 md:w-1/4 justify-center mx-auto items-center bg-gray-100 rounded-xl shadow-md font-medium">
                <h2 className="flex justify-center mt-6 text-2xl font-semibold leading-tight text-gray-800">
                    Login
                </h2>
                <div className="p-8 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
