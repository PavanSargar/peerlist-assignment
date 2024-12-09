"use client";
import React, {
  forwardRef,
  useEffect,
  useId,
  useCallback,
  useState,
} from "react";
import { Reorder, useDragControls } from "framer-motion";
import { useQuestionStore } from "@/store/question-store";
import { Question } from "./question-list";
import InputTypesDropdown from "./input-types-dropdown";
import ShortTextIcon from "@/assets/short-text-icon";
import DragDrop from "@/assets/drag-drop";
import HashtagIcon from "@/assets/hashtag-icon";
import RadioIcon from "@/assets/radio-icon";
import LinkIcon from "@/assets/link-icon";
import LongTextIcon from "@/assets/long-text-icon";

import RadioSwitch from "@/assets/radio-switch";

export type QuestionType =
  | "SHORT_ANSWER"
  | "LONG_ANSWER"
  | "SINGLE_SELECT"
  | "NUMBER"
  | "URL";

interface QuestionBlockProps {
  type: QuestionType;
  radioOptions?: {
    label: string;
    value: string;
  }[];
  onQuestionTypeChange?: (typeId: QuestionType) => void;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  question: Question;
  onInputChange: (value: string | number) => void;
  onRadioChange: (value: string) => void;
  onQuestionChange?: (value: string) => void;

  index: number;
  isQuestionState: boolean;
  isValid: boolean;
}

