import { Alert, Button, Form, InputNumber, Progress } from "antd";
import { useState } from "react";
import { green, red } from "@ant-design/colors";

export interface TestData {
  num1: number;
  num2: number;
  answer: number;
  result: number | null;
}

const MultiplicationTest = () => {
  const [count, setCount] = useState(10);
  const [tests, setTests] = useState<TestData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState<number | null>(null);

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
    if (currentIndex === -1) {
      generateTests();
    } else if (currentIndex < count) {
      const temp = [...tests];
      temp[currentIndex].result = currentInput;
      setTests([...temp]);
    }

    setCurrentIndex((prev) => (prev + 1 > count ? -1 : prev + 1));
    setCurrentInput(null);
  };

  return (
    <Form
      style={{
        width: "100%",
      }}
    >
      {currentIndex !== -1 ? (
        <Progress
          percent={(currentIndex / count) * 100}
          steps={count}
          strokeColor={tests
            .filter((x) => x.result !== null)
            .map(({ result, answer }) =>
              result !== answer ? red[5] : green[6]
            )}
          style={{
            width: "100%",
            marginBottom: "8px",
          }}
        />
      ) : null}
      {currentIndex === -1 ? (
        <Form.Item label="Test Count">
          <InputNumber
            value={count}
            onChange={(value) => setCount(value || 10)}
          />
        </Form.Item>
      ) : currentIndex < count ? (
        <Form.Item
          label={`${tests[currentIndex].num1} x ${tests[currentIndex].num2} =`}
          colon={false}
        >
          <InputNumber
            autoFocus
            value={currentInput}
            onChange={(value) => setCurrentInput(value)}
          />
        </Form.Item>
      ) : (
        <>
          {tests.some((x) => x.answer === x.result) ? (
            <Alert
              type="success"
              message={`Correct Answers: ${tests.filter((x) => x.answer === x.result).length}`}
              style={{
                marginBottom: "8px",
              }}
            />
          ) : null}
          {tests.some((x) => x.answer !== x.result) ? (
            <Alert
              type="error"
              message={`Wrong Answers: ${
                tests.filter((x) => x.answer !== x.result).length
              }`}
              style={{
                marginBottom: "8px",
              }}
            />
          ) : null}
        </>
      )}
      <Form.Item>
        <Button
          type="primary"
          onClick={onNext}
          disabled={
            currentIndex >= 0 && currentIndex < count && currentInput === null
          }
        >
          {currentIndex < count - 1 ? "Next" : "Finish"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MultiplicationTest;
