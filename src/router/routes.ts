import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import {
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
    ],
  },
];

export default routes;
