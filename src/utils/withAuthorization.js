import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom"

const withAuthorization = (requiredPermissions) => WrappedComponent => {
    const AuthorizedComponent = ({ userPermissions, ...props }) => {
        const navigate = useNavigate();
        console.log("User permissions: ", userPermissions);
        console.log("Required permissions: ", requiredPermissions);
        const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));
        useEffect(() => {
            if(!hasPermission) navigate('/error/403'); 
          }, []);
          return hasPermission ? <WrappedComponent {...props} /> : null;
    }

    const mapStateToProps = state => ({
        userPermissions: state.auth.userPermissions,
    });
    
    return connect(mapStateToProps)(AuthorizedComponent);
}

export default withAuthorization;