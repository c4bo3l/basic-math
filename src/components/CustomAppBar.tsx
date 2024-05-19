import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuIcon from "@mui/icons-material/Menu";
import { areaPath, circumferencePath, configurationsPath, multiplicationPath, rootPath } from "../router/routeLink";
import capitalizeEveryWord from "../utils/capitalizeEveryWord";
import { useTranslation } from "react-i18next";
import {
  TXT_AREA,
  TXT_BASIC_MATH,
  TXT_CIRCUMFERENCE,
  TXT_MULTIPLICATION,
} from "../translations/translationConstants";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

const CustomAppBar = () => {
  const { t } = useTranslation();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onMenuClicked = (path: string) => {
    return () => {
      handleCloseNavMenu();
      navigate(path);
    };
  };

  const menus: { label: string; path: string }[] = [
    {
      label: TXT_MULTIPLICATION,
      path: multiplicationPath,
    },
    {
      label: TXT_CIRCUMFERENCE,
      path: circumferencePath,
    },
    {
      label: TXT_AREA,
      path: areaPath,
    },
  ];

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CalculateIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={rootPath}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {capitalizeEveryWord(t(TXT_BASIC_MATH))}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {menus.map((menu, index) => (
                <MenuItem
                  key={`menu-${index}`}
                  onClick={onMenuClicked(menu.path)}
                >
                  <Typography textAlign="center">
                    {capitalizeEveryWord(t(menu.label))}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <CalculateIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={rootPath}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {capitalizeEveryWord(t(TXT_BASIC_MATH))}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {menus.map((menu, index) => (
              <Button
                key={`menu-${index}`}
                onClick={onMenuClicked(menu.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t(menu.label)}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={onMenuClicked(configurationsPath)}>
            <SettingsIcon />
          </IconButton>
        </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
