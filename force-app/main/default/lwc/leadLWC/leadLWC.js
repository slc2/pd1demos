import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin} from 'lightning/navigation';
import getPriorityFieldValues from '@salesforce/apex/LeadPriorityController.getPriorityFieldValues';

export default class LeadLWC extends NavigationMixin(LightningElement) {
    /*
        <aura:attribute name="lead" type="Lead"/>
    <aura:attribute name="priorityMap" type="Map"/>
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
    <aura:registerEvent name="cmpEvent" type="c:leadChanged"/>
    */
    @api lead;
    options;
   

    @wire(getPriorityFieldValues)
    wiredOptions({error, data}) {
        this.options = [
            { label: 'High', value: 'High' },
            { label: 'Medium', value: 'Medium' },
            { label: 'Low', value: 'Low' },
          ];
    //    if (data) {
    //         this.options = [];
    //         for(var key in data){
    //             this.options.push({value: key, label: result[key]});
    //         }
    //         console.log(`options data: ${JSON.stringify(data)}`);
    //         console.log(`options map: ${JSON.stringify(options)}`);
    //    } else if (error) {
    //         console.log(`data.error getting options: ${JSON.stringify(error)}`);
    //         this.options = [];
    //         this.options.push({value: "error", label: "error"});
    //    }
     }

    goToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Lead',
                actionName: 'list'
            }
        });
        // var sObjectEvent = $A.get("e.force:navigateToSObject");
        // sObjectEvent.setParams({
        //     "recordId": component.get("v.lead.Id")
        // })
        // sObjectEvent.fire();
    }


    handlePriorityChange(event) {

        // const facEvent = new FlowAttributeChangeEvent('lead.Priority__c', event.target.value);
        // this.dispatchEvent(facEvent);
    }
}