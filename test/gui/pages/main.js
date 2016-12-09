var wd = require('selenium-webdriver');

function mainPage(driver) {
    let self = this;

    self.driver = driver;

    self.open = function(url) {
        return self.driver.get(url);
    };

    self.auth = function() {
        self.driver.findElement(wd.By.id('vk-auth-btn')).click();

        self.driver.findElements(wd.By.className("button_indent"))
            .then(arr => {
                if (arr.length > 0) {
                    arr[0].click();
                }
            });
    };

    self.createTeam = function(teamName, teamCity) {
        // var createTeamBtn = self.driver.wait(wd.until.elementLocated(wd.By.id('create-team-btn')), 10000);
        // createTeamBtn.click();
        self.driver.findElement(wd.By.id('create-team-btn')).click();

        self.driver.findElement(wd.By.id('team-name')).sendKeys(teamName);
        self.driver.findElement(wd.By.id('team-city')).sendKeys(teamCity);

        self.driver.findElement(wd.By.id('send-team-btn')).click();
    }

}

module.exports.mainPage = mainPage;