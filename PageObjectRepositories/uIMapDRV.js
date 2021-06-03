import loginUsingIdentifier from '../PageObjectRepositories/Read DRV_EN/readDRV_loginUsingIdentifier'
import annualTravelInsurance from '../PageObjectRepositories/Read DRV_EN/readDRV_annualTravelInsurance'
import eIdentifierResponse from '../PageObjectRepositories/Read DRV_EN/eIdentifierResponseGenerator'


export default class objRepository{

    constructor(){

        this.login = new loginUsingIdentifier();
        this.annualTravelInsurancePage = new annualTravelInsurance();
        this.generateIdentifierResponse = new eIdentifierResponse();

    }

    

}