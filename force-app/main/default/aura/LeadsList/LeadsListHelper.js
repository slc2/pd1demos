({
    loadLeads : function(cmp) {
         var action = cmp.get("c.auraRetrieveLeads");
         action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS") {
                var refreshedLeads = response.getReturnValue();
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
