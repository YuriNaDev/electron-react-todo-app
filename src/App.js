import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Home from 'pages/Home'

function App() {
	return (
		<HashRouter>
			<>
				<Switch>
					<Route path="/" exact component={Home} />
				</Switch>
			</>
		</HashRouter>
	)
}

export default hot(module)(App)
