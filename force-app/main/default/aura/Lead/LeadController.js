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
        var newPriority = component.find("priorityPicklist").get("v.value");
        var recordId = component.get("v.lead.Id");
        helper.updateLead(component, recordId, newPriority);
    },
})
