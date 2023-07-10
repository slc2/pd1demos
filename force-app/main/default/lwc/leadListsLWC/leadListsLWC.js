import { LightningElement, track, wire } from 'lwc';
import getLeads from '@salesforce/apex/LeadPriorityController.getLeads';

export default class LeadListsLWC extends LightningElement {
    @track leads;

    @wire(getLeads)
    wiredLeads({error, data}) {
       if (data) {
          this.leads = data;
          console.log(`leads: ${JSON.stringify(this.leads)}`);
       } else if (error) {
          console.log(`data.error: ${JSON.stringify(error)}`);
       }
     }
}