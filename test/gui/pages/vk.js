var wd = require('selenium-webdriver');

function vkPage(driver) {
    let self = this;

    self.driver = driver;

    self.open = function() {
        return self.driver.get("https://vk.com/");
    };

    self.auth = function(emailVk, passVk) {
        self.driver.findElement(wd.By.id('index_email')).sendKeys(emailVk);
        self.driver.findElement(wd.By.id('index_pass')).sendKeys(passVk);

        self.driver.findElement(wd.By.id('index_login_button')).click();
    }

}

module.exports.vkPage = vkPage;