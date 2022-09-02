const express = require("express");

const authorization = require("../../middleware/authorization.middleware");
const Role = require("../constants/roles");
const { findUserByMbo } = require("../users/users-service");

const { setUsersReferrals, getUserReferrals, getAllReferrals } = require("./referrals-service");

const router = express.Router();

router.get("/", authorization(Role.FamilyDoctor), async (req, res, next) => {
    try {
        const response = await getAllReferrals();
        return res.json(response);
    } catch (err) {
        next(err);
    }
});

router.get("/mbo", authorization(Role.FamilyDoctor), async (req, res, next) => {
    const { mbo } = req.query;
    try {
        const user = await findUserByMbo(mbo);
        return res.json(user);
    } catch (err) {
        next(err);
    }
});

router.get("/:userId", authorization(Role.Patient), async (req, res, next) => {
    try {
        const response = await getUserReferrals(req.params.userId);
        return res.json(response);
    } catch (err) {
        next(err);
    }
});

router.post("/data", authorization(Role.FamilyDoctor), async (req, res, next) => {
    const { speciality, description, uid, dateCreated } = req.body;
    console.log(speciality, description, uid, dateCreated);
    try {
        await setUsersReferrals(speciality, description, uid, dateCreated);
        return res.status(200).send();
    } catch (err) {
        next(err);
    }
});



module.exports = router;
