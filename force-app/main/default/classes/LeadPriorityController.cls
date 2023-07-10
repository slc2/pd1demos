
public with sharing class LeadPriorityController {

    @AuraEnabled(cacheable=true)
    public static Map<String, String> getPriorityFieldValues(){
        Map<String, String> options = new Map<String, String>();
        Schema.DescribeFieldResult fr = Lead.Priority__c.getDescribe();
        List<Schema.PicklistEntry> plValues = fr.getPicklistValues();
        for (Schema.PicklistEntry p: plValues) {
            options.put(p.getValue(), p.getLabel());
        }
        return options;
    }

    @AuraEnabled(cacheable=true)
    public static List<Lead> getLeads() {
        if (!accessIsOk()) {
            throw new AuraHandledException('Insufficient access');
        }
        return [SELECT Id, Company, LeadSource, Name, Priority__c from Lead WHERE Status = 'Open - Not Contacted' WITH SECURITY_ENFORCED ORDER BY Priority__c DESC, CreatedDate DESC LIMIT 50]; 
    }

    @AuraEnabled
    public static void updatePriority(String leadId, String priority){
        if (!accessIsOk()) {
            throw new AuraHandledException('Insufficient access');
        }
        try {
            Lead uLead = [Select ID, Priority__c from Lead where id = :leadId];
            ulead.Priority__c = priority;
            update uLead;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    private static boolean accessIsOk() {
        List<String> leadAccessFields = new List<String> {
            'Id',
            'Company',
            'LeadSource',
            'Name',
            'Priority__c'
        };
        Map<String,Schema.SObjectField> m = Schema.SObjectType.Lead.fields.getMap();
        for (String fieldToCheck : leadAccessFields) {
            SObjectField sof = m.get(fieldToCheck);
            Schema.DescribeFieldResult dfr = sof.getDescribe();
            if (!dfr.isAccessible()) {
                return false;
            }
            if (fieldToCheck.equals('Priority__c') && !dfr.isUpdateable()) {
                return false;
            }

        }
        return true;
    }
}