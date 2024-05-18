import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";
import capitalizeEveryWord from "../../utils/capitalizeEveryWord";
import { TXT_LANGUAGE, TXT_THEME } from "../../translations/translationConstants";
import ThemeSelector from "../../components/ThemeSelector";
import LanguageSelector from "../../components/LanguageSelector";

const Configurations = () => {
  const { t } = useTranslation();
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            {capitalizeEveryWord(t(TXT_THEME))}
          </TableCell>
          <TableCell>
            <ThemeSelector />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            {capitalizeEveryWord(t(TXT_LANGUAGE))}
          </TableCell>
          <TableCell>
            <LanguageSelector />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Configurations;
