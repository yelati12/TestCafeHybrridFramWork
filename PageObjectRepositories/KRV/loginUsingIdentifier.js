import {Selector} from 'testcafe';

export default class loginUsingIdentifier {

    constructor() {

        this.identifierIcon = Selector('span.glyphicon.ocf-icon-edentifier2.ocf-icon-extralarge')
        this.reqdTestAccount = Selector('ul>li:last-of-type')
        this.loginButton = Selector('#clickToLogin')
        this.accountNumber = Selector('input#account-number-input')
        this.cardNumber = Selector('input#card-number-input')
        this.responseField = Selector('input#login-response-input')
        this.nextButton = Selector('#login-submit')

    }

}