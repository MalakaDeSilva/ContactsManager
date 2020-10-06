'use strict'

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const credentials = require('../credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/userinfo.profile'];

const TOKEN_PATH = './token.json';

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

function getAuthUrl() {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
    });
    return authUrl;
}

function storeToken(code) {
    oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
    });
}

function authorize() {
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) console.log(err);
        else oAuth2Client.setCredentials(JSON.parse(token));
    });

    return oAuth2Client;
}

module.exports = {
    SCOPES,
    authorize,
    getAuthUrl,
    storeToken
};