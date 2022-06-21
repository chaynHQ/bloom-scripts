import nodefetch from 'node-fetch';
import 'dotenv/config'
/**
 * This script is intended to help create access codes for a given partner. 
 * The README will contain more information on how to run the script. 
 */
const URL = process.env.URL; 
const TOKEN = process.env.TOKEN
const NUMBER_OF_CODES_NEEDED = parseInt(process.env.NUMBER_OF_CODES_NEEDED);


const headers = {
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${TOKEN}`
};

const checkEnvVarsSet = () => {
    if(!URL) throw Error('Please set API URL');
    if(!TOKEN) throw Error('Please set bearer token');
    if(!NUMBER_OF_CODES_NEEDED) throw Error('Please set the number of codes needed');
}

const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
  }


const addPartnerAccess = async () => {

    const body = JSON.stringify({
        featureLiveChat: true,
        featureTherapy: true,
        therapySessionsRemaining: 6,
        therapySessionsRedeemed: 0
    });
    
    const res = await nodefetch(`${URL}/v1/partner-access`, {
        method: 'POST',
        body,
        headers
    });

    const [status, jsonData] = await Promise.all([res.status, res.json()])

    if (status === 201){
        process.stdout.write(`${jsonData.accessCode},`);

    } else {
        console.log(`Creating a partner access-code with failed with status ${status} and response:`)
        console.log(jsonData)
    }
}

const runScript = async () => {
    checkEnvVarsSet()

    for( let i = 0; i < NUMBER_OF_CODES_NEEDED; i++) {
        addPartnerAccess();
        await delay(10);
    }

    // process.stdout.write('Script finished, ')
}

runScript();