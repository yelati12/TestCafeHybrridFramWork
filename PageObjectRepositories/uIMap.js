import enterTripDetails from '../PageObjectRepositories/KRV/calculatePremium_EnterYourTripDetails'
import loginUsingIdentifier from '../PageObjectRepositories/KRV/loginUsingIdentifier'
import fillYourDetails from '../PageObjectRepositories/KRV/calculatePremium_YourDetails'
import eIdentifierResponse from '../PageObjectRepositories/KRV/eIdentifierResponseGenerator'
import confirmInsuranceRequest from '../PageObjectRepositories/KRV/calculatePremium_YourOverview'
import confirmCreatedInsurance from '../PageObjectRepositories/KRV/calculatePremium_InsuranceConfirmation'
import selfService from '../PageObjectRepositories/Read KRV_EN/readKRV_selfService'
import shortTermTravelInsurance from '../PageObjectRepositories/Read KRV_EN/readKRV_shortTermTravelInsurance'

export default class objRepository {

    constructor() {

        this.inputTripDetails = new enterTripDetails();
        this.login = new loginUsingIdentifier();
        this.yourDetailsPage = new fillYourDetails();
        this.generateIdentifierResponse = new eIdentifierResponse();
        this.yourOverviewPage = new confirmInsuranceRequest();
        this.confirmRequestMessagePage = new confirmCreatedInsurance();
        this.selfServicePage = new selfService();
        this.shortTermTravelInsurancePage = new shortTermTravelInsurance();
        
    }
}