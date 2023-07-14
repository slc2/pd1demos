({
    doInit : function(component, event, helper) {
        helper.loadLeads(component);
    },
    handleLeadChangedEvent : function(component, event, helper) {
        //var leadThatChanged = event.getParam("leadId");
        var checkbox = component.find("refreshList");
        var checked = checkbox.get("v.checked");

        if (checked) {
            helper.loadLeads(component); 
        }
    },
})
