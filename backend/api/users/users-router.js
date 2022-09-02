const express = require("express");

const authorization = require("../../middleware/authorization.middleware");
const Role = require("../constants/roles");

const { getUserRole, createUser, getAllUsers, getUser } = require("./users-service");

const router = express.Router();

router.get("/get", async (req, res, next) => {
    try {
        const response = await getAllUsers();

        return res.json(response);
    } catch (err) {
        next(err);
    }
});

router.get("/roles", async (req, res, next) => {
    try {
        const response = await getUserRole(req.user.uid);
        return res.json(response);
    } catch (err) {
        next(err);
    }
});

router.get("/:userId", async (req, res, next) => {
    try {
        const response = await getUser(req.user.uid);
        console.log(response);
        return res.json(response);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    const { uid, name, email, mbo } = req.body;

    const userData = {
        uid,
        name,
        email,
        mbo
    };

    try {
        const data = await createUser(userData, uid);
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
