import { UserIcon, AcademicCapIcon, DocumentCheckIcon } from "@heroicons/react/20/solid"

const Sidebar = () => {
    const items = [
        { id: 1, name: "User", href: "#", icon: (<UserIcon className="size-6" />) },
        { id: 2, name: "Class", href: "#", icon: (<AcademicCapIcon className="size-6" />) },
        { id: 3, name: "Approval", href: "#", icon: (<DocumentCheckIcon className="size-6" />) }
    ]
    return (
        <aside className="fixed w-64 min-h-screen bg-white text-slate-500 flex flex-col shadow-md">
            <div className="p-4 h-24 text-2xl font-bold text-slate-900 flex justify-center items-center">Dashboard</div>
            <hr />
            <nav className="flex-1 flex flex-col p-6 gap-6">
                {items.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        className="flex items-center gap-2 py-2 px-4 rounded font-medium hover:bg-slate-100 hover:text-slate-900 transition"
                    >
                        {
                            <>
                                {item.icon}
                                {item.name}
                            </>
                        }
                    </a>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar;
