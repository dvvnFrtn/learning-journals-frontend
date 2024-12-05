import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../../components/Input";
import { MESSAGES, PLACEHOLDERS } from "../../constants/string.const";
import Option from "../../components/Option";
import Button from "../../components/Button";
import { getToken } from "../../utils/common";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const UpdateStudentForm = ({ student, afterSubmit, onCancel, currentClass }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        shouldFocusError: false,
        mode: "onSubmit",
        resolver: yupResolver(studentFormSchema),
    });
    const authHeader = useAuthHeader();

    const genderOption = [
        { id: 1, name: "male" },
        { id: 2, name: "female" }
    ];

    const updateStudent = async (formData) => {
        try {
            await axiosInstance.put(`/students/${student?.id}`, formData, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            toast.success(MESSAGES.students.updateSuccess);
            afterSubmit();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.log(`${MESSAGES.students.updateError}: `, errorMessage);
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
                student &&
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit((formData) => {
                        updateStudent(transformFormData(formData));
                    })}
                >
                    <Input
                        {...register("name")}
                        name="name"
                        type="text"
                        label="Name"
                        defaultValue={student?.name}
                        placeholder={PLACEHOLDERS.studentForm.name}
                        invalid={!!errors.name}
                    />
                    <p className="text-sm text-red-400">
                        {errors.name?.message}
                    </p>
                    <div className="w-full flex gap-4">
                        <div className="w-full">
                            <Controller
                                name="gender"
                                control={control}
                                defaultValue={genderOption.find(gender => gender.name === student?.gender)}
                                render={({ field: { value, onChange } }) => (
                                    <Option
                                        name="gender"
                                        value={value}
                                        placeholder={PLACEHOLDERS.studentForm.gender}
                                        onChange={(selected) => onChange(selected)}
                                        options={genderOption}
                                        invalid={!!errors.gender}
                                    />
                                )}
                            />
                            <p className="text-sm text-red-400">
                                {errors.gender?.message}
                            </p>
                        </div>
                        <div className="w-full">
                            <Controller
                                name="classId"
                                control={control}
                                defaultValue={currentClass}
                                render={({ field: { value, onChange } }) => (
                                    <Option
                                        disabled
                                        name="classId"
                                        value={value}
                                        placeholder={PLACEHOLDERS.studentForm.selectClass}
                                        onChange={(selected) => onChange(selected)}
                                        options={[]}
                                    />
                                )}
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

UpdateStudentForm.propTypes = {
    student: PropTypes.object,
    afterSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    currentClass: PropTypes.any
};

const studentFormSchema = yup.object({
    name: yup.string().required(),
    gender: yup.object().required(),
    classId: yup.object().required(),
}).required();

const transformFormData = (data) => {
    return {
        name: data.name,
        gender: data.gender?.name,
        classId: data.classId?.id,
    }
};

export default UpdateStudentForm;
