import {
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import capitalizeEveryWord from "../../utils/capitalizeEveryWord";
import {
  TXT_ANSWER,
  TXT_BASE,
  TXT_CORRECT_ANSWER,
  TXT_FINISH,
  TXT_HEIGHT,
  TXT_LENGTH,
  TXT_NEXT,
  TXT_QUESTION,
  TXT_RADIUS,
  TXT_START,
  TXT_TEST_COUNT,
  TXT_WIDTH,
  TXT_WRONG_ANSWER,
} from "../../translations/translationConstants";
import { PieChart } from "@mui/x-charts/PieChart";

const ShapeTypes = ["square", "rect", "triangle", "circle"] as const;
type ShapeType = (typeof ShapeTypes)[number];

type SquareData = {
  r: number;
};

type RectData = {
  w: number;
  l: number;
};

type TriangleData = {
  base: number;
  height: number;
};

type CircleData = {
  r: number;
};

type Data = SquareData | RectData | TriangleData | CircleData;

interface TestData {
  shapeType: ShapeType;
  data: Data;
  answer: number;
  input: number | null;
}

const AreaTest = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState<number | null>(10);
  const [tests, setTests] = useState<TestData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState<number | null>(null);
  const theme = useTheme();

  const getCount = () => count || 10;

  const getShapeType = (): ShapeType => {
    const rand = Math.floor(Math.random() * 10) + 1;
    const index = rand % ShapeTypes.length;
    return ShapeTypes[index];
  };

  const generateCircleData = (): CircleData => ({
    r: Math.floor(Math.random() * 10) + 1,
  });

  const generateRectData = (): RectData => ({
    w: Math.floor(Math.random() * 10) + 1,
    l: Math.floor(Math.random() * 10) + 1,
  });

  const generateSquareData = (): SquareData => ({
    r: Math.floor(Math.random() * 10) + 1,
  });

  const generateTriangleData = (): TriangleData => ({
    base: Math.floor(Math.random() * 10) + 1,
    height: Math.floor(Math.random() * 10) + 1,
  });

  const getShapeTestData = (shapeType: ShapeType) => {
    switch (shapeType) {
      case "circle":
        return generateCircleData();
      case "rect":
        return generateRectData();
      case "square":
        return generateSquareData();
      default:
        return generateTriangleData();
    }
  };

  const calcCircle = (data: CircleData) =>
    parseFloat(((22 * data.r * data.r) / 7).toFixed(2));

  const calcRect = (data: RectData) => data.l * data.w;

  const calcSquare = (data: SquareData) => data.r * data.r;

  const calcTriangle = (data: TriangleData) =>
    parseFloat(((data.base * data.height) / 2).toFixed(2));

  const calculateArea = (shapeType: ShapeType, data: Data) => {
    switch (shapeType) {
      case "circle":
        return calcCircle(data as CircleData);
      case "rect":
        return calcRect(data as RectData);
      case "square":
        return calcSquare(data as SquareData);
      default:
        return calcTriangle(data as TriangleData);
    }
  };

  const generateTests = () => {
    const generated = Array.from(Array(getCount()).keys()).map(() => {
      const shapeType = getShapeType();
      const data = getShapeTestData(shapeType);
      const answer = calculateArea(shapeType, data);
      const test: TestData = {
        shapeType,
        data,
        answer,
        input: null,
      };
      return test;
    });
    setTests([...generated]);
  };

  const onNext = () => {
    const currentCount = count || 10;
    if (currentIndex === -1) {
      generateTests();
    } else if (currentIndex < currentCount) {
      const temp = [...tests];
      temp[currentIndex].input = currentInput;
      setTests([...temp]);
    }

    setCurrentIndex((prev) => (prev + 1 > currentCount ? -1 : prev + 1));
    setCurrentInput(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  const onInputChanged = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = parseFloat(e.currentTarget.value);
    setCurrentInput(isNaN(newValue) ? null : newValue);
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
      ) : currentIndex < getCount() ? (
        <Stack
          key={`test-${currentIndex}`}
          direction="column"
          sx={{
            width: "100%",
          }}
          spacing={2}
        >
          <Typography variant="h5">
            {`${capitalizeEveryWord(t(TXT_QUESTION))} #${
              currentIndex + 1
            } — ${capitalizeEveryWord(t(tests[currentIndex].shapeType))}`}
          </Typography>
          <Divider />
          {tests[currentIndex].shapeType === "circle" ? (
            <Typography variant="body1">
              {`${capitalizeEveryWord(t(TXT_RADIUS))} = ${
                (tests[currentIndex].data as CircleData).r
              }`}
            </Typography>
          ) : null}
          {tests[currentIndex].shapeType === "rect" ? (
            <>
              <Typography variant="body1">
                {`${capitalizeEveryWord(t(TXT_LENGTH))} = ${
                  (tests[currentIndex].data as RectData).l
                }`}
              </Typography>
              <Typography variant="body1">
                {`${capitalizeEveryWord(t(TXT_WIDTH))} = ${
                  (tests[currentIndex].data as RectData).w
                }`}
              </Typography>
            </>
          ) : null}
          {tests[currentIndex].shapeType === "square" ? (
            <Typography variant="body1">
              {`${capitalizeEveryWord(t(TXT_LENGTH))} = ${
                (tests[currentIndex].data as SquareData).r
              }`}
            </Typography>
          ) : null}
          {tests[currentIndex].shapeType === "triangle" ? (
            <>
              <Typography variant="body1">
                {`${capitalizeEveryWord(t(TXT_BASE))} = ${
                  (tests[currentIndex].data as TriangleData).base
                }`}
              </Typography>
              <Typography variant="body1">
                {`${capitalizeEveryWord(t(TXT_HEIGHT))} = ${
                  (tests[currentIndex].data as TriangleData).height
                }`}
              </Typography>
            </>
          ) : null}
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
            onChange={onInputChanged}
          />
        </Stack>
      ) : (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: tests.filter((x) => x.answer === x.input).length,
                  label: capitalizeEveryWord(t(TXT_CORRECT_ANSWER)),
                  color: theme.palette.success.main,
                },
                {
                  id: 1,
                  value: tests.filter((x) => x.answer !== x.input).length,
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

export default AreaTest;
