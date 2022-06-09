import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("hello full stack");
});

app.get("/bmi", (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    res.status(404).send({ error: "missing parameter height or weight" });
  }
  const result = calculateBmi(Number(height), Number(weight));
  res.send(result);
});
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/exercises", (req, res) => {
  const dailyExercises = req.body.daily_exercises;
  const dailyTarget = req.body.target;

  console.log("123,", dailyExercises);

  if (!Array.isArray(dailyExercises) || isNaN(Number(dailyTarget))) {
    res.status(400).send({ error: "parameters missing" });
  }

  dailyExercises.map((a: any) => {
    if (isNaN(Number(a))) {
      res.status(400).send({ error: "malformatted parameters" });
    }
  });

  const result = calculateExercises(dailyExercises, dailyTarget);
  res.status(201).json(result);
});
