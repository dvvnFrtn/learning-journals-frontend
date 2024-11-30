import { UserIcon, AcademicCapIcon, DocumentCheckIcon, DocumentPlusIcon } from "@heroicons/react/20/solid"
import { NavLink } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const Sidebar = () => {
    const auth = useAuthUser();
    const logOut = useSignOut();

    const items = [
        { id: 1, name: "Users", href: "/users", icon: (<UserIcon className="size-6" />), roles: ["admin"] },
        { id: 2, name: "Classes", href: "/classes", icon: (<AcademicCapIcon className="size-6" />), roles: ["admin"] },
        { id: 3, name: "Approvals", href: "/approvals", icon: (<DocumentCheckIcon className="size-6" />), roles: ["admin"] },
        { id: 3, name: "Jounals", href: "/journals", icon: (<DocumentPlusIcon className="size-6" />), roles: ["user"] }
    ]

    const filteredItems = items.filter((item) =>
        item.roles.includes(auth.role)
    );

    const handleLogout = () => {
        logOut();
        window.location.href = "/login";
    }

    return (
        <aside className="fixed w-64 min-h-screen bg-white text-slate-400 flex flex-col shadow-md">
            <div className="p-4 h-24 text-2xl font-bold text-slate-900 flex justify-center items-center">Dashboard</div>
            <hr />
            <nav className="flex-1 flex flex-col p-6 gap-6">
                {filteredItems.map((item) => (
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
            <div className="p-6">
                <button
                    onClick={handleLogout}
                    className="w-full p-6 flex items-center justify-center text-slate-400 bg-white rounded-xl hover:bg-slate-100 hover:text-slate-900"
                >
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar;
