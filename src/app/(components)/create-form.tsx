"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuestionStore } from "@/store/question-store";
import InputTypesDropdown from "./input-types-dropdown";
import QuestionList from "./question-list";
import SaveAsDraft from "@/assets/save-as-darft-icon";
import ArrowIcon from "@/assets/arrow-icon";
import CheckIcon from "@/assets/check-icon";

import { QuestionType } from "./question-block";
type Props = { isPreview?: boolean; isSubmitForm?: boolean };

const CreateForm = ({ isPreview = false, isSubmitForm = false }: Props) => {
  const { questions, addQuestion, formTitle, setFormTitle } =
    useQuestionStore();
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
    if (window !== undefined && window) {
      window.localStorage.setItem("formData", JSON.stringify(formData));
      router.push("/submit-form");
    }
  };
  return (
    <form className="w-[640px] border 1px solid grey h-auto flex flex-col items-center gap-6 mt-4">
      {isSubmitted ? (
        <span>
          <CheckIcon /> Form Submitted Successfully
        </span>
      ) : (
        <>
          <div className="flex items-center justify-between border-[1px] border-gray-200 p-[24px] w-full ">
            {isEditing ? (
              <input
                className="text-[1rem] text-gray-900 leading-[22px] font-semibold bg-transparent outline-none"
                defaultValue={formTitle}
                onBlur={() => setIsEditing(false)}
                onChange={(e) => setFormTitle(e.target.value)}
                autoFocus
              />
            ) : (
              <span
                className="text-[1rem] text-gray-400 leading-[22px] font-semibold cursor-text"
                onClick={() => setIsEditing(true)}
              >
                {formTitle}
              </span>
            )}
            {!isPreview && (
              <button
                className={`flex items-center gap-[4px] py-[6px] ps-[14px] pr-[16px] h-[32px] border-[1px] min-w-[105px] text-[14px] leading-[20px] font-semibold ${
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

          {/* <button
        onClick={handleAddQuestion}
        className="min-w-[143px] h-[32px] rounded-[12px] font-semibold border-[1px] py-[6px] ps-[14px] pr-[16px] flex items-center gap-[4px] text-black border-gray-200 text-[14px]"
      >
        + Add Question
      </button> */}
          {!isSubmitForm && (
            <InputTypesDropdown
              text="+ Add Question"
              onSelect={handleAddQuestion}
            />
          )}

          {/* testing purpose */}
          <QuestionList isPreview={isPreview || isSubmitForm} />

          <div
            className={`h-[64px] border-[1px] flex items-center justify-between p-[24px] border-gray-200 w-full text-[#f6f8fa] ${
              questions?.length > 0 ? "" : "blur-[4]"
            }`}
          >
            {!isPreview || !isSubmitForm ? (
              <button
                onClick={handleSaveDraft}
                type="button"
                className={`h-[32px] ${
                  questions?.length > 0 ? "" : "opacity-50"
                }  min-w-[141px] border-[1px] py-[6px] ps-[14px] pr-[16px] text-gray-400 text-[14px] leading-[20px] rounded-[12px] font-semibold flex items-center gap-[4px] border-gray-200`}
              >
                <SaveAsDraft /> Save as Draft
              </button>
            ) : (
              <div></div>
            )}

            {isPreview || isSubmitForm ? (
              <button
                type="button"
                onClick={() => setIsSubmitted(true)}
                className={`h-[32px] w-auto border-[1px] py-[6px] ps-[14px] pr-[16px] text-white text-[14px] leading-[20px] rounded-[12px] font-semibold flex items-center gap-[4px] bg-green-500 border-green-400 ${
                  questions?.length > 0 ? "" : "opacity-50"
                }`}
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublishForm}
                className={`h-[32px] min-w-[141px] border-[1px] py-[6px] ps-[14px] pr-[16px] text-white text-[14px] leading-[20px] rounded-[12px] font-semibold flex items-center gap-[4px] ${
                  questions?.length > 0 ? "bg-green-500" : "bg-green-400"
                } border-green-400 ${
                  questions?.length > 0 ? "" : "opacity-50"
                }`}
              >
                <CheckIcon /> Publish form
              </button>
            )}
          </div>
        </>
      )}
    </form>
  );
};

export default CreateForm;
