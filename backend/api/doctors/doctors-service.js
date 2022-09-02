const { getDatabase } = require("firebase-admin/database");

const db = getDatabase();

const getAllDoctors = async () => {
    try {
        const response = await db.ref("doctors").once("value");

        return Object.values(response.val()).flat();
    } catch (error) {
        console.error(error);
    }
};

module.exports = { getAllDoctors };
