import {Selector} from 'testcafe';

export default class requestAVP_YourDetails {

    constructor() {

        this.selectYourAccountDropdown = Selector('span.em-icon-size-3.sy-arrow-chevron-down.position-relative', { timeout: 10000 }).nth(0)
        this.selectedAccount = Selector('div.row.no-gutters.em-overflow-hide', { timeout: 10000 }).nth(1)
        this.authorizeCheckbox = Selector('input#debitConfirmation', { timeout: 10000 })
        this.claimedInsuranceNo = Selector('span.ng-scope[data-translate="label:no"]', { timeout: 10000 }).nth(0)
        this.deniedInsuranceNo = Selector('span.ng-scope[data-translate="label:no"]', { timeout: 10000 }).nth(1)
        this.convictedOfOffenceNo = Selector('span.ng-scope[data-translate="label:no"]', { timeout: 10000 }).nth(2)
        this.toYourOverview = Selector('button.btn.btn-primary.login-button.ng-binding.ng-scope', { timeout: 10000 })
        
        
    }

}