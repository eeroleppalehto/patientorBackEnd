import express from 'express';
import cors from 'cors';
//import { Patient, Gender } from './types';
import diagnoseService from './services/diagnoseService';
import patientService from './services/patientService';
import toNewPatientEntry from './utils/parsing';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req,res) => {
  res.send('pong pat');
});

app.get('/api/patients', (_req, res) => {
  res.json(patientService.getAllNonSensitivePatients());
});

app.get('/api/diagnoses', (_req, res) => {
  res.json(diagnoseService.getAllDiagnoses());
});

app.post('/api/patients', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});