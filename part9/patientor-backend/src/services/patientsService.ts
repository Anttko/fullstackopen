import PatientsData from "../data/patients";
import { v1 as uuid } from "uuid";
import {
  Patient,
  PublicPatient,
  NewPatientsEntry,
  Entry,
  newEntry,
} from "../types";

const patients: Array<Patient> = PatientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const getNonSensitivePatientsEntry = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatientsEntry): Patient => {
  const newPatientsEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientsEntry);
  return newPatientsEntry;
};

const addNewEntry = (idForPatient: string, entry: newEntry): Entry => {
  console.log(idForPatient)
  console.log(entry)
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patients.map((a) => {
    if (a.id === idForPatient) {
      a.entries.push(newEntry);
    }
  });
  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatientsEntry,
  findById,
  addNewEntry,
};
