import 'dotenv/config'
import * as fs from 'fs';
import * as csv from 'fast-csv';
import moment from 'moment';
import nodefetch from 'node-fetch';
import path from 'path';

/**
 * This script is intended to help update the database with SimplyBook therapy appointments 
 * that were missed due to a broken zapier. 
 */
const URL = process.env.SIMPLYBOOK_WEBHOOK_URL; 
const AUTH = process.env.AUTH
const CSV_FILE = process.env.CSV_FILE;


const headers = {
    'Content-Type': 'application/json', 
    'Authorization': `${AUTH}`
};

const checkEnvVarsSet = () => {
    if(!URL) throw Error('Please set simplybook webhook URL');
    if(!AUTH) throw Error('Please set auth');
    if(!CSV_FILE) throw Error('Please set the file containing records to upload');
}

const readAndProcessFile = () => {
  const csvFilePath = path.resolve('simplybook', CSV_FILE);  

  fs.createReadStream(path.resolve(csvFilePath))
      .pipe(csv.parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', therapySessionRow => addTherapyInformation(therapySessionRow))
      .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
};

type TherapySessionInfo = {
    createdAt: string,
    updatedAt: string,
    action: string,
    clientEmail: string,
    bookingCode: string,
    clientTimezone: string,
    serviceName: string,
    serviceProviderName: string,
    serviceProviderEmail: string,
    startDateTime: string,
    endDateTime: string,
    cancelledAt: string,
    rescheduledFrom: string,
    completedAt: string,
    partnerAccessId: string
}

const convertDate = (dateToConvert: string) => {
    return moment(dateToConvert, "DD-MM-YYYY hh:mm:ss").toISOString()
}

const addTherapyInformation = async (row: TherapySessionInfo) => {

    const body = JSON.stringify({
        "client_email": row.clientEmail,
        "action": "NEW_BOOKING",
        "booking_code": row.bookingCode,
        "service_name": "Therapy in English",
        "service_provider_name": row.serviceProviderEmail,
        "service_provider_email": row.serviceProviderEmail,
        "start_date_time": convertDate(row.startDateTime),
        "end_date_time": convertDate(row.endDateTime),
        "client_timezone": "Unknown"
    });
    
    const res = await nodefetch(URL, {
        method: 'POST',
        body,
        headers
    });

    const status = res.status;

    if (status === 201){
        console.log(`Succesful`)

    } else {
        console.log(`Failed with status ${status}`)
    }
}

const runScript = async () => {
    checkEnvVarsSet()
    readAndProcessFile()

    process.stdout.write('Script finished, ')
}

runScript();