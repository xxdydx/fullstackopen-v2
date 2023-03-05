// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type PublicPatientData = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// Entries

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry["code"]>;
}

interface sickLeave {
  startDate: string;
  endDate: string;
}
interface discharge {
  date: string;
  criteria: string;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  sickLeave?: sickLeave;
  employerName: string;
  type: "OccupationalHealthcare";
}
interface HospitalEntry extends BaseEntry {
  discharge: discharge;
  type: "Hospital";
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: number;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
