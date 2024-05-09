import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {getAreas, getGrupos, getTiposDoc, getProcesamientos, createProcesamiento  } from "../controllers/procesing.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createUserSchema } from "../schemas/userManagement.schema.js";

const router = Router()

router.get('/areas',authRequired, getAreas)
router.get('/grupos',authRequired, getGrupos)
router.get('/tiposdoc',authRequired, getTiposDoc)
router.get('/procesing',authRequired, getProcesamientos)

router.post('/procesing', authRequired, createProcesamiento)




export default router