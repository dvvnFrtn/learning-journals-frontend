import PropTypes from "prop-types";
import InputTextArea from "../../components/InputTextArea";
import Input from "../../components/Input";
import { PLACEHOLDERS } from "../../constants/string.const";
import Option from "../../components/Option";
import Button from "../../components/Button";

const DetailSubjectForm = ({ subject, afterSubmit, currentClass }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        afterSubmit();
    };

    return (
        <div>
            {
                subject &&
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit}
                >
                    <Input
                        disabled
                        name="name"
                        type="name"
                        label="Name"
                        defaultValue={subject?.name}
                        placeholder={PLACEHOLDERS.subjectForm.name}
                    />
                    <InputTextArea
                        disabled
                        name="description"
                        type="text"
                        label="Description"
                        defaultValue={subject?.description}
                        placeholder={PLACEHOLDERS.subjectForm.description}
                    />
                    <div className="w-full flex gap-4">
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

DetailSubjectForm.propTypes = {
    subject: PropTypes.object,
    afterSubmit: PropTypes.func.isRequired,
    currentClass: PropTypes.any,
};

export default DetailSubjectForm;
