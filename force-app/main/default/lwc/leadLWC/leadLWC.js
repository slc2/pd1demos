import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin} from 'lightning/navigation';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Priority__c_FIELD from '@salesforce/schema/Lead.Priority__c';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import Lead_OBJECT from '@salesforce/schema/Lead';
import updatePriority from '@salesforce/apex/LeadPriorityController.updatePriority';


export default class LeadLWC extends NavigationMixin(LightningElement) {
    @api lead;

    @wire(getObjectInfo, { objectApiName: Lead_OBJECT})
    leadMetadata;

    @wire (getPicklistValues, {
        recordTypeId: '$leadMetadata.data.defaultRecordTypeId',
        fieldApiName: Priority__c_FIELD
    })
    options;
    @track error;

    goToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: 'Lead',
                actionName: 'view',
                recordId: this.lead.Id
            }
        });
    }


    handlePriorityChange(event) {
        var newPriority = event.target.value;
        console.log(`priority changed to ${event.target.value}`);
        updatePriority({leadId: this.lead.Id, priority: newPriority})
        .then(()=>{
            console.log('save was ok');
        })
        .catch(error=> {
            this.error = JSON.stringify(error);
            console.log(`save failed, error: ${JSON.stringify(error)}`);
        })
    }
}