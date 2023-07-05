public with sharing class AccountControllerActionsExtension {
    Account acc;

    public AccountControllerActionsExtension(ApexPages.StandardController stdController) {
        this.acc = (Account) stdController.getRecord();
    }

    public PageReference deleteWithAudit() {
        AccountAuditUtil.saveAudit(acc.id);
        delete acc;
        return new ApexPages.Action('{!List}').invoke();
    }

}