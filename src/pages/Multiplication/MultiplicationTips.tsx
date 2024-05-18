import enUSTips from "./tips/enUS.md";
import idIDTips from "./tips/idID.md";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import MarkdownPreview from "@uiw/react-markdown-preview";

const MultiplicationTips = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();

  return (
    <MarkdownPreview source={i18n.language === "enUS" ? enUSTips : idIDTips} wrapperElement={{
      "data-color-mode": theme.palette.mode
    }} />
  );
};

export default MultiplicationTips;
