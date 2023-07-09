({
    doInit : function(component, event, helper) {
        helper.loadLeads(component);
    },
    handleLeadChangedEvent : function(component, event, helper) {
        console.log('got change from a lead component');
        var leadThatChanged = event.getParam("leadId");
        console.log(`id of changed lead: ${leadThatChanged}`);
        var checkbox = component.find("refreshList");
        console.log(`what did we get for checkbox: ${JSON.stringify(checkbox)}`);
        var checked = checkbox.get("v.checked");
        console.log(`is it checked? ${checked}`);
        if (checked) {
            helper.loadLeads(component); 
        }
    },
})
