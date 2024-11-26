import { PlusIcon } from "@heroicons/react/20/solid";
import Button from "../components/Button";
import Input from "../components/Input";
import Option from "../components/Option";
import DashboardLayout from "../layouts/DashboardLayout";
import Modal from "../components/Modal";
import { useState } from "react";
import Card from "../components/Card";

const ExamplePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const people = [
        { id: 1, name: 'Durward Reynolds' },
        { id: 2, name: 'Kenton Towne' },
        { id: 3, name: 'Therese Wunsch' },
        { id: 4, name: 'Benedict Kessler' },
        { id: 5, name: 'Katelyn Rohan' },
    ]

    return (
        <DashboardLayout>
            <div className="flex w-full gap-2 flex-col">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-6xl text-slate-900">User</h1>
                    <Button
                        variant="primary"
                    >
                        <PlusIcon className="size-6 fill-white" />
                        <span>Hello</span>
                    </Button>
                </div>
                <p className="text-slate-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <Input
                label="Journal"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                name="journal"
                type="text"
                placeholder="Type here.."
            />
            <Option name="list" options={people} />
            <Button
                variant="secondary"
                onClick={() => setIsOpen(true)}
            >
                Open
            </Button>
            <Modal title="Add User" description="Please add new user in the form below." open={isOpen} onClose={() => setIsOpen(false)}>
                <Input
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Please type user name..."
                />
            </Modal>
            <div className="grid grid-cols-2 gap-2">
                <Card title="Kelas Satu" onClick={() => console.log("card clicked")}>
                    <p className="text-base text-slate-400">Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm. Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.</p>
                </Card>
                <Card title="Kelas Dua">
                    <p className="text-base text-slate-400">Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.</p>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default ExamplePage;
