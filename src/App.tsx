import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CustomAppBar from "./components/CustomAppBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { TXT_BACK } from "./translations/translationConstants";
import { useAtom } from "jotai";
import ThemeState from "./jotai/ThemeState";
import { useEffect, useMemo } from "react";
import LanguageState from "./jotai/LanguageState";

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTheme] = useAtom(ThemeState);
  const [currentLang] = useAtom(LanguageState);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: currentTheme,
        },
      }),
    [currentTheme]
  );

  const onGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLang]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            overflow: "auto",
          }}
        >
          <CustomAppBar />
          <Container
            maxWidth="xl"
            sx={{
              pt: 10,
              height: "100%",
            }}
          >
            {location.key !== "default" ? (
              <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={onGoBack}
                sx={{
                  mb: 2,
                }}
                color="secondary"
              >
                {t(TXT_BACK)}
              </Button>
            ) : null}
            <Outlet />
          </Container>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
