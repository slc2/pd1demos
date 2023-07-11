import { LightningElement, track, wire } from 'lwc';
import retrieveLeads from '@salesforce/apex/LeadPriorityController.retrieveLeads';
import { refreshApex } from '@salesforce/apex';

export default class LeadListsLWC extends LightningElement {
    leadsCount;
    @track provisionedLeads;
    @track error;

    @wire(retrieveLeads)
    wiredLeads(provisionedResults) {
       this.provisionedLeads = provisionedResults;
       const { data, error } = provisionedResults;
       if (data) {
          this.leadsCount = data.length;
       } else if (error) {
         this.error = JSON.stringify(error);
         console.log(`Error retrieving leads: ${this.error}`);
       }
     }

     leadUpdatedHandler() {
         const refreshList = this.template.querySelector('[data-id="refreshList"]');
         if (refreshList.checked) {
            refreshApex(this.provisionedLeads);
         }
     }
}