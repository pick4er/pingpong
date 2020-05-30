import T from 'prop-types'
import { renderRoutes } from 'react-router-config'

function AppLayout(props) {
  const { routes } = props

  return renderRoutes(routes)
}

AppLayout.propTypes = {
  routes: T.arrayOf(T.object).isRequired,
}

export default AppLayout