import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../components/Input";
import { MESSAGES, PLACEHOLDERS } from "../constants/string.const";
import Option from "../components/Option";
import Button from "../components/Button";
import { getToken } from "../utils/common";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const UpdateUserForm = ({ user, afterSubmit, onCancel }) => {
    const [roles, setRoles] = useState([]);
    const [classes, setClasses] = useState([]);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        shouldFocusError: false,
        mode: "onSubmit",
        resolver: yupResolver(userFormSchema),
    });
    const authHeader = useAuthHeader();

    const updateUser = async (formData) => {
        try {
            await axiosInstance.put(`/users/${user?.id}`, formData, {
                headers: {
                    jwt: getToken(authHeader)
                }
            });
            toast.success(MESSAGES.users.updateSuccess);
            afterSubmit();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.log(`${MESSAGES.users.updateError}: `, errorMessage);
            if (error.status !== 500) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(MESSAGES.submitError);
            }
        };
    };

    useEffect(() => {
        const controller = new AbortController();

        const getRoles = async () => {
            try {
                const response = await axiosInstance.get("/roles", {
                    headers: {
                        jwt: getToken(authHeader)
                    },
                    signal: controller.signal
                });
                setRoles(response.data.data)
            } catch (error) {
                if (error.name !== "CanceledError") {
                    const errorMessage = error.response?.data?.message || error.message;
                    console.log(`${MESSAGES.roles.fetchError}: `, errorMessage);
                    if (error.status !== 500) {
                        toast.error(error.response?.data?.message);
                    } else {
                        toast.error(MESSAGES.submitError);
                    }
                }
            }
        };
        const getClass = async () => {
            try {
                const response = await axiosInstance.get("/class", {
                    headers: {
                        jwt: getToken(authHeader)
                    },
                    signal: controller.signal
                });
                setClasses([{ id: null, name: "None" }, ...response.data.data]);
            } catch (error) {
                if (error.name !== "CanceledError") {
                    const errorMessage = error.response?.data?.message || error.message;
                    console.log(`${MESSAGES.classes.fetchError}: `, errorMessage);
                    if (error.status !== 500) {
                        toast.error(error.response?.data?.message);
                    } else {
                        toast.error(MESSAGES.submitError);
                    }
                }
            }
        };

        getRoles();
        getClass();

        return () => {
            controller.abort();
        };
    }, [authHeader]);

    return (
        <div>
            {
                user &&
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit((formData) => {
                        updateUser(transformFormData(formData));
                    })}
                >
                    <Input
                        {...register("email")}
                        name="email"
                        type="email"
                        label="Email"
                        defaultValue={user?.email}
                        placeholder={PLACEHOLDERS.userForm.email}
                        invalid={!!errors.email}
                    />
                    <p className="text-sm text-red-400">
                        {errors.email?.message}
                    </p>
                    <Input
                        {...register("fullName")}
                        name="fullName"
                        type="text"
                        label="Fullname"
                        defaultValue={user?.fullName}
                        placeholder={PLACEHOLDERS.userForm.fullName}
                        invalid={!!errors.fullName}
                    />
                    <p className="text-sm text-red-400">
                        {errors.fullName?.message}
                    </p>
                    <div className="flex w-full gap-4">
                        <div className="w-full">
                            <Controller
                                name="roleId"
                                control={control}
                                defaultValue={user?.role}
                                render={({ field: { value, onChange } }) => (
                                    <Option
                                        name="roleId"
                                        value={value}
                                        placeholder={PLACEHOLDERS.userForm.selectRole}
                                        onChange={(selected) => onChange(selected)}
                                        options={roles}
                                        invalid={!!errors.roleId}
                                    />
                                )}
                            />
                            <p className="text-sm text-red-400">
                                {errors.roleId?.message}
                            </p>
                        </div>
                        <div className="w-full">
                            <Controller
                                name="classId"
                                control={control}
                                defaultValue={user?.class}
                                render={({ field: { value, onChange } }) => (
                                    <Option
                                        name="classId"
                                        value={value}
                                        placeholder={PLACEHOLDERS.userForm.selectClass}
                                        onChange={(selected) => onChange(selected.id === null ? null : selected)}
                                        options={classes}
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

UpdateUserForm.propTypes = {
    user: PropTypes.object,
    afterSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const userFormSchema = yup.object({
    email: yup.string().email().required(),
    fullName: yup.string().required(),
    roleId: yup.object().required(),
}).required();

const transformFormData = (data) => {
    return {
        email: data.email,
        fullName: data.fullName,
        roleId: data.roleId.id,
        classId: data.classId?.id,
    }
};

export default UpdateUserForm;
