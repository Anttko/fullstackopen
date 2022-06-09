import { NewPatientsEntry, Gender, Entry } from "./types";

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: Entry[];
};

const toNewPatientsEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatientsEntry => {
  const newEntry: NewPatientsEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseName(ssn),
    gender: parseGender(gender),
    occupation: parseName(occupation),
    entries: [],
  };

  return newEntry;
};

const parseName = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing name");
  }

  return comment;
};
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrent or missing gender" + gender);
  }
  return gender;
};
/*
const isEntries = (param: string[]): param is string[] => {
  return Array.isArray(param);
};
 */ /*
const parseArray = (param: string[]): string[] => {
  if (!isEntries(param)) {
    throw new Error("Incorrect list" + param);
  }
  param.forEach((a) => {
    if (!isString(a)) {
      throw new Error("Incorrect value or missing" + param);
    }
  });
  return param;
};
*/
export default toNewPatientsEntry;
