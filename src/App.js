import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { getMode, getSidebar, collapseSidebar } from "./store/ui";
import "bootstrap/dist/css/bootstrap.css";
import About from "./components/about/about";
import Navbar from "./components/navigation/navbar";
import SideNav from "./components/navigation/sideNav";
import NewBreed from "./components/newBreed/newBreed";
import MyBox from "./components/myBox/myBoxPage";
import MyBreeds from "./components/myBreeds/myBreeds";
import NotFound from "./components/notFound";
import Footer from "./components/footer";
import { initializeState } from "./store/pokeapi";

const App = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(getMode);
  const expanded = useSelector(getSidebar);

  useEffect(() => {
    dispatch(initializeState());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Bracer</title>
        <body id="body" data-theme={darkMode}></body>
      </Helmet>
      <Navbar></Navbar>
      <SideNav></SideNav>
      {expanded && (
        <div
          className="overlay"
          onClick={() => dispatch(collapseSidebar())}
        ></div>
      )}
      <Switch>
        <Route path="/about" component={About}></Route>
        <Route path="/my-box" component={MyBox}></Route>
        <Route path="/new" component={NewBreed}></Route>
        <Route path="/my-breeds/:treeid" component={MyBreeds}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/my-box"></Redirect>
        <Redirect to="/not-found"></Redirect>
      </Switch>
      <Footer></Footer>
    </HelmetProvider>
  );
};

export default App;
