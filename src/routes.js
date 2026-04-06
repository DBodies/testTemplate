import { Router } from "express";
import { firstPracticeController } from "./practice/23March.js";
import { countNumbersController, 
    ctrlWrapper, 
    deleteDuplicateController,
    getOlderUserController,
    groupByAgeController, 
    theOldestUserController,
    userIdController,
    userNameController } from "./practice/26March.js";
import { createCarController, 
    deleteCarByIdController,
    getAllCarCOntrollers, 
    getCarByIdController, 
    patchCarController } from "./controller/controller.js";
import { loginUserController, refreshSessionController, registrationController } from "./controller/authController.js";

export const router = Router()

router.get('/first', firstPracticeController)
router.get('/second', groupByAgeController)
router.get('/third', getOlderUserController)
router.get('/fourth', countNumbersController)
router.get('/fifth', userNameController)
router.get('/sixth', deleteDuplicateController)
router.get('/seventh', theOldestUserController)
router.get('/eighth', userIdController)
// router.get('/ninth', )
router.get('/Car', ctrlWrapper(getAllCarCOntrollers))
router.get('/Car/:carId', ctrlWrapper(getCarByIdController))
router.delete('/Car/:carId', ctrlWrapper(deleteCarByIdController))
router.post('/Car/', ctrlWrapper(createCarController))
router.patch('/Car/:carId', ctrlWrapper(patchCarController))
router.post('/auth/register', ctrlWrapper(registrationController))
router.post('/auth/login', ctrlWrapper(loginUserController))
router.post('/auth/refresh', ctrlWrapper(refreshSessionController))