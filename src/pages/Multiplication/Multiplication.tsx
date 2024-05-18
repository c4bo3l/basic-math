import { Card, CardActionArea, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import {
  TXT_MULTIPLICATION_TABLE,
  TXT_MULTIPLICATION_TEST,
  TXT_TIPS,
} from "../../translations/translationConstants";
import TableRowsIcon from "@mui/icons-material/TableRows";
import {
  multiplicationTablePath,
  multiplicationTestPath,
  multiplicationTipsPath,
} from "../../router/routeLink";
import QuizIcon from "@mui/icons-material/Quiz";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import capitalizeEveryWord from "../../utils/capitalizeEveryWord";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const Multiplication = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onMenuClicked = (path: string) => {
    return () => navigate(path);
  };

  const menus: { label: string; icon: ReactNode; path: string }[] = [
    {
      label: TXT_TIPS,
      icon: <TipsAndUpdatesIcon />,
      path: multiplicationTipsPath,
    },
    {
      label: TXT_MULTIPLICATION_TABLE,
      icon: <TableRowsIcon />,
      path: multiplicationTablePath,
    },
    {
      label: TXT_MULTIPLICATION_TEST,
      icon: <QuizIcon />,
      path: multiplicationTestPath,
    },
  ];
  return (
    <Grid container spacing={2}>
      {menus.map((menu, index) => (
        <Grid key={`multiplication-menu-${index}`} item xs={12} md={3}>
          <Card>
            <CardActionArea
              onClick={onMenuClicked(menu.path)}
              sx={(theme) => ({
                padding: theme.spacing(2),
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              })}
            >
              {menu.icon}
              <Typography
                variant="h5"
                sx={(theme) => ({
                  textAlign: "center",
                  marginTop: theme.spacing(2),
                })}
              >
                {capitalizeEveryWord(t(menu.label))}
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Multiplication;
