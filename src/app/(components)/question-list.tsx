"use client";
import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  Reorder,
  useDragControls,
} from "framer-motion";

import QuestionBlock, { QuestionType } from "./question-block";
import { useQuestionStore } from "@/store/question-store";

export interface Question {
  id: string;
  order?: number;
  type: QuestionType;
  title: string;
  answer?: string | number;
  helpText?: string;
  radioOptions?: {
    label: string;
    value: string;
  }[];
}

interface QuestionListProps {
  isPreview?: boolean;
}

const QuestionList = ({ isPreview = false }: QuestionListProps) => {
  const { questions, updateQuestion, updateQuestionsOrder } =
    useQuestionStore();
  const [updatedQuestionsWithOrder, setUpdatedQuestionsWithOrder] =
    useState<any>([]);
  const dragControls = useDragControls();

  useEffect(() => {
    let timeoutId: any;

    if (updatedQuestionsWithOrder?.length > 0) {
      timeoutId = setTimeout(() => {
        updateQuestionsOrder(updatedQuestionsWithOrder);
      }, 0);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updatedQuestionsWithOrder]);

  const handleQuestionTypeChange = (
    id: string,
    type: QuestionType,
    index: number
  ) => {
    const isSelectType = type === "SINGLE_SELECT";

    updateQuestion(id, {
      ...questions?.find((q) => q?.id === id)!,
      type,
      ...(isSelectType && {
        radioOptions: [
          {
            label: "option 1",
            value: "option1",
          },
          {
            label: "option 2",
            value: "option2",
          },
        ],
      }),
    });
  };

  const handleInputChange = (id: string, value: string | number) => {};
  const handleRadioChange = (id: string, value: string) => {};

  return questions?.length > 0 ? (
    <AnimatePresence>
      <Reorder.Group
        axis="y"
        values={questions}
        onReorder={(updatedArray: Question[]) =>
          setUpdatedQuestionsWithOrder(updatedArray)
        }
      >
        <div className="flex flex-col gap-4">
          {questions?.map((question: any, index) => (
            <motion.div
              key={question?.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <QuestionBlock
                onPointerDown={(e: React.PointerEvent) => dragControls.start(e)}
                onQuestionTypeChange={(type) => {
                  handleQuestionTypeChange(question?.id, type, index);
                }}
                question={question}
                onInputChange={(value) => {
                  handleInputChange(question?.id, value);
                }}
                onRadioChange={(value) => {
                  handleRadioChange(question?.id, value);
                }}
                index={index}
                isQuestionState={!isPreview}
                {...question}
              />
            </motion.div>
          ))}
        </div>
      </Reorder.Group>
    </AnimatePresence>
  ) : null;
};

export default QuestionList;
