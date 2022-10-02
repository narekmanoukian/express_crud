import  express  from "express";

import {getUsers, createUsers, getUser, deleteUser, updateUser} from "../controlles/User.js";

const router = express.Router();

router.get("/g", getUsers);
router.post("/p", createUsers);
router.get("/g/:id", getUser);
router.delete("/:id", deleteUser);
router.patch("/p/:id", updateUser);



export default router;