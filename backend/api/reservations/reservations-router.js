const express = require("express");

const admin = require("../../config/firebase-config");
const authorization = require("../../middleware/authorization.middleware");
const Role = require("../constants/roles");

const {
    createReservation,
    cancelReservation,
    getReservations,
    completeReservation,
    getExistingReservationsForUser,
    getExistingReservationForDoctor,
    doctorDeniedReservation,
    getExistingReservationDatesForDoctor,
    updateReservation,
    updateTimeAndDate
} = require("./reservations-service");

const router = express.Router();

router.get("/", authorization(Role.Doctor), async (req, res, next) => {
    try {
        const response = await getExistingReservationForDoctor(req.user.uid);
        console.log("res", response);
        return res.json(response);
    } catch (err) {
        next(err);
    }
});

router.get("/patient-reservation", authorization(Role.Patient), async (req, res, next) => {
    try {
        const response = await getExistingReservationsForUser(req.user.uid);
        getReservations(req.user.uid)
        return res.json(response);
    } catch (err) {
        next(err);
    }
});

router.get("/doctors/:doctorId", authorization(Role.Patient), async (req, res, next) => {

    try {
        const data = await getExistingReservationDatesForDoctor(req.params.doctorId);
        console.log(data);
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

router.get("/test", async (req, res, next) => {
    try {
        const data = await getReservations(req.user.uid)
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

router.get("/useremail", async (req, res, next) => {
    await admin
        .auth()
        .getUserByEmail(req.body.email)
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully fetched user data:", userRecord.toJSON());
            res.json(userRecord);
        })
        .catch(function (error) {
            console.log("Error fetching user data:", error);
            next(error);
        });
});

router.post("/", authorization(Role.Patient), async (req, res, next) => {
    const { date, time, doctorId, uid } = req.body;
    const reservationData = {
        date,
        time,
        doctorId,
        uid
    };
    console.log(reservationData);

    try {
        await createReservation(reservationData, req.user.uid);
        return res.status(200).send();
    } catch (err) {
        next(err);
    }
});

router.patch("/doctor-confirm/:reservationId", authorization(Role.Doctor), async (req, res, next) => {
    try {
        await updateReservation(req.params.reservationId, req.body.patientId);
        return res.status(200).send();
    } catch (err) {
        next(err);
    }
});

router.patch("/doctor-complete/:reservationId", authorization(Role.Doctor), async (req, res, next) => {
    try {
        await completeReservation(req.params.reservationId, req.body.patientId);
        return res.status(200).send();
    } catch (err) {
        next(err);
    }
});

router.patch("/updateAppointment", authorization(Role.Patient), async (req, res, next) => {
    const { date, time, uid, doctorId, reservationId } = req.body;

    const reservationData = {
        date,
        time,
        doctorId
    };
    console.log(reservationData);
    console.log(uid);
    try {
        await updateTimeAndDate(reservationData, uid, reservationId);
        return res.status(200).send();
    } catch (err) {
        next(err);
    }
});

router.delete("/:reservationId", authorization(Role.Patient), async (req, res, next) => {
    try {
        await cancelReservation(req.params.reservationId, req.user.uid);
        return res.status(200).send();
    } catch (err) {
        next(err);
    }
});

router.delete("/doctors-cancle/:reservationId", authorization(Role.Doctor), async (req, res, next) => {
    try {
        await doctorDeniedReservation(req.params.reservationId, req.body.patientId);
        return res.status(200).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
