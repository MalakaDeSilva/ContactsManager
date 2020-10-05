'use strict'

const { google } = require('googleapis');

function listConnectionNames(auth) {
    const service = google.people({ version: 'v1', auth });
    let contacts = service.people.connections.list({
        resourceName: 'people/me',
        pageSize: 300,
        personFields: 'photos,names,phoneNumbers',
    })
        .then((res) => {
            return res.data.connections;
        }).catch((err) => {
            console.log('Error: ', err);
        })

    return contacts;
}

function insertContact(auth, contact) {
    const service = google.people({ version: 'v1', auth });
    let returnedContact = service.people.createContact({
        personFields: "names",
        requestBody: contact
    })
    .then((res) => {
        return "done";
    })
    .catch((err) => {
        console.log(err)
    });
    return returnedContact;
}

function logOut(auth){
    return auth.revokeCredentials();
}

module.exports = {
    listConnectionNames,
    insertContact,
    logOut
};