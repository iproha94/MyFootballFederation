process.env.NODE_ENV = 'test';

var wd = require('selenium-webdriver');
let chai = require('chai');
var assert = chai.assert;
chai.use(require('chai-http'));

let Team = require('../../models/team');
var secret = require('./tools/secret');
let app = require('../../app').app;

var URL = 'http://localhost:8080';

var client = new wd.Builder()
    .forBrowser('chrome')
    .build();

let vkPage = require('./pages/vk').vkPage;
vkPage = new vkPage(client);

let mainPage = require('./pages/main').mainPage;
mainPage = new mainPage(client);


describe('GUI Create team', () => {
    beforeEach((done) => {
        Team.remove()
            .then(() => {
                done();
            })
    });

    it('create team', function(done) {
        let teamName = 'NAME TEAM1';
        let teamCity = 'CITY TEAM1';

        vkPage.open()
            .then(() => {
                vkPage.auth(secret.emailVk, secret.passVk);
                mainPage.open(URL);
                mainPage.auth();
                mainPage.createTeam(teamName, teamCity);
                client.quit();
            })
            .then(() => {
                return Team.find({name: teamName}, function (err, team) {
                    assert.isNull(err);
                    assert.isNotNull(team);
                    done();
                })
            })
    });
});