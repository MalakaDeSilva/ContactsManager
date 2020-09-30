const { google } = require('googleapis');

function listConnectionNames(auth) {
    const service = google.people({ version: 'v1', auth });
    let contacts = service.people.connections.list({
        resourceName: 'people/me',
        pageSize: 100,
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
    service.people.createContact({
        parent: 'people/me',
        resource: contact
    }, {}, function (err, res) {
        console.log(err)
    });
}

module.exports = {
    listConnectionNames,
    insertContact
};