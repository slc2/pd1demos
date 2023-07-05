public with sharing class PageQuotesController {
    public string quote = 'Have a nice day';
    public string author = 'Anonymous';
    string defaultEndpoint = 'https://zenquotes.io/api/today';
    string randomEndpoint = 'https://zenquotes.io/api/random';
    string endpoint = defaultEndpoint;
    string quoteType = '';

    public PageQuotesController() {
        quoteType = ApexPages.currentPage().getParameters().get('type');
        if (quoteType == 'random') {
            endpoint = randomEndpoint;
        }
        // ignore any other value for parameter type since we default to 'today'

        requestQuote();
    }

    private void requestQuote() {

        string retrievedQuote = '';
        string retrievedAuthor = '';

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() != 200) {
            return; // leave quote and author set to defaults
        }

        //System.debug('*****response body: ' + response.getBody());
  
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

    public string getQuote() {
        return quote;
    }
    public string getAuthor() {
        return author;
    }

    public string getQuoteType() {
        return quoteType;
    }
    public string getEndpoint() {
        return endpoint;
    }
}