const AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB()

exports.handler = async message => {
  console.log(message)

  if (message.body) {
    let resource = JSON.parse(message.body)
    let params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: { S: resource.id },
        FirstName: { S: resource.firstName },
        LastName: { S: resource.lastName },
        FavoriteColor: { S: resource.color }
      }
    }

    console.log(`Adding resource to table ${process.env.TABLE_NAME}`)
    await dynamodb.putItem(params).promise()
    console.log(`Resource added to table, done`)
  }

  return {}
}
