import {Selector} from 'testcafe';

export default class calculatePremium_InsuranceConfirmation{

    constructor(){

        this.insuranceSuccessfullyCreated = Selector('h2.mt-2.mb-2.ng-scope')
        this.logOut = Selector('a#undefined')

    }

}