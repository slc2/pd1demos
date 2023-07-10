({
    doInit: function(component, event, helper) {        
        helper.getPicklistValues(component, event);
    },
    goToRecord : function(component, event, helper) {
        var sObjectEvent = $A.get("e.force:navigateToSObject");
        sObjectEvent.setParams({
            "recordId": component.get("v.lead.Id")
        })
        sObjectEvent.fire();
    },
    handlePriorityChange : function(component, event, helper) {
        console.log('before getting value in picklist');
        var newPriority = component.find("priorityPicklist").get("v.value");
        console.log(`newPriority: ${newPriority}`);
        var recordId = component.get("v.lead.Id");
        console.log(`recordId: ${recordId}`);

        helper.updateLead(component, recordId, newPriority);
    },
})
