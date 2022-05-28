import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";

import { PORT } from "./config.js";
import event_routes from "./routes/event_route.js";
import voucher_routes from "./routes/voucher_route.js";
import ticket_routes from "./routes/ticket_route.js";
import user_routes from "./routes/user_route.js";
import payment_method_routes from "./routes/payment_method_route.js";
import token_routes from "./routes/token_route.js";
import getuser_routes from "./routes/getuser_route.js";
import validate_token from "./middleware/validate_token.js";
import cookieParser from "cookie-parser";

const app = express();

const error_handling = (err, req, res, next) => {
    return res.status(500).json({message: err.toString()});
}

mongoose.connect("mongodb://localhost:27017/JBticketDB")
    .then(() => console.log("DB berhasil connect"))
    .catch((err) => console.log(err));


app.use(error_handling);
app.use(bodyParser.json({ type: "application/json" }));
app.use(helmet());
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());

app.use("/user", user_routes);
app.use("/events", validate_token,  event_routes);
app.use("/payment-methods", validate_token,  payment_method_routes);
app.use("/voucher-verification", validate_token,  voucher_routes);
app.use("/tickets", validate_token, ticket_routes);
app.use("/getuser", validate_token, getuser_routes);
app.use("/token", token_routes);

app.listen(PORT);