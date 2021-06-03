import { Selector, t } from 'testcafe';
import config from '../Config/AVPConfig';
import { ClientFunction } from 'testcafe';
import { utility } from  '../Library/utility';
import objRepo from '../PageObjectRepositories/uIMapRequestAVP';
import { extractDataFromIdentifierSimulator } from '../DataDriver/extractDataFromIdentifierSimulator';

var objRepository = new objRepo();

let avpInsuranceData = require('../DataFiles/ST/Request_AVP/requestAVPInsurancePolicy.json')

fixture  `Happy Flow Request AVP`

    .beforeEach(async t => {

        var minimist = require('minimist')
        const args = minimist(process.argv.slice(2));
        var environment = args.env;
        let reqdURL = await utility.selectEnvironmentAVP(environment);
        t.ctx.inputURL = reqdURL.autURL
        t.ctx.eIdentifier = reqdURL.identifierSimulatorURL

    })

    avpInsuranceData.forEach(data => {

        test(`Request AVP insurance for myself`, async t => {

            const setCookieConsent = ClientFunction(visitorId => {
                
                document.cookie = "CONSENTMGR=consent:true";
                document.cookie = visitorId;

            });

            await t
                var eIdentifierURL = t.ctx.eIdentifier
                var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
            await t
                .navigateTo(t.ctx.inputURL)
                .wait(1000)
            if (await objRepository.calculatePremiumPage.acceptCookie.exists) {
                await utility.handleObjects(t, objRepository.calculatePremiumPage.acceptCookie, 'Accept cookie', 'CLICK', ' ')
            } else {
                let visitorId = data.visitorId;
                await setCookieConsent(visitorId);
            }

            //await utility.handleObjects(t, objRepository.calculatePremiumPage.privacyStatement, 'Data usage declaration', 'VALIDATE TEXT', data.dataUsageDeclaration); 
            await utility.handleObjects(t, objRepository.calculatePremiumPage.familySituationMyself, 'Family situation as myself', 'CLICK', ' ');
            await utility.handleObjects(t, objRepository.calculatePremiumPage.secondCoverValue, 'Cover value for insurance', 'CLICK', ' ');
            await utility.handleObjects(t, objRepository.calculatePremiumPage.secondExcessClaimValue, 'Excess claim for insurance', 'CLICK', ' ');
            await utility.handleObjects(t, objRepository.calculatePremiumPage.prefferedEffectiveDate, 'Preferred effective date for insurance', 'CLICK', ' ')
            await utility.handleObjects(t, objRepository.calculatePremiumPage.prefferedEffectiveDate, 'Preferred effective date for insurance', 'PRESSKEY', 'ctrl+a delete')
            await utility.handleObjects(t, objRepository.calculatePremiumPage.prefferedEffectiveDate, 'Preferred effective date for insurance', 'INPUT', data.effectiveDate);
            await utility.handleObjects(t, objRepository.calculatePremiumPage.loginAndContinue, 'Login and Continue', 'CLICK', ' ');
            
            await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
            await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
            await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
            await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
            await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
            
            await t.debug()
            if (await objRepository.yourDetailsPage.selectYourAccountDropdown.exists) {
                await utility.handleObjects(t, objRepository.yourDetailsPage.selectYourAccountDropdown, 'Select your account dropdown', 'CLICK', ' ')
                await utility.handleObjects(t, objRepository.yourDetailsPage.selectedAccount, 'Selected account', 'CLICK', ' ')
            }

            await utility.handleObjects(t, objRepository.yourDetailsPage.authorizeCheckbox, 'Authorize checkbox', 'CLICK', ' ')
            await utility.handleObjects(t, objRepository.yourDetailsPage.claimedInsuranceNo, 'Claimed insurance no', 'CLICK', ' ')
            await utility.handleObjects(t, objRepository.yourDetailsPage.deniedInsuranceNo, 'Denied insurance no', 'CLICK', ' ')
            await utility.handleObjects(t, objRepository.yourDetailsPage.convictedOfOffenceNo, 'Convicted offence no', 'CLICK', ' ')
            await utility.handleObjects(t, objRepository.yourDetailsPage.toYourOverview, 'To your overview', 'CLICK', ' ')

            await utility.handleObjects(t, objRepository.yourOverviewPage.overviewPageHeader, 'Overview page header', 'VALIDATE TEXT', data.overviewPageHeader)
            await utility.handleObjects(t, objRepository.yourOverviewPage.confirmRequest, 'Confirm request', 'CLICK', ' ')
            await utility.handleObjects(t, objRepository.confirmationResponsePage.confirmationMessage, 'Insurance created success message', 'VALIDATE TEXT', data.requestConfirmationMessage)
            await utility.handleObjects(t, objRepository.confirmationResponsePage.logout, 'Logout', 'INPUT', ' ')
        
        })

    });