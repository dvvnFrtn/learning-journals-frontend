import { UserIcon, AcademicCapIcon, DocumentCheckIcon } from "@heroicons/react/20/solid"
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const items = [
        { id: 1, name: "User", href: "/user", icon: (<UserIcon className="size-6" />) },
        { id: 2, name: "Class", href: "/class", icon: (<AcademicCapIcon className="size-6" />) },
        { id: 3, name: "Approval", href: "/approval", icon: (<DocumentCheckIcon className="size-6" />) }
    ]
    return (
        <aside className="fixed w-64 min-h-screen bg-white text-slate-400 flex flex-col shadow-md">
            <div className="p-4 h-24 text-2xl font-bold text-slate-900 flex justify-center items-center">Dashboard</div>
            <hr />
            <nav className="flex-1 flex flex-col p-6 gap-6">
                {items.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.href}
                        className={({ isActive }) =>
                            `flex items-center gap-2 py-2 px-4 rounded font-medium transition ${isActive ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-100 hover:text-slate-900'
                            }`
                        }
                    >
                        {
                            <>
                                {item.icon}
                                {item.name}
                            </>
                        }
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar;
