import nodefetch from 'node-fetch';
/**
 * This script is intended to help create access codes for a given partner. 
 * 1. Ensure the "URL" variable below is set correctly to the bloom backend in the correct environment
 * 2. Login via postman using the credentials for a user admin associated with the required partner
 * 3. Copy the access token from the response and paste the token into the "TOKEN" variable below
 * 4. Set the "NUMBER_OF_CODES_NEEDED" variable below
 * 5. Run the script using the relevant yarn script 
 * 6. The script will print out access codes separated by a comma
 * 
 * Processing the output using Google Sheets
 * 1. Copy and paste script output into a Google Sheet. This will be one line with codes separated by commas
 * 2. With the cell highlighted, click on "Data > Split text into columns". This will separate the access codes into separate columns
 * 3. Copy the row with all the codes, click on the cell below, right click and choose  "Paste special > Tranposed". This paste command will put an access code on each row. 
 * 4. That's it!
 */
const URL = 'https://bloom-backend-staging.herokuapp.com/api'; // staging
const TOKEN = '';
const NUMBER_OF_CODES_NEEDED = 7;


const headers = {
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${TOKEN}`
};

function delay(time) {
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
    // process.stdout.write('Script start, ')

    // login();
    for( let i = 0; i < NUMBER_OF_CODES_NEEDED; i++) {
        addPartnerAccess();
        await delay(10);
    }

    // process.stdout.write('Script finished, ')
}

runScript();