import {Selector} from 'testcafe';

export default class requestAVP_ConfirmationMessagePage {

    constructor() {

        this.confirmationMessage = Selector('h1.mt-3.mb-2.h2.ng-scope', { timeout: 30000 })
        this.logout = Selector('a#undefined')
        
    }
}

