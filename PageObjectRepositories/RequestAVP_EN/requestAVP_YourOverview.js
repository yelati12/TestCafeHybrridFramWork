import {Selector} from 'testcafe';

export default class requestAVP_YourOverview {

    constructor() {

        this.overviewPageHeader = Selector('h2.is-emerald-progressbar-step-name.mb-2.mb-xs-2.mb-sm-2.mb-md-2.mb-lg-1.ng-binding', { timeout: 10000 }).nth(2)
        this.confirmRequest = Selector('button.btn.btn-primary.login-button.ng-binding.ng-scope', { timeout: 10000 })
        
    }


}