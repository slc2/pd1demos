public  without sharing class AccountAuditUtil {
    public static void saveAudit(string id) {
        // don't check CRUD or field access; running in system mode intentionally to create audit record
        Account a = [select id, name, site from account where id = :id limit 1];

        AccountAudit__c accountAudit = new AccountAudit__c();
        accountAudit.Account_Record_Id__c = a.id;
        // this serialization approach is lazy and could be improved to only
        // create a string with the fields values needed for audit
        accountAudit.Record_JSON__c = JSON.serialize(a);
        
        insert accountAudit;
    }
}