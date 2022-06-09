interface bmiValues {
  height: number;
  weight: number;
}

const parse = (args: Array<number>): bmiValues => {
  /*
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
*/
  if (isNaN(Number(args[0])) && isNaN(Number(args[1]))) {
    throw new Error("provided values were not numbers");
  }

  return { height: Number(args[0]), weight: Number(args[1]) };
};

interface returnBmi {
  weight: number;
  height: number;
  value: string;
}

const calculateBmi = (height: number, weight: number): returnBmi => {
  parse([height, weight]);

  const result: number = weight / ((height / 100) * 2);
  let value: string = "";
  if (result <= 18.5) {
    value = "underweight";
  }
  if (result <= 24.9 && result >= 18.6) {
    value = "Normal (healty weight)";
  }
  if (result <= 29.9 && result >= 25.0) {
    value = "overweight";
  }
  if (result >= 30) {
    value = "Obese";
  }
  return {
    weight: weight,
    height: height,
    value: value,
  };
};

export default calculateBmi;
