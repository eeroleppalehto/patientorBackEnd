import { NewPatientEntry, Gender } from "../types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ( 'name' in object 
    && 'occupation' in object 
    && 'gender' in object 
    && 'ssn' in object
    && 'dateOfBirth' in object
    ) {
      const newPatient: NewPatientEntry = {
        name: parseText(object.name),
        occupation: parseText(object.occupation),
        gender: parseGender(object.gender),
        ssn: parseText(object.ssn),
        dateOfBirth: parseDate(object.dateOfBirth),
        entries: []
      };

      return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseText = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Incorrect or missing field');
  }

  return text;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing date: ' + date);
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Invalid or missing gender: ' + gender);
  }

  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(item => item.toString()).includes(param);
};

export default toNewPatientEntry;