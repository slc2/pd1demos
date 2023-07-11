({
    doInit : function(component, event, helper) {
        console.log('in doInit');
        helper.loadLeads(component);
    },
    handleLeadChangedEvent : function(component, event, helper) {
        console.log('in handleLeadChangedEvent');
        //var leadThatChanged = event.getParam("leadId");
        var checkbox = component.find("refreshList");
        var checked = checkbox.get("v.checked");

        if (checked) {
            console.log('about to call loadLeads');
            helper.loadLeads(component); 
        }
    },
})
