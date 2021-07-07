import React from "react"
import { Redirect, RouteComponentProps } from "react-router-dom"

export const RedirectPathToHome: React.FC<RouteComponentProps> = ({ location }) => {
  return <Redirect to={{ ...location, pathname: '/home' }} />
}
