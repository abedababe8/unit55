const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))


const m83Routes = require('./src/routes/m83')
app.use('/m83', m83Routes)

app.use(function(err, req, res, next){
  const errorMessage = {}

  if(process.env.NODE_ENV !== 'production' && err.stack)
    errorMessage.stack = err.stack

  errorMessage.status = err.status || 500
  errorMessage.message = err.message || 'Internal Server Error'

  res.status(errorMessage.status).send(errorMessage)
})

app.listen(port, function(){
  console.log(`Listening on port ${port}`)
})
