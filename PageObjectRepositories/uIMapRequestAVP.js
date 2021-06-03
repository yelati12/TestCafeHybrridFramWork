import calculatePremium from '../PageObjectRepositories/RequestAVP_EN/requestAVP_CalculatePremium'
import loginUsingIdentifier from '../PageObjectRepositories/RequestAVP_EN/requestAVP_loginUsingIdentifier'
import yourDetails from '../PageObjectRepositories/RequestAVP_EN/requestAVP_YourDetails'
import yourOverview from '../PageObjectRepositories/RequestAVP_EN/requestAVP_YourOverview'
import eIdentifierResponse from '../PageObjectRepositories/RequestAVP_EN/eIdentifierResponseGenerator'
import confirmationResponse from '../PageObjectRepositories/RequestAVP_EN/requestAVP_ConfirmationMessagePage'

export default class objRepository{

    constructor() {

        this.calculatePremiumPage = new calculatePremium();
        this.login = new loginUsingIdentifier();
        this.yourDetailsPage = new yourDetails();
        this.yourOverviewPage = new yourOverview();
        this.generateIdentifierResponse = new eIdentifierResponse();
        this.confirmationResponsePage = new confirmationResponse();
        
    }

}