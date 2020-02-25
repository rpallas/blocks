const AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB()

exports.handler = async message => {
  console.log(message)

  if (message.body) {
    let resourceId = message.pathParameters.id
    let resource = JSON.parse(message.body)
    let params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: { S: resourceId },
        FirstName: { S: resource.firstName },
        LastName: { S: resource.lastName },
        FavoriteColor: { S: resource.color }
      }
    }

    console.log(`Updating resource ${resourceId} in table ${process.env.TABLE_NAME}`)
    await dynamodb.putItem(params).promise()
    console.log(`Resource added to table, done`)
  }

  return {
    statusCode: 204,
    headers: {},
    body: JSON.stringify({})
  }
}
