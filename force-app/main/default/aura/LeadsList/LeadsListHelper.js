({
    loadLeads : function(cmp) {
         var action = cmp.get("c.getLeads");
         action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS") {
                 cmp.set("v.leads", response.getReturnValue());
                 this.updateTotal(cmp);
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
      
     updateTotal: function(cmp) {
       var leads = cmp.get("v.leads");
       cmp.set("v.totalLeads", leads.length);
     }
 })
