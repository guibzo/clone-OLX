import React from "react";
import { Navigate } from "react-router-dom";
import { isLogged } from "../utils/authHandler";

export const RouteHandler = ({children, ...routeProps}) => {      // o routeProps faz referência aos "atributos" da rota especificada
    let logged = isLogged();
    let authorized = (routeProps.private && !logged) ? false : true;
   
   return authorized ? children : <Navigate to="/signin"/>
}