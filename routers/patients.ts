import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatientEntry';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.json(patientService.getAllNonSensitivePatients());
});

patientsRouter.get('/:id', (req, res) => {
  try {
    res.json(patientService.getPatientById(req.params.id));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong ';

    if ( error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
});

patientsRouter.post('/', (req, res) => {
  try {
    const newEntry = toNewPatientEntry(req.body);
    const newPatient = patientService.addPatient(newEntry);

    console.log('New patient added');
    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong ';
    if ( error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
});

//TODO: Finish this method
/* patientsRouter.post('/:id/entries', (req, res) => {
  const newPatientEntry = 
});
 */
export default patientsRouter;