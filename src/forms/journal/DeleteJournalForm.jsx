import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Button from "../../components/Button";
import axiosInstance from "../../utils/axiosInstance";
import { getToken } from "../../utils/common";
import { toast } from "react-toastify";
import { MESSAGES } from "../../constants/string.const";
import PropTypes from "prop-types";

const DeleteJournalForm = ({ journal, afterSubmit, onCancel }) => {
    const authHeader = useAuthHeader();

    const deleteJournal = async () => {
        try {
            await axiosInstance.delete(`/learning-journal/${journal?.id}`, {
                headers: {
                    jwt: getToken(authHeader),
                },
            });
            toast.success(MESSAGES.learningJournals.deleteSuccess);
            afterSubmit();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`${MESSAGES.learningJournals.deleteError}: `, errorMessage);
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
                    deleteJournal();
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

DeleteJournalForm.propTypes = {
    journal: PropTypes.object,
    afterSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default DeleteJournalForm;
