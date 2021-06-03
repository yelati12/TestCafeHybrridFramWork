import {Selector} from 'testcafe';

export default class requestAVP_loginUsingIdentifier {

    constructor() {

        this.identifierIcon = Selector('span.glyphicon.ocf-icon-edentifier2.ocf-icon-extralarge', { timeout: 10000 })
        this.reqdTestAccount = Selector('ul>li:last-of-type', { timeout: 10000 })
        this.loginButton = Selector('#clickToLogin', { timeout: 10000 })
        this.accountNumber = Selector('input#account-number-input', { timeout: 10000 })
        this.cardNumber = Selector('input#card-number-input', { timeout: 10000 })
        this.responseField = Selector('input#login-response-input', { timeout: 10000 })
        this.nextButton = Selector('#login-submit', { timeout: 10000 })

    }

}