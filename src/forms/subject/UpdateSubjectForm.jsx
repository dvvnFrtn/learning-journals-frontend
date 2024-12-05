import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../../components/Input";
import { MESSAGES, PLACEHOLDERS } from "../../constants/string.const";
import Option from "../../components/Option";
import Button from "../../components/Button";
import { getToken } from "../../utils/common";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import InputTextArea from "../../components/InputTextArea";

const UpdateSubjectForm = ({ subject, afterSubmit, onCancel, currentClass }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        shouldFocusError: false,
        mode: "onSubmit",
        resolver: yupResolver(subjectFormSchema),
    });
    const authHeader = useAuthHeader();

    const updateSubject = async (formData) => {
        try {
            await axiosInstance.put(`/subjects/${subject?.id}`, formData, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            toast.success(MESSAGES.subjects.updateSuccess);
            afterSubmit();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.log(`${MESSAGES.subjects.updateError}: `, errorMessage);
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
                        updateSubject(formData);
                    })}
                >
                    <Input
                        {...register("name")}
                        name="name"
                        type="text"
                        label="Name"
                        defaultValue={subject?.name}
                        placeholder={PLACEHOLDERS.subjectForm.name}
                        invalid={!!errors.name}
                    />
                    <p className="text-sm text-red-400">
                        {errors.name?.message}
                    </p>
                    <InputTextArea
                        {...register("description")}
                        name="description"
                        type="text"
                        label="Description"
                        defaultValue={subject?.description}
                        placeholder={PLACEHOLDERS.subjectForm.description}
                        invalid={!!errors.description}
                    />
                    <p className="text-sm text-red-400">
                        {errors.description?.message}
                    </p>
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

UpdateSubjectForm.propTypes = {
    subject: PropTypes.object,
    afterSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    currentClass: PropTypes.any
};

const subjectFormSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
}).required();

export default UpdateSubjectForm;
