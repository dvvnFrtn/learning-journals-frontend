import PropTypes from "prop-types";
import Input from "../../components/Input";
import { PLACEHOLDERS } from "../../constants/string.const";
import Option from "../../components/Option";
import Button from "../../components/Button";

const DetailStudentForm = ({ student, afterSubmit, currentClass }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        afterSubmit();
    };

    return (
        <div>
            {
                student &&
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit}
                >
                    <Input
                        disabled
                        name="name"
                        type="name"
                        label="Name"
                        defaultValue={student?.name}
                        placeholder={PLACEHOLDERS.studentForm.name}
                    />
                    <div className="w-full flex gap-4">
                        <div className="w-full">
                            <Option
                                disabled
                                name="gender"
                                value={null}
                                placeholder={student?.gender}
                                options={[]}
                            />
                        </div>
                        <div className="w-full">
                            <Option
                                disabled
                                name="classId"
                                value={currentClass}
                                placeholder={"Select class"}
                                options={[]}
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

DetailStudentForm.propTypes = {
    student: PropTypes.object,
    afterSubmit: PropTypes.func.isRequired,
    currentClass: PropTypes.any,
};

export default DetailStudentForm;
