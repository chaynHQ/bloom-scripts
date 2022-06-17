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
const TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5MGZiMWFlMDQ4YTU0OGZiNjgxYWQ2MDkyYjBiODY5ZWE0NjdhYzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmxvb20tZGV2LThmMDg1IiwiYXVkIjoiYmxvb20tZGV2LThmMDg1IiwiYXV0aF90aW1lIjoxNjU1NDcwMzg4LCJ1c2VyX2lkIjoiS3hQY3RDTzMwZlRhUkxzMlpKTDhjeGNIeFgyMiIsInN1YiI6Ikt4UGN0Q08zMGZUYVJMczJaSkw4Y3hjSHhYMjIiLCJpYXQiOjE2NTU0NzAzODgsImV4cCI6MTY1NTQ3Mzk4OCwiZW1haWwiOiJzd2V0aGFAY2hheW4uY28iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzd2V0aGFAY2hheW4uY28iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.uN2UtASfWgQUuIBeYqCbLus5Rr3ynhznmbZevFI7lPdCePIkO46KXx7UDAjyPclWe6QUFzDFjXqWxJk058fxhDLABQOPctKgyuYgayNK9HF9vNuAXmUt_Ij2FEo-2r6ei_wRYNgYwlRt0ov7PYrepHKtkB5PSjUEYnUkZ7YVopdFL_AVcsXszC4TtEmSiz0lvw59e9eXF7tjSwRrzmIpUnP0sG0Fb-CbEAjiES4qvM5KBLvBRPofpN_Fnd-kOsJRT5zL9b8DPMs20Urb1eUcHxDfwqRPofRs8v0H2YcDgFi0J9dzDh5-HFzkVF8rWBbHRR56mp4awyNB_pLSCbVxKQ";
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