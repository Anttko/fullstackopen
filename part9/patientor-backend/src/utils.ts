import {
  NewPatientsEntry,
  Gender,
  Entry,
  newEntry,
  newHealthCheckEntry,
  newOccupationalHealthcareEntry,
  newHospitalEntry,
} from "./types";

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
/*
const isNumber = (value: unknown): value is number => {
return typeof value === "number" || value instanceof Number;
}
*/

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
/*
const isHealthCheck = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const parseHealthCheck = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheck(rating)) {
    throw new Error("Incorrent or missing health check rating " + rating);
  }
  return rating;
};
*/
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrent or missing gender" + gender);
  }
  return gender;
};

const isDiagnonsiscode = (param: string[]): param is string[] => {
  return Array.isArray(param);
};

const parseArray = (param: any): string[] => {
  if (!isDiagnonsiscode(param)) {
    throw new Error("Incorrect list" + param);
  }
  param.forEach((a) => {
    if (!isString(a)) {
      throw new Error("Incorrect value or missing" + param);
    }
  });
  return param;
};

export const toEntry = (entryToCheck: any): newEntry => {
  const returnedEntry = {
    description: parseName(entryToCheck.description),
    date: parseDateOfBirth(entryToCheck.date),
    specialist: parseName(entryToCheck.specialist),
    diagnosisCodes: parseArray(entryToCheck.diagnosisCodes),
  };

  switch (entryToCheck.type) {
    case "HealthCheck":
      const newHCE: newHealthCheckEntry = {
        ...returnedEntry,
        type: entryToCheck.type,
        healthCheckRating: entryToCheck.healthCheckRating,
      };
      return newHCE;
    case "OccupationalHealthcare":
      const newOHC: newOccupationalHealthcareEntry = {
        ...returnedEntry,
        type: entryToCheck.type,
        employerName: parseName(entryToCheck.employerName),
        sickLeave: {
          startDate: parseDateOfBirth(entryToCheck.sickLeave.startDate),
          endDate: parseDateOfBirth(entryToCheck.sickLeave.endDate),
        },
      };
      return newOHC;

    case "Hospital":
      const newH: newHospitalEntry = {
        ...returnedEntry,
        type: entryToCheck.type,
        discharge: {
          date: parseDateOfBirth(entryToCheck.discharge.date),
          criteria: parseName(entryToCheck.discharge.criteria),
        },
      };
      return newH;
    default:
      throw new Error("Incorrect or missing entry type.");
  }
};

/*
const isDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("no description");
  }
  return description;
};
const isSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("no description");
  }
  return specialist;
};
*/
export default toNewPatientsEntry;
