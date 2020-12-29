//mostly code from reatjs.org/docs/error-boundaries.html
import React from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    redirect: false,
  };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 5000);
    }
  }
  render() {
    if (this.state.redirect) {
      //Redirect comes from Reach Router
      return <Redirect to="/"></Redirect>;
    }
    if (this.state.hasError) {
      return (
        <h2>
          There was an error.
          <Link to="/">Click here to be taken back to home page.</Link> Or wait
          5 seconds to be redirected.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
