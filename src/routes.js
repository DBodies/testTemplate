import { Router } from "express";
import {ctrlWrapper} from './practice/26March.js'
import { createCarController, 
    deleteCarByIdController,
    getAllCarCOntrollers, 
    getCarByIdController, 
    patchCarController } from "./controller/controller.js";
import { loginUserController, logoutUserController, refreshSessionController, registrationController } from "./controller/authController.js";
import { authenticate } from "./middlewares/authenticate.js";
import { checkRoles } from "./middlewares/checkRoles.js";
import { ROLES } from "./constants/constants.js";

export const router = Router()

router.post('/auth/register', ctrlWrapper(registrationController))
router.post('/auth/login', ctrlWrapper(loginUserController))
router.post('/auth/refresh', ctrlWrapper(refreshSessionController))
router.post('/auth/logout', ctrlWrapper(logoutUserController))

router.get('/car', 
    checkRoles(ROLES.GUEST),
    ctrlWrapper(getAllCarCOntrollers))
router.get('/Car/:carId',
    authenticate,
    checkRoles(ROLES.USER, ROLES.ADMIN),
    ctrlWrapper(getCarByIdController))
router.delete('/Car/:carId', 
    authenticate,
    checkRoles(ROLES.ADMIN),
    ctrlWrapper(deleteCarByIdController))
router.post('/Car', 
    authenticate,
    checkRoles(ROLES.ADMIN),
    ctrlWrapper(createCarController))
router.patch('/Car/:carId', 
    authenticate,
    checkRoles(ROLES.ADMIN),
    ctrlWrapper(patchCarController))
