import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Button from "../../components/Button";
import axiosInstance from "../../utils/axiosInstance";
import { getToken } from "../../utils/common";
import { toast } from "react-toastify";
import { MESSAGES } from "../../constants/string.const";
import PropTypes from "prop-types";

const DeleteUserForm = ({ user, afterSubmit, onCancel }) => {
    const authHeader = useAuthHeader();

    const deleteUser = async () => {
        try {
            await axiosInstance.delete(`/users/${user?.id}`, {
                headers: {
                    jwt: getToken(authHeader),
                },
            });
            toast.success(MESSAGES.users.deleteSuccess);
            afterSubmit();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`${MESSAGES.users.deleteError}: `, errorMessage);
            if (error.status !== 500) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(MESSAGES.submitError);
            }
        }
    };

    return (
        <div className="mt-12 flex flex-col gap-4">
            <Button
                variant="primary"
                onClick={() => {
                    deleteUser();
                }}
            >
                Hapus
            </Button>
            <Button
                variant="outline"
                onClick={onCancel}
            >
                Batal
            </Button>
        </div>
    )
};

DeleteUserForm.propTypes = {
    user: PropTypes.object,
    afterSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default DeleteUserForm;
