public  without sharing class AccountAuditUtil {
    public static void saveAudit(string id) {
        // Not checking CRUD or field level permissions here on purpose.
        // Audit requirements are to save all specified data from record
        Account a = [select id, name, site from account where id = :id limit 1];

        AccountAudit__c accountAudit = new AccountAudit__c();
        accountAudit.Account_Record_Id__c = a.id;
        // this serialization approach is lazy and could be improved to 
        // create a string with only the field values needed for audit
        accountAudit.Record_JSON__c = JSON.serialize(a);
        
        insert as system accountAudit;
    }
}