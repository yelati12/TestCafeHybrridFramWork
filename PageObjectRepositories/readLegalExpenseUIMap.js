import legalExpenseInsurance from '../PageObjectRepositories/ReadLegalExpense_EN/readLegalExpense_legalExpenseInsurance'
import eIdentifierResponse from '../PageObjectRepositories/ReadLegalExpense_EN/eIdentifierResponseGenerator'
import loginUsingIdentifier from '../PageObjectRepositories/ReadLegalExpense_EN/readLegalExpense_loginUsingIdentifier'

export default class objRepository {

    constructor() {

        this.legalExpenseInsurancePage = new legalExpenseInsurance();
        this.generateIdentifierResponse = new eIdentifierResponse();
        this.login = new loginUsingIdentifier();

    }
}