package main

import (
	"log"
	"github.com/aws/aws-lambda-go/events"
        "github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

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
			log.Printf("        %s\n", value)
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
			log.Printf("        %s\n", value)
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

	newHeaders :=  make(map[string]string)
	newHeaders["NewKey"] = "New value"
	
	return &events.APIGatewayProxyResponse{StatusCode: 200,
		Headers: request.Headers,
		MultiValueHeaders: request.MultiValueHeaders,
		Body: "Just a new response body",
	}, nil
}

func main() {
	lambda.Start(handler)
}
