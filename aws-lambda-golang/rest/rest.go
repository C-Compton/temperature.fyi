package main

import (
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

const PATH = "/.netlify/functions/rest"

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

	var returnBody string
	var returnCode int
	api_url, present := os.LookupEnv("API_URL")
	if present == false {
		returnCode = 500
		returnBody = "Server error, missing environment url"
		return &events.APIGatewayProxyResponse{StatusCode: returnCode,
			Body: returnBody,
		}, nil
	}

	api_key, present := os.LookupEnv("API_KEY")
	if present == false {
		returnCode = 500
		returnBody = "Server error, missing api key"
		return &events.APIGatewayProxyResponse{StatusCode: returnCode,
			Body: returnBody,
		}, nil
	}

	requestUrl := strings.Replace(request.Path, PATH, api_url, -1)

	myRequest, err := http.NewRequest(http.MethodGet, requestUrl, nil)
	if err != nil {
		returnCode = 500
		returnBody = "Server error creating new request"
		return &events.APIGatewayProxyResponse{StatusCode: returnCode,
			Body: returnBody,
		}, err
	}

	myRequest.Header.Add("Authorization", api_key)

	client := &http.Client{}

	resp, err := client.Do(myRequest)
	if err != nil {
		returnCode = resp.StatusCode
		returnBody = resp.Body.Close().Error()
		return &events.APIGatewayProxyResponse{StatusCode: returnCode,
			Body: returnBody,
		}, err
	}

	returnCode = resp.StatusCode
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	returnBody = string(body[len(body)])

	return &events.APIGatewayProxyResponse{StatusCode: returnCode,
		Body: returnBody,
	}, nil
}

func main() {
	lambda.Start(handler)
}
