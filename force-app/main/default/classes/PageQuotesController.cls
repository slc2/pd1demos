public with sharing class PageQuotesController {
    public string quote = 'Tell me and I forget. Teach me and I remember. Involve me and I learn.';
    public string author = 'Benjamin Franklin';
    string defaultEndpoint = 'https://zenquotes.io/api/random';
    string todayEndpoint = 'https://zenquotes.io/api/today';
    string endpoint = defaultEndpoint;


    public PageQuotesController() {
        string quoteType = ApexPages.currentPage().getParameters().get('type');
        if (quoteType == 'today') {
            endpoint = todayEndpoint;
        }
        requestQuote();
    }

    public string getQuote() {
        return quote;
    }
    public string getAuthor() {
        return author;
    }

    void requestQuote() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() != 200) {
            return; // on error, leave quote and author set to defaults
        }

        string retrievedQuote = '';
        string retrievedAuthor = '';
  
        JSONParser parser = JSON.createParser(response.getBody());
        while (parser.nextToken() != null) {
            if (parser.getCurrentToken() == JSONToken.FIELD_NAME) {
                string fieldName = parser.getText();
                parser.nextToken();
                if (fieldName == 'q') {
                    retrievedQuote = parser.getText();
                } else if (fieldName == 'a') {
                    retrievedAuthor = parser.getText();
                }
            }
            if (retrievedQuote.length() > 0 && retrievedAuthor.length() > 0 ) {
                author = retrievedAuthor;
                quote = retrievedQuote;
                break;
            }
        }
    }
}