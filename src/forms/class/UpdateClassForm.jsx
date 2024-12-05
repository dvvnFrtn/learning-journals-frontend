import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { getToken } from "../../utils/common";
import { MESSAGES, PLACEHOLDERS } from "../../constants/string.const";
import Input from "../../components/Input";
import InputTextArea from "../../components/InputTextArea";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UpdateClassForm = ({ afterSubmit, onCancel, dataClass }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        shouldFocusError: false,
        mode: "onSubmit",
        resolver: yupResolver(classFormSchema),
    });
    const authHeader = useAuthHeader();

    const updateClass = async (formData) => {
        try {
            await axiosInstance.put(`/class/${dataClass?.id}`, formData, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            toast.success(MESSAGES.classes.updateSuccess);
            afterSubmit();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.log(`${MESSAGES.classes.updateError}: `, errorMessage);
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
                dataClass &&
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit((formData) => {
                        updateClass(formData);
                    })}
                >
                    <Input
                        {...register("name")}
                        name="name"
                        type="text"
                        label="Name"
                        placeholder={PLACEHOLDERS.classForm.name}
                        defaultValue={dataClass?.name}
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
                        placeholder={PLACEHOLDERS.classForm.description}
                        defaultValue={dataClass?.description}
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

UpdateClassForm.propTypes = {
    onCancel: PropTypes.func.isRequired,
    afterSubmit: PropTypes.func.isRequired,
    dataClass: PropTypes.object,
};

const classFormSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
}).required();

export default UpdateClassForm;
