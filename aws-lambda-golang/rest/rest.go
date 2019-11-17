package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

	const PATH = "/.netlify/functions/rest"
	var returnBody string = ""
	var returnCode int = -1

	log.Print("request.Resource")
	log.Printf("    %s\n", request.Resource)
	log.Print("request.Path")
	log.Printf("    %s\n", request.Path)
	log.Print("request.HTTPMethod")
	log.Printf("    %s\n", request.HTTPMethod)

	log.Print("request.Headers")
	for key, value := range request.Headers {
		log.Printf("    %s: %s\n", key, value)
	}

	log.Printf("request.MulltiValueHeaders")
	for key, values := range request.MultiValueHeaders {
		log.Printf("    key: %s [\n", key)
		for value := range values {
			log.Printf("        %v\n", value)
		}
	}

	log.Print("request.QueryStringParameters")
	for key, value := range request.QueryStringParameters {
		log.Printf("    %s: %s\n", key, value)
	}

	log.Printf("    %s\n", request.MultiValueQueryStringParameters)
	for key, values := range request.MultiValueQueryStringParameters {
		log.Printf("    key: %s [\n", key)
		for value := range values {
			log.Printf("        %v\n", value)
		}
	}

	log.Print("request.PathParameters")
	for key, value := range request.PathParameters {
		log.Printf("    %s: %s\n", key, value)
	}

	log.Print("request.StageVariables")
	for key, value := range request.StageVariables {
		log.Printf("    %s: %s\n", key, value)
	}

	log.Print("request.Body")
	log.Printf("    %s\n", request.Body)

	log.Print("IsBase64Encoded")
	log.Printf("    %t\n", request.IsBase64Encoded)

	if request.HTTPMethod != http.MethodGet {
		returnCode = 405
		returnBody = "Method not allowed: " + request.HTTPMethod
		return &events.APIGatewayProxyResponse{
			StatusCode: returnCode,
			Body:       returnBody,
		}, nil
	}

	api_url, present := os.LookupEnv("API_URL")
	if present == false {
		returnCode = 500
		returnBody = "Server error, missing environment url"
		return &events.APIGatewayProxyResponse{
			StatusCode: returnCode,
			Body:       returnBody,
		}, nil
	}

	api_key, present := os.LookupEnv("API_KEY")
	if present == false {
		returnCode = 500
		returnBody = "Server error, missing api key"
		return &events.APIGatewayProxyResponse{
			StatusCode: returnCode,
			Body:       returnBody,
		}, nil
	}

	log.Println("API_URL: " + api_url)
	log.Println("API_KEY: " + api_key)

	requestUrl := strings.Replace(request.Path, PATH, api_url, -1)

	i := 0
	l := len(request.QueryStringParameters)
	if l > 0 {
		requestUrl = requestUrl + "?"
		for key, value := range request.QueryStringParameters {
			requestUrl = requestUrl + key + "=" + value
			i++
			if i < l {
				requestUrl += "&"
			}
		}
	}

	log.Println("Request URL: " + requestUrl)

	myRequest, err := http.NewRequest(http.MethodGet, requestUrl, nil)
	if err != nil {
		returnCode = 500
		returnBody = "Server error creating new request"
		return &events.APIGatewayProxyResponse{
			StatusCode: returnCode,
			Body:       returnBody,
		}, err
	}

	myRequest.Header.Add("Authorization", api_key)

	client := &http.Client{}

	resp, err := client.Do(myRequest)
	if err != nil {
		returnCode = resp.StatusCode
		returnBody = resp.Body.Close().Error()
		return &events.APIGatewayProxyResponse{
			StatusCode: returnCode,
			Body:       returnBody,
		}, err
	}
	defer resp.Body.Close()

	returnCode = resp.StatusCode
	body, err := ioutil.ReadAll(resp.Body)

	returnBody = string(body[:])

	return &events.APIGatewayProxyResponse{
		StatusCode: returnCode,
		Body:       returnBody,
	}, nil
}

func main() {
	lambda.Start(handler)
}
