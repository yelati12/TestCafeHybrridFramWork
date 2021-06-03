import {Selector} from 'testcafe';

export default class readLegalExpense_legalExpenseInsurance{

    constructor() {

        this.acceptCookie = Selector('#aab-cookie-consent-agree', { timeout:5000 })
        this.legalExpensePageHeader = Selector('h1.text-white.h2.m-0.ng-scope[data-translate="heading:legal-expenses"]')
        this.yourInsurance = Selector('h1.mb-2.h3.ng-scope[data-translate="heading:insurance"]')
        this.policyHolder = Selector('p.col-lg-3.col-md-3.col-sm-3.details_label.ng-scope[data-translate="label:policy-holder"]')
        this.policyHolderName = Selector('p.col-lg-9.col-md-9.col-sm-9.mb-0.ng-binding').nth(0)
        this.whoIsInsured = Selector('p.col-lg-3.col-md-3.col-sm-3.details_label.ng-scope[data-translate="question:insured-persons"]')
        this.whoIsInsuredValue = Selector('p.col-lg-9.col-md-9.col-sm-9.mb-0.ng-binding').nth(1)
        this.cover = Selector('p.col-lg-3.col-md-3.col-sm-3.details_label.ng-scope[data-translate="label:coverage"]')
        this.coverValue = Selector('ul.list-item.pl-0.mb-0')
        this.yourPolicy = Selector('p.col-lg-3.col-md-3.col-sm-3.details_label.ng-scope[data-translate="label:policy"]')
        this.yourPolicyValue = Selector('a.icon-link.ng-scope[data-translate="pdf:policy-sheet"]')
        this.premium = Selector('p.col-lg-3.col-md-3.col-sm-3.details_label.ng-scope[data-translate="label:premium"]')
        this.premiumValue = Selector('div.col-lg-9.col-md-9.col-sm-9.mb-0.position-relative')
        this.policyDisclaimer = Selector('p.mb-0.ng-scope[data-translate="message:view-policy-details"]')
        this.changingYourInsuranceHeader = Selector('h1.h3.mb-2.ng-scope[data-translate="heading:insurance-change"]')
        this.changingYourInsuranceText = Selector('p.ng-scope[data-translate="message:insurance-change-text"]')
        this.changingYourInsuranceContactNumber = Selector('a.text-nowrap').nth(0)
        this.policyDetailsHeader = Selector('h1.mb-2.h3.ng-scope[data-translate="heading:policy-details"]')
        this.policyDetails = Selector('div.policy-details')
        this.cancellingYourInsuranceText = Selector('p.mb-2.ng-scope[data-translate="message:cancel-insurance-active-policy"]')
        this.cancellingYourInsuranceHeader = Selector('h3.mt-1.mb-2.ng-scope[data-translate="heading:cancel-insurance"]', { timeout: 20000 })
        this.submitClaimButton = Selector('button.btn.btn-primary.schade-melden.ng-binding', { timeout: 100000 })
        this.cancelInsurance = Selector('a.ng-scope[data-translate="link:cancel-insurance-text"]')
        this.myProducts = Selector('span.smb-1.sml-1.text-white.product-heading.ng-scope')
        this.serviceAndContact = Selector('span.ng-scope[data-translate="label:Service&Contact"]')
        this.needAssistanceHeader = Selector('h1.h3.mb-2.ng-scope[data-translate="label:askOrNeedHelp"]')
        this.needAssistanceText = Selector('p.ng-scope[data-translate="label:24/7"]')
        this.submitClaimModalHeader = Selector('h2.submit-claim-modal-title.ng-scope', { timeout: 20000 })
        this.submitClaimModalText = Selector('p.well.ng-scope')
        this.submitClaimModalClose = Selector('span.em-icon-size-3.sy-shapes-close-large.modal-close-event.ng-scope')
        this.changingYourInsuranceTelephoneNumber = Selector('a.text-nowrap', { timeout: 20000 }).nth(0)
        this.cancellingYourInsuranceTelephoneNumber = Selector('a.text-nowrap', { timeout: 20000 }).nth(1)
        this.secondOparandInformationBlock = Selector(() => document.querySelector("#innerPage > aab-widget > div > div > div.panel-body > ui-view > div > aab-widget-module > div.row.position-relative.ng-scope > div.col-lg-8.col-md-12.col-sm-12.col-xs-12.p-0 > div > insurance-details > div > div > div.mb-3.ng-scope > aab-notification").shadowRoot.querySelector("div > div > div > div.col.pl-1.pr-0"), { timeout: 50000 })
        this.moreAboutAuthorizationLink = Selector('a.telephone-number-link', { timeout: 20000 })
        this.secondOparandInfoBlock = Selector('div.mb-3.ng-scope')
    }
}