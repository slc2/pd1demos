public with sharing class AccountControllerActionsExtension {
    Account acc;
    boolean deletable = false;

    public AccountControllerActionsExtension(ApexPages.StandardController stdController) {
        this.acc = (Account) stdController.getRecord();
        deletable = Account.SObjectType.getDescribe().isDeletable();
    }

    public PageReference deleteWithAudit() {
        if (deletable) {
            AccountAuditUtil.saveAudit(acc.id);
            delete acc;
            return new ApexPages.Action('{!List}').invoke();
        }
        return null;
    }

    public boolean getNotDeletable() {
        return deletable == false;
    }

}