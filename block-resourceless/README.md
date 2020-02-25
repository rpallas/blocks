# Block - Resourceless

This is a sample template for a serverless AWS Lambda application, written in JavaScript.

The application implements a CRUD interface in front of an AWS DynamoDB table that
manages a simple resource record.  An API Gateway distributes requests to the various
AWS Lambda functions based on their HTTP paths and methods.

The application architecture is defined in template.yaml, a Serverless
Application Model (SAM) template which can be managed through the Stackery UI
at app.stackery.io.

Here is an overview of the files:

```text
.
├── README.md                          <-- This README file
├── src                                <-- Source code dir for all AWS Lambda functions
│   ├── createResource                     <-- Source code dir for createResource function
│       ├── package.json               <-- Build dependencies for createResource
│       ├── .stackery-config.yaml      <-- Default CLI parameters for this directory
│       └── index.js                   <-- Lambda createResource function code
│   ├── getResource                        <-- Source code dir for getResource function
│       ├── package.json               <-- Build dependencies for getResource
│       ├── .stackery-config.yaml      <-- Default CLI parameters for this directory
│       └── index.js                   <-- Lambda getResource function code
│   ├── updateResource                     <-- Source code dir for updateResource function
│       ├── package.json               <-- Build dependencies for updateResource
│       ├── .stackery-config.yaml      <-- Default CLI parameters for this directory
│       └── index.js                   <-- Lambda updateResource function code
│   ├── deleteResource                     <-- Source code dir for deleteResource function
│       ├── package.json               <-- Build dependencies for deleteResource
│       ├── .stackery-config.yaml      <-- Default CLI parameters for this directory
│       └── index.js                   <-- Lambda deleteResource function code
│   └── listResources                      <-- Source code dir for listResources function
│       ├── package.json               <-- Build dependencies for listResources
│       ├── .stackery-config.yaml      <-- Default CLI parameters for this directory
│       └── index.js                   <-- Lambda listResources function code
├── .stackery-config.yaml              <-- Default CLI parameters for root directory
└── template.yaml                      <-- SAM infrastructure-as-code template
```

Clone this stack in Stackery, deploy it, and test as follows:

- Set `STAGE_LOCATION` from the deployed Rest Api resource properties.

- Create a resource:

        curl --header "Content-Type: application/json" \
        --request POST \
        --data '{"id": "unique001", "firstName": "Alice", "lastName": "Smith", "color": "blue"}' \
        ${STAGE_LOCATION}/resources

- List resources:

        curl ${STAGE_LOCATION}/resources

- Read a resource:

        curl ${STAGE_LOCATION}/resources/unique001

- Update a resource:

        curl --header "Content-Type: application/json" \
        --request PUT \
        --data '{"firstName": "Alice", "lastName": "Smith", "color": "green"}' \
        ${STAGE_LOCATION}/resources/unique001

- Delete a resource:

        curl --request DELETE ${STAGE_LOCATION}/resources/unique001
