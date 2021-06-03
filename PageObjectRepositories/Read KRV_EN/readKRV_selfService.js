import {Selector} from 'testcafe';

export default class readKRV_selfService {

    constructor() {

        this.selfServicePageHeader = Selector('#longTitle')
        this.kortlopendeReisverzekering = Selector('span.em-font-weight-normal.text-heavy-green.text-truncate.mb-0.ng-binding').nth(3)
        

    }

}