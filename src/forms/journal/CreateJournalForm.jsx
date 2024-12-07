import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axiosInstance from "../../utils/axiosInstance";
import { getToken } from "../../utils/common";
import { MESSAGES, PLACEHOLDERS } from "../../constants/string.const";
import { toast } from "react-toastify";
import InputTextArea from "../../components/InputTextArea";
import Input from "../../components/Input";
import Button from "../../components/Button";
import PropTypes from "prop-types";

const CreateJournalForm = ({ afterSubmit, onCancel, subject }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        shouldFocusError: false,
        mode: "onSubmit",
        resolver: yupResolver(journalFormSchema),
    });
    const authHeader = useAuthHeader();

    const addLearning = async (formData) => {
        try {
            await axiosInstance.post("/learning-journal", formData, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            toast.success(MESSAGES.learningJournals.addSuccess);
            afterSubmit();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.log(`${MESSAGES.learningJournals.addError}: `, errorMessage);
            if (error.status !== 500) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(MESSAGES.submitError);
            }
        };
    };

    return (
        <div>
            {
                subject &&
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit((formData) => {
                        addLearning(transformFormData(formData, subject.id));
                    })}
                >
                    <Input
                        {...register("date")}
                        name="date"
                        type="date"
                        label="Date"
                        placeholder={PLACEHOLDERS.journalForm.date}
                        invalid={!!errors.date}
                    />
                    <p className="text-sm text-red-400">
                        {errors.date?.message}
                    </p>
                    <Input
                        {...register("learningMaterial")}
                        name="learningMaterial"
                        type="text"
                        label="Learning Material"
                        placeholder={PLACEHOLDERS.journalForm.learningMaterial}
                        invalid={!!errors.learningMaterial}
                    />
                    <p className="text-sm text-red-400">
                        {errors.learningMaterial?.message}
                    </p>
                    <InputTextArea
                        {...register("learningActivity")}
                        name="learningActivity"
                        type="text"
                        label="Learning Activity"
                        placeholder={PLACEHOLDERS.journalForm.learningActivity}
                        invalid={!!errors.learningActivity}
                    />
                    <p className="text-sm text-red-400">
                        {errors.learningActivity?.message}
                    </p>
                    <InputTextArea
                        {...register("description")}
                        name="description"
                        type="text"
                        label="Description"
                        placeholder={PLACEHOLDERS.journalForm.learningActivity}
                        invalid={!!errors.description}
                    />
                    <p className="text-sm text-red-400">
                        {errors.description?.message}
                    </p>
                    <div className="mt-12 flex flex-col gap-4">
                        <Button type="submit">
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onCancel}
                        >
                            Batal
                        </Button>
                    </div>
                </form>
            }
        </div>
    )
};

CreateJournalForm.propTypes = {
    afterSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    subject: PropTypes.any
};

const journalFormSchema = yup.object({
    learningMaterial: yup.string().required(),
    learningActivity: yup.string().required(),
    description: yup.string().required(),
    date: yup.date().required(),
}).required();

const transformFormData = (data, id) => {
    return {
        learningMaterial: data.learningMaterial,
        date: data.date,
        learningActivity: data.learningActivity,
        description: data.descripiton,
        subjectId: id,
    }
};

export default CreateJournalForm;
