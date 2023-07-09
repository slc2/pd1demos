({
    loadLeads : function(cmp) {
         // Load all contact data, calling apex controller
         var action = cmp.get("c.getLeads");
         action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS") {
                 cmp.set("v.leads", response.getReturnValue());
                 this.updateTotal(cmp);
             }
 
             // Display toast message to indicate load status
             var toastEvent = $A.get("e.force:showToast");
             if (state === 'SUCCESS'){
                 toastEvent.setParams({
                     "title": "Success!",
                     "message": " Your leads have been loaded successfully."
                 });
             }
             else {
                 toastEvent.setParams({
                         "title": "Error!",
                         "message": " Something has gone wrong."
                 });
             }
             toastEvent.fire();
         });
          $A.enqueueAction(action);
     },
      
     updateTotal: function(cmp) {
       var leads = cmp.get("v.leads");
       cmp.set("v.totalLeads", leads.length);
     }
 })
