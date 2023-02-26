import patientData from '../data/patients';
import { NewPatient, Patient, PublicPatientData } from "../types";
import { v1 as uuid } from 'uuid';


const getUncensoredData = (): Array<Patient> => {
  return patientData;
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

const addPatient = (entry:NewPatient): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry
  }
  patientData.push(newEntry)
  return newEntry
}

export default { getUncensoredData, getPublicData, addPatient };

