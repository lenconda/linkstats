import mongoose from 'mongoose'
import config from '../../config'

const {
  dbName, 
  dbPort, 
  dbHost, 
  dbToken, 
  dbUser,
} = config

export const connect = () => {
  const uri = `mongodb://${dbUser}:${dbToken}@${dbHost}:${dbPort}/${dbName}`

  mongoose
      .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
      .catch(error => console.log(error.message))
}
