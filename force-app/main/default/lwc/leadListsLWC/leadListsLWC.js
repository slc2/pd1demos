import { LightningElement, track, wire } from 'lwc';
import getLeads from '@salesforce/apex/LeadPriorityController.getLeads';
import { refreshApex } from '@salesforce/apex';

export default class LeadListsLWC extends LightningElement {
    leadsCount;
    @track provisionedLeads;

    @wire(getLeads)
    wiredLeads(provisionedResults) {
       this.provisionedLeads = provisionedResults;
       const { data, error } = provisionedResults;
       if (data) {
          this.leadsCount = data.length;
       } else if (error) {
          console.log(`data.error: ${JSON.stringify(error)}`);
       }
     }

     leadUpdatedHandler() {
         const refreshList = this.template.querySelector('[data-id="refreshList"]');
         if (refreshList.checked) {
            refreshApex(this.provisionedLeads);
         }
     }
}