const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-24 shadow-sm rounded-xl">
                <h1 className="text-4xl font-bold text-slate-500">404</h1>
                <h2 className="text-2xl font-semibold text-slate-900 mt-4">
                    Not Found
                </h2>
                <p className="text-slate-400 mt-2">
                    Halaman tidak ditemukan.
                </p>
            </div>
        </div>
    )
}

export default NotFoundPage;
