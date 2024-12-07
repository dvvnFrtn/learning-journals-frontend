import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { MESSAGES, PLACEHOLDERS } from "../../constants/string.const";
import { Controller, useForm } from "react-hook-form";
import Option from "../../components/Option";
import Button from "../../components/Button";
import axiosInstance from "../../utils/axiosInstance";
import { getToken } from "../../utils/common";
import { toast } from "react-toastify";
import InputTextArea from "../../components/InputTextArea";

const UpdateAbsentForm = ({ afterSubmit, onCancel, journal, absent }) => {
    const [students, setStudents] = useState([]);
    const authHeader = useAuthHeader();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        shouldFocusError: false,
        mode: "onSubmit",
        resolver: yupResolver(absentFormSchema),
    });

    const updateAbsent = async (formData) => {
        try {
            await axiosInstance.put(`/student-absent/${absent?.id}`, formData, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            toast.success(MESSAGES.studentAbsents.updateSuccess);
            afterSubmit();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.log(`${MESSAGES.studentAbsents.updateError}: `, errorMessage);
            if (error.status !== 500) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(MESSAGES.submitError);
            }
        };
    };

    useEffect(() => {
        const controller = new AbortController();

        const getStudents = async () => {
            try {
                const response = await axiosInstance.get("/students", {
                    headers: {
                        jwt: getToken(authHeader)
                    }
                });
                const stdns = response.data.data;
                setStudents(stdns);
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                console.log(`${MESSAGES.students.fetchError}: `, errorMessage);
                if (error.status !== 500) {
                    toast.error(error.response?.data?.message);
                } else {
                    toast.error(MESSAGES.submitError);
                }
            };
        };

        getStudents();

        return () => {
            controller.abort();
        }
    }, [authHeader]);

    return (
        <div>
            {
                students.length !== 0 &&
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit((formData) => {
                        updateAbsent(transformFormData(formData, journal?.id));
                    })}
                >
                    <div className="flex w-full gap-4">
                        <div className="w-full">
                            <Controller
                                name="studentId"
                                control={control}
                                defaultValue={students.find(student => student.name === absent?.student?.name)}
                                render={({ field: { value, onChange } }) => (
                                    <Option
                                        name="studentId"
                                        value={value}
                                        placeholder={PLACEHOLDERS.absentForm.selectStudent}
                                        onChange={(selected) => onChange(selected)}
                                        options={students}
                                        invalid={!!errors.studentId}
                                    />
                                )}
                            />
                            <p className="text-sm text-red-400">
                                {errors.studentId?.message}
                            </p>
                        </div>
                    </div>
                    <InputTextArea
                        {...register("description")}
                        name="description"
                        type="text"
                        label="Absent Description"
                        defaultValue={absent?.description}
                        placeholder={PLACEHOLDERS.absentForm.description}
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

UpdateAbsentForm.propTypes = {
    afterSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    journal: PropTypes.any,
    absent: PropTypes.any
};

const absentFormSchema = yup.object({
    description: yup.string().required(),
    studentId: yup.object().required(),
}).required();

const transformFormData = (data, id) => {
    return {
        description: data.description,
        learningJournalId: id,
        studentId: data.studentId?.id,
    }
};

export default UpdateAbsentForm;
