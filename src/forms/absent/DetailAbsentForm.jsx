import PropTypes from "prop-types";
import { PLACEHOLDERS } from "../../constants/string.const";
import Option from "../../components/Option";
import Button from "../../components/Button";
import InputTextArea from "../../components/InputTextArea";

const DetailAbsentForm = ({ afterSubmit, absent }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        afterSubmit();
    };

    return (
        <div>
            {
                absent &&
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit}
                >
                    <Option
                        name="studentId"
                        disabled
                        value={null}
                        placeholder={absent?.student?.name}
                        options={[]}
                    />
                    <InputTextArea
                        name="description"
                        type="text"
                        label="Absent Description"
                        defaultValue={absent?.description}
                        disabled
                        placeholder={PLACEHOLDERS.absentForm.description}
                    />
                    <div className="mt-12 flex flex-col gap-4">
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

DetailAbsentForm.propTypes = {
    afterSubmit: PropTypes.func.isRequired,
    absent: PropTypes.any
};

export default DetailAbsentForm;
