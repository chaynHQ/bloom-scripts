# Bloom

Bloom is a remote trauma support service from Chayn, a global charity supporting survivors of abuse across borders. Bloom is our flagship product; a free, web-based support service designed for anyone who has experienced or is currently experiencing domestic or sexual abuse. Through a combination of online video-based courses, anonymous interaction and 1:1 chat, Bloom aims to provide tailored information, guidance, everyday tools, and comforting words to cope with traumatic events.

## Get involved

Bloom is created by Chayn, global nonprofit, run by survivors and allies from around the world, creating resources to support the healing of survivors of gender-based violence. There are lots of ways to get involved, from joining our volunteer team to [donating](https://www.paypal.me/chaynhq) or supporting us on social media.

Website - [Chayn](https://www.chayn.co/)

Twitter - [@ChaynHQ](https://twitter.com/ChaynHQ)

Instagram - [@chaynhq](https://www.instagram.com/chaynhq/)

Youtube - [Chayn Team](https://www.youtube.com/channel/UC5_1Ci2SWVjmbeH8_USm-Bg)

# Bloom Scripts

A repository to hold scripts the Bloom tech team has found useful. 

**Currently in active development**

## Git flow and deployment

Create new branches from the `main` base branch. After adding scripts, simply push and create a pull request for the new branch. 

## License

Bloom and all of Chayn's projects are open source.

## Creating a new partner admin
The process for creating a new partner admin is different depending on whether the user has already created a public bloom account. 

### User does not have an account 
The script to use in this case is `insert-user-as-partner-admin.sql`. 

1. Manually create a new user in firebase with a secure password.
2. Copy the firebase ID of the new user and using this information as well as the user's full name and email, create a new user in the database using step one of the script. To do this, the step two portion of the script will need to be commented out. 
3. If no errors occurred, commit this change.
4. Now, using step two of the script, insert a partner-admin entity using the email and partner name. This will convert the user to a partner admin. To do this, the step one portion of the script should be commented out. 
5. If no errors occurred, commit this change.  
6. Share the credentials to the new user and request that they change their password immediately. 

### User does have an account 
The script to use in this case is `convert-user-to-partner-admin.sql`. 

1. Check the user exists in the database by running a query against the users table with the given user email. 
2. If the user exists, run the script to add a partner-admin entity using the user's email and the partner name. 
3. If no errors occurred, commit this change.
4. Let the user know they've been upgraded to a partner admin

## Creating access codes 

 The `create-access-codes` script in the `package.json` file is intended to help easily create access codes for a given partner. To run the script, we'll need to:
 1. First create a local `.env` file if one doesn't already exist. See the `env.example` file for an example. 
 2. Fill in the `URL` variable in the `.env` file. This variable should point to the bloom backend in the environment where the codes are needed (staging or prod)
 3. Next, we'll fill in the `TOKEN` variable in the `.env` file. To do this, send a POST request to `{{host}}/api/auth/signin` with a body including email and password e.g. `{"email": "<fill-in>","password": "%<fill-in>"}`. The credentials MUST belong to a user who is an admin and associated with the partner for whom the codes are being created. The `{{host}}` in the given url must be the same as the 
 4. From the api response, copy the access token and paste it as the `TOKEN` variable in the `.env` file. 
 5. Finally, set the `NUMBER_OF_CODES_NEEDED` variable in the `.env` file
 6. Now run the script by using the following command: `yarn create-access-codes`. 
 7. The script will now print out access codes separated by a comma

### Processing create-access-codes script output using Google sheets
This is one potential way to process the output of the above script. 
 1. Copy and paste the comma separated script output into a Google Sheet. The sheet will contain one cell with the codes separated by commas
 2. With the cell highlighted, click on "Data > Split text into columns". This will separate the access codes into separate columns in a single row.m 
 3. Copy the row with all the codes, click on the cell below, right click and choose  "Paste special > Tranposed". This paste command will put an access code on each row. 
 4. That's it! Celebrate :)