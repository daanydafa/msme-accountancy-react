export default function FormLayout({ children }) {
    return (
        <div class="flex min-h-screen justify-center bg-gray-100 font-medium">
            <div class="w-full p-4 rounded-lg mt-28">
                {children}
            </div>
        </div>
    );
}
