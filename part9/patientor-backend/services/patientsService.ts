import rawPatientData from "../data/patients";
import { NewPatient, Patient, PublicPatientData } from "../types";
import { v1 as uuid } from "uuid";

const patientData: Array<Patient> = rawPatientData.map(
  ({ id, name, dateOfBirth, gender, ssn, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
    entries,
  })
);

const getUncensoredData = (): Array<Patient> => {
  return patientData;
};
const getPatient = (id: string): Patient | undefined => {
  const patient = patientData.find((x) => x.id === id);
  return patient;
};

const getPublicData = (): Array<PublicPatientData> => {
  return patientData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patientData.push(newEntry);
  return newEntry;
};

export default { getUncensoredData, getPublicData, addPatient, getPatient };
