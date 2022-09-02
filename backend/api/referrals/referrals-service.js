const { getDatabase } = require("firebase-admin/database");
const { getAllUsers } = require("../users/users-service");
const { v4: uuidv4 } = require("uuid");

const db = getDatabase();

// get / find
// create
// update
// delete

const getUserReferrals = async (uid) => {
    const response = await db.ref("referrals").child(uid).once("value");
    return response.exists() ? [...response.val()] : [];
};

const getAllReferrals = async () => {
    const referralsData = await db.ref("referrals").once("value");
    const allUsers = await getAllUsers();
    const allReferrals = Object.values(referralsData.val()).flat()

    const usersIds = allReferrals.map((it) => it.patientId);
    const usersData = allUsers.filter((it) => usersIds.includes(it.uid));

    const usersMap = usersData.reduce((map, user) => {
        map[user.uid] = user;
        return map;
    }, {});

    return allReferrals.map((referral) => ({
        ...referral,
        userMbo: usersMap[referral.patientId].mbo,
        userEmail: usersMap[referral.patientId].email
    }));
};

const setUsersReferrals = async (speciality, description, uid, dateCreated) => {
    const existingReferral = await getUserReferrals(uid);
    const ReferralData = [...existingReferral];
    ReferralData.push({
        speciality: speciality,
        description: description,
        dateCreated: dateCreated,
        id: uuidv4(),
        patientId: uid
    });

    await db.ref("referrals").child(uid).set(ReferralData);
};


module.exports = {
    getAllReferrals,
    getUserReferrals,
    setUsersReferrals,
};
