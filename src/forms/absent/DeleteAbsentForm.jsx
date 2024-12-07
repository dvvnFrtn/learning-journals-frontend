import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Button from "../../components/Button";
import axiosInstance from "../../utils/axiosInstance";
import { getToken } from "../../utils/common";
import { toast } from "react-toastify";
import { MESSAGES } from "../../constants/string.const";
import PropTypes from "prop-types";

const DeleteAbsentForm = ({ absent, afterSubmit, onCancel }) => {
    const authHeader = useAuthHeader();

    const deleteAbsent = async () => {
        try {
            await axiosInstance.delete(`/student-absent/${absent?.id}`, {
                headers: {
                    jwt: getToken(authHeader),
                },
            });
            toast.success(MESSAGES.studentAbsents.deleteSuccess);
            afterSubmit();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`${MESSAGES.studentAbsents.deleteError}: `, errorMessage);
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
                    deleteAbsent();
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

DeleteAbsentForm.propTypes = {
    absent: PropTypes.object,
    afterSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default DeleteAbsentForm;
