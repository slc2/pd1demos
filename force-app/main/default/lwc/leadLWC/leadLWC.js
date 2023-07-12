import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin} from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import Priority__c_FIELD from '@salesforce/schema/Lead.Priority__c';
import Lead_OBJECT from '@salesforce/schema/Lead';
import updatePriority from '@salesforce/apex/LeadPriorityController.updatePriority';


export default class LeadLWC extends NavigationMixin(LightningElement) {
    @api lead;

    @wire(getObjectInfo, { objectApiName: Lead_OBJECT})
    leadMetadata;

    // This component depends on the Lead object not having record types, and therefore we
    // use the default record type id to retrieve picklist values for the Priority__c field.
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
        updatePriority({leadId: this.lead.Id, priority: newPriority})
            .then(()=>{
                this.dispatchEvent(new CustomEvent('updated', {
                        "leadId" : this.lead.Id
                }));
                
                const event = new ShowToastEvent({
                    title: `Lead ${this.lead.Name} updated`,
                    message: 'Priority saved',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(event);

            })
            .catch(error => {
                this.error = JSON.stringify(error);
                console.log(`Saving lead(${this.lead.Id}), error: ${JSON.stringify(error)}`);
            })
    }
}