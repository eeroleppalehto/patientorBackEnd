import { EntryWithoutId, Diagnosis, Discharge, HospitalEntry, OccupationalHealthcareEntry, SickLeave, HealthCheckEntry, HealthCheckRating } from "../types";

const toEntryWithoutId = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('type' in object) || !isString(object.type)) {
    throw new Error('Invalid or missing type');
  }

  switch (object.type) {
    case 'Hospital':
      if ( 'date' in object
          && 'description' in object
          && 'specialist' in object
          && 'diagnosisCodes'  in object
          && 'type' in object
          && 'discharge' in object
          ) {
            const hospitalEntry: Omit<HospitalEntry, "id"> = {
              date: parseDate(object.date),
              description: parseText(object.description),
              specialist: parseText(object.specialist),
              diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
              type: 'Hospital',
              discharge: parseDischarge(object.discharge)
            };

            return hospitalEntry as EntryWithoutId;
          }
      throw new Error('Incorrect data: some fields are missing');
    case 'OccupationalHealthcare':
      if ( 'date' in object
          && 'description' in object
          && 'specialist' in object
          && 'diagnosisCodes'  in object
          && 'type' in object
          && 'employerName' in object
          && 'sickLeave' in object
          ) {
            const occupationalEntry: Omit<OccupationalHealthcareEntry, "id"> = {
              date: parseDate(object.date),
              description: parseText(object.description),
              specialist: parseText(object.specialist),
              diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
              type: 'OccupationalHealthcare',
              employerName: parseText(object.employerName),
              sickLeave: parseSickLeave(object.sickLeave)
            };

            return occupationalEntry as EntryWithoutId;
          }
      throw new Error('Incorrect data: some fields are missing');
    case 'HealthCheck':
      if ( 'date' in object
          && 'description' in object
          && 'specialist' in object
          && 'diagnosisCodes'  in object
          && 'type' in object
          && 'healthCheckRating' in object
          ) {
            const healthCheckENtry: Omit<HealthCheckEntry, "id"> = {
              date: parseDate(object.date),
              description: parseText(object.description),
              specialist: parseText(object.specialist),
              diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
              type: 'HealthCheck',
              healthCheckRating: parseHealtCheckRating(object.healthCheckRating),
            };

            return healthCheckENtry as EntryWithoutId;
          }
      throw new Error('Incorrect data: some fields are missing');
    default:
      break;
  }
  
  throw new Error('Incorrect data: some fields are missing');
};



const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object') {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object as Array<Diagnosis['code']>;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing discharge');
  }

  if ( 'date' in object
    && 'criteria' in object
  ) {
    const discharge: Discharge = {
      date: parseDate(object.date),
      criteria: parseText(object.criteria)
    };

    return discharge;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing discharge');
  }

  if ( 'startDate' in object
    && 'endDate' in object
  ) {
    const sickleave: SickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate)
    };

    return sickleave;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseHealtCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Invalid or missing rating: ' + rating);
  }

  return rating;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing date: ' + date);
  }

  return date;
};

const parseText = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Incorrect or missing field');
  }

  return text;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object
    .values(HealthCheckRating)
    .filter(item => item)
    .includes(param);
};

export default toEntryWithoutId;