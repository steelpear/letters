const middleware = {}

middleware['check'] = require('..\\middleware\\check.js')
middleware['check'] = middleware['check'].default || middleware['check']

export default middleware
