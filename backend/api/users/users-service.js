const { getDatabase } = require("firebase-admin/database");

const db = getDatabase();

const getAllUsers = async () => {
    try {
        const response = await db.ref("users").once("value");

        return Object.values(response.val()).flat();
    } catch (error) {
        console.error(error);
    }
};

const getUser = async (currentUserId) => {
    try {
        const response = await db.ref("users").child(currentUserId).once("value");
        return response.val();
    } catch (error) {
        console.error(error);
    }
};

const findUserByMbo = async (mbo) => {
    const response = await db.ref("users").once("value");
    const allUsers = response.val();
    return findUserByMboInDb(allUsers, mbo);
};

const findUserByMboInDb = (data, mbo) => {
    for (const key in data) {
        if (data[key].mbo === mbo) {
            return data[key];
        }
    }
    return undefined;
};

const createUser = async (userData, userId) => {
    const existingDataOfAllUsers = await getAllUsers();
    validateUserData(userData, existingDataOfAllUsers);
    console.log(userId);
    await db.ref("users").child(userId).set(userData);
};

const validateUserData = (userData, existingDataOfAllUsers) => {
    const MBOAlreadyExists = existingDataOfAllUsers.some((r) => r.mbo === userData.mbo);

    if (MBOAlreadyExists) {
        console.log("mbo already existis");
    }
};

module.exports = { getAllUsers, findUserByMbo, createUser, getUser };
