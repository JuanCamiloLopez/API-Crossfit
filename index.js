const express = require("express");
const v1WorkoutRouter = require("./src/v1/routes/workoutRoutes");
const apicache = require("apicache");
const { swaggerDocs: v1SwaggerDocs } = require("./src/v1/routes/swagger");
const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;

app.use(express.json());
app.use(cache("2 minutes"));
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log("server listening  on port 3000");
  v1SwaggerDocs(app, PORT);
});
