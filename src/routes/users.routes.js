import { Router } from "express";
import { authRequired, adminRequired } from "../middlewares/validateToken.js";
import {getUsers, createUser, getUser, updateUser, deleteUser, fileUpload  } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createUserSchema } from "../schemas/userManagement.schema.js";

const router = Router()

router.get('/users', authRequired, getUsers)
router.get('/users/:id', authRequired, getUser)
router.post('/users', authRequired, validateSchema(createUserSchema), createUser)
router.delete('/users/:id', authRequired, deleteUser)
router.put('/users/:id', authRequired, updateUser)

router.post('/upload', authRequired, fileUpload)



export default router