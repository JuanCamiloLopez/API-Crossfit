const express = require("express");

const workoutController = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");

const router = express.Router();

//la logíca que ejecute dentro de la ruta también es el controlador.

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 */
router
  //routes workout
  .get("/",  workoutController.getAllWorkouts)
  .get("/:workoutId", workoutController.getOneWorkout)
  .post("/", workoutController.createWorkout)
  .patch("/:workoutId", workoutController.updateWorkout)
  .delete("/:workoutId", workoutController.deleteWorkout)
  //routes Records
  .get("/:workoutId", recordController.getRecordForWorkout);

module.exports = router;
