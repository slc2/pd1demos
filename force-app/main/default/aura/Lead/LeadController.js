({
    doInit: function(component, event, helper) {        
        helper.getPicklistValues(component, event);
    },
    goToRecord : function(component, event, helper) {
        // Fire the event to navigate to the contact record
        var sObjectEvent = $A.get("e.force:navigateToSObject");
        sObjectEvent.setParams({
            "recordId": component.get("v.lead.Id")
        })
        sObjectEvent.fire();
    },
    handlePriorityChange : function(component, event, helper) {
        console.log('before getting value in picklist');
        //var newPriority = event.getParam("value");
        var newPriority = component.find("priorityPicklist").get("v.value");
        console.log(`newPriority: ${newPriority}`);
        var recordId = component.get("v.lead.Id");
        console.log(`recordId: ${recordId}`);

        helper.updateLead(component, recordId, newPriority);
    },
})
