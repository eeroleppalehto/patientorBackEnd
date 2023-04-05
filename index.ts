import express from 'express';
import cors from 'cors';
//import { Patient, Gender } from './types';
import diagnoseService from './services/diagnoseService';
import patientService from './services/patientService';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

/* const patientList:Patient[] = [
  {
    id: '1',
    name: 'Esko',
    occupation: 'patient',
    gender: Gender.Male
  },
  {
    id: '2',
    name: 'Asko',
    occupation: 'undertaker',
    gender: Gender.Other
  }
]; */

app.get('/api/ping', (_req,res) => {
  console.log('hello');
  res.send('pong pat');
});

app.get('/api/patients', (_req, res) => {
  res.json(patientService.getAllPatients());
});

app.get('/api/diagnoses', (_req, res) => {
  res.json(diagnoseService.getAllDiagnoses());
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});