var assert = require('chai').assert;
var test = require('selenium-webdriver/testing');
var data = require('../../credentials');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    ActionSequence = webdriver.ActionSequence;

var host ='http://localhost:8080/';

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

test.describe('Проверка наличия компонентов взависимости от прав пользователя', function() {
    this.timeout(50000);

    test.after(function () {
        //driver.quit();
    });
    
    function singIn() {
        return driver.get(host + 'auth/vkontakte/callback').then(function () {
            driver.findElement(By.name("email"))
                .sendKeys(data.vk.email);
            driver.findElement(By.name("pass"))
                .sendKeys(data.vk.password);
            return driver.findElement(By.id("install_allow"));
        }).then(function (button) {
            new ActionSequence(driver)
                .click(button)//почему-то первого клика всегда не хватает
                .click(button)
                .perform();
        });
    }

    function logout() {
        driver.get('/logout');
    }
    
    test.it('Поведение при регистрации', function() {
        singIn().then(function () {
            var el1 = driver.findElement(By.css('[href="/federation/create"]'));
        });
    });
});