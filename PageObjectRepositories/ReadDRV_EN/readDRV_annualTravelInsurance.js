import {Selector} from 'testcafe';

export default class readDRV_annualTravelInsurance {

    constructor(){

        this.annualTravelInsurancePageHeader = Selector('h1.text-white.h2.m-0.ng-scope')
        this.yourInsuranceHeader = Selector('h1.mb-2.h3.ng-scope[data-translate="heading:insurance"]')
        this.policyHolderLabel = Selector('[data-translate="label:policy-holder"]')
        this.policyHolderName = Selector('[class="em-rounded-top-2 bg-white em-shadow-tile widget-spacing"] [class="col-lg-9 col-md-9 col-sm-9 mb-0 ng-binding"]')
        this.yourPolicyLabel = Selector('p.col-lg-3.col-md-3.col-sm-3.details_label.ng-scope[data-translate="label:policy"]')
        this.policyDocumentPDF = Selector('a.icon-link.ng-scope').nth(0)
        this.premiumLabel = Selector('p.col-lg-3.col-md-3.col-sm-3.details_label.ng-scope[data-translate="label:premium"]')
        this.premiumAmount = Selector('p.mb-1.ng-binding')
        this.premiumText = Selector('[data-translate="message:premium-text"]')
        this.termsAndConditionsText = Selector('[data-translate="message:view-policy-details"]')
        this.submitClaimButton = Selector('button.btn.btn-primary.schade-melden.ng-binding')
        this.changeYourInsuranceHeader = Selector('h1.h3.mb-2.ng-scope[data-translate="heading:insurance-change"]')
        this.changeYourInsuranceText = Selector('p.ng-scope[data-translate="message:insurance-change-text"]')
        this.policyDetailsHeader = Selector('h1.mb-2.h3.ng-scope[data-translate="heading:policy-details"]')
        this.policyNumberLabel = Selector('p.col-lg-3.col-md-3.col-sm-3.details_label.ng-scope[data-translate="label:policy-number"]')
        this.effectiveDateLabel = Selector('p.col-lg-3.col-md-3.col-sm-3.details_label.ng-scope[data-translate="label:effective-date-of-current-coverage"]')
        this.renewalDateLabel = Selector('p.col-lg-3.col-md-3.col-sm-3.details_label.ng-scope[data-translate="label:revised-date-of-current-coverage"]')
        this.accountNumberLabel = Selector('p.col-lg-3.col-md-3.col-sm-3.details_label.ng-scope[data-translate="label:account-number"]')
        this.policyNumber = Selector('p.col-lg-9.col-md-9.col-sm-9.mb-0.ng-binding').nth(1)
        this.effectiveDate = Selector('.col-lg-9.col-md-9.col-sm-9.mb-0.ng-binding.text-lowercase')
        this.accountNumber = Selector('p.col-lg-9.col-md-9.col-sm-9.mb-0.ng-binding').nth(3)
        this.renewalDate = Selector('span.ng-binding').nth(0)
        this.renewalDateInfoButton = Selector('#i-text-button-')
        this.renewalDateHeaderInAdditionalInfo = Selector('h4.mr-2.ng-binding')
        this.renewalDateTextInAdditionalInfo = Selector('p.i-text-message-inner')
        this.renewalDateAdditionalInfoCloseButton = Selector('#i-text-message-close')
        this.cancelInsuranceHeader = Selector('h3.mt-1.mb-2.ng-scope[data-translate="heading:cancel-insurance"]')
        this.cancelInsuranceText = Selector('p.mb-2.ng-scope[data-translate="message:active-cancel-insurance"]')
        this.cancelInsuranceLink = Selector('[data-translate="link:cancel-insurance-text"]')
        this.myProductsLink = Selector('[data-translate="label:products"]')
        this.customerCareHeader = Selector('[data-translate="label:customer-care"]')
        this.customerCareText = Selector('[data-translate="message:customer-care-info"]')
        this.customerCareNumberNL = Selector('[data-translate="message:customer-care-number-nl"]')
        this.customerCareNumberAbroad = Selector('[data-translate="message:customer-care-number-abroad"]')
        this.termsAndConditionsLabel = Selector('[data-translate="label:conditions"]')
        this.termsAndConditionsPDF = Selector('a.icon-link.ng-scope').nth(1)
        

        

    }
}