export const MESSAGES = {
    roles: {
        fetchError: "Gagal mengambil data roles",

    },
    classes: {
        fetchError: "Gagal mengambil data class",

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
    }
};

export const TABLE_HEADER = {
    users: {
        title: "Users",
        description: "Below is the complete list of users registered in the system. Use the actions provided to modify their details or manage their roles.",
        buttonText: "Add User",
    }
}
