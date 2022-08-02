import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import {getCurrentUserInfo} from "../services/authServices";

const Player = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [currentUser, setCurrentUser] = React.useState({"first_name": null, "last_name": null})

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  React.useEffect(()=>{
    console.log('effect')
    async function fetchUserShortInfo() {
      const userData = await getCurrentUserInfo();
      setCurrentUser(userData);
    }
    fetchUserShortInfo();
  }, {})

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/player") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/player/test",
          imgSrc: require("../assets/img/brand/SEON Quests.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
          currentUser={currentUser}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/player/index" />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Player;
