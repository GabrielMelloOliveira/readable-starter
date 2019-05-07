import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import SavePost from './SavePost'
import Category from './Category'
import EditPost from './EditPost'
import DetailsPost from './DetailsPost';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
				<Fragment>
					<LoadingBar />
					<div className='container'>
						{
							this.props.loading === true
								? null
								: <Switch>
									<Route path='/post/:id' exact component={EditPost} />
									<Route path='/post' exact component={SavePost} />
									<Route path='/:category/:post_id' exact component={DetailsPost} />
									<Route path='/:category' exact component={Category} />
									<Route path='/' exact component={Dashboard} />
								</Switch>
						}
					</div>
				</Fragment>
			</Router>
    );
  }
}

function mapStateToProps () {
	return {
		loading: false
	}
}

export default connect(mapStateToProps)(App)
