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

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const onGoBack = () => {
    navigate(-1);
  };

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
