import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routers/diagnoses';
import patientsRouter from './routers/patients';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;


app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});