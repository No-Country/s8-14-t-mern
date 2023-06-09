const fs = require('fs')

const YAML = require('yaml')

//This is used like this because a TypeError: fs.readFilesSync is not a function
const file = () => {
  fs.readFilesSync('openapi.yaml', 'utf8')
}
const openapiDocument = YAML.parse(file)

export default openapiDocument
