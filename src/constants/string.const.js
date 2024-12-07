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
    approvals: {
        fetchError: "Gagal mengambil data approval",
        addError: "Gagal menambahkan data approval",
        addSuccess: "Approval berhasil ditambahkan",
        updateError: "Gagal memperbarui data approval",
        updateSuccess: "Approval berhasil diperbarui",
        deleteError: "Gagal menghapus data approval",
        deleteSuccess: "Approval berhasil dihapus",
    },
    learningJournals: {
        fetchError: "Gagal mengambil data journal",
        addError: "Gagal menambahkan data journal",
        addSuccess: "Journal berhasil ditambahkan",
        updateError: "Gagal memperbarui data journal",
        updateSuccess: "Journal berhasil diperbarui",
        deleteError: "Gagal menghapus data journal",
        deleteSuccess: "Journal berhasil dihapus",
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
    students: {
        fetchError: "Gagal mengambil data students",
        addError: "Gagal menambahkan data students",
        addSuccess: "Student berhasil ditambahkan",
        updateError: "Gagal memperbarui data students",
        updateSuccess: "Student berhasil diperbarui",
        deleteError: "Gagal menghapus data students",
        deleteSuccess: "Student berhasil dihapus",
    },
    studentAbsents: {
        fetchError: "Gagal mengambil data students-absent",
        addError: "Gagal menambahkan data students-absent",
        addSuccess: "Student-absent berhasil ditambahkan",
        updateError: "Gagal memperbarui data students-absent",
        updateSuccess: "Student-absent berhasil diperbarui",
        deleteError: "Gagal menghapus data students-absent",
        deleteSuccess: "Student-absent berhasil dihapus",
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
    },
    studentForm: {
        name: "e.g John Doe",
        gender: "Select gender",
        selectClass: "Select class",
    },
    approvalForm: {
        status: "Select status",
        description: "Descripiton approval here...",
    },
    journalForm: {
        learningMaterial: "Type learning material here..",
        learningActivity: "Type learning activity here..",
        description: "Type description here..",
        date: "Select date"
    },
    absentForm: {
        description: "Type description here..",
        selectStudent: "Select student"
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
    },
    student: {
        create: {
            title: "Create Student",
            description: "Fill in the details below to add a new student. Make sure all the information is accurate before submission."
        },
        update: {
            title: "Update Student",
            description: "Edit the student details as needed. Ensure the updated information is accurate before saving."
        },
        delete: {
            title: "Delete Student",
            description: "You are about to delete this student. This action cannot be undone. Are you sure you want to proceed?"
        },
        detail: {
            title: "Detail Student",
            description: "Here is the comprehensive information about the selected student. Review the details carefully."
        }
    },
    approval: {
        create: {
            title: "Create Approval",
            description: "Fill in the details below to add a new approval. Make sure all the information is accurate before submission."
        },
        update: {
            title: "Update Approval",
            description: "Edit the approval details as needed. Ensure the updated information is accurate before saving."
        },
        delete: {
            title: "Delete Approval",
            description: "You are about to delete this approval. This action cannot be undone. Are you sure you want to proceed?"
        },
        detail: {
            title: "Detail Approval",
            description: "Here is the comprehensive information about the selected approval. Review the details carefully."
        }
    },
    journal: {
        create: {
            title: "Create Journal",
            description: "Fill in the details below to add a new journal. Make sure all the information is accurate before submission."
        },
        update: {
            title: "Update Journal",
            description: "Edit the journal details as needed. Ensure the updated information is accurate before saving."
        },
        delete: {
            title: "Delete Journal",
            description: "You are about to delete this journal. This action cannot be undone. Are you sure you want to proceed?"
        },
        detail: {
            title: "Detail Journal",
            description: "Here is the comprehensive information about the selected journal. Review the details carefully."
        }
    },
    absent: {
        create: {
            title: "Create Student Absent",
            description: "Fill in the details below to add a new student absent. Make sure all the information is accurate before submission."
        },
        update: {
            title: "Update Student Absent",
            description: "Edit the student absent details as needed. Ensure the updated information is accurate before saving."
        },
        delete: {
            title: "Delete Student Absent",
            description: "You are about to delete this student absent. This action cannot be undone. Are you sure you want to proceed?"
        },
        detail: {
            title: "Detail Student Absent",
            description: "Here is the comprehensive information about the selected student absent. Review the details carefully."
        }
    },
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
    },
    students: {
        title: "Students",
        description: "This is a list of students available in the system. You can add, edit, or delete students as required.",
        buttonText: "Add Student",
    },
    journals: {
        title: "Learning Journals",
        description: "This is a list of journals available in the system. You can add, edit, or delete journals as required.",
        buttonText: "Add Journal",
    },
    absents: {
        title: "Students Absent",
        description: "This is a list of students absent available in the system. You can add, edit, or delete students absent as required.",
        buttonText: "Add Student Absent",
    }
}
