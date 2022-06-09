import DiagnosesData from "../data/diagnoses";

import { Diagnosis } from "../types";

const diagnoses: Array<Diagnosis> = DiagnosesData;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
};
