import {Selector} from 'testcafe';

export default class requestAVP_CalculatePremium {

    constructor() {

        this.acceptCookie = Selector('#aab-cookie-consent-agree', { timeout: 10000 })
        this.privacyStatement = Selector('aab-notification.ng-scope[type="privacy"]', { timeout: 10000 })
        this.familySituationMyself = Selector('span.vertical-radio-label-text.align-bottom.ng-binding', { timeout: 10000 }).nth(0)
        this.familySituationMyselfandChildren = Selector('span.vertical-radio-label-text.align-bottom.ng-binding', { timeout: 10000 }).nth(1)
        this.familySituationMyselfandPartner = Selector('span.vertical-radio-label-text.align-bottom.ng-binding', { timeout: 10000 }).nth(2)
        this.familySituationMyselfPartnerAndChildren = Selector('span.vertical-radio-label-text.align-bottom.ng-binding', { timeout: 10000 }).nth(3)
        this.firstCoverValue = Selector('div.ng-binding[slot="enriched-content"]', { timeout: 10000 }).nth(0)
        this.secondCoverValue = Selector('div.ng-binding[slot="enriched-content"]', { timeout: 10000 }).nth(1)
        this.firstExcessClaimValue = Selector('div.ng-binding[slot="enriched-content"]', { timeout: 10000 }).nth(2)
        this.secondExcessClaimValue = Selector('div.ng-binding[slot="enriched-content"]', { timeout: 10000 }).nth(3)
        this.prefferedEffectiveDate = Selector('input[name="policyStartDate"]', { timeout: 10000 })
        this.loginAndContinue = Selector('button.btn.btn-primary.login-button.ng-binding.ng-scope', { timeout: 10000 })
    }


}