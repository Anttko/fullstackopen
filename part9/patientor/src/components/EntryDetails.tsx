import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../types";

import React from "react";

const assertNever = (value: never): never => {
  throw new Error(`In value: ${JSON.stringify(value)}`);
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  console.log("1", entry);
  return (
    <div>
      <h2>{entry.date}</h2>
      <div>{entry.description} </div>

      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  console.log("2", entry);
  return (
    <div>
      <h2>{entry.date}</h2>
      <div>{entry.description} </div>
      <div>Employer: {entry.employerName}</div>
      <div>
        sick leave from: {entry.sickLeave?.startDate} to{" "}
        {entry.sickLeave?.endDate}
      </div>

      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  console.log("3", entry);
  return (
    <div>
      <h2>{entry.date}</h2>
      <div>{entry.description} </div>

      <div>discharged: {entry.discharge.date} </div>

      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  console.log("entrydetails", entry);
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
