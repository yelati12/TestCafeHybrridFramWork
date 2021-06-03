import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import config from '../Config/KRVConfig';
import { Role } from 'testcafe';
import { utility } from  '../Library/utility';
import objRepo from '../PageObjectRepositories/uIMap';
import { extractDataFromIdentifierSimulator } from '../DataDriver/extractDataFromIdentifierSimulator';

var objRepository = new objRepo();

let krvPolicyData = require('../DataFiles/ET/Read_KRV/readKRVInsurancePolicy.json')


fixture  
.disablePageCaching `Read KRV - Validate KRV Read Flow`

   .beforeEach(async t => {

      var minimist = require('minimist')
      const args = minimist(process.argv.slice(2));
      var environment = args.env;
      let reqdURL = await utility.selectEnvironmentKRV(environment);
      t.ctx.inputURL = reqdURL.autURL
      t.ctx.eIdentifier = reqdURL.identifierSimulatorURL

    })

   .httpAuth({

      username: 'CyNyjgeb',
      password: 'u8hgJwb3'

    })

    krvPolicyData.forEach(data => {

      test(`Validate KRV Read Flow - Your Insurance Section`, async t => {

         await t
            var eIdentifierURL = t.ctx.eIdentifier
            var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
         await t
            .navigateTo(t.ctx.inputURL)
            .wait(1000)

            const setSessionStorage = ClientFunction((prop, value) => {

              sessionStorage.setItem(prop,value);


            });

            await setSessionStorage('agreementID', data.agreementId);
            await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
            await t.takeScreenshot();
            await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
            await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
            await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
            await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
            await utility.handleObjects(t, objRepository.selfServicePage.selfServicePageHeader, 'Self service page header', 'VALIDATE TEXT', 'Self service')

            await t.takeScreenshot();

            await utility.handleObjects(t, objRepository.selfServicePage.kortlopendeReisverzekering, 'Kortlopendereisverzekering link', 'INPUT', ' ')
            await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.shortTermTravelInsurancePageHeader, 'Short term travel insurance policy page header', 'VALIDATE TEXT', 'Short-term travel insurance')

            
            const policyHolderExists = objRepository.shortTermTravelInsurancePage.policyHolder.exists
            if (await t.expect(policyHolderExists).ok('Policy holder field is not visible in aut', {timeout:100000})) {
               await t.takeScreenshot()
               await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.policyHolderName, 'Policy holder name', 'VALIDATE TEXT', data.policyHolder) 
            } else {
               await t.takeScreenshot()
            }

            await t.takeScreenshot()
            if (await objRepository.shortTermTravelInsurancePage.travelDates.exists) {
               await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.travelDateValue, 'Travel dates', 'VALIDATE TEXT', data.travelDates)
            }

            if (await objRepository.shortTermTravelInsurancePage.whoIsInsuredLabel.exists) {
               await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.firstInsuredPersonName, 'First person insured', 'VALIDATE TEXT', data.firstInsuredPerson)
               await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.firstPersonDateOfBirth, 'First insured person dob', 'VALIDATE TEXT', data.firstInsuredPersonDOB)
               await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.secondInsuredPersonName, 'Second insured person name', 'VALIDATE TEXT', data.secondInsuredPerson)
               await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.secondPersonDateOfBirth, 'Second insured person dob', 'VALIDATE TEXT', data.secondInsuredPersonDOB)
            }

            if (await objRepository.shortTermTravelInsurancePage.cover.exists) {
               await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.coverValue, 'Cover value', 'VALIDATE TEXT', data.coverValue)
            }

            if (await objRepository.shortTermTravelInsurancePage.coverArea.exists) {
               await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.coverAreaValue, 'Cover area', 'VALIDATE TEXT', data.coverArea)        
            }

            if (await objRepository.shortTermTravelInsurancePage.oneOffPremium.exists) {
               await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.oneOffPremiumValue, 'One off premium', 'VALIDATE TEXT', data.oneOffPremium)
            }
            
            if (await objRepository.shortTermTravelInsurancePage.policyDisclaimer.exists) {
               await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.policyDisclaimer, 'Policy information text', 'VALIDATE TEXT', data.policyDisclaimer)             
            }

      })

      test(`Validate KRV Read Flow - Check landing page URL on clicking submit claim link`, async t => {

         await t
            var eIdentifierURL = t.ctx.eIdentifier
            var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
         await t
            .navigateTo(t.ctx.inputURL)
            .wait(1000)
         
            
         const setSessionStorage = ClientFunction((prop, value) => {

               sessionStorage.setItem(prop,value);
  
             });

         await setSessionStorage('agreementID', data.agreementId);
         await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
         
         await t.takeScreenshot()

         await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
         await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
         await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
         await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')

         await t.takeScreenshot()

         await utility.handleObjects(t, objRepository.selfServicePage.kortlopendeReisverzekering, 'Kortlopendereisverzekering link', 'INPUT', ' ')
         await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.shortTermTravelInsurancePageHeader, 'Short term travel insurance policy page header', 'VALIDATE TEXT', 'Short-term travel insurance')
         
         await t.takeScreenshot()
         await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.submitClaim, 'Submit claim link ', 'INPUT', ' ')
 
         await t.wait(1000)
         const getLocation = ClientFunction(() => document.location.href);
         await t.expect(getLocation()).contains(data.submitClaimPageURL);

         await t.takeScreenshot()
         
      })

      test(`Validate KRV Read Flow - Check landing page URL on clicking my products`, async t => {

         await t
            var eIdentifierURL = t.ctx.eIdentifier
            var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
         await t
            .navigateTo(t.ctx.inputURL)
            .wait(1000)
         
            
         const setSessionStorage = ClientFunction((prop, value) => {

               sessionStorage.setItem(prop,value);
 
 
             });

         await setSessionStorage('agreementID', data.agreementId);
         await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
         
         await t.takeScreenshot()
         
         await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
         await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
         await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
         await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')

         await t.takeScreenshot()

         await utility.handleObjects(t, objRepository.selfServicePage.kortlopendeReisverzekering, 'Kortlopendereisverzekering link', 'INPUT', ' ')
         await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.shortTermTravelInsurancePageHeader, 'Short term travel insurance policy page header', 'VALIDATE TEXT', 'Short-term travel insurance')
         
         await t.takeScreenshot()
         await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.myProducts, 'My products link', 'INPUT', ' ')
 
         await t.wait(1000)
         const getLocation = ClientFunction(() => document.location.href);
         await t.expect(getLocation()).contains(data.productOverviewPageLink);

         await utility.handleObjects(t, objRepository.selfServicePage.selfServicePageHeader, 'Self service page header', 'VALIDATE TEXT', 'Self service')
         await t.takeScreenshot()
         
      })

      test(`Validate KRV Read Flow - Check landing page URL on clicking cancel insurance`, async t => {

         await t
            var eIdentifierURL = t.ctx.eIdentifier
            var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
         await t
            .navigateTo(t.ctx.inputURL)
            .wait(1000)
         
            
         const setSessionStorage = ClientFunction((prop, value) => {

               sessionStorage.setItem(prop,value);
 
 
             });

         await setSessionStorage('agreementID', data.agreementId);
         await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
         
         await t.takeScreenshot()
         
         await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
         await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
         await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
         await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')

         await t.takeScreenshot()

         await utility.handleObjects(t, objRepository.selfServicePage.kortlopendeReisverzekering, 'Kortlopendereisverzekering link', 'INPUT', ' ')
         await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.shortTermTravelInsurancePageHeader, 'Short term travel insurance policy page header', 'VALIDATE TEXT', 'Short-term travel insurance')
         
         await t.takeScreenshot()
         await utility.handleObjects(t, objRepository.shortTermTravelInsurancePage.cancelInsuranceLink, 'Cancel insurance link', 'INPUT', ' ')
 
         await t.wait(1000)
         const getLocation = ClientFunction(() => document.location.href);
         await t.expect(getLocation()).contains(data.cancelInsurancePageLink);

         await t.takeScreenshot()
         
      })
  
   });
 

  