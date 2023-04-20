import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "../store";

const withAuthentication = (WrappedComponent) => {
  const AuthenticatedComponent = ({ isAuthenticated, ...props }) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!isAuthenticated) navigate('/login');
    }, []);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

  //Connect Redux store with component
  return connect(mapStateToProps)(AuthenticatedComponent);
};

export default withAuthentication;
