const UnauthorizedPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-24 shadow-sm rounded-xl">
                <h1 className="text-4xl font-bold text-slate-500">403</h1>
                <h2 className="text-2xl font-semibold text-slate-900 mt-4">
                    Akses Ditolak
                </h2>
                <p className="text-slate-400 mt-2">
                    Anda tidak memiliki izin untuk mengakses halaman ini.
                </p>
            </div>
        </div>
    )
}

export default UnauthorizedPage;
