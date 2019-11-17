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

	const PATH_TO_LAMBDA = "/.netlify/functions/rest"
	const URL_OF_OTHER = "https://app.climate.azavea.com"

	var returnBody string
	var returnCode int

	if request.HTTPMethod != http.MethodGet {
		returnCode = 405
		returnBody = "Method not allowed: " + request.HTTPMethod
		return &events.APIGatewayProxyResponse{
			StatusCode: returnCode,
			Body:       returnBody,
		}, nil
	}

	log.Print("request.Path")
	log.Printf("    %s\n", request.Path)

	log.Print("request.QueryStringParameters")
	for key, value := range request.QueryStringParameters {
		log.Printf("    %s: %s\n", key, value)
	}

	TEMPERATURE_FYI_URL, present := os.LookupEnv("URL")
	if present == false {
		returnCode = 500
		returnBody = "Server side error"
		log.Fatal("Missing URL environment variable")
		return &events.APIGatewayProxyResponse{
			StatusCode: returnCode,
			Body:       returnBody,
		}, nil
	}

	api_url, present := os.LookupEnv("API_URL")
	if present == false {
		returnCode = 500
		returnBody = "Server side error"
		log.Fatal("Missing API_URL environment variable")
		return &events.APIGatewayProxyResponse{
			StatusCode: returnCode,
			Body:       returnBody,
		}, nil
	}

	api_key, present := os.LookupEnv("API_KEY")
	if present == false {
		returnCode = 500
		returnBody = "Server side error"
		log.Fatal("Missing API_KEY environment variable")
		return &events.APIGatewayProxyResponse{
			StatusCode: returnCode,
			Body:       returnBody,
		}, nil
	}

	requestUrl := strings.Replace(request.Path, PATH_TO_LAMBDA, api_url, -1)

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
		returnBody = "Server side error"
		log.Fatal("Failed to generate request object")
		return &events.APIGatewayProxyResponse{
			StatusCode: returnCode,
			Body:       returnBody,
		}, err
	}

	myRequest.Header.Add("Authorization", api_key)
	myRequest.Header.Add("Accept", "application/json")

	client := &http.Client{}

	resp, err := client.Do(myRequest)
	if err != nil {
		returnCode = resp.StatusCode
		returnBody = resp.Body.Close().Error()
		log.Println("Error reaching " + requestUrl)
		return &events.APIGatewayProxyResponse{
			StatusCode: returnCode,
			Body:       returnBody,
		}, err
	}
	defer resp.Body.Close()

	returnCode = resp.StatusCode
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		returnCode = 500
		returnBody = "Server side error"
		log.Fatal("Failed to read response body")
		return &events.APIGatewayProxyResponse{
			StatusCode: returnCode,
			Body:       returnBody,
		}, err
	}

	returnBody = string(body[:])
	returnBody = strings.ReplaceAll(returnBody, URL_OF_OTHER, TEMPERATURE_FYI_URL+PATH_TO_LAMBDA)

	returnHeader := make(map[string]string)
	returnHeader["Content-type"] = "application/json"
	return &events.APIGatewayProxyResponse{
		StatusCode: returnCode,
		Headers:    returnHeader,
		Body:       returnBody,
	}, nil
}

func main() {
	lambda.Start(handler)
}
