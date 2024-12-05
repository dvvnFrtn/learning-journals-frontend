export const MESSAGES = {
    roles: {
        fetchError: "Gagal mengambil data roles",

    },
    classes: {
        fetchError: "Gagal mengambil data class",
        addError: "Gagal menambahkan data class",
        addSuccess: "Class berhasil ditambahkan",
        updateError: "Gagal memperbarui data class",
        updateSuccess: "Class berhasil diperbarui",
        deleteError: "Gagal menghapus data class",
        deleteSuccess: "Class berhasil dihapus",
    },
    subjects: {
        fetchError: "Gagal mengambil data subject",
        addError: "Gagal menambahkan data subject",
        addSuccess: "Subject berhasil ditambahkan",
        updateError: "Gagal memperbarui data subject",
        updateSuccess: "Subject berhasil diperbarui",
        deleteError: "Gagal menghapus data subject",
        deleteSuccess: "Subject berhasil dihapus",
    },
    users: {
        fetchError: "Gagal mengambil data users",
        addError: "Gagal menambahkan data user",
        addSuccess: "User berhasil ditambahkan",
        updateError: "Gagal memperbarui data user",
        updateSuccess: "User berhasil diperbarui",
        deleteError: "Gagal menghapus data user",
        deleteSuccess: "User berhasil dihapus",
    },
    submitError: "Terjadi kesalahan. Silahkan coba lagi",
};

export const PLACEHOLDERS = {
    userForm: {
        email: "e.g johndoe@gmail.com",
        password: "*******",
        fullName: "e.g John Doe",
        selectRole: "Select role",
        selectClass: "Select class",
    },
    classForm: {
        name: "e.g Class 1",
        description: "Description class here..."
    },
    subjectForm: {
        name: "e.g Subject 1",
        description: "Description subject here..."
    }
};

export const MODAL = {
    user: {
        create: {
            title: "Create User",
            description: "Fill in the details below to add a new user. Make sure all the information is accurate before submission."
        },
        update: {
            title: "Update User",
            description: "Edit the user details as needed. Ensure the updated information is accurate before saving."
        },
        delete: {
            title: "Delete User",
            description: "You are about to delete this user. This action cannot be undone. Are you sure you want to proceed?"
        },
        detail: {
            title: "Detail User",
            description: "Here is the comprehensive information about the selected user. Review the details carefully."
        }
    },
    dataClass: {
        create: {
            title: "Create Class",
            description: "Fill in the details below to add a new class. Make sure all the information is accurate before submission."
        },
        update: {
            title: "Update Class",
            description: "Edit the class details as needed. Ensure the updated information is accurate before saving."
        },
        delete: {
            title: "Delete Class",
            description: "You are about to delete this class. This action cannot be undone. Are you sure you want to proceed?"
        },
        detail: {
            title: "Detail Class",
            description: "Here is the comprehensive information about the selected class. Review the details carefully."
        }
    },
    subject: {
        create: {
            title: "Create Subject",
            description: "Fill in the details below to add a new subject. Make sure all the information is accurate before submission."
        },
        update: {
            title: "Update Subject",
            description: "Edit the subject details as needed. Ensure the updated information is accurate before saving."
        },
        delete: {
            title: "Delete Subject",
            description: "You are about to delete this subject. This action cannot be undone. Are you sure you want to proceed?"
        },
        detail: {
            title: "Detail Subject",
            description: "Here is the comprehensive information about the selected subject. Review the details carefully."
        }
    }
};

export const TABLE_HEADER = {
    users: {
        title: "Users",
        description: "Below is the complete list of users registered in the system. Use the actions provided to modify their details or manage their roles.",
        buttonText: "Add User",
    },
    classes: {
        title: "Classes",
        description: "Here is a list of classes available in the system. You can add, edit, or delete classes as needed.",
        buttonText: "Add Class",
    },
    subjects: {
        title: "Subjects",
        description: "This is a list of subjects available in the system. You can add, edit, or delete subjects as required.",
        buttonText: "Add Subject",
    }
}
