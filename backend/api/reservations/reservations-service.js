const dayjs = require("dayjs");
const { getDatabase } = require("firebase-admin/database");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

const ReservationStatus = require("../constants/reservationStatuses");
const ValidationError = require("../errors/ValidationError");
const { getAllUsers } = require("../users/users-service");

const reservationSchema = Joi.object({
    uid: Joi.string(),
    doctorId: Joi.string().required(),
    date: Joi.date().greater("now").required(),
    time: Joi.string()
        .regex(/^([0-1]?[0-9]|2[0-3]):(00|30)$/)
        .required()
});

const db = getDatabase();

const getExistingReservationForDoctor = async (doctorId) => {
    const allReservations = await getExistingReservations();
    const doctorReservations = allReservations.filter((reservation) => reservation.doctorId === doctorId);

    const usersIds = doctorReservations.map((it) => it.uid);

    const allUsers = await getAllUsers();
    const usersData = allUsers.filter((it) => usersIds.includes(it.uid));
    const usersMap = usersData.reduce((map, user) => {
        map[user.uid] = user;
        return map;
    }, {});

    return doctorReservations.map((reservation) => ({
        ...reservation,
        userMbo: usersMap[reservation.uid].mbo,
        userEmail: usersMap[reservation.uid].email
    }));
};

const getExistingReservations = async () => {
    const response = await db.ref("reservations").once("value");
    const reservationsByUserId = response.val() ?? {};

    return Object.values(reservationsByUserId).flat();
};

const getExistingReservationsForUser = async (userId) => {
    const response = await db.ref("reservations").child(userId).once("value");
    return response?.val() ? Object.values(response.val()) : [];
};

const getExistingReservationDatesForDoctor = async (doctorId) => {
    const existingReservationsOfAllUsers = await getExistingReservations();
    const doctorsOwnReservations = existingReservationsOfAllUsers.filter((r) => r.doctorId === doctorId);
    return doctorsOwnReservations.map((r) => `${r.date} ${r.time}`);
};

const getReservations = async (userId) => {
    const userReservations = await getExistingReservationsForUser(userId);


    let foundAtLeastOneExpired = false;
    userReservations.forEach((it) => {
        if ((it.status === ReservationStatus.Waiting || it.status === ReservationStatus.Approved) && dayjs().isAfter(dayjs(it.date))) {
            foundAtLeastOneExpired = true;
            it.status = ReservationStatus.Expired;
        }
    });

    if (foundAtLeastOneExpired) {
        await db.ref("reservations").child(userId).set(userReservations);
    }

    return userReservations;
};

const createReservation = async (reservationData, userId) => {
    const existingReservationsOfAllUsers = await getExistingReservations();
    const existingReservationsForUser = await getExistingReservationsForUser(userId);

    validateReservationData(existingReservationsOfAllUsers, reservationData, existingReservationsForUser);

    const reservations = [...existingReservationsForUser];
    reservations.push({
        id: uuidv4(),
        status: ReservationStatus.Waiting,
        ...reservationData
    });

    await db.ref("reservations").child(userId).set(reservations);
};

const cancelReservation = async (reservationId, userId) => {
    const existingReservationsForUser = await getExistingReservationsForUser(userId);
    const reservationToCancel = existingReservationsForUser.find((it) => it.id === reservationId);
    if (reservationToCancel) {
        reservationToCancel.status = ReservationStatus.Canceled;
    }

    await db.ref("reservations").child(userId).set(existingReservationsForUser);
};

const confirmReservation = async (reservationId, userId) => {
    const existingReservationsForUser = await getExistingReservationsForUser(userId);

    const reservationToUpdate = existingReservationsForUser.find((it) => it.id === reservationId);
    if (reservationToUpdate) {
        reservationToUpdate.status = ReservationStatus.Approved;
    }

    await db.ref("reservations").child(userId).set(existingReservationsForUser);
};

const completeReservation = async (reservationId, userId) => {
    const existingReservationsForUser = await getExistingReservationsForUser(userId);

    const reservationToComplete = existingReservationsForUser.find((it) => it.id === reservationId);

    if (reservationToComplete) {
        reservationToComplete.status = ReservationStatus.Completed;
    }

    await db.ref("reservations").child(userId).set(existingReservationsForUser);
};

const updateTimeAndDate = async (reservationData, userId, reservationId) => {
    const existingReservationsOfAllUsers = await getExistingReservations();
    const existingReservationsForUser = await getExistingReservationsForUser(userId);

    validateReservationData(existingReservationsOfAllUsers, reservationData, existingReservationsForUser);

    const reservationToUpdate = existingReservationsForUser.find((it) => it.id === reservationId);
    if (reservationToUpdate) {
        reservationToUpdate.date = reservationData.date;
        reservationToUpdate.time = reservationData.time;
    }

    await db.ref("reservations").child(userId).set(existingReservationsForUser);
};

const doctorDeniedReservation = async (reservationId, patientId) => {
    const existingReservationsForUser = await getExistingReservationsForUser(patientId);

    const reservationToDeny = existingReservationsForUser.find((it) => it.id === reservationId);
    if (reservationToDeny) {
        reservationToDeny.status = ReservationStatus.Denied;
    }

    await db.ref("reservations").child(patientId).set(existingReservationsForUser);
};

const validateReservationData = (existingReservations, reservationData, existingReservationsForUser) => {
    const { error: validationError } = reservationSchema.validate(reservationData);

    if (validationError) {
        throw new ValidationError(
            validationError.details.map((it) => ({
                message: it.message,
                path: it.path,
                type: it.type
            }))
        );
    }

    const reservationAlreadyExists = existingReservations.some(
        (r) => r.time === reservationData.time && r.date === reservationData.date && r.doctorId === reservationData.doctorId
    );

    if (reservationAlreadyExists) {
        throw new ValidationError([
            {
                message: "Reservation for this doctor and date already exists",
                type: "reservation_already_exists"
            }
        ]);
    }
};




module.exports = {
    getReservations,
    createReservation,
    cancelReservation,
    getExistingReservationDatesForDoctor,
    updateReservation: confirmReservation,
    updateTimeAndDate,
    doctorDeniedReservation,
    getExistingReservationForDoctor,
    getExistingReservationsForUser,
    completeReservation,
    getExistingReservations
};
