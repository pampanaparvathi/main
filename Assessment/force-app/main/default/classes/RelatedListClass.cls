/**
 * @description RelatedListClass
 */
public with sharing class RelatedListClass {
    @AuraEnabled(cacheable=true)
    /**
     * @description Bar
     * @return getContacts
     * @param accId
     */
    public static List<Contact> getContacts(String accId) {
        return [
            SELECT AccountId, Id, FirstName, LastName, Title, Phone, Email
            FROM Contact
            WHERE AccountId = :accId
            WITH SECURITY_ENFORCED
        ];
    }
    @AuraEnabled(cacheable=true)
    /**
     * @description Bar
     * @return getContacts
     * @param accId
     */
    public static List<Opportunity> getOpportunities(String accId) {
        
        return [
            SELECT AccountId, Id, Name
            FROM Opportunity
            WHERE AccountId = :accId
            WITH SECURITY_ENFORCED
        ];
        //List<Opportunity> oppList=[SELECT Id,Name,AccountId FROM Opportunity WHERE AccountId=:accId WITH SECURITY_ENFORCED];
        //return oppList;
    }
}