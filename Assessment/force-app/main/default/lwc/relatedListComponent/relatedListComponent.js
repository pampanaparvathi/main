import { LightningElement,wire, api } from 'lwc';
import getContacts from '@salesforce/apex/RelatedListClass.getContacts';
import getOpportunities from '@salesforce/apex/RelatedListClass.getOpportunities';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import oppAccId from '@salesforce/schema/Opportunity.AccountId';
import oppName from '@salesforce/schema/Opportunity.Name';
import oppId from '@salesforce/schema/Opportunity.Id';
const COLS = [
    {
        label: 'First Name',
        fieldName: FIRSTNAME_FIELD.fieldApiName,
        editable: true
    },
    {
        label: 'Last Name',
        fieldName: LASTNAME_FIELD.fieldApiName,
        editable: true
    },
    { label: 'Title', fieldName: TITLE_FIELD.fieldApiName, editable: true },
    {
        label: 'Phone',
        fieldName: PHONE_FIELD.fieldApiName,
        type: 'phone',
        editable: true
    },
    {
        label: 'Email',
        fieldName: EMAIL_FIELD.fieldApiName,
        type: 'email',
        editable: true
    }
];
const COLS1 = [
    {
        label: 'Opportunity Name',
        fieldName: oppName.fieldApiName,
        editable: true
    },
    {
        label: 'Id',
        fieldName: oppId.fieldApiName,
        editable: true
    },
    { label: 'Title', fieldName: TITLE_FIELD.fieldApiName, editable: true },
    {
        label: 'AccountId',
        fieldName: oppAccId.fieldApiName,
        type: 'phone',
        editable: true
    }
];
export default class RelatedListComponent extends LightningElement {
    @api recordId;
    columns = COLS;
    draftValues = [];
    columns1 = COLS1;
    draftValues1 = [];

    @wire(getContacts, { accId: '$recordId' })
    contacts;

    async handleSave(event) {
        // Convert datatable draft values into record objects
        const records = event.detail.draftValues.slice().map((draftValue) => {
            const fields = Object.assign({}, draftValue);
            return { fields };
        });

        // Clear all datatable draft values
        this.draftValues = [];

        try {
            // Update all records in parallel thanks to the UI API
            const recordUpdatePromises = records.map((record) =>
                updateRecord(record)
            );
            await Promise.all(recordUpdatePromises);

            // Report success with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contacts updated',
                    variant: 'success'
                })
            );

            // Display fresh data in the datatable
            await refreshApex(this.contacts);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or reloading contacts',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }

    @wire(getOpportunities, { accId: '$recordId' })
    opportunities;

    async handleSave1(event) {
        // Convert datatable draft values into record objects
        const records = event.detail.draftValues.slice().map((draftValue) => {
            const fields = Object.assign({}, draftValue);
            return { fields };
        });

        // Clear all datatable draft values
        this.draftValues = [];

        try {
            // Update all records in parallel thanks to the UI API
            const recordUpdatePromises = records.map((record) =>
                updateRecord(record)
            );
            await Promise.all(recordUpdatePromises);

            // Report success with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contacts updated',
                    variant: 'success'
                })
            );

            // Display fresh data in the datatable
            await refreshApex(this.contacts);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or reloading contacts',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }
}