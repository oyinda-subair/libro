import methodOverride from 'method-override'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import Routes from '../routes'

export default function (app) {
  app.use(methodOverride())

  app.use(bodyParser.json()) // parse application/json
  app.use(bodyParser.urlencoded({ extended: 'false' })) // parse application/x-www-form-urlencoded
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })) // parse application/vnd.api+json as json

  app.use(morgan('dev'))
  app.use(compression())

  Routes(app);
}
