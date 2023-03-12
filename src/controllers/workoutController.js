const workoutService = require("../services/workoutService");

//Por convención debo colocar el método a ejecutar, el controlador llama al servicio que a su ves este llamo al modelo y asi me traigo los datos en formato json de la base de datos, que fueron manejados por el modelo.
const getAllWorkouts = (req, res) => {
  const { mode } = req.query;
  try {
    const allWorkouts = workoutService.getAllWorkouts({mode});
    res.send({ status: "ok", data: allWorkouts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneWorkout = (req, res) => {
  //extraemos el id de la url y verificamos si existe.
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: " parameter ':workoutId' can not empty" },
    });
  }
  try {
    //le pedimos al servicio que nos de un objeto pasandole el id
    const workout = workoutService.getOneWorkout(workoutId);
    res.send({ status: "ok", data: workout });
  } catch (error) {
    res
      .starus(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createWorkout = (req, res) => {
  const { body } = req;

  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(400).send({ status: "FAILED", message: "Missing fileds" });
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };
  try {
    const createdWorkout = workoutService.createWorkout(newWorkout);
    res.status(201).send({ status: "ok", data: createdWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateWorkout = (req, res) => {
  //en el controlador recibimos la req o los datos de la url
  const {
    body,
    params: { workoutId },
  } = req;
  // hacemos una pequeña comprobación de si existe
  if (!workoutId) {
    res
      .status(400)
      .send({ status: "FAILED", data: "Parameter id can not be empty" });
  }

  try {
    const updatedWorkout = workoutService.updateWorkout(workoutId, body);
    //se envia al frontend
    res.send({ status: "ok", data: updatedWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    return;
  }
  workoutService.deleteWorkout(workoutId);
  res.status(204).send({ status: "ok" });
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
