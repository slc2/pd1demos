({
    updateLead : function(cmp, recordId, newPriority) {
        console.log(`before getting controller method, cmp: ${JSON.stringify(cmp)}`);

        var action = cmp.get("c.updatePriority");

        // action.setParams({
        //     leadId: recordId,
        //     priority: newPriority
        // });
        action.setParam("leadId", recordId);
        action.setParam("priority", newPriority);
        console.log(`action: ${JSON.stringify(action)}`);

        action.setCallback(this, function(response) {
            var state = response.getState();

            console.log(`state from response: ${state}`);
            // Display toast message to indicate load status
            var toastEvent = $A.get("e.force:showToast");
            if (state === 'SUCCESS'){
                toastEvent.setParams({
                    "title": "Success!",
                    "message": " Your lead was updated."
                });
                var cmpEvent = cmp.getEvent("cmpEvent");
                cmpEvent.setParams({
                    "leadId" : recordId
                });
                cmpEvent.fire();
            }
            else {
                toastEvent.setParams({
                        "title": "Error!",
                        "message": " Updating lead failed."
                });
            }
            toastEvent.fire();
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
