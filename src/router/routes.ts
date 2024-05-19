import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import {
  circumferencePath,
  circumferenceTestsPath,
  circumferenceTipsPath,
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
import Circumference from "../pages/Circumference/Circumference";
import CircumferenceTips from "../pages/Circumference/CircumferenceTips";
import CircumferenceTest from "../pages/Circumference/CircumferenceTest";

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
      {
        path: circumferencePath,
        Component: Circumference,
      },
      {
        path: circumferenceTipsPath,
        Component: CircumferenceTips,
      },
      {
        path: circumferenceTestsPath,
        Component: CircumferenceTest,
      },
    ],
  },
];

export default routes;
