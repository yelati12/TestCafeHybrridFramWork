import {Selector} from 'testcafe';

export default class calculatePremium_YourDetails{

    constructor() {

        this.pageHeader = Selector('h2.is-emerald-progressbar-step-name.ng-binding').nth(1)
        this.goingToTripYes = Selector('span.ng-scope[data-translate="label:yes"]')
        this.goingToTripNo = Selector('span.ng-scope[data-translate="label:no"]')
        this.travellerInitial = Selector('input[name="firstname_0"]')
        this.surnamePrefix= Selector('input.form-control.ng-pristine.ng-untouched.ng-valid.ng-empty.ng-valid-minlength.ng-valid-maxlength')
        this.surname = Selector('input[name="lastname_0"]')
        this.dateOfBirth = Selector('input#dob_0')
        this.gender = Selector('span.text-truncate.mb-0.ng-binding.text-default-green-muted')
        this.male = Selector('span.text-nowrap.mb-0.ng-binding').nth(0)
        this.female = Selector('span.text-nowrap.mb-0.ng-binding').nth(1)
        this.claimedInsuranceYes = Selector('span.ng-scope[data-translate="label:yes"]').nth(1)
        this.claimedInsuranceNo = Selector('span.ng-scope[data-translate="label:no"]').nth(1)
        this.deniedInsuranceYes = Selector('span.ng-scope[data-translate="label:yes"]').nth(2)
        this.deniedInsuranceNo = Selector('span.ng-scope[data-translate="label:no"]').nth(2)
        this.convictedOfOffenceYes = Selector('span.ng-scope[data-translate="label:yes"]').nth(3)
        this.convictedOfOffenceNo = Selector('span.ng-scope[data-translate="label:no"]').nth(3)
        this.selectYourAccount = Selector('span.em-icon-size-3.sy-arrow-chevron-down.position-relative').nth(1)
        this.selectedAccount = Selector('div.d-flex.no-gutters.bg-white.p-3.em-tile.position-relative.border-top').nth(0)
        this.debitConfirmation = Selector('label.custom-control-label.ng-scope')
        this.toYourOverview = Selector('button#nextStep')
        this.overviewPageHeader = Selector('h2.is-emerald-progressbar-step-name.ng-binding').nth(2)


    }

}