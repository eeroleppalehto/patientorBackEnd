import diagnoseEntries from "../data/diagnoses";
import { Diagnosis } from "../types";

const getAllDiagnoses = (): Diagnosis[] => {
  return diagnoseEntries;
};

export default { getAllDiagnoses };