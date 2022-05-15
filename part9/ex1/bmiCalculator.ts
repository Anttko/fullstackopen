const calculateBmi = (height: number, weight: number) => {
  const result: number = weight / ((height / 100) * 2);
  let returnValue: string;
  if (result <= 18.5) {
    returnValue = "underweight";
  }
  if (result <= 24.9 && result >= 18.6) {
    returnValue = "Normal (healty weight)";
  }
  if (result <= 29.9 && result >= 25.0) {
    returnValue = "overweight";
  }
  if (result >= 30) {
    returnValue = "Obese";
  }
  return returnValue;
};
console.log(calculateBmi(180, 74));
