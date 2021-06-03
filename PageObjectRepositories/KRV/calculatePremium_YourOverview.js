import {Selector} from 'testcafe'

export default class calculatePremium_YourOverview{

    constructor() {

        this.whatWillHappenLabel = Selector('p.mb-1.ng-scope').nth(1)
        this.confirmRequest = Selector('button#nextStep')
        
    }
}