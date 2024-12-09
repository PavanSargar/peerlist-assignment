"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useQuestionStore } from "@/store/question-store";
import InputTypesDropdown from "./input-types-dropdown";
import QuestionList from "./question-list";
import SaveAsDraft from "@/assets/save-as-darft-icon";
import ArrowIcon from "@/assets/arrow-icon";
import CheckIcon from "@/assets/check-icon";

import { QuestionType } from "./question-block";
type Props = { isPreview?: boolean; isSubmitForm?: boolean };

const Form = ({ isPreview = false, isSubmitForm = false }: Props) => {
  const {
    questions,
    addQuestion,
    formTitle,
    setFormTitle,
    validateQuestions,
    isFormValid,
  } = useQuestionStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();

  const handleAddQuestion = (type: QuestionType) => {
    addQuestion({
      id: String(questions.length + 1),
      type,
      title: "",
      ...(type === "SINGLE_SELECT" && {
        radioOptions: [
          { label: "option1 ", value: "option1" },
          { label: "optino 2", value: "option2" },
        ],
      }),
    });
  };
  const formData = {
    questions,
    formTitle,
  };
  const handlePreviewForm = () => {
    if (window !== undefined && window) {
      window.localStorage.setItem("formData", JSON.stringify(formData));
      router.push("/preview");
    }
  };

  const handleSaveDraft = () => {
    if (window !== undefined && window) {
      window.localStorage.setItem("formData", JSON.stringify(formData));
    }
  };

  const handlePublishForm = () => {
    if (!formTitle) return;
    if (window !== undefined && window) {
      window.localStorage.setItem("formData", JSON.stringify(formData));
      router.push("/submit-form");
    }
  };

  const handleSubmitForm = () => {
    if (validateQuestions()) {
      setIsSubmitted(true);
    }
  };
  return (
    <form className="w-full overflow-hidden lg:w-[640px] mx-auto px-4 sm:px-0 border border-gray-200 h-auto flex flex-col items-center gap-6 mt-4">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center w-full gap-4 py-8">
          <span className="flex items-center gap-2 text-sm sm:text-base text-green-600 font-medium">
            <CheckIcon color="green" />
            Form Submitted Successfully
          </span>
          <button
            onClick={() => router.push("/")}
            type="button"
            className="text-sm sm:text-base text-white font-medium bg-green-600 border border-green-600 rounded-md px-4 py-2"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-[1px] border-gray-200 p-4 sm:p-[24px] w-full gap-4 sm:gap-0">
            {isEditing ? (
              <input
                className="w-full sm:w-auto text-[0.875rem] sm:text-[1rem] text-gray-900 leading-[22px] font-semibold bg-transparent outline-none"
                defaultValue={formTitle}
                onBlur={() => setIsEditing(false)}
                onChange={(e) => setFormTitle(e.target.value)}
                autoFocus
              />
            ) : (
              <span
                className="w-full sm:w-auto text-[0.875rem] sm:text-[1rem] text-gray-400 leading-[22px] font-semibold cursor-text"
                onClick={() => setIsEditing(true)}
              >
                {formTitle}
              </span>
            )}
            {!isPreview && (
              <button
                className={`w-full sm:w-auto flex items-center justify-center gap-[4px] py-[6px] ps-[14px] pr-[16px] h-[32px] border-[1px] min-w-[105px] text-[14px] leading-[20px] font-semibold ${
                  questions?.length > 0 ? "text-black" : "text-gray-400"
                } rounded-[12px] border-gray-200`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePreviewForm();
                }}
              >
                Preview <ArrowIcon />
              </button>
            )}
          </div>

          {!isSubmitForm && (
            <button
              type="button"
              className="text-[14px] leading-[20px] text-black font-semibold border-[1px] border-gray-200 rounded-[12px] px-[14px] py-[6px]"
            >
              <InputTypesDropdown
                text="+ Add Question"
                onSelect={handleAddQuestion}
              />
            </button>
          )}

          {/* testing purpose */}
          <QuestionList isPreview={isPreview || isSubmitForm} />

          <div
            className={`min-h-[64px] border-[1px] flex flex-col sm:flex-row items-center justify-between p-4 sm:p-[24px] border-gray-200 w-full text-[#f6f8fa] gap-4 sm:gap-0 ${
              questions?.length > 0 ? "" : "blur-[4]"
            }`}
          >
            {!isPreview || !isSubmitForm ? (
              <button
                onClick={handleSaveDraft}
                type="button"
                className={`w-full sm:w-auto h-[32px] ${
                  questions?.length > 0 ? "" : "opacity-50"
                } min-w-[141px] border-[1px] py-[6px] ps-[14px] pr-[16px] text-gray-400 text-[14px] leading-[20px] rounded-[12px] font-semibold flex items-center justify-center sm:justify-start gap-[4px] border-gray-200`}
              >
                <SaveAsDraft /> Save as Draft
              </button>
            ) : (
              <div></div>
            )}

            {isPreview ? (
              <button
                type="button"
                onClick={() => router.back()}
                className={`w-full sm:w-auto h-[32px] border-[1px] py-[6px] ps-[14px] pr-[16px] text-white text-[14px] leading-[20px] rounded-[12px] font-semibold flex items-center justify-center gap-[4px] bg-green-500 border-green-400`}
              >
                Exit Preview
              </button>
            ) : (
              <>
                {isSubmitForm ? (
                  <button
                    type="button"
                    onClick={handleSubmitForm}
                    className={`w-full sm:w-auto h-[32px] border-[1px] py-[6px] ps-[14px] pr-[16px] text-white text-[14px] leading-[20px] rounded-[12px] font-semibold flex items-center justify-center gap-[4px] bg-green-500 border-green-400 ${
                      questions?.length > 0 ? "" : "opacity-50"
                    }`}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePublishForm}
                    className={`w-full sm:w-auto h-[32px] min-w-[141px] border-[1px] py-[6px] ps-[14px] pr-[16px] text-white text-[14px] leading-[20px] rounded-[12px] font-semibold flex items-center justify-center sm:justify-start gap-[4px] ${
                      questions?.length > 0 ? "bg-green-500" : "bg-green-400"
                    } border-green-400 ${
                      questions?.length > 0 ? "" : "opacity-50"
                    }`}
                  >
                    <CheckIcon /> Publish form
                  </button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </form>
  );
};

export default Form;
