import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axiosInstance from "../../utils/axiosInstance";
import { getToken } from "../../utils/common";
import { MESSAGES } from "../../constants/string.const";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import PropTypes from "prop-types";

const DeleteClassForm = ({ dataClass, afterSubmit, onCancel }) => {
    const authHeader = useAuthHeader();

    const deleteClass = async () => {
        try {
            await axiosInstance.delete(`/class/${dataClass?.id}`, {
                headers: {
                    jwt: getToken(authHeader),
                },
            });
            toast.success(MESSAGES.classes.deleteSuccess);
            afterSubmit();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`${MESSAGES.classes.deleteError}: `, errorMessage);
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
                    deleteClass();
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

DeleteClassForm.propTypes = {
    dataClass: PropTypes.object,
    afterSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default DeleteClassForm;
