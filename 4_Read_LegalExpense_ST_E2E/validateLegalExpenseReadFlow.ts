import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import config from '../Config/LegalExpenseConfig';
import { Role } from 'testcafe';
import { utility } from '../Library/utility';
import objRepo from '../PageObjectRepositories/readLegalExpenseUIMap';
import { extractDataFromIdentifierSimulator } from '../DataDriver/extractDataFromIdentifierSimulator';

var objRepository = new objRepo();

let legalExpensePolicyData = require('../DataFiles/ST/Read_LegalExpense/readLegalExpenseInsurance.json')

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

    test(`Validate Legal Expense Read Flow - Your Insurance Section`, async t => {

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
              
        const policyHolderField = objRepository.legalExpenseInsurancePage.policyHolder
        await t.expect(policyHolderField.exists).ok('Policy holder field is not present in aut', {timeout:50000})
        await t.expect(policyHolderField.visible).ok('Policy holder field is not visible in aut', {timeout:50000})
       
       if (await policyHolderField.exists) {
           console.log('Policy holder field present in aut')
           await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.policyHolderName, 'Policy holder name', 'VALIDATE TEXT', data.policyHolder)           
        } else {
            console.log('Policy holder field is not present in aut')
        }

        if (await objRepository.legalExpenseInsurancePage.whoIsInsured.exists) {
            console.log('Who is insured field is present in aut ')
            await utility.handleObjects(t,objRepository.legalExpenseInsurancePage.whoIsInsuredValue, 'Who is insured', 'VALIDATE TEXT', data.whoIsInsured)
        } else {
            console.log('Who is insured field is not present in aut ')
        }

        if (await objRepository.legalExpenseInsurancePage.cover.exists) {
            console.log('Cover field is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Cover', 'VALIDATE TEXT CONTAINS', data.coverType1)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Cover', 'VALIDATE TEXT CONTAINS', data.coverType2)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Cover', 'VALIDATE TEXT CONTAINS', data.coverType3)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Cover', 'VALIDATE TEXT CONTAINS', data.coverType4)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Cover', 'VALIDATE TEXT CONTAINS', data.coverType5)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Cover', 'VALIDATE TEXT CONTAINS', data.coverType6)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.coverValue, 'Cover', 'VALIDATE TEXT CONTAINS', data.coverType7)
        } else {
            console.log('Cover field is not present in aut ')
        }

        if (await objRepository.legalExpenseInsurancePage.yourPolicy.exists) {
            console.log('Your policy field is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.yourPolicyValue, 'Your policy document', 'VALIDATE TEXT CONTAINS',data.policyPDFLinkText)
        } else {
            console.log('Your policy field is not present in aut ')
        }

        if (await objRepository.legalExpenseInsurancePage.premium.exists) {
            console.log('Premium field is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.premiumValue, 'Policy premium', 'VALIDATE TEXT CONTAINS', data.premium)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.premiumValue, 'Policy premium disclaimer', 'VALIDATE TEXT CONTAINS', data.premiumDisclaimer)
        } else {
            console.log('Premium field is not present in aut ')
        }

        if (await objRepository.legalExpenseInsurancePage.policyDisclaimer.exists) {
            console.log('Policy disclaimer field is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.policyDisclaimer, 'Policy disclaimer', 'VALIDATE TEXT', data.policyDisclaimer)
        } else {
            console.log('Policy disclaimer field is not present in aut ')
        }
    })

    test(`Validate Legal Expense Read Flow - Changing your insurance`, async t => {

        
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
        
        const changingYourInsuranceHeader = objRepository.legalExpenseInsurancePage.changingYourInsuranceHeader
        await t.expect(changingYourInsuranceHeader.exists).ok('Changing you insurance field is not present in aut', {timeout:50000})
        await t.expect(changingYourInsuranceHeader.visible).ok('Changing you insurance field is not visible in aut', {timeout:50000})
        
        if (await changingYourInsuranceHeader.exists) {
            console.log('Changing you insurance field is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.changingYourInsuranceText, 'Changing your insurance text', 'VALIDATE TEXT', data.changingYourInsurance)
        }
    })

    test(`Validate Legal Expense Read Flow - Policy details`, async t => {
     
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
    
        const policyHeader = objRepository.legalExpenseInsurancePage.policyDetailsHeader
        await t.expect(policyHeader.exists).ok('Policy details header is not present in aut', {timeout:50000})
        await t.expect(policyHeader.visible).ok('Policy details header is not visible in aut', {timeout:50000})

        if (await policyHeader.exists) {

            console.log('Policy details header is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.policyDetails, 'Policy number', 'VALIDATE TEXT CONTAINS', data.policyNumber)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.policyDetails, 'Effective date', 'VALIDATE TEXT CONTAINS', data.effectiveDate)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.policyDetails, 'Terms and conditions', 'VALIDATE TEXT CONTAINS', data.termsAndConditions)
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.policyDetails, 'Account number', 'VALIDATE TEXT CONTAINS', data.policyHolderaccountNumber)

        }   else {
            console.log('Policy details header is not present in aut ')
        }
    })

    test(`Validate Legal Expense Read Flow - Cancelling your insurance`, async t => {

        
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
        
        const cancellingYourInsuranceHeaderExists = objRepository.legalExpenseInsurancePage.cancellingYourInsuranceHeader
        await t.expect(cancellingYourInsuranceHeaderExists.exists).ok('Cancelling your insurance header is not present in aut', {timeout:50000})
        await t.expect(cancellingYourInsuranceHeaderExists.visible).ok('Cancelling your insurance header is not visible in aut', {timeout:50000})
        
        if (await cancellingYourInsuranceHeaderExists.exists) {
            console.log('Cancelling your insurance header is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.cancellingYourInsuranceText, 'Cancelling your insurance text', 'VALIDATE TEXT', data.cancellingYourInsurance)
        } else {
            console.log('Cancelling your insurance header is not present in aut ')
        }
    })

    // // test(`Validate Legal Expense Read Flow - Check landing page URL on clicking submit claim link`, async t => {

    // //      await t
    // //         var eIdentifierURL = t.ctx.eIdentifier
    // //         var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.accountNumber, data.cardNumber, objRepository.generateIdentifierResponse.responseHeader)
    // //      await t
    // //         .navigateTo(t.ctx.inputURL)
    // //         .wait(1000)
        
           
    // //     const setSessionStorage = ClientFunction((prop, value) => {
    // //           sessionStorage.setItem(prop,value);
    // //     });

    // //     await setSessionStorage('agreementID', data.agreementId);
        
    // //     await utility.handleObjects(t, objRepository.login.identifierIcon, 'Identifier icon', 'CLICK', ' ');
        
    // //     await utility.handleObjects(t, objRepository.login.accountNumber, 'Account number', 'INPUT', data.accountNumber);
    // //     await utility.handleObjects(t, objRepository.login.cardNumber, 'Card number', 'INPUT', data.cardNumber);
    // //     await utility.handleObjects(t, objRepository.login.responseField, 'Response field', 'INPUT', eIdentifierResponse )
    // //     await utility.handleObjects(t, objRepository.login.nextButton, 'Next button', 'CLICK', ' ')
        
    // //     const submitClaimButtonExists = objRepository.legalExpenseInsurancePage.submitClaimButton
    // //     await t.expect(submitClaimButtonExists.exists).ok('Submit claim button is not present in aut', {timeout:100000})
    // //     await t.expect(submitClaimButtonExists.visible).ok('Submit claim button is not visible in aut', {timeout:100000})
        
    // //     if (await submitClaimButtonExists.exists) {
    // //         console.log('Submit claim button is present in aut ')
    // //         await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.submitClaimButton, 'Submit claim link ', 'CLICK', ' ')
    // //     } else {
    // //         console.log('Submit claim button is not present in aut ')
    // //     }
        
    // //     await t.wait(1000)
    // //     const getLocation = ClientFunction(() => document.location.href);
    // //     await t.expect(getLocation()).contains(data.submitClaimPageURL, 'Expected link ' + data.productOverviewPageLink + ' not found' );
        
    // //  })

    test(`Validate Legal Expense Read Flow - Check modal pop up on clicking submit claim link`, async t => {

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
       
        
        const submitClaimButtonExists = objRepository.legalExpenseInsurancePage.submitClaimButton
       
        if (await submitClaimButtonExists.exists) {

           console.log('Submit claim button is present in aut ')
           await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.submitClaimButton, 'Submit claim link', 'CLICK', ' ');
           
           if (await objRepository.legalExpenseInsurancePage.submitClaimModalHeader.exists) {
               
                console.log('Submit claim modal popup is present in aut ')
                await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.submitClaimModalText, 'Submit claim modal text', 'VALIDATE TEXT', data.submitClaimModalText)
                await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.submitClaimModalClose, 'Submit claim modal close button', 'CLICK', ' ')
            
            } else {
                
                console.log('Submit claim modal popup is not present in aut ')
                await t.expect(objRepository.legalExpenseInsurancePage.submitClaimModalHeader.visible).ok('Submit claim modal is not visible in aut')
            
            }
        } else {
           
            console.log('Submit claim button is not present in aut ')
            await t.expect(submitClaimButtonExists.visible).ok('Submit claim button is not present in aut')
       
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
       
        const changingYourInsurancetelephoneNumberExists = objRepository.legalExpenseInsurancePage.changingYourInsuranceTelephoneNumber
       
        if (await changingYourInsurancetelephoneNumberExists.exists) {

            console.log('Telephone number is present in changing in your insurance section ')
            await t
            .expect(objRepository.legalExpenseInsurancePage.changingYourInsuranceTelephoneNumber.getAttribute('href')).eql(data.telephoneNumberHref, 'Number link present in changing your insurance section is not clickable')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.changingYourInsuranceTelephoneNumber, 'Changing your insurance telephone number', 'CLICK', ' ')
           
            const cancellingYourInsurancetelephoneNumberExists = objRepository.legalExpenseInsurancePage.cancellingYourInsuranceTelephoneNumber
            if (cancellingYourInsurancetelephoneNumberExists.exists) {
                
                console.log('Telephone number is present in cancelling in your insurance section ')
                await t
                .expect(objRepository.legalExpenseInsurancePage.cancellingYourInsuranceTelephoneNumber.getAttribute('href')).eql(data.telephoneNumberHref, 'Number link present in cancelling in your section is not clickable')
                await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.cancellingYourInsuranceTelephoneNumber, 'Cancelling your insurance telephone number', 'CLICK', ' ')

            } else {
                
                console.log('Telephone number is not present in cancelling in your insurance section')
                await t.expect(cancellingYourInsurancetelephoneNumberExists.visible).ok('Telephone number is not present in changing in your insurance section')
            
            }

        } else {
           
            console.log('Telephone number is not present in changing in your insurance section')
            await t.expect(changingYourInsurancetelephoneNumberExists.visible).ok('Telephone number is not present in changing in your insurance section')
       
        }
       
    })


    test(`Validate Legal Expense Read Flow - Check landing page URL on clicking cancel insurance link`, async t => {

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
       
        const cancelInsuranceExists = objRepository.legalExpenseInsurancePage.cancelInsurance
        await t.expect(cancelInsuranceExists.exists).ok('Cancel insurance link is not present in aut', {timeout:100000})
        await t.expect(cancelInsuranceExists.visible).ok('Cancel insurance link is not visible in aut', {timeout:100000})
        
        if (await cancelInsuranceExists.exists ) {
            console.log('Cancel insurance link is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.cancelInsurance, 'Cancel Insurance link ', 'CLICK', ' ')
        } else {
            console.log('Cancel insurance link is not present in aut ')
        }
        await t.wait(1000)
        const getLocation = ClientFunction(() => document.location.href);
        await t.expect(getLocation()).contains(data.cancelInsurancePageLink, 'Expected link ' + data.cancelInsurancePageLink + ' not found' )
        
    })

    test(`Validate Legal Expense Read Flow - Check landing page URL on clicking my products link`, async t => {

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
        
        const myProductExists = objRepository.legalExpenseInsurancePage.myProducts
        await t.expect(myProductExists.exists).ok('My products link is not present in aut', {timeout:100000})
        await t.expect(myProductExists.visible).ok('My products link is not visible in aut', {timeout:100000})
        
        if (await myProductExists.exists) {
            console.log('My products link is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.myProducts, 'My products link ', 'CLICK', ' ')
        } else {
            console.log('My products link is not present in aut')
        }
        
        await t.wait(1000)
        const getLocation = ClientFunction(() => document.location.href);
        await t.expect(getLocation()).contains(data.productOverviewPageLink, 'Expected link ' + data.productOverviewPageLink + ' not found' );
        
    })

    test(`Validate Legal Expense Read Flow - Check landing page URL on clicking service and contact link`, async t => {

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

        const needAssistanceHeaderExists = objRepository.legalExpenseInsurancePage.needAssistanceHeader
        await t.expect(needAssistanceHeaderExists.exists).ok('Need assistance header is not present in aut', {timeout:100000})
        await t.expect(needAssistanceHeaderExists.visible).ok('Need assistance header is not visible in aut', {timeout:100000})
        
        if (await needAssistanceHeaderExists.exists) {
            console.log('Need assistance header is present in aut ')
            await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.needAssistanceText, 'Need assistance from service centre text', 'VALIDATE TEXT', data.needAssistanceText)
        } else {
            console.log('Need assistance header is not present in aut ')
        }

        //await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.serviceAndContact, 'Service and contact link ', 'CLICK', ' ')

        //await t.wait(1000)
        //const getLocation = ClientFunction(() => document.location.href);
        //await t.expect(getLocation()).contains(data.serviceAndContactLink, 'Expected link ' + data.serviceAndContactLink + ' not found' );        
    })

    // test(`Validate Legal Expense Read Flow - Validate second oparand information block text`, async t => {

    //     await t
    //        var eIdentifierURL = t.ctx.eIdentifier
    //        var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.secondOperandAccountNumber, data.secondOperandCardNumber, objRepository.generateIdentifierResponse.responseHeader)
    //     await t
    //        .navigateTo(t.ctx.inputURL)
    //        .wait(1000)
        
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
    //         console.log('Second oparand info box is not present in aut  ')
    //         await t.expect(secondOparandInfoBoxExists.exists).ok('Second oparand info box is not present in aut ')
    //     }
       
    // })

    // test(`Validate Legal Expense Read Flow - Validate href of second oparand more about authorization link`, async t => {

    //     await t
    //        var eIdentifierURL = t.ctx.eIdentifier
    //        var eIdentifierResponse = await extractDataFromIdentifierSimulator.returnIdentifierResponse(t, eIdentifierURL, objRepository.generateIdentifierResponse.accountNumber, objRepository.generateIdentifierResponse.sequenceNumber, data.secondOperandAccountNumber, data.secondOperandCardNumber, objRepository.generateIdentifierResponse.responseHeader)
    //     await t
    //        .navigateTo(t.ctx.inputURL)
    //        .wait(1000)
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
    //         await t.expect(secondOparandMoreAboutAuthLink.withAttribute('target', '_blank').exists).ok('More about authorization link is not opening in a new tab');
    //         await utility.handleObjects(t, objRepository.legalExpenseInsurancePage.moreAboutAuthorizationLink, 'More about authorization link', 'CLICK', " ")

    //         await t.wait(1000)
    //         const getLocation = ClientFunction(() => document.location.href);
    //         await t.expect(getLocation()).contains(data.secondOperandMoreAboutAuthorizationLink, 'Expected link ' + data.secondOperandMoreAboutAuthorizationLink + ' not found' );

    //     } else {
    //         console.log('Second oparand info box is not present in aut  ')
    //         await t.expect(secondOparandInfoBoxExists.exists).ok('Second oparand info box is not present in aut ')
    //     }
       
    // })
})