import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";

import { useStateValue } from "../state";
import { Diagnosis, Patient, Entry, newEntry } from "../types";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "../components/EntryDetails";
import AddEntry from "../AddEntry";
import { Button } from "@material-ui/core";

const DisplayPatient = () => {
  const [{ diagnoses }] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient>();

  console.log(patient);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: onePatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        setPatient(onePatient);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, []);

  const submitNewEntry = async (values: newEntry) => {
    try {
      const { data: newEntryForPatient } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      closeModal();

      const { data: onePatient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      setPatient(onePatient);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const checkGender = () => {
    if (patient) {
      switch (patient.gender) {
        case "male":
          return <MaleIcon />;
        case "female":
          return <FemaleIcon />;
        case "other":
          return <TransgenderIcon />;
      }
    }
  };
  if (!patient || !diagnoses) return <div>loading info....</div>;

  return (
    <div className="App">
      <AddEntry
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>

      <h1>
        {patient?.name} {checkGender()}
      </h1>

      <p>
        <strong>ssh: </strong> {patient?.ssn}
      </p>

      <p>
        <strong>occupation: </strong>
        {patient?.occupation}
      </p>

      <div>
        <h2>entries</h2>
        {patient?.entries.map((a: Entry) => {
          return (
            <div key={a.id}>
              <EntryDetails entry={a} />
              <ul>
                {a.diagnosisCodes?.map((b) => {
                  return (
                    <li key={b}>
                      {b}{" "}
                      {Object.values(diagnoses).map((c: Diagnosis) => {
                        if (c.code === { b }.b) {
                          return c.name;
                        }
                      })}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayPatient;
/**/
