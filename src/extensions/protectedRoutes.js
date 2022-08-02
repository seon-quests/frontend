import { Route, Redirect } from "react-router-dom";
import {getCurrentUser} from "../services/authServices";


// export const requiresAuthentication = (Component) => (props) => {
//     const isAuthenticated = localStorage.getItem('access_token');
//     if (isAuthenticated) {
//         return <Component {...props} />;
//     }
//     return (
//         <Redirect
//             to={{
//                 pathname: '/auth/login'
//             }}
//         />
//     );
// };

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = getCurrentUser();

        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
        }
        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.permissions) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: currentUser.homePage}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)