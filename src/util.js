const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL';

function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if(Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);

    return userId;
  }

  return 'User not Authenticated';
}

module.exports = {
  getUserId: getUserId,
  APP_SECRET: APP_SECRET
};