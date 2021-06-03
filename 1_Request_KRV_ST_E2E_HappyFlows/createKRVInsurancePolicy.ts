import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import config from '../Config/KRVConfig'
import { utility } from  '../Library/utility';
import objRepo from '../PageObjectRepositories/uIMap';
import { extractDataFromIdentifierSimulator } from '../DataDriver/extractDataFromIdentifierSimulator';


var objRepository = new objRepo();

let tripData = require('../DataFiles/ST/KRV/createKRVInsurancePolicy.json')

fixture  `Create short term travel insurance`

    .beforeEach(async t => {

        var minimist = require('minimist')
        const args = minimist(process.argv.slice(2));
        var environment = args.env;
        let reqdURL = await utility.selectEnvironmentKRV(environment);
        t.ctx.inputURL = reqdURL.autURL
        t.ctx.eIdentifier = reqdURL.identifierSimulatorURL

    })

    tripData.forEach(data => {
        test(`Create short term travel insurance for '${data.numberOfPeopleToBeInsured}' people`, async t => {

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
                let visitorId = data.visitorId;
                await setCookieConsent(visitorId);

                if (await objRepository.inputTripDetails.acceptCookie.exists) {
                    await utility.handleObjects(t, objRepository.inputTripDetails.acceptCookie, 'Accept cookie', 'CLICK', ' ')
                } else {
                    let visitorId = data.visitorId;
                    await setCookieConsent(visitorId);
                }

                await utility.handleObjects(t, objRepository.inputTripDetails.travelStartDate, 'Travel start date', 'INPUT', data.travelStartDate);         
                await utility.handleObjects(t, objRepository.inputTripDetails.travelEndDate, 'Travel end date', 'INPUT', data.travelEndDate); 

                for (let i = 1; i < data.numberOfPeopleToBeInsured; i++) {
                    
                    await utility.handleObjects(t, objRepository.inputTripDetails.numberOfPeopleToBeInsured, 'Number of people to be insured', 'CLICK', ' ');
                }
                await utility.handleObjects(t, objRepository.inputTripDetails.childrenAboveFive, 'Children above five', 'CLICK', ' ');
                for (let i = 0; i < data.numberOfInsuredPeopleAgedBelowFive; i++) {
        
                    await utility.handleObjects(t, objRepository.inputTripDetails.insuredChildrenUnderFive, 'Number of insured children under five', 'CLICK', ' ');
                        
                }                    
                await utility.handleObjects(t, objRepository.inputTripDetails.travellingWithinEurope, 'Travelling within europe', 'CLICK', ' ');
                await utility.handleObjects(t, objRepository.inputTripDetails.standardCover, 'Standard cover', 'CLICK', ' ');
                await utility.handleObjects(t, objRepository.inputTripDetails.takeCoverForWinterSport, 'Take cover for winter sport', 'CLICK', ' ');
                await utility.handleObjects(t, objRepository.inputTripDetails.cancellationInsurance, 'Cancellation insurance', 'CLICK', ' ');
                await utility.handleObjects(t, objRepository.inputTripDetails.bookingDate, 'Booking Date', 'INPUT', data.bookingDate);
                await utility.handleObjects(t, objRepository.inputTripDetails.tripExpense, 'Trip expense', 'INPUT', data.tripExpense);
                await utility.handleObjects(t, objRepository.inputTripDetails.loginAndContinue, 'Login and continue', 'CLICK', ' ');
            
                await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
                await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
                await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
                await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
                await utility.handleObjects(t, objRepository.login.nextButton, 'Next', 'CLICK', ' ')
                
                await utility.handleObjects(t, objRepository.yourDetailsPage.pageHeader, 'Page header', 'VALIDATE TEXT', data.detailsPageHeader) 
                await utility.handleObjects(t, objRepository.yourDetailsPage.goingToTripYes, 'Are you going to trip', 'CLICK', ' ')
                await utility.handleObjects(t, objRepository.yourDetailsPage.travellerInitial, 'Traveller Initials', 'INPUT', data.travellerInitials)
               
                await utility.handleObjects(t, objRepository.yourDetailsPage.surname, 'Traveller surname', 'INPUT', data.travellerSurname)
                await utility.handleObjects(t, objRepository.yourDetailsPage.dateOfBirth, 'Traveller date of birth', 'INPUT', data.travellerDateOfBirth)
                await utility.handleObjects(t, objRepository.yourDetailsPage.gender, 'Traveller gender', 'CLICK', ' ')
                await utility.handleObjects(t, objRepository.yourDetailsPage.male, 'Male', 'CLICK', ' ')
                await utility.handleObjects(t, objRepository.yourDetailsPage.claimedInsuranceNo, 'Claimed insurance no', 'CLICK', ' ')
                await utility.handleObjects(t, objRepository.yourDetailsPage.deniedInsuranceNo, 'Denied insurance no', 'CLICK', ' ')
                await utility.handleObjects(t, objRepository.yourDetailsPage.convictedOfOffenceNo, 'Convicted offence no', 'CLICK', ' ')
                if (await objRepository.yourDetailsPage.selectYourAccount.exists) {
                    await utility.handleObjects(t, objRepository.yourDetailsPage.selectYourAccount, 'Select your account', 'CLICK', ' ')
                    await utility.handleObjects(t, objRepository.yourDetailsPage.selectedAccount, 'Selected account', 'CLICK', ' ')
                }
                await utility.handleObjects(t, objRepository.yourDetailsPage.debitConfirmation, 'Debit confirmation', 'CLICK', " ")
                await utility.handleObjects(t, objRepository.yourDetailsPage.toYourOverview, 'To your overview', 'CLICK', ' ')
    
                await utility.handleObjects(t, objRepository.yourDetailsPage.overviewPageHeader, 'Overview page header', 'VALIDATE TEXT', data.overviewPageHeader)

                await utility.handleObjects(t, objRepository.yourOverviewPage.confirmRequest, 'Confirm request', 'CLICK', ' ')
                await utility.handleObjects(t, objRepository.confirmRequestMessagePage.insuranceSuccessfullyCreated, 'Insurance created success message', 'VALIDATE TEXT', data.requestConfirmationMessage)


                await utility.handleObjects(t, objRepository.confirmRequestMessagePage.logOut, 'Logout', 'CLICK', ' ')
                })
    });
    





