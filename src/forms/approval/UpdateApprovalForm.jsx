import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axiosInstance from "../../utils/axiosInstance";
import { getToken } from "../../utils/common";
import { toast } from "react-toastify";
import { MESSAGES, MODAL, PLACEHOLDERS } from "../../constants/string.const";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import Option from "../../components/Option";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import InputTextArea from "../../components/InputTextArea";

const UpdateApprovalForm = ({ journal }) => {
    const [currJournal, setCurrJournal] = useState(null);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        shouldFocusError: false,
        mode: "onSubmit",
        resolver: yupResolver(approvalFormSchema),
    });
    const authHeader = useAuthHeader();

    const updateApproval = async (formData) => {
        try {
            await axiosInstance.put(`/approval/${currJournal?.approval?.id}`, formData, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            toast.success(MESSAGES.approvals.updateSuccess);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.log(`${MESSAGES.approvals.updateError}: `, errorMessage);
            if (error.status !== 500) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(MESSAGES.submitError);
            }
        }
    };

    useEffect(() => {
        const getJournal = async () => {
            try {
                const response = await axiosInstance.get(`/learning-journal/${journal?.id}`, {
                    headers: {
                        jwt: getToken(authHeader)
                    }
                });
                const jrnl = response.data.data;
                setCurrJournal(jrnl);
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                console.log(`${MESSAGES.learningJournals.fetchError}: `, errorMessage);
                if (error.status !== 500) {
                    toast.error(error.response?.data?.message);
                } else {
                    toast.error(MESSAGES.submitError);
                }
            }
        };
        getJournal();
    }, [authHeader, journal]);

    const statusOption = [
        { id: 1, name: "pending" },
        { id: 2, name: "approved" },
        { id: 3, name: "rejected" }
    ];

    return (
        <div>
            {
                currJournal &&
                <form
                    className="mt-8 flex flex-col gap-2 p-12 bg-white rounded-3xl"
                    onSubmit={handleSubmit((formData) => {
                        updateApproval(transformFormData(formData));
                    })}
                >
                    <div className="mb-12">
                        <div className="flex justify-start items-center gap-4">
                            <h1 className="text-4xl text-slate-900 font-semibold">{MODAL.approval.detail.title}</h1>
                            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                            <p className="text-blue-500 px-6 py-1 bg-blue-100 rounded-full">
                                {`created By ${currJournal?.createdBy?.fullName}`}
                            </p>
                        </div>
                        <p className="text-slate-400 mt-4 max-w-md">{MODAL.approval.detail.description}</p>
                    </div>
                    <div className="w-full flex gap-4">
                        <div className="w-full">
                            <Option
                                label="Subject"
                                name="subjectId"
                                disabled
                                value={null}
                                placeholder={currJournal?.subject?.name}
                                options={[]}
                                invalid={!!errors.subjectId}
                            />
                            <p className="text-sm text-red-400">
                                {errors.subjectId?.message}
                            </p>
                        </div>
                        <div className="w-full">
                            <Input
                                disabled
                                name="date"
                                type="date"
                                label="Date"
                                defaultValue={currJournal?.date}
                                placeholder={PLACEHOLDERS.journalForm.date}
                                invalid={!!errors.date}
                            />
                            <p className="text-sm text-red-400">
                                {errors.date?.message}
                            </p>
                        </div>
                    </div>
                    <Input
                        disabled
                        name="learningMaterial"
                        type="text"
                        label="Learning Material"
                        defaultValue={currJournal?.learningMaterial}
                        placeholder={PLACEHOLDERS.journalForm.learningMaterial}
                        invalid={!!errors.learningMaterial}
                    />
                    <p className="text-sm text-red-400">
                        {errors.learningMaterial?.message}
                    </p>
                    <div className="flex w-full gap-4">
                        <div className="w-full">
                            <InputTextArea
                                disabled
                                name="learningActivity"
                                type="text"
                                label="Learning Activity"
                                defaultValue={currJournal?.learningActivity}
                                placeholder={PLACEHOLDERS.journalForm.learningActivity}
                                invalid={!!errors.learningActivity}
                            />
                            <p className="text-sm text-red-400">
                                {errors.learningActivity?.message}
                            </p>
                        </div>
                        <div className="w-full">
                            <InputTextArea
                                disabled
                                name="description"
                                type="text"
                                label="Description"
                                defaultValue={currJournal?.description}
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
                                defaultValue={statusOption.find(status => status.name === currJournal?.approval?.status)}
                                render={({ field: { value, onChange } }) => (
                                    <Option
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
                    <InputTextArea
                        {...register("description")}
                        name="description"
                        type="text"
                        label="Approval Description"
                        defaultValue={currJournal?.approval?.description}
                        placeholder={PLACEHOLDERS.approvalForm.description}
                        invalid={!!errors.description}
                    />
                    <p className="text-sm text-red-400">
                        {errors.description?.message}
                    </p>
                    <div className="mt-12 flex flex-col gap-4">
                        <Button type="submit">
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            }
        </div>
    )
}

UpdateApprovalForm.propTypes = {
    journal: PropTypes.any,
};

const approvalFormSchema = yup.object({
    status: yup.object().required(),
    description: yup.string().required(),
}).required();

const transformFormData = (data) => {
    return {
        description: data.description,
        status: data.status?.name,
    }
};

export default UpdateApprovalForm;
