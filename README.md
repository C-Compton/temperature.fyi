# temperature.fyi

### Lambda Functions
#### rest
- Takes a request in the form of a json body and converts to the following structure

```golang
    type APIGatewayProxyRequest struct {
        Resource                        string                        `json:"resource"`
        Path                            string                        `json:"path"`
        HTTPMethod                      string                        `json:"httpMethod"`
        Headers                         map[string]string             `json:"headers"`
        MultiValueHeaders               map[string][]string           `json:"multiValueHeaders"`
        QueryStringParameters           map[string]string             `json:"queryStringParameters"`
        MultiValueQueryStringParameters map[string][]string           `json:"multiValueQueryStringParameters"`
        PathParameters                  map[string]string             `json:"pathParameters"`
        StageVariables                  map[string]string             `json:"stageVariables"`
        RequestContext                  APIGatewayProxyRequestContext `json:"requestContext"`
        Body                            string                        `json:"body"`
        IsBase64Encoded                 bool                          `json:"isBase64Encoded,omitempty"`
    }
```

- Sample json input
```json
{
	"resource": "some resource",
	"path": "/path/",
	"httpMethod": "GET",
	"headers": {
		"Accept": "Something",
		"Header-2": "Value"
	},
	"multiValueHeaders": {
		"HeaderName": ["Value1", "Value2"],
		"HeaderName2": ["another-value"]
	},
	"queryStringParameters": {
		"q": "something",
		"limit": "100"
	},
	"multiValueQueryStringParameters": {
		"sort": ["href asc", "name desc"]
	},
	"pathParameters": {
		"id": "someId",
		"otherId": "someOtherId"
	},
	"stageVariables": {
		"key": "value"
	},
	"body": "some body once told me",
	"isBase64Encoded": true
}
```
