const workout = require("../database/workout");
const { v4: uuid } = require("uuid");

const getAllWorkouts = (filterParams) => {
  try {
    const allWorkouts = workout.getAllWorkouts(filterParams);
    return allWorkouts;
  } catch (error) {
    throw error;
  }
};

const getOneWorkout = (workoutId) => {
  //traigo el workout de la base de datos dese el "ORM"
  const workoutDb = workout.getOneWorkout(workoutId);
  return workoutDb;
};

const createWorkout = (newWorkout) => {
  //creo el objeto y lo envio como parametro al orm, este me genera la insercion en la base de datos.
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  const creaatedWorkout = workout.createNewWorkout(workoutToInsert);
  return creaatedWorkout;
};

//esta función recibe el id desde el controlador
const updateWorkout = (workoutId, cambio) => {
  const updatedWorkout = workout.updateOneWorkout(workoutId, cambio);
  return updatedWorkout;
};

const deleteWorkout = (workoutId) => {
  workout.deleteOneWorkout(workoutId);
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
