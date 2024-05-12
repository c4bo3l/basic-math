import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import {
  multiplicationTablePath,
  multiplicationTestPath,
  rootPath,
} from "./routeLink";
import MultiplicationTable from "../pages/Multiplication/MultiplicationTable";
import App from "../App";
import MultiplicationTest from "../pages/Multiplication/MultipplicationTest";

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
        path: multiplicationTablePath,
        Component: MultiplicationTable,
      },
      {
        path: multiplicationTestPath,
        Component: MultiplicationTest,
      },
    ],
  },
];

export default routes;
