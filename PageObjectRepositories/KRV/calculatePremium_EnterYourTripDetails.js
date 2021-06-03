import {Selector} from 'testcafe';

export default class calculatePremium_EnterTripDetails {

    constructor() {

        this.acceptCookie = Selector('#aab-cookie-consent-agree')
        this.travelStartDate = Selector('#fromTravelDate')
        this.travelEndDate = Selector('#toTravelDate')
        this.numberOfPeopleToBeInsured = Selector(() => document.querySelector('#adultCoverageCount').shadowRoot.querySelector('#adultCoverageCount-button-2 > aab-icon').shadowRoot.querySelector('svg > path'))
        this.childrenAboveFive = Selector('label.btn.btn-enriched.smy-1.px-2.p-half-quarter-y.mr-1').nth(0)
        this.insuredChildrenUnderFive = Selector(() => document.querySelector('#childCoverageCount').shadowRoot.querySelector('#childCoverageCount-button-2 > aab-icon').shadowRoot.querySelector('svg > path'))
        this.travellingWithinEurope = Selector('span.ng-scope[data-translate="text:europe"]')
        this.travellingOutsideEurope = Selector('span.ng-scope[data-translate="text:world"]')
        this.standardCover = Selector('p.enriched-card-name.ng-binding').nth(0)
        this.comprehensiveCover = Selector('p.enriched-card-name.ng-binding').nth(1)
        this.takeCoverForWinterSport = Selector('span.ng-scope[data-translate="label:yes"]').nth(1)
        this.cancellationInsurance = Selector('span.ng-scope[data-translate="label:yes"]').nth(2)
        this.bookingDate = Selector('#cancellationDate')
        this.tripExpense = Selector('#cancellationAmount')
        this.loginAndContinue = Selector('#nextStep')
    }


}