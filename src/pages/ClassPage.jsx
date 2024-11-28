import { PlusIcon } from "@heroicons/react/20/solid";
import Button from "../components/Button";
import DashboardLayout from "../layouts/DashboardLayout";


const ClassPage = () => {
    return (
        <DashboardLayout>
            <div className="flex w-full gap-2 flex-col">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-6xl text-slate-900">Class</h1>
                    <Button
                        variant="primary"
                    >
                        <PlusIcon className="size-6 fill-white" />
                        <span>Add Class</span>
                    </Button>
                </div>
                <p className="text-slate-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </DashboardLayout>
    )
}

export default ClassPage;
