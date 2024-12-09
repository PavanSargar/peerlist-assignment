"use client";
import React from "react";
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
  const dragControls = useDragControls();

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

  return questions?.length > 0 ? (
    <AnimatePresence>
      <Reorder.Group
        axis="y"
        values={questions}
        onReorder={updateQuestionsOrder}
      >
        <div suppressHydrationWarning className="flex flex-col gap-4">
          {questions?.map((question: any, index) => (
            <Reorder.Item
              key={question?.id}
              value={question}
              dragListener={false}
              dragControls={dragControls}
            >
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 50,
                  mass: 1,
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <QuestionBlock
                  onPointerDown={(e: React.PointerEvent) =>
                    dragControls.start(e)
                  }
                  onQuestionTypeChange={(type) => {
                    handleQuestionTypeChange(question?.id, type, index);
                  }}
                  question={question}
                  index={index}
                  isQuestionState={!isPreview}
                  isValid={question?.isValid}
                  {...question}
                />
              </motion.div>
            </Reorder.Item>
          ))}
        </div>
      </Reorder.Group>
    </AnimatePresence>
  ) : null;
};

export default QuestionList;
