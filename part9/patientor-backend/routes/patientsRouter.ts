import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPublicData());
});

router.post('/', (req, res) => {
  const {name, gender, dateOfBirth, ssn, occupation} = req.body
  const newEntry = patientsService.addPatient({
    name, gender, dateOfBirth, ssn, occupation
  })
  res.send(newEntry)
});

export default router;
