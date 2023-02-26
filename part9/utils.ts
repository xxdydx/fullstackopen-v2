import {Patient, Gender, NewPatient} from './patientor-backend/types'


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}
const parseString = (string: unknown): string => {
    if (!string || !isString(string)) {
        throw new Error ('Incorrect or missing string')
    }
    return string
}
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error ('Incorrect or missing date' + date);
    }
    return date;
}

const isGender = (gender: string): gender is Gender => {
return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseGender = (gender: unknown): string => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error ('Incorrect or missing gender');
    }
    return gender;
}

const parseNewEntry = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation)
    
          };
          return newEntry
    }

    throw new Error('Incorrect data: some fields are missing');

 

}