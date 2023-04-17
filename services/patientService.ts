import patientEntries from "../data/patients";
import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getAllPatients = (): Patient[] => {
  return patientEntries;
};

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientEntries.map(({ id, name, occupation, gender }) => (
    {id, name, occupation, gender}));
};

const getPatientById = (id: string): Patient => {
  const patient = patientEntries.find(entry => entry.id === id);

  if ( typeof patient === "undefined" ) {
    throw new Error('No patient found with specified id: ' + id);
  }

  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const newPatient: Patient = {
    id: id,
    ...entry
  };

  patientEntries.push(newPatient);
  return newPatient;
};

export default { getAllPatients, getAllNonSensitivePatients, addPatient, getPatientById };