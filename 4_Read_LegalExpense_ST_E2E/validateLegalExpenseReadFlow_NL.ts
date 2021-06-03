import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import config from '../Config/LegalExpenseConfig';
import { Role } from 'testcafe';
import { utility } from '../Library/utility';
import objRepo from '../PageObjectRepositories/readLegalExpenseUIMap';
import { extractDataFromIdentifierSimulator } from '../DataDriver/extractDataFromIdentifierSimulator';

var objRepository = new objRepo();

let legalExpensePolicyData = require('../DataFiles/ST/Read_LegalExpense/readLegalExpenseInsurance_NL.json')

fixture
.disablePageCaching `Read Legal Expense - Validate Legal Expense Read Flow`

.beforeEach(async t => {

    var minimist = require('minimist')
    const args = minimist(process.argv.slice(2));
    var environment = args.env;
    let reqdURL = await utility.selectEnvironmentLegalExpense(environment)
    t.ctx.inputURL = reqdURL.autURL
    t.ctx.eIdentifier = reqdURL.identifierSimulatorURL

})

legalExpensePolicyData.forEach(data => {

    test(`Validate Legal Expense Read Flow - Uw verzekering`, async t => {

        await t
        var eIdentifierURL = t.ctx.eIdentifier
        var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
        await t
        .navigateTo(t.ctx.inputURL)
        .wait(1000)
        .debug()
        const setSessionStorage = ClientFunction((prop, value) => {
            sessionStorage.setItem(prop,value);
          });


        await setSessionStorage('agreementID', data.agreementId)
        await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
        await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
        await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
        await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
        await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')


        if (await objRepository.legalExpenseInsurancePage.acceptCookie.exists) {
      
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.acceptCookie, 'Accept cookie', 'CLICK', ' ')

        }

        const policyHolderField = objRepository.legalExpenseInsurancePage.policyHolder
        await t.expect(policyHolderField.exists).ok('Verzekeringnemer field is not present in aut', {timeout:100000})
        await t.expect(policyHolderField.visible).ok('Verzekeringnemer field is not visible in aut', {timeout:100000})
       
       if (await policyHolderField.exists) {
           console.log('Verzekeringnemer field present in aut')
           await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.policyHolderName, 'Policy holder name', 'VALIDATE TEXT', data.verzekeringnemer)           
        } else {
            console.log('Verzekeringnemer field is not present in aut')
        }

        if (await objRepository.legalExpenseInsurancePage.whoIsInsured.exists) {
            console.log('Wie is er verzekerd is present in aut ')
            await utility.handleObjects(t,objRepository.legalExpenseInsurancePage.whoIsInsuredValue, 'Who is insured', 'VALIDATE TEXT', data.wieIsErVerzekerd)
        } else {
            console.log('Wie is er verzekerd field is not present in aut ')
        }

        if (await objRepository.legalExpenseInsurancePage.cover.exists) {
            console.log('Dekking field is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Dekking', 'VALIDATE TEXT CONTAINS', data.dekkingType1)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Dekking', 'VALIDATE TEXT CONTAINS', data.dekkingType2)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Dekking', 'VALIDATE TEXT CONTAINS', data.dekkingType3)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Dekking', 'VALIDATE TEXT CONTAINS', data.dekkingType4)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Dekking', 'VALIDATE TEXT CONTAINS', data.dekkingType5)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Dekking', 'VALIDATE TEXT CONTAINS', data.dekkingType6)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Dekking', 'VALIDATE TEXT CONTAINS', data.dekkingType7)
        } else {
            console.log('Dekking field is not present in aut ')
        }

        if (await objRepository.legalExpenseInsurancePage.yourPolicy.exists) {
            console.log('Uw polis field is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.yourPolicyValue, 'Uw polis document', 'VALIDATE TEXT CONTAINS',data.uwPolisPDFLinkText)
        } else {
            console.log('Uw polis field is not present in aut ')
        }

        if (await objRepository.legalExpenseInsurancePage.premium.exists) {
            console.log('Premie field is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.premiumValue, 'Policy premie', 'VALIDATE TEXT CONTAINS', data.premie)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.premiumValue, 'Policy premie disclaimer', 'VALIDATE TEXT CONTAINS', data.premieDisclaimer)
        } else {
            console.log('Premie field is not present in aut ')
        }

        if (await objRepository.legalExpenseInsurancePage.policyDisclaimer.exists) {
            console.log('Policy disclaimer field is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.policyDisclaimer, 'Policy disclaimer', 'VALIDATE TEXT', data.policyDisclaimer)
        } else {
            console.log('Policy disclaimer field is not present in aut ')
        }
    })

    test(`Validate Legal Expense Read Flow - Uw verzekering wijzigen`, async t => {

        
        await t
        var eIdentifierURL = t.ctx.eIdentifier
        var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
        await t
        .navigateTo(t.ctx.inputURL)
        .wait(1000)
        .debug()
        const setSessionStorage = ClientFunction((prop, value) => {
            sessionStorage.setItem(prop,value);
          });
        
        await setSessionStorage('agreementID', data.agreementId) 
        await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
        await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
        await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
        await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
        await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
        

        if (await objRepository.legalExpenseInsurancePage.acceptCookie.exists) {
      
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.acceptCookie, 'Accept cookie', 'CLICK', ' ')

        }

        const changingYourInsuranceHeader = objRepository.legalExpenseInsurancePage.changingYourInsuranceHeader
        await t.expect(changingYourInsuranceHeader.exists).ok('Uw verzekering wijzigen field is not present in aut', {timeout:100000})
        await t.expect(changingYourInsuranceHeader.visible).ok('Uw verzekering wijzigen field is not visible in aut', {timeout:100000})
        
        if (await changingYourInsuranceHeader.exists) {
            console.log('Uw verzekering wijzigen field is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.changingYourInsuranceText, 'Uw verzekering wijzigen', 'VALIDATE TEXT', data.uwVerzekeringWijzigen)
        } else {
            console.log('Uw verzekering wijzigen field is not present in aut')
        }
    })

    test(`Validate Legal Expense Read Flow - Polisgegevens`, async t => {
     
        await t
        var eIdentifierURL = t.ctx.eIdentifier
        var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
        await t
        .navigateTo(t.ctx.inputURL)
        .wait(1000)
        .debug()
        const setSessionStorage = ClientFunction((prop, value) => {
            sessionStorage.setItem(prop,value);
        });
        
        await setSessionStorage('agreementID', data.agreementId)
        await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
        await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
        await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
        await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
        await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
        

        if (await objRepository.legalExpenseInsurancePage.acceptCookie.exists) {
      
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.acceptCookie, 'Accept cookie', 'CLICK', ' ')

        }

        const policyHeader = objRepository.legalExpenseInsurancePage.policyDetailsHeader
        await t.expect(policyHeader.exists).ok('Polisgegevens header is not present in aut', {timeout:100000})
        await t.expect(policyHeader.visible).ok('Polisgegevens header is not visible in aut', {timeout:100000})
        if (await policyHeader.exists) {
            console.log('Polisgegevens header is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.policyDetails, 'Polisnummer', 'VALIDATE TEXT CONTAINS', data.polisNummer)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.policyDetails, 'Ingangsdatum', 'VALIDATE TEXT CONTAINS', data.ingangsDatum)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.policyDetails, 'Voorwaarden', 'VALIDATE TEXT CONTAINS', data.voorwaarden)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.policyDetails, 'Rekeningnummer', 'VALIDATE TEXT CONTAINS', data.rekeningnummer)
        }   else {
            console.log('Polisgegevens header is not present in aut')
        }
    })

    test(`Validate Legal Expense Read Flow - Verzekering opzeggen`, async t => {

        
        await t
        var eIdentifierURL = t.ctx.eIdentifier
        var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
        await t
        .navigateTo(t.ctx.inputURL)
        .wait(1000)
        .debug()
        const setSessionStorage = ClientFunction((prop, value) => {
            sessionStorage.setItem(prop,value);
          });
        
        await setSessionStorage('agreementID', data.agreementId)
        await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
        await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
        await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
        await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
        await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')

        if (await objRepository.legalExpenseInsurancePage.acceptCookie.exists) {
      
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.acceptCookie, 'Accept cookie', 'CLICK', ' ')

        }

        const cancellingYourInsuranceHeaderExists = objRepository.legalExpenseInsurancePage.cancellingYourInsuranceHeader
        await t.expect(cancellingYourInsuranceHeaderExists.exists).ok('Verzekering opzeggen header is not present in aut', {timeout:100000})
        await t.expect(cancellingYourInsuranceHeaderExists.visible).ok('Verzekering opzeggen header is not visible in aut', {timeout:100000})
        
        if (await cancellingYourInsuranceHeaderExists.exists) {
            console.log('Verzekering opzeggen header is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.cancellingYourInsuranceText, 'Verzekering opzeggen', 'VALIDATE TEXT', data.verzekeringOpzeggen)
        } else {
            console.log('Verzekering opzeggen header is not present in aut')
        }
    })

    // // test(`Validate Legal Expense Read Flow - Check landing page URL on clicking schade melden link`, async t => {

    // //      await t
    // //         var eIdentifierURL = t.ctx.eIdentifier
    // //         var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
    // //      await t
    // //         .navigateTo(t.ctx.inputURL)
    // //         .wait(1000)
        
           
    // //     const setSessionStorage = ClientFunction((prop, value) => {
    // //           sessionStorage.setItem(prop,value);
    // //     });
        
    // //     await t.debug()
    // //     await setSessionStorage('agreementID', data.agreementId);
    // //     await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
    // //     await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
    // //     await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
    // //     await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
    // //     await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')

    // //     if (await objRepository.legalExpenseInsurancePage.acceptCookie.exists) {
      
    // //         await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.acceptCookie, 'Accept cookie', 'CLICK', ' ')

    // //     }

    // //     const submitClaimButtonExists = objRepository.legalExpenseInsurancePage.submitClaimButton
    // //     await t.expect(submitClaimButtonExists.exists).ok('Schade melden button is not present in aut', {timeout:100000})
    // //     await t.expect(submitClaimButtonExists.visible).ok('Schade melden button is not visible in aut', {timeout:100000})
        
    // //     if (await submitClaimButtonExists.exists) {
    // //         console.log('Schade melden button is present in aut ')
    // //         await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.submitClaimButton, 'Schade melden button ', 'CLICK', ' ')
    // //     } else {
    // //         console.log('Schade melden button is not present in aut')
    // //     }
        
    // //     await t.wait(1000)
    // //     const getLocation = ClientFunction(() => document.location.href);
    // //     await t.expect(getLocation()).contains(data.schadeMeldenPageURL, 'Expected link ' + data.schadeMeldenPageURL + ' not found' );
        
    // // })

    test(`Validate Legal Expense Read Flow - Check modal pop up on clicking schade melden button`, async t => {

        await t
           var eIdentifierURL = t.ctx.eIdentifier
           var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
        await t
           .navigateTo(t.ctx.inputURL)
           .wait(1000)
            .debug()
        const setSessionStorage = ClientFunction((prop, value) => {
             sessionStorage.setItem(prop,value);
        });

       
        await setSessionStorage('agreementID', data.agreementId);
       
        await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
       
        await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
        await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
        await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
        await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
       
        const schadeMeldenButtonExists = objRepository.legalExpenseInsurancePage.submitClaimButton
       
        if (await schadeMeldenButtonExists.exists) {

           console.log('Schade melden button is present in aut ')
           await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.submitClaimButton, 'Schade melden button ', 'CLICK', ' ')
           
           if (await objRepository.legalExpenseInsurancePage.submitClaimModalHeader.exists) {
               
                console.log('Schade melden modal popup is present in aut ')
                await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.submitClaimModalText, 'Schade melden modal text', 'VALIDATE TEXT', data.schadeMeldenModalText)
                await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.submitClaimModalClose, 'Schade melden modal close button', 'CLICK', ' ')
            
            } else {
                
                console.log('Schade melden modal popup is not present in aut ')
                await t.expect(objRepository.legalExpenseInsurancePage.submitClaimModalHeader.visible).ok('Schade melden modal is not visible in aut')
            
            }
        } else {
           
            console.log('Schade melden button is not present in aut ')
            await t.expect(schadeMeldenButtonExists.visible).ok('Schade melden button is not present in aut')
       
        }
       
    })

    test(`Validate Legal Expense Read Flow - Check whether the phone numbers are clickable`, async t => {

        await t
           var eIdentifierURL = t.ctx.eIdentifier
           var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
        await t
           .navigateTo(t.ctx.inputURL)
           .wait(1000)
            .debug()
        const setSessionStorage = ClientFunction((prop, value) => {
             sessionStorage.setItem(prop,value);
        });

       
        await setSessionStorage('agreementID', data.agreementId);
       
        await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
       
        await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
        await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
        await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
        await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
       
        const uwVerzekeringWijzigenTelephoneNumberExists = objRepository.legalExpenseInsurancePage.changingYourInsuranceTelephoneNumber
       
        if (await uwVerzekeringWijzigenTelephoneNumberExists.exists) {

            console.log('Telephone number is present in Uw Verzekering WIjzigen section ')
            await t
            .expect(objRepository.legalExpenseInsurancePage.changingYourInsuranceTelephoneNumber.getAttribute('href')).eql(data.telephoneNumberHref, 'Number link present in Uw Verzekering WIjzigen section is not clickable')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.changingYourInsuranceTelephoneNumber, 'Uw Verzekering WIjzigen telephone number', 'CLICK', ' ')
           
            const verzekeringOpzeggenTelephoneNumberExists = objRepository.legalExpenseInsurancePage.cancellingYourInsuranceTelephoneNumber
            if (verzekeringOpzeggenTelephoneNumberExists.exists) {
                
                console.log('Telephone number is present in Verzekering opzeggen section ')
                await t
                .expect(objRepository.legalExpenseInsurancePage.cancellingYourInsuranceTelephoneNumber.getAttribute('href')).eql(data.telephoneNumberHref, 'Number link present in Verzekering opzeggen is not clickable')
                await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.cancellingYourInsuranceTelephoneNumber, 'Verzekering opzeggen telephone number', 'CLICK', ' ')

            } else {
                
                console.log('Telephone number is not present in Verzekering opzeggen section')
                await t.expect(verzekeringOpzeggenTelephoneNumberExists.visible).ok('Telephone number is not present in Verzekering opzeggen section')
            
            }

        } else {
           
            console.log('Telephone number is not present in Uw Verzekering WIjzigen section')
            await t.expect(uwVerzekeringWijzigenTelephoneNumberExists.visible).ok('Telephone number is not present in Uw Verzekering WIjzigen section')
       
        }
       
    })

    test(`Validate Legal Expense Read Flow - Check landing page URL on clicking Verzekering opzeggen link`, async t => {

        await t
           var eIdentifierURL = t.ctx.eIdentifier
           var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
        await t
           .navigateTo(t.ctx.inputURL)
           .wait(1000)
            .debug()
           
        const setSessionStorage = ClientFunction((prop, value) => {
              sessionStorage.setItem(prop,value);
        });
        
        await setSessionStorage('agreementID', data.agreementId);
        await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
        await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
        await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
        await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
        await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
  
        if (await objRepository.legalExpenseInsurancePage.acceptCookie.exists) {
      
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.acceptCookie, 'Accept cookie', 'CLICK', ' ')

        }

        const cancelInsuranceExists = objRepository.legalExpenseInsurancePage.cancelInsurance
        await t.expect(cancelInsuranceExists.exists).ok('Verzekering opzeggen link is not present in aut', {timeout:100000})
        await t.expect(cancelInsuranceExists.visible).ok('Verzekering opzeggen link is not visible in aut', {timeout:100000})
        if (await cancelInsuranceExists.exists ) {
            console.log('Verzekering opzeggen link is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.cancelInsurance, 'Verzekering opzeggen link ', 'CLICK', ' ')
        } else {
            console.log('Verzekering opzeggen link is not present in aut ')
        }
        await t.wait(1000)
        const getLocation = ClientFunction(() => document.location.href);
        await t.expect(getLocation()).contains(data.verzekeringOpzeggenPageLink, 'Expected link ' + data.verzekeringOpzeggenPageLink + ' not found' )
        
    })

    // test(`Validate Legal Expense Read Flow - Check landing page URL on clicking producten beheren link`, async t => {

    //     await t
    //        var eIdentifierURL = t.ctx.eIdentifier
    //        var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
    //     await t
    //        .navigateTo(t.ctx.inputURL)
    //        .wait(1000)
        
           
    //     const setSessionStorage = ClientFunction((prop, value) => {

    //           sessionStorage.setItem(prop,value);
 
    //         });
        
    //     await t.debug()
    //     await setSessionStorage('agreementID', data.agreementId);
    //     await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
        
    //     await t.takeScreenshot()

    //     await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
    //     await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
    //     await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
    //     await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
        
    //     await t.takeScreenshot()


    //     if (await objRepository.legalExpenseInsurancePage.acceptCookie.exists) {
      
    //         await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.acceptCookie, 'Accept cookie', 'CLICK', ' ')

    //     }

    //     const myProductExists = objRepository.legalExpenseInsurancePage.myProducts
    //     await t.expect(myProductExists.exists).ok('Producten beheren link is not present in aut', {timeout:100000})
    //     await t.expect(myProductExists.visible).ok('Producten beheren link is not visible in aut', {timeout:100000})
        
    //     if (await myProductExists.exists) {
    //         console.log('Producten beheren link is present in aut ')
    //         await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.myProducts, 'Producten beheren link ', 'CLICK', ' ')
    //     } else {
    //         console.log('Producten beheren link is not present in aut ')
    //     }
        
    //     await t.wait(1000)
    //     const getLocation = ClientFunction(() => document.location.href);
    //     await t.expect(getLocation()).contains(data.productenBeherenPageLink, 'Expected link ' + data.productenBeherenPageLink + ' not found' );
        
    // })

    test(`Validate Legal Expense Read Flow - Check landing page URL on Vragen of hulp nodig link`, async t => {

        await t
           var eIdentifierURL = t.ctx.eIdentifier
           var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
        await t
           .navigateTo(t.ctx.inputURL)
           .wait(1000)
            .debug()
           
        const setSessionStorage = ClientFunction((prop, value) => {
              sessionStorage.setItem(prop,value);
        });
        
        await setSessionStorage('agreementID', data.agreementId);  
        await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');

        await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
        await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
        await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
        await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')

        if (await objRepository.legalExpenseInsurancePage.acceptCookie.exists) {
      
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.acceptCookie, 'Accept cookie', 'CLICK', ' ')

        }

        const needAssistanceHeaderExists = objRepository.legalExpenseInsurancePage.needAssistanceHeader
        await t.expect(needAssistanceHeaderExists.exists).ok('Vragen of hulp nodig header is not present in aut', {timeout:100000})
        await t.expect(needAssistanceHeaderExists.visible).ok('Vragen of hulp nodig header is not visible in aut', {timeout:100000})
        
        if (await needAssistanceHeaderExists.exists) {
            console.log('Vragen of hulp nodig header is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.needAssistanceText, 'Vragen of hulp nodig text', 'VALIDATE TEXT', data.vragenOfHulpNodig)
        } else {
            console.log('Vragen of hulp nodig header is not present in aut ')
        }

    //     // await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.serviceAndContact, 'Service and contact link ', 'CLICK', ' ')

    //     // await t.wait(1000)
    //     // const getLocation = ClientFunction(() => document.location.href);
    //     // await t.expect(getLocation()).contains(data.serviceAndContactLink, 'Expected link ' + data.serviceAndContactLink + ' not found' );

        
    })

    // test(`Validate Legal Expense Read Flow - Validate second oparand information block text`, async t => {

    //     await t
    //        var eIdentifierURL = t.ctx.eIdentifier
    //        var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.secondOperandAccountNumber, data.secondOperandCardNumber, objRepository.generateIdentifierResponse.responseHeader)
    //     await t
    //        .navigateTo(t.ctx.inputURL)
    //        .wait(1000)
    //     await t.debug() 
    //     const setSessionStorage = ClientFunction((prop, value) => {
    //           sessionStorage.setItem(prop,value);
    //     });

    //     await setSessionStorage('agreementID', data.agreementId);  
       
    //     await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
    //     await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.secondOperandAccountNumber);
    //     await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.secondOperandCardNumber);
    //     await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
    //     await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')

    //     const secondOparandInfoBoxExists = objRepository.legalExpenseInsurancePage.secondOparandInfoBlock
        
    //     if (await secondOparandInfoBoxExists.exists) {
    //         console.log('Second oparand info box is present in aut ')
    //         await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.secondOparandInfoBlock, 'Second oparand text block content', 'VALIDATE TEXT CONTAINS', data.secondOparandInfoBoxText)
    //     } else {
    //         console.log('Second oparand info box is present in aut  ')
    //         await t.expect(secondOparandInfoBoxExists.exists).ok('Second oparand info box is present in aut ')
    //     }
       
    // })

    // test(`Validate Legal Expense Read Flow - Validate href of second oparand Meer over gemachtigden link`, async t => {

    //     await t
    //        var eIdentifierURL = t.ctx.eIdentifier
    //        var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.secondOperandAccountNumber, data.secondOperandCardNumber, objRepository.generateIdentifierResponse.responseHeader)
    //     await t
    //        .navigateTo(t.ctx.inputURL)
    //        .wait(1000)
    //     await t.debug() 
    //     const setSessionStorage = ClientFunction((prop, value) => {
    //           sessionStorage.setItem(prop,value);
    //     });

    //     await setSessionStorage('agreementID', data.agreementId);  
       
    //     await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
    //     await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.secondOperandAccountNumber);
    //     await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.secondOperandCardNumber);
    //     await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
    //     await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')

    //     const secondOparandInfoBoxExists = objRepository.legalExpenseInsurancePage.secondOparandInfoBlock
        
    //     if (await secondOparandInfoBoxExists.exists) {
    //         console.log('Second oparand info box is present in aut ')
    //         const secondOparandMoreAboutAuthLink = objRepository.legalExpenseInsurancePage.moreAboutAuthorizationLink
    //         await t.expect(secondOparandMoreAboutAuthLink.withAttribute('target', '_blank').exists).ok('Meer over gemachtigden link is not opening in a new tab');
    //         await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.moreAboutAuthorizationLink, 'Meer over gemachtigden link', 'CLICK', " ")

    //         await t.wait(1000)
    //         const getLocation = ClientFunction(() => document.location.href);
    //         await t.expect(getLocation()).contains(data.secondOperandMoreAboutAuthorizationLink, 'Expected link ' + data.secondOperandMoreAboutAuthorizationLink + ' not found' );

    //     } else {
    //         console.log('Second oparand info box is not present in aut  ')
    //         await t.expect(secondOparandInfoBoxExists.exists).ok('Second oparand info box is not present in aut ')
    //     }
       
    // })
})