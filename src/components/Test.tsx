import React, { useRef, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  ITest,
  ITestQuestion,
  ITestQuestionAnswer,
  IUserTestAnswer,
  TestTypes,
} from "../types/test";
import { useFetcher } from "@remix-run/react";

const DEFAULT_COLOR = "#638EFF";

export const getQuestionsWord = (points: number) => {
  let word = "вопрос";

  let numEnd: number;
  if (points % 1 !== 0) numEnd = (points % 1) * 10;
  else numEnd = points % 10;
  numEnd = parseInt(numEnd.toFixed(0));

  if ([0, 5, 6, 7, 8, 9].includes(numEnd) || (points > 10 && points < 15))
    word += "ов";
  else if ([2, 3, 4].includes(numEnd)) word += "а";

  return word;
};

const OptionButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: string;
}) => {
  return (
    <Button
      sx={{ backgroundColor: DEFAULT_COLOR, color: "#FFFFFF" }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const OptionsForm = ({
  question,
  onAnswer,
}: {
  question: ITestQuestion;
  onAnswer: (question: ITestQuestion, answer: ITestQuestionAnswer) => void;
}) => {
  return (
    <Stack gap={1}>
      {question.answers.map((answer) => (
        <OptionButton
          key={answer.id!}
          onClick={() => onAnswer(question, answer)}
        >
          {answer.answer}
        </OptionButton>
      ))}
    </Stack>
  );
};

const InputForm = ({
  question,
  onAnswer,
}: {
  question: ITestQuestion;
  onAnswer: (question: ITestQuestion, answer: ITestQuestionAnswer) => void;
}) => {
  const [value, setValue] = useState("");

  const preSubmit = () => {
    const input = value.toLowerCase().trim();
    for (const answer of question.answers) {
      if (input === answer.answer) {
        return onAnswer(question, answer);
      }
    }
    onAnswer(
      question,
      question.answers.find((ans) => ans.answer === "{%ANY_INPUT%}")!
    );
  };

  return (
    <Stack gap={2}>
      <TextField
        label={"Ваш ответ"}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button
        onClick={preSubmit}
        sx={{ backgroundColor: DEFAULT_COLOR, color: "#FFFFFF" }}
      >
        Далее
      </Button>
    </Stack>
  );
};

const TestQuestion = ({
  question,
  onAnswer,
}: {
  question: ITestQuestion;
  onAnswer: (question: ITestQuestion, answer: ITestQuestionAnswer) => void;
}) => {
  if (question.type === TestTypes.SINGLE_ANSWER_OPTION) {
    return <OptionsForm question={question} onAnswer={onAnswer} />;
  }
  if (question.type === TestTypes.TEXT_FIELD) {
    return <InputForm question={question} onAnswer={onAnswer} />;
  }
};

export default function Test({ test }: { test: ITest }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const answersRef = useRef<IUserTestAnswer[]>([]);
  const fetcher = useFetcher();

  const handleAnswer = (
    question: ITestQuestion,
    answer: ITestQuestionAnswer
  ) => {
    answersRef.current.push({
      question_id: question.id!,
      answer_id: answer.id!,
    });
    if (currentQuestion === test.questions.length - 1) {
      submitData();
    }
    setCurrentQuestion((cq) => cq + 1);
  };

  const submitData = () => {
    fetcher.submit(
      {
        goal: "submit-test-answers",
        testId: test.id!,
        answers: answersRef.current,
      },
      { method: "POST", encType: "application/json" }
    );
  };

  return (
    <Box
      sx={{
        bgcolor: `#FFFFFF`,
        boxShadow: "0px 0px 7px #638EFF",
        borderRadius: "4px",
        padding: 2,
        marginY: 1,
        width: "35vw",
      }}
    >
      <Typography variant="h6">{test.name}</Typography>
      <Stack justifyContent={"center"} gap={2} mt={2}>
        {currentQuestion !== test.questions.length && (
          <>
            <Typography>
              Вопрос {currentQuestion + 1} из {test.questions.length}
            </Typography>
            <Typography fontWeight={"500"}>
              {test.questions[currentQuestion].title}
            </Typography>
            <TestQuestion
              question={test.questions[currentQuestion]}
              onAnswer={handleAnswer}
            />
          </>
        )}
        {fetcher.state === "submitting" && (
          <Stack alignItems={"center"}>
            <Typography fontWeight={"500"}>Загрузка результата...</Typography>
          </Stack>
        )}
        {fetcher.data && fetcher.data.data.content && (
          <Stack>
            <Typography fontWeight={"500"}>Результат:</Typography>
            <Typography>{fetcher.data.data.content}</Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
