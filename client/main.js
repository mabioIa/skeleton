import React from "react";
import { hydrate } from "react-dom";
import Yo from "./Yo";

const root = document.getElementById("root");
hydrate(<Yo />, root);
