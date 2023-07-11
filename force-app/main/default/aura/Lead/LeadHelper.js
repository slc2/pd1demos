({
    updateLead : function(cmp, recordId, newPriority) {
        console.log(`in updateLead, recordId: ${recordId}, newPriority: ${newPriority}`);

        var action = cmp.get("c.updatePriority");
        action.setParam("leadId", recordId);
        action.setParam("priority", newPriority);

        action.setCallback(this, function(response) {
            var state = response.getState();

            var toastEvent = $A.get("e.force:showToast");
            if (state === 'SUCCESS'){
                toastEvent.setParams({
                    "title": "Success!",
                    "message": " Your lead was updated."
                });
            }
            else {
                toastEvent.setParams({
                        "title": "Error!",
                        "message": " Updating lead failed."
                });
            }
            toastEvent.fire();

            if (state === 'SUCCESS') {
                var cmpEvent = cmp.getEvent("cmpEvent");
                cmpEvent.setParams({
                    "leadId" : recordId
                });
                cmpEvent.fire();
            }
        });
        
        $A.enqueueAction(action);
    },
    getPicklistValues: function(component, event) {
        var action = component.get("c.getPriorityFieldValues");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var fieldMap = [];
                for(var key in result){
                    fieldMap.push({key: key, value: result[key]});
                }
                component.set("v.priorityMap", fieldMap);
            }
        });
        $A.enqueueAction(action);
    },
})
