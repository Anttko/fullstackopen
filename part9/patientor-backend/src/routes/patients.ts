import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientsEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const response = patientsService.getNonSensitivePatientsEntry();
  /*console.log("respo", response);*/
  res.json(response);
});

router.get("/:id", (req, res) => {
  const response = patientsService.findById(req.params.id);
  /*console.log("respo", response);*/
  if (response) {
    res.send(response);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientsEntry = toNewPatientsEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientsEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  console.log(req.body, req.params.id)
  try {
    const newEntry = req.body;
    const requestId = req.params.id;
    const addNewEntry = patientsService.addNewEntry(requestId, newEntry);
    res.json(addNewEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
