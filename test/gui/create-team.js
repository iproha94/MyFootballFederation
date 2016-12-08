process.env.NODE_ENV = 'test';

let chai = require('chai');
var assert = chai.assert;

chai.use(require('chai-http'));

let Team = require('../../models/team');

var secret = require('./tools/secret');

let app = require('../../app').app;

var wd = require('selenium-webdriver');

var SELENIUM_HOST = 'http://localhost:4444/wd/hub';

var client = new wd.Builder()
    .usingServer(SELENIUM_HOST)
    .withCapabilities({ browserName: 'chrome' })
    .build();

var URL = 'http://localhost:8080';

describe('Create team', () => {
    beforeEach((done) => {
        Team.remove()
            .then(() => {
                done();
            })
    });

    it('normal create team', function(done){
        this.timeout(30000);
        let teamName = 'NAME TEAM1';
        let teamCity = 'CITY TEAM1';

        client.get(URL)
            .then(() => {
                client.findElement(wd.By.id('vk-auth-btn')).click();

                client.executeScript(`document.getElementsByName('email')[0].setAttribute('value', '${secret.emailVk}')`);
                client.executeScript(`document.getElementsByName('pass')[0].setAttribute('value', '${secret.passVk}')`);
                client.findElement(wd.By.id('install_allow')).click();

                // client.findElements(wd.By.className("button_indent"))
                //     .then(arr => {
                //         if (arr.length > 0) {
                //             arr[0].click();
                //         }
                //     });

                client.findElement(wd.By.id('create-team-btn')).click();

                client.findElement(wd.By.id('team-name')).sendKeys(teamName);
                client.findElement(wd.By.id('team-city')).sendKeys(teamCity);

                client.findElement(wd.By.id('send-team-btn')).click();
            })
            .then(() => {
                return Team.find({name: teamName}, function (err, team) {
                    assert.isNull(err);
                    assert.isNotNull(team);
                })
            })
            .then(() => {
                done();
            })
    });
});