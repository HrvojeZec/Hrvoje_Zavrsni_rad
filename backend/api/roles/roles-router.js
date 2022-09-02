const express = require("express");

const authorization = require("../../middleware/authorization.middleware");
const Role = require("../constants/roles");

const { getUserRole, assignPatientRole } = require("./roles-service");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const response = await getUserRole(req.user.uid);
        console.log(response);
        return res.json(response);
    } catch (err) {
        next(err);
    }
});

router.post("/assign-patient-role", async (req, res, next) => {
    try {
        await assignPatientRole(req.user.uid);
        return res.status(200).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
