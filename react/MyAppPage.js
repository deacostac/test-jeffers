import React, { Fragment } from 'react'
import { Route } from 'vtex.my-account-commons/Router'
// Your component pages
import MyPets from './components/MyPets'

const MyAppPage = () => (
  <Fragment>
    <Route exact path="/my-pets" component={MyPets} />
  </Fragment>
)

export default MyAppPage
