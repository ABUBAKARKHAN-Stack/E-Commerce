import { MongoError } from 'mongodb'

interface MongooseCodeError extends MongoError {
    code?: number
}