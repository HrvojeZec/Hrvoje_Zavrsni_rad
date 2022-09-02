const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const doctorsRouter = require("./api/doctors/doctors-router");
const referralsRouter = require("./api/referrals/referrals-router");
const reservationsRouter = require("./api/reservations/reservations-router");
const rolsRouter = require("./api/roles/roles-router");
const usersRouter = require("./api/users/users-router");
const authenticationMiddleware = require("./middleware/authentication.middleware");
const errorHandler = require("./middleware/error-handler");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(authenticationMiddleware);

app.use("/api/roles", rolsRouter);
app.use("/api/users", usersRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/referrals", referralsRouter);
app.use("/api/doctors", doctorsRouter);
app.use(errorHandler);

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
