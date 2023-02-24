import 'dotenv/config';
import nodefetch from 'node-fetch';
/**
 * This script is intended to fill the database with users that can be used for cypress testing.
 * There is a pre requisites for using this script in the in the CYPRESS.md such as creating a super admin user.
 */

//
const URL = process.env.URL;
const TOKEN = process.env.TOKEN;
const CYPRESS_TEMPLATE_EMAIL = process.env.CYPRESS_TEMPLATE_EMAIL;
const CYPRESS_TEMPLATE_PASSWORD = process.env.CYPRESS_TEMPLATE_PASSWORD;
const BUMBLE_PARTNER_ID = process.env.BUMBLE_PARTNER_ID;
const BADOO_PARTNER_ID = process.env.BADOO_PARTNER_ID;


const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
};

const checkEnvVarsSet = () => {
  if (!URL) throw Error('Please set API URL');
  if (!TOKEN) throw Error('Please set bearer token');
  if (!CYPRESS_TEMPLATE_EMAIL) throw Error('Please set a template email');
  if (!CYPRESS_TEMPLATE_PASSWORD) throw Error('Please set a template password');
};

const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

// create a public testing user

const generateCreateUserDto = (modifications) => {
  return {
    name: 'Test public user - do not delete',
    email: 'email@email.com',
    password: CYPRESS_TEMPLATE_PASSWORD,
    contactPermission: false,
    signUpLanguage: 'en',
    ...modifications,
  };
};

const generateEmail = (modification) => {
  const emailArray = CYPRESS_TEMPLATE_EMAIL?.split('@');
  return emailArray ? `${emailArray[0]}+${modification}@${emailArray[1]}` : CYPRESS_TEMPLATE_EMAIL;
};

const createPublicUser = async () => {
  const dto = generateCreateUserDto({ email: generateEmail('publicuser') });
  createUser(dto)
};

const createBumblePartnerAdminUser = async () => {
    const dto = {
        partnerId: BUMBLE_PARTNER_ID,
        name: 'Test bumble partner admin user - do not delete',
        email: generateEmail("bumblepartneradmin")
    }
    createPartnerAdminUser(dto)
};
const createBadooPartnerAdminUser = async () => {
    const dto = {
        partnerId: BUMBLE_PARTNER_ID,
        name: 'Test badoo partner admin user - do not delete',
        email: generateEmail("badoopartneradmin")
    }
    createPartnerAdminUser(dto)
};

const createUser = async (dto) => {
    const res = await nodefetch(`${URL}/v1/user`, {
      method: 'POST',
      body: JSON.stringify(dto),
      headers,
    });
    const [status, jsonData] = await Promise.all([res.status, res.json()]);
    console.log(status)
  
    if (status === 201) {
      process.stdout.write(`${jsonData},`);
    } else {
      console.log(`Creating a user failed with status ${status} and response:`);
      console.log(jsonData);
    }
};

const createPartnerAdminUser = async (dto)=>{
    const res = await nodefetch(`${URL}/v1/partner-admin/create-user`, {
        method: 'POST',
        body: JSON.stringify(dto),
        headers,
      });
      const [status, jsonData] = await Promise.all([res.status, res.json()]);
    
      if (status === 201) {
        process.stdout.write(`${jsonData},`);
      } else {
        console.log(`Creating a partner admin user failed with status ${status} and response:`);
        console.log(jsonData);
      }
}

const runScript = async () => {
  checkEnvVarsSet();
  createPublicUser();
  createBumblePartnerAdminUser();
  createBadooPartnerAdminUser();

  // process.stdout.write('Script finished, ')
};

runScript();
