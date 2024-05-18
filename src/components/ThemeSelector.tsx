import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAtom } from "jotai";
import ThemeState, { ThemeMode, ThemeModes } from "../jotai/ThemeState";
import { useTranslation } from "react-i18next";
import capitalizeEveryWord from "../utils/capitalizeEveryWord";

const ThemeSelector = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useAtom(ThemeState);

  const handleChange = (event: SelectChangeEvent) => {
    setTheme(event.target.value as ThemeMode);
  };

  return (
    <Select value={theme} onChange={handleChange} variant='standard'>
      {
        ThemeModes.map((x) => (
          <MenuItem key={`lang-${x}`} value={x}>
            {capitalizeEveryWord(t(x))}
          </MenuItem>
        ))
      }
    </Select>
  );
};

export default ThemeSelector;
