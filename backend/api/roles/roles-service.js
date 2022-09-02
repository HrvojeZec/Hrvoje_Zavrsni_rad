const { getDatabase } = require("firebase-admin/database");

const role = require("../constants/roles");
const admin = require("../../config/firebase-config");
const db = getDatabase();
const DB = admin.database();

const getUserRole = async (currentUserId) => {
    const response = await db.ref("roles").child(currentUserId).once("value");
    console.log("role", response.val());
    return response.val();
};

const assignPatientRole = async (currentUserId) => {
    await db.ref("roles").child(currentUserId).set(role.Patient);
};

module.exports = { getUserRole, assignPatientRole };
