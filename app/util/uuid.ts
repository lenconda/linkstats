import uuid from 'uuid/v4'

export const generateUuid = () => new Buffer(uuid()).toString('base64')
