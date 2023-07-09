
public with sharing class LeadPriorityController {
    public LeadPriorityController() {
    }
    @AuraEnabled
    public static List<Lead> getLeads() {
        return [SELECT Id, Company, LeadSource, Status, Name, Rating from Lead WITH SECURITY_ENFORCED LIMIT 50]; 
    }
}