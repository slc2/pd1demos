({
    loadLeads : function(cmp) {
         var action = cmp.get("c.auraRetrieveLeads");
         action.setCallback(this, function(response) {
            console.log(`in loadLeads, response: ${JSON.stringify(response)}`);
             var state = response.getState();
             if (state === "SUCCESS") {
                var refreshedLeads = response.getReturnValue();
                console.log(`refreshed leads: ${JSON.stringify(refreshedLeads)}`);
                 cmp.set("v.leads", refreshedLeads);
                 cmp.set("v.totalLeads", refreshedLeads.length);
             }        
             
             if (state !== 'SUCCESS'){
                var toastEvent = $A.get("e.force:showToast");
                 toastEvent.setParams({
                     "title": "Error Loading Leads",
                     "message": "A server error occurred."
                 });
                 toastEvent.fire();
             }             
         });
         $A.enqueueAction(action);
     },

 })
