import { TextField, Button, Container, useTheme } from "@mui/material";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import capitalizeEveryWord from "../../utils/capitalizeEveryWord";
import {
  TXT_ANSWER,
  TXT_CORRECT_ANSWER,
  TXT_FINISH,
  TXT_NEXT,
  TXT_QUESTION,
  TXT_START,
  TXT_TEST_COUNT,
  TXT_WRONG_ANSWER,
} from "../../translations/translationConstants";
import { PieChart } from "@mui/x-charts/PieChart";

export interface TestData {
  num1: number;
  num2: number;
  answer: number;
  result: number | null;
}

const MultiplicationTest = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState<number | null>(10);
  const [tests, setTests] = useState<TestData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState<number | null>(null);
  const theme = useTheme();

  const generateTests = () => {
    const generated = Array.from(Array(count).keys()).map(() => {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const answer = num1 * num2;
      const data: TestData = {
        num1,
        num2,
        answer,
        result: null,
      };
      return data;
    });
    setTests([...generated]);
  };

  const onNext = () => {
    const currentCount = count || 10;
    if (currentIndex === -1) {
      generateTests();
    } else if (currentIndex < currentCount) {
      const temp = [...tests];
      temp[currentIndex].result = currentInput;
      setTests([...temp]);
    }

    setCurrentIndex((prev) => (prev + 1 > currentCount ? -1 : prev + 1));
    setCurrentInput(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  return (
    <Container
      maxWidth="xs"
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, minHeight: 600 }}
    >
      {currentIndex === -1 ? (
        <TextField
          margin="normal"
          required
          fullWidth
          name="count"
          autoFocus
          defaultValue={count}
          label={capitalizeEveryWord(t(TXT_TEST_COUNT))}
          InputProps={{
            type: "number",
          }}
          onChange={(e) => {
            const newCount = parseInt(e.currentTarget.value);
            setCount(isNaN(newCount) ? null : newCount);
          }}
        />
      ) : currentIndex < (count || 10) ? (
        <Fragment key={`test-${currentIndex}`}>
          <TextField
            margin="normal"
            required
            fullWidth
            autoFocus
            label={capitalizeEveryWord(
              `${t(TXT_QUESTION)} #${currentIndex + 1}`
            )}
            value={`${tests[currentIndex].num1} x ${tests[currentIndex].num2}`}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            autoFocus
            label={capitalizeEveryWord(`${t(TXT_ANSWER)} #${currentIndex + 1}`)}
            defaultValue={currentInput}
            InputProps={{
              type: "number",
            }}
            onChange={(e) => setCurrentInput(parseInt(e.currentTarget.value))}
          />
        </Fragment>
      ) : (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: tests.filter((x) => x.answer === x.result).length,
                  label: capitalizeEveryWord(t(TXT_CORRECT_ANSWER)),
                  color: theme.palette.success.main,
                },
                {
                  id: 1,
                  value: tests.filter((x) => x.answer !== x.result).length,
                  label: capitalizeEveryWord(t(TXT_WRONG_ANSWER)),
                  color: theme.palette.error.main,
                },
              ],
            },
          ]}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
            },
          }}
          width={400}
          height={380}
        />
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={
          currentIndex > -1 && currentIndex < (count || 10) && !currentInput
        }
      >
        {t(
          currentIndex === -1
            ? TXT_START
            : currentIndex < (count || 10)
            ? TXT_NEXT
            : TXT_FINISH
        )}
      </Button>
    </Container>
  );
};

export default MultiplicationTest;
