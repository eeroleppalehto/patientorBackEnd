import patientEntries from "../data/patients";
import { NonSensitivePatient, Patient } from "../types";

const getAllPatients = ():Patient[] => {
  return patientEntries;
};

const getAllNonSensitivePatients = ():NonSensitivePatient[] => {
  return patientEntries.map(({ id, name, occupation, gender }) => (
    {id, name, occupation, gender}));
};

export default { getAllPatients, getAllNonSensitivePatients };