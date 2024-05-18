import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import LanguageState, { LanguageOption, LanguageOptions } from "../jotai/LanguageState";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import capitalizeEveryWord from "../utils/capitalizeEveryWord";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useAtom(LanguageState);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as LanguageOption;
    setLang(value);
    i18n.changeLanguage(value);
  };

  return (
    <Select value={lang} onChange={handleChange} variant='standard'>
      {
        LanguageOptions.map((x) => (
          <MenuItem key={`lang-${x}`} value={x}>
            {capitalizeEveryWord(t(x))}
          </MenuItem>
        ))
      }
    </Select>
  );
};

export default LanguageSelector
