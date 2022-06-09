import express from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  const response = diagnosesService.getEntries();
  /*console.log("respo", response);*/
  res.json(response);
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
