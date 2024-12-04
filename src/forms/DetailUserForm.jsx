import PropTypes from "prop-types";
import Input from "../components/Input";
import { PLACEHOLDERS } from "../constants/string.const";
import Option from "../components/Option";
import Button from "../components/Button";

const DetailUserForm = ({ user, afterSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        afterSubmit();
    };

    return (
        <div>
            {
                user &&
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit}
                >
                    <Input
                        disabled
                        name="email"
                        type="email"
                        label="Email"
                        defaultValue={user?.email}
                        placeholder={PLACEHOLDERS.userForm.email}
                    />
                    <Input
                        disabled
                        name="fullName"
                        type="text"
                        label="Fullname"
                        defaultValue={user?.fullName}
                        placeholder={PLACEHOLDERS.userForm.fullName}
                    />
                    <div className="w-full flex gap-4">
                        <div className="w-full">
                            <Option
                                disabled
                                name="roleId"
                                value={user?.role}
                                placeholder={PLACEHOLDERS.userForm.selectRole}
                                options={[]}
                            />
                        </div>
                        <div className="w-full">
                            <Option
                                disabled
                                name="classId"
                                value={user?.class}
                                options={[]}
                                placeholder={PLACEHOLDERS.userForm.selectClass}
                            />
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col">
                        <Button
                            variant="outline"
                            type="submit"
                        >
                            Close
                        </Button>
                    </div>
                </form>
            }
        </div >
    )
};

DetailUserForm.propTypes = {
    user: PropTypes.object,
    afterSubmit: PropTypes.func.isRequired,
};

export default DetailUserForm;
