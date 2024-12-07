import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axiosInstance from "../../utils/axiosInstance";
import { getToken } from "../../utils/common";
import { MESSAGES, MODAL, PLACEHOLDERS } from "../../constants/string.const";
import { toast } from "react-toastify";
import InputTextArea from "../../components/InputTextArea";
import Input from "../../components/Input";
import Button from "../../components/Button";
import PropTypes from "prop-types";
import Option from "../../components/Option";

const UpdateJournalForm = ({ subject, journal }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        shouldFocusError: false,
        mode: "onSubmit",
        resolver: yupResolver(journalFormSchema),
    });
    const authHeader = useAuthHeader();

    const statusOption = [
        { id: 1, name: "pending" },
        { id: 2, name: "approved" },
        { id: 3, name: "rejected" }
    ];

    const updateLearning = async (formData) => {
        try {
            await axiosInstance.put(`/learning-journal/${journal?.id}`, formData, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            toast.success(MESSAGES.learningJournals.updateSuccess);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.log(`${MESSAGES.learningJournals.updateError}: `, errorMessage);
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
                    className="mt-8 flex flex-col gap-2 p-12 bg-white rounded-3xl"
                    onSubmit={handleSubmit((formData) => {
                        updateLearning(transformFormData(formData, subject?.id));
                    })}
                >
                    <div className="mb-12">
                        <h1 className="text-4xl text-slate-900 font-semibold">{MODAL.journal.detail.title}</h1>
                        <p className="text-slate-400 mt-4 max-w-md">{MODAL.journal.detail.description}</p>
                    </div>
                    <div className="w-full flex gap-4">
                        <div className="w-full">
                            <Option
                                label="Subject"
                                name="subjectId"
                                disabled
                                value={subject}
                                placeholder={PLACEHOLDERS.studentForm.gender}
                                options={[]}
                                invalid={!!errors.subjectId}
                            />
                            <p className="text-sm text-red-400">
                                {errors.subjectId?.message}
                            </p>
                        </div>
                        <div className="w-full">
                            <Input
                                {...register("date")}
                                name="date"
                                type="date"
                                label="Date"
                                defaultValue={journal?.date}
                                placeholder={PLACEHOLDERS.journalForm.date}
                                invalid={!!errors.date}
                            />
                            <p className="text-sm text-red-400">
                                {errors.date?.message}
                            </p>
                        </div>
                    </div>
                    <Input
                        {...register("learningMaterial")}
                        name="learningMaterial"
                        type="text"
                        label="Learning Material"
                        defaultValue={journal?.learningMaterial}
                        placeholder={PLACEHOLDERS.journalForm.learningMaterial}
                        invalid={!!errors.learningMaterial}
                    />
                    <p className="text-sm text-red-400">
                        {errors.learningMaterial?.message}
                    </p>
                    <div className="flex w-full gap-4">
                        <div className="w-full">
                            <InputTextArea
                                {...register("learningActivity")}
                                name="learningActivity"
                                type="text"
                                label="Learning Activity"
                                defaultValue={journal?.learningActivity}
                                placeholder={PLACEHOLDERS.journalForm.learningActivity}
                                invalid={!!errors.learningActivity}
                            />
                            <p className="text-sm text-red-400">
                                {errors.learningActivity?.message}
                            </p>
                        </div>
                        <div className="w-full">
                            <InputTextArea
                                {...register("description")}
                                name="description"
                                type="text"
                                label="Description"
                                defaultValue={journal?.description}
                                placeholder={PLACEHOLDERS.journalForm.description}
                                invalid={!!errors.description}
                            />
                            <p className="text-sm text-red-400">
                                {errors.description?.message}
                            </p>
                        </div>
                    </div>
                    <div className="my-8">
                        <h1 className="text-4xl text-slate-900 font-semibold">{MODAL.approval.detail.title}</h1>
                        <p className="text-slate-400 mt-4 max-w-md">{MODAL.approval.detail.description}</p>
                    </div>
                    <div className="flex w-full gap-4">
                        <div className="w-full">
                            <Controller
                                name="status"
                                control={control}
                                defaultValue={statusOption.find(status => status.name === journal.statusApproval)}
                                render={({ field: { value, onChange } }) => (
                                    <Option
                                        disabled
                                        name="status"
                                        value={value}
                                        placeholder={PLACEHOLDERS.approvalForm.status}
                                        onChange={(selected) => onChange(selected)}
                                        options={statusOption}
                                        invalid={!!errors.status}
                                    />
                                )}
                            />
                            <p className="text-sm text-red-400">
                                {errors.status?.message}
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col gap-4">
                        <Button type="submit">
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            }
        </div>
    )
};

UpdateJournalForm.propTypes = {
    subject: PropTypes.any,
    journal: PropTypes.any
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
        description: data.description,
        subjectId: id,
    }
};

export default UpdateJournalForm;
