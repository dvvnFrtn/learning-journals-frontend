export const getToken = (header) => {
    if (header && header.startsWith('Bearer ')) {
        return header.slice(7);
    }
};

export const getModalContent = (modeState, modalConstant) => {
    switch (modeState) {
        case "create":
            return {
                title: modalConstant.create.title,
                description: modalConstant.create.description,
            };
        case "update":
            return {
                title: modalConstant.update.title,
                description: modalConstant.update.description,
            };
        case "delete":
            return {
                title: modalConstant.delete.title,
                description: modalConstant.delete.description,
            };
        case "detail":
            return {
                title: modalConstant.detail.title,
                description: modalConstant.detail.description,
            };
        default:
            return { title: "", description: "" };
    }
};
