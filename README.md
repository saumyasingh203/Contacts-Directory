# Contacts-Directory

This is a Contacts Directory where you can login into your Directory using your credentials which will be saved on our database and accesss your list of contacts.
The backend is built in Node.js with a MongoDB Database to store the data for each contact.

This is the full app. The API can be found <a href = "https://github.com/bradtraversy/contact_keeper_api">here</a> with documented endpoints

## Usage
Install dependencies

npm install
npm client-install
Mongo connection setup
Edit your /config/default.json file to include the correct MongoDB URI

## Run Server
npm run dev     # Express & React :3000 & :5000

npm run server  # Express API Only :5000

npm run client  # React Client Only :3000
