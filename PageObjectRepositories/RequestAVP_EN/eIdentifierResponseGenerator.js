import {Selector} from 'testcafe';

export default class eIdentifierResponseGenerator {

    constructor() {

        this.accountNumber = Selector('input[name="cardnum"]')
        this.sequenceNumber = Selector('input[name="cardseq"]')
        this.generateResponse = Selector('input[type="submit"]')
        this.responseHeader = Selector('html')
    }
}