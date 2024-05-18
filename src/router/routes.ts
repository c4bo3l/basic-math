import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import {
  configurationsPath,
  multiplicationPath,
  multiplicationTablePath,
  multiplicationTestPath,
  multiplicationTipsPath,
  rootPath,
} from "./routeLink";
import MultiplicationTable from "../pages/Multiplication/MultiplicationTable";
import App from "../App";
import MultiplicationTest from "../pages/Multiplication/MultipplicationTest";
import Multiplication from "../pages/Multiplication/Multiplication";
import MultiplicationTips from "../pages/Multiplication/MultiplicationTips";
import Configurations from "../pages/Configuration/Configurations";

const routes: RouteObject[] = [
  {
    path: rootPath,
    Component: App,
    children: [
      {
        path: rootPath,
        Component: Home,
      },
      {
        path: multiplicationPath,
        Component: Multiplication,
      },
      {
        path: multiplicationTablePath,
        Component: MultiplicationTable,
      },
      {
        path: multiplicationTestPath,
        Component: MultiplicationTest,
      },
      {
        path: multiplicationTipsPath,
        Component: MultiplicationTips,
      },
      {
        path: configurationsPath,
        Component: Configurations,
      },
    ],
  },
];

export default routes;
