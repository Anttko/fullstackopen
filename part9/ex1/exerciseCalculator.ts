const parseArguments = (args: Array<number>) => {
  if (args.length < 2) throw new Error("not enough arguments");

  let exc: Array<number> = [];
  for (let i: number = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error(`provided value were not number ${args[i]}`);
    }
    exc.push(Number(args[i]));
  }

};

interface ExercisesInterface {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (
  exercises: Array<number>,
  userTarget: number
): ExercisesInterface => {
  try {
    parseArguments(exercises);
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }

  const periodLength = exercises.length;
  const trainingDays = exercises.filter((a) => a > 0).length;
  console.log(trainingDays);
  const average = exercises.reduce((a, b) => a + b) / periodLength;
  const success = average > userTarget ? true : false;
  const rating = average < 2 ? 1 : average < 3 ? 2 : 3;
  const ratingDescription =
    rating === 1 ? "try harder" : rating === 2 ? "keep it up" : "excellent";
  const target = userTarget;

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

export default calculateExercises;