const getQuestionTypeIcon = (type: QuestionType) => {
  switch (type) {
    case "NUMBER":
      return <HashtagIcon />;
    case "SHORT_ANSWER":
      return <ShortTextIcon />;
    case "LONG_ANSWER":
      return <LongTextIcon />;
    case "SINGLE_SELECT":
      return <RadioIcon />;
    case "URL":
      return <LinkIcon />;
    default:
      return null;
  }
};

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const QuestionBlock = forwardRef<HTMLDivElement, QuestionBlockProps>(
  (props, ref) => {
    const {
      type,
      index,
      onQuestionTypeChange,
      question,
      isQuestionState = true,
      isValid: isAnswerInputValid,
    } = props;
    const id = useId();
    const dragControls = useDragControls();
    const { questions, updateRadioOptions, updateQuestion, updateAnswer } =
      useQuestionStore();
    const [isEditing, setIsEditing] = React.useState(false);
    const [questionText, setQuestionText] = useState<string>(question?.title);

    //* for mobile screens
    const iRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
      const iTag = iRef.current;
      if (iTag) {
        return () => {
          iTag.remove();
        };
      }
    }, [iRef]);

    const debouncedUpdateQuestion = useCallback(
      debounce((id: string, updatedQuestion: Question) => {
        updateQuestion(id, updatedQuestion);
      }, 300),
      []
    );

    const debouncedUpdateRadioOptions = useCallback(
      debounce((index: number, radioIndex: number, value: string) => {
        updateRadioOptions(index, radioIndex, value);
      }, 300),
      []
    );

    const debouncedUpdateAnswer = useCallback(
      debounce((id: string, value: string) => {
        updateAnswer(id, value);
      }, 300),
      []
    );

    return (
      <Reorder.Item
        key={question.id}
        value={question}
        dragListener={false}
        dragControls={dragControls}
        ref={ref}
        style={{ touchAction: "none" }}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        whileDrag={{
          scale: 1.02,
          opacity: 0.5,
        }}
      >
        <div
          className={`${
            question?.type === "SHORT_ANSWER" ? "h-auto" : "min-h-[96px]"
          } w-full sm:w-[527px] ${
            isQuestionState
              ? "rounded-[1rem] border-[1px] p-3 sm:p-[1rem] border-gray-200 hover:bg-gray-50"
              : ""
          } gap-[8px] flex flex-col justify-between mx-auto`}
        >
          {/* header part */}
          <div className="flex items-center flex-wrap sm:flex-nowrap gap-2">
            {isEditing ? (
              <input
                className="flex-1 min-w-0 font-inter text-[14px] leading-[20px] text-gray-900 font-semibold bg-transparent outline-none"
                defaultValue={
                  question?.title ||
                  (type !== "URL"
                    ? "Write a Question"
                    : "Link to your best work")
                }
                onBlur={() => setIsEditing(false)}
                onChange={(e) => {
                  setQuestionText(e.target.value);
                  debouncedUpdateQuestion(question?.id, {
                    ...question,
                    title: e.target.value,
                  });
                }}
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 min-w-0 font-inter text-[14px] leading-[20px] ${
                  isQuestionState ? "text-gray-400" : "text-black"
                } ${
                  isAnswerInputValid !== undefined &&
                  !isAnswerInputValid &&
                  "!text-red-500"
                } font-semibold cursor-text break-words`}
                onClick={() => (isQuestionState ? setIsEditing(true) : null)}
              >
                {question?.title || "Click here to edit question text"}
              </span>
            )}
            {isQuestionState && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <span role="img">{getQuestionTypeIcon(type)}</span>
                  <span role="button">
                    <InputTypesDropdown onSelect={onQuestionTypeChange!} />
                  </span>
                </div>
                <span
                  className="cursor-grab"
                  role="img"
                  onPointerDown={(e) => dragControls.start(e)}
                >
                  <DragDrop />
                </span>
              </div>
            )}
          </div>

          {type !== "SINGLE_SELECT" && (
            <div
              className={`w-full min-h-[32px] rounded-[8px] border-[1px] border-gray-200 ${
                isQuestionState ? "bg-gray-100" : "bg-white"
              } py-[6px] px-[8px]`}
            >
              {type === "SHORT_ANSWER" && (
                <input
                  className="w-full h-full bg-transparent outline-none border-none "
                  type="text"
                  name={id}
                  id={id}
                  onChange={(e) =>
                    debouncedUpdateAnswer(question?.id, e.target.value)
                  }
                  disabled={isQuestionState}
                />
              )}
              {type === "LONG_ANSWER" && (
                <textarea
                  className="h-full w-full bg-transparent outline-none border-none"
                  name={id}
                  id={id}
                  rows={5}
                  onChange={(e) =>
                    debouncedUpdateAnswer(question?.id, e.target.value)
                  }
                  disabled={isQuestionState}
                />
              )}

              {type === "NUMBER" && (
                <input
                  className="w-full h-full bg-transparent outline-none border-none "
                  type="number"
                  name={id}
                  id={id}
                  onChange={(e) =>
                    debouncedUpdateAnswer(question?.id, e.target.value)
                  }
                  disabled={isQuestionState}
                />
              )}

              {type === "URL" && (
                <input
                  className="w-full h-full bg-transparent outline-none border-none "
                  placeholder="Placeholder"
                  type="url"
                  name={id}
                  id={id}
                  onChange={(e) =>
                    debouncedUpdateAnswer(question?.id, e.target.value)
                  }
                  disabled={isQuestionState}
                />
              )}
            </div>
          )}

          {type === "SINGLE_SELECT" && (
            <>
              {!isQuestionState ? (
                <>
                  {questions?.[index]?.radioOptions &&
                    questions?.[index]?.radioOptions?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {questions?.[index]?.radioOptions?.map(
                          (item: any, i) => (
                            <div
                              key={`${i}-${item?.label}`}
                              className="flex items-center gap-1"
                            >
                              <input
                                type="radio"
                                name="radio-single-select"
                                id={`i-${item?.label}`}
                                value={item?.value}
                                onChange={(e) =>
                                  updateAnswer(question?.id, e.target.value)
                                }
                              />
                              <span className="w-full min-h-[32px] text-[14px] leading-[20px] font-inter text-gray-400 rounded-[8px] border-[1px] border-gray-200 bg-white py-[6px] px-[8px]">
                                {item?.label}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                </>
              ) : (
                <>
                  {questions?.[index]?.radioOptions &&
                    questions?.[index]?.radioOptions?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {questions?.[index]?.radioOptions?.map(
                          (field: any, radioIndex) => (
                            <div
                              key={field?.id}
                              className="flex items-center gap-1"
                            >
                              <span>
                                <RadioSwitch />
                              </span>
                              <span className="w-full min-h-[32px] text-[14px] leading-[20px] font-inter text-gray-400 rounded-[8px] border-[1px] border-gray-200 bg-white py-[6px] px-[8px]">
                                <div className="flex items-center w-full">
                                  <input
                                    name={`questions.${index}.radioOptions.${radioIndex}.value`}
                                    className="outline-none border-none flex-1"
                                    placeholder="Option label"
                                    onChange={(e) =>
                                      debouncedUpdateRadioOptions(
                                        index,
                                        radioIndex,
                                        e.target.value
                                      )
                                    }
                                  />
                                  {radioIndex ===
                                    questions?.[index]?.radioOptions?.length! -
                                      1 && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        debouncedUpdateRadioOptions(
                                          index,
                                          radioIndex,
                                          `option ${radioIndex}`
                                        )
                                      }
                                      className="p-1 hover:bg-gray-100 rounded-full"
                                    >
                                      +
                                    </button>
                                  )}
                                </div>
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                </>
              )}
            </>
          )}
        </div>
      </Reorder.Item>
    );
  }
);

QuestionBlock.displayName = "QuestionBlock";

export default React.memo(QuestionBlock);
