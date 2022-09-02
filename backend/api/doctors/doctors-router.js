const express = require("express");

const authorization = require("../../middleware/authorization.middleware");
const Role = require("../constants/roles");

const { getAllDoctors } = require("./doctors-service");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const response = await getAllDoctors();
        return res.json(response);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
