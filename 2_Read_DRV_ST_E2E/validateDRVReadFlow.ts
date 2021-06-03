import { RequestLogger, Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import config from '../Config/DRVConfig';
import { Role } from 'testcafe';
import { utility } from  '../Library/utility';
import objRepoDRV from '../PageObjectRepositories/uIMapDRV';
import { extractDataFromIdentifierSimulator } from '../DataDriver/extractDataFromIdentifierSimulator';

var objRepository = new objRepoDRV();

let drvPolicyData = require('../DataFiles/ST/DRV/readDRVInsurancePolicy.json')


fixture  
.disablePageCaching `Read DRV - Validate DRV Read Flow`

   .beforeEach(async t => {

      var minimist = require('minimist')
      const args = minimist(process.argv.slice(2));
      var environment = args.env;
      let reqdURL = await utility.selectEnvironmentDRV(environment);
      t.ctx.inputURL = reqdURL.autURL
      t.ctx.eIdentifier = reqdURL.identifierSimulatorURL

    })

    drvPolicyData.forEach(data => {

      test(`Validate DRV Read Flow - Your Insurance Section`, async t => {

         const setCookieConsent = ClientFunction(visitorId => {
                
            document.cookie = "CONSENTMGR=consent:true";
            document.cookie = visitorId;
         });

         await t
         var eIdentifierURL = t.ctx.eIdentifier
         var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
         await t
         .navigateTo(t.ctx.inputURL)
         .wait(2000) 
         

         if (await objRepository.login.acceptCookie.exists) {
      
             await utility.handleObjects(t, objRepository.login.acceptCookie, 'Accept cookie', 'CLICK', ' ')
             
             } else {
                 let visitorId = data.visitorId;
                 await setCookieConsent(visitorId);
             }

           const setSessionStorage = ClientFunction((prop, value) => {
           
           sessionStorage.setItem(prop,value);  
         
         
            });

            await setSessionStorage('agreementID', data.agreementId); 
            await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
            //await t.takeScreenshot()
           
            await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
            await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
            await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
            await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
            await utility.handleObjects(t, objRepository.annualTravelInsurancePage.annualTravelInsurancePageHeader, 'Annual Travel Insurance page header', 'VALIDATE TEXT', 'Annual travel insurance')
            await t.debug();
            await utility.handleObjects(t,objRepository.annualTravelInsurancePage.yourInsuranceHeader, 'Your Insurance header', 'VALIDATE TEXT','Your insurance')
         
            //await t.takeScreenshot()
            const policyHolderExists = objRepository.annualTravelInsurancePage.policyHolderLabel.exists
            if (await t.expect(policyHolderExists).ok('Policy holder field is not visible in aut', {timeout:100000})) {
               //await t.takeScreenshot()
               await utility.handleObjects(t, objRepository.annualTravelInsurancePage.policyHolderName, 'Policy holder name', 'VALIDATE TEXT', data.policyHolder)
            }else{
               //await t.takeScreenshot()
            }
            
            if (await objRepository.annualTravelInsurancePage.yourPolicyLabel.exists) {
               await utility.handleObjects(t, objRepository.annualTravelInsurancePage.policyDocumentPDF, 'Your policy PDF Text', 'VALIDATE TEXT', data.yourPolicyPDFText)
            }else{
               //await t.takeScreenshot()
            }
            if (await objRepository.annualTravelInsurancePage.premiumLabel.exists) {
               await utility.handleObjects(t, objRepository.annualTravelInsurancePage.premiumAmount, 'Premium Amount', 'VALIDATE TEXT', data.premium)
            }else{
               //await t.takeScreenshot()
            }      
            
            if (await objRepository.annualTravelInsurancePage.premiumText.exists) {
               await utility.handleObjects(t, objRepository.annualTravelInsurancePage.premiumText, 'Premium Text', 'VALIDATE TEXT', data.premiumText)

            }else{
               //await t.takeScreenshot()
            }
            
            if (await objRepository.annualTravelInsurancePage.termsAndConditionsText.exists) {
               await utility.handleObjects(t, objRepository.annualTravelInsurancePage.termsAndConditionsText, 'policy terms and conditions Text', 'VALIDATE TEXT', data.policyTermsAndConditionsDisclaimer)
               
            }else{
               //await t.takeScreenshot()
            }
            //await t.takeScreenshot();           
                   
     })
     
      test(`Validate DRV Read Flow - Check changing your Insurance section`, async t => {

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

      if (await objRepository.login.acceptCookie.exists) {
          await utility.handleObjects(t, objRepository.login.acceptCookie, 'Accept cookie', 'CLICK', ' ')
          } else {
              let visitorId = data.visitorId;
              await setCookieConsent(visitorId);
          }

        const setSessionStorage = ClientFunction((prop, value) => {
        
        sessionStorage.setItem(prop,value);    
      })


         await setSessionStorage('agreementID', data.agreementId);
         await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
         //await t.takeScreenshot()

         await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
         await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
         await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
         await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
         await utility.handleObjects(t, objRepository.annualTravelInsurancePage.annualTravelInsurancePageHeader, 'Annual Travel Insurance page header', 'VALIDATE TEXT', 'Annual travel insurance')
         await t.debug();
         //await t.takeScreenshot()

         if (await objRepository.annualTravelInsurancePage.changeYourInsuranceHeader.exists) {
            await utility.handleObjects(t, objRepository.annualTravelInsurancePage.changeYourInsuranceHeader, 'Changing your Insurance header', 'VALIDATE TEXT', 'Changing your insurance')    
            await utility.handleObjects(t, objRepository.annualTravelInsurancePage.changeYourInsuranceText, 'Changing your Insurance text', 'VALIDATE TEXT', data.changeYourInsuranceText)                      

         }else{
            //await t.takeScreenshot()
         }
         //await t.takeScreenshot()
         
      })

      test(`Validate DRV Read Flow - Check policy details section`, async t => {

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
   
            if (await objRepository.login.acceptCookie.exists) {
                  await utility.handleObjects(t, objRepository.login.acceptCookie, 'Accept cookie', 'CLICK', ' ')
                  } else {
                     let visitorId = data.visitorId;
                     await setCookieConsent(visitorId);
                  }
      
               const setSessionStorage = ClientFunction((prop, value) => {
               
               sessionStorage.setItem(prop,value);  
   
            });
   
               await setSessionStorage('agreementID', data.agreementId);
               await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
               //await t.takeScreenshot()
   
               await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
               await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
               await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
               await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
               await utility.handleObjects(t, objRepository.annualTravelInsurancePage.annualTravelInsurancePageHeader, 'Annual Travel Insurance page header', 'VALIDATE TEXT', 'Annual travel insurance')
               await t.debug();
               // await t.takeScreenshot()

               if (await objRepository.annualTravelInsurancePage.policyDetailsHeader.exists) {
                  await utility.handleObjects(t, objRepository.annualTravelInsurancePage.policyDetailsHeader, 'Policy details header', 'VALIDATE TEXT', 'Policy details')    
               }else{
                  //await t.takeScreenshot()
               }
               if (await objRepository.annualTravelInsurancePage.policyNumberLabel.exists) {
                  await utility.handleObjects(t, objRepository.annualTravelInsurancePage.policyNumber, 'Policy Number', 'VALIDATE TEXT', data.policyNumber)    
               }else{
                  //await t.takeScreenshot()
               }
               if (await objRepository.annualTravelInsurancePage.effectiveDateLabel.exists) {
                  await utility.handleObjects(t, objRepository.annualTravelInsurancePage.effectiveDate, 'Effective date', 'VALIDATE TEXT CONTAINS', data.effectiveDate)    
               }else{
                  //await t.takeScreenshot()
               }
               if (await objRepository.annualTravelInsurancePage.renewalDateLabel.exists) {
                  await utility.handleObjects(t, objRepository.annualTravelInsurancePage.renewalDate, 'Renewal date', 'VALIDATE TEXT CONTAINS', data.renewalDate)    
               }else{
                  //await t.takeScreenshot()
               }
               if (await objRepository.annualTravelInsurancePage.termsAndConditionsLabel.exists) {
                  await utility.handleObjects(t, objRepository.annualTravelInsurancePage.termsAndConditionsPDF, 'Annual travel Insurance terms and conditions PDF text', 'VALIDATE TEXT CONTAINS', data.termsAndConditionsPDFText)    
               }else{
                  //await t.takeScreenshot()
               }
               if (await objRepository.annualTravelInsurancePage.accountNumberLabel.exists) {
                  await utility.handleObjects(t, objRepository.annualTravelInsurancePage.accountNumber, 'Account Number', 'VALIDATE TEXT CONTAINS', data.accountNumberPolicyDetails)    
               }else{
                  //await t.takeScreenshot()
               }

            })
            test(`Validate DRV Read Flow - Check customer care section`, async t => {

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
      
               if (await objRepository.login.acceptCookie.exists) {
                   await utility.handleObjects(t, objRepository.login.acceptCookie, 'Accept cookie', 'CLICK', ' ')
                   } else {
                       let visitorId = data.visitorId;
                       await setCookieConsent(visitorId);
                   }
      
                 const setSessionStorage = ClientFunction((prop, value) => {
                 
                 sessionStorage.setItem(prop,value);  
      
               });
      
                  await setSessionStorage('agreementID', data.agreementId);
                  await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
                  //await t.takeScreenshot()
      
                  await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
                  await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
                  await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
                  await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
                  await utility.handleObjects(t, objRepository.annualTravelInsurancePage.annualTravelInsurancePageHeader, 'Annual Travel Insurance page header', 'VALIDATE TEXT', 'Annual travel insurance')
                  await t.debug();
                 // await t.takeScreenshot()

                  if (await objRepository.annualTravelInsurancePage.customerCareHeader.exists) {
                     await utility.handleObjects(t, objRepository.annualTravelInsurancePage.customerCareHeader, 'Customer care header', 'VALIDATE TEXT', data.customerCareHeader)
                     await utility.handleObjects(t, objRepository.annualTravelInsurancePage.customerCareText, 'Customer care text', 'VALIDATE TEXT', data.customerCareText)

                  }else{
                     //await t.takeScreenshot()
                  }
                  if (await objRepository.annualTravelInsurancePage.customerCareNumberNL.exists) {
                     await utility.handleObjects(t, objRepository.annualTravelInsurancePage.customerCareNumberNL, 'Customer care Number Nederlands', 'VALIDATE TEXT CONTAINS', data.customerCareNumberNL)

                  }else{
                     await t.takeScreenshot()
                  }
                  if (await objRepository.annualTravelInsurancePage.customerCareNumberAbroad.exists) {
                     await utility.handleObjects(t, objRepository.annualTravelInsurancePage.customerCareNumberAbroad, 'Customer care Number Nederlands', 'VALIDATE TEXT CONTAINS', data.customerCareNumberNL)

                  }else{
                     await t.takeScreenshot()
                  }
                  
                  
            })
            test(`Validate DRV Read Flow - Check landing page URL on clicking My products link`, async t => {

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
         
               if (await objRepository.login.acceptCookie.exists) {
                  await utility.handleObjects(t, objRepository.login.acceptCookie, 'Accept cookie', 'CLICK', ' ')
                  } else {
                     let visitorId = data.visitorId;
                     await setCookieConsent(visitorId);
                  }
         
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
               await utility.handleObjects(t, objRepository.annualTravelInsurancePage.annualTravelInsurancePageHeader, 'Annual Travel Insurance page header', 'VALIDATE TEXT', 'Annual travel insurance')
               await t.debug();
               //await t.takeScreenshot()
               
               await utility.handleObjects(t, objRepository.annualTravelInsurancePage.myProductsLink, 'My products link ', 'INPUT', ' ')
         
               await t.wait(1000)
               const getLocation = ClientFunction(() => document.location.href);
               await t.expect(getLocation()).contains(data.productOverviewPageURL);
         
               //await t.takeScreenshot()
         
            })
            test(`Validate DRV Read Flow - Check landing page URL on clicking submit claim link`, async t => {

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
      
               if (await objRepository.login.acceptCookie.exists) {
                  await utility.handleObjects(t, objRepository.login.acceptCookie, 'Accept cookie', 'CLICK', ' ')
                  } else {
                     let visitorId = data.visitorId;
                     await setCookieConsent(visitorId);
                  }
      
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
               await utility.handleObjects(t, objRepository.annualTravelInsurancePage.annualTravelInsurancePageHeader, 'Annual Travel Insurance page header', 'VALIDATE TEXT', 'Annual travel insurance')
               await t.debug();
               //await t.takeScreenshot()
               
               await utility.handleObjects(t, objRepository.annualTravelInsurancePage.submitClaimButton, 'Submit claim link ', 'INPUT', ' ')
      
               await t.wait(1000)
               const getLocation = ClientFunction(() => document.location.href);
               await t.expect(getLocation()).contains(data.submitClaimPageURL);
      
               //await t.takeScreenshot()
      
            })         
      
            test(`Validate DRV Read Flow - Check landing page URL on clicking cancel insurance`, async t => {

               const setCookieConsent = ClientFunction(visitorId => {
                
                  document.cookie = "CONSENTMGR=consent:true";
                  document.cookie = visitorId;
               });
      
               await t
               var eIdentifierURL = t.ctx.eIdentifier
               var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
               await t
               .navigateTo(t.ctx.inputURL)
               .wait(3000)      
      
               if (await objRepository.login.acceptCookie.exists) {
                   await utility.handleObjects(t, objRepository.login.acceptCookie, 'Accept cookie', 'CLICK', ' ')
                   } else {
                       let visitorId = data.visitorId;
                       await setCookieConsent(visitorId);
                   }
      
                 const setSessionStorage = ClientFunction((prop, value) => {
                 
                 sessionStorage.setItem(prop,value);  
      
               });
      
                  await setSessionStorage('agreementID', data.agreementId);
                  await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
                  //await t.takeScreenshot()
      
                  await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
                  await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
                  await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
                  await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
                  await utility.handleObjects(t, objRepository.annualTravelInsurancePage.annualTravelInsurancePageHeader, 'Annual Travel Insurance page header', 'VALIDATE TEXT', 'Annual travel insurance')
                  await t.debug();
                  //await t.takeScreenshot()
               if (await objRepository.annualTravelInsurancePage.cancelInsuranceHeader.exists) {
                  await utility.handleObjects(t, objRepository.annualTravelInsurancePage.cancelInsuranceHeader, 'Cancel Insurance header', 'VALIDATE TEXT', 'Cancelling your insurance?')
                  await utility.handleObjects(t, objRepository.annualTravelInsurancePage.cancelInsuranceText, 'Cancel Insurance text', 'VALIDATE TEXT',data.cancelInsuranceText)    
               }else{
                  //await t.takeScreenshot()
               }

                  await utility.handleObjects(t, objRepository.annualTravelInsurancePage.cancelInsuranceLink, 'Cancel insurance link', 'INPUT', ' ')
 
                  await t.wait(1000)
                  const getLocation = ClientFunction(() => document.location.href);
                  await t.expect(getLocation()).contains(data.cancelInsurancePageLink);

                  //await t.takeScreenshot()

               })      

  
    });
 

  