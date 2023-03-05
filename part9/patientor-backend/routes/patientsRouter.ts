import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPublicData());
});

router.get("/:id", (req, res) => {
  res.send(patientsService.getPatient(req.params.id));
});

router.post("/", (req, res) => {
  const { name, gender, dateOfBirth, ssn, occupation, entries } = req.body;
  const newEntry = patientsService.addPatient({
    name,
    gender,
    dateOfBirth,
    ssn,
    occupation,
    entries,
  });
  res.send(newEntry);
});

export default router;
