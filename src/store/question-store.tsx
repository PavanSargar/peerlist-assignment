"use client";
import { Question } from "@/app/(components)/question-list";
import { create } from "zustand";

interface QuestionStore {
  formTitle: string;
  setFormTitle: (title: string) => void;
  questions: Question[];
  addQuestion: (question: Question) => void;
  removeQuestion: (id: string) => void;
  updateQuestion: (id: string, question: Question) => void;
  updateQuestionsOrder: (updatedQuestionsWithOrder: Question[]) => void;
  updateAnswer: (id: string, answer: string) => void;
  updateRadioOptions: (
    index: number,
    radioIndex: number,
    value: string
  ) => void;
}

const getLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

export const useQuestionStore = create<QuestionStore>((set) => ({
  formTitle: getLocalStorage("formTitle", "Untitled form"),
  questions: getLocalStorage("questions", []),
  setFormTitle: (title: string) =>
    set((state) => {
      localStorage.setItem("formTitle", JSON.stringify(title));
      return { formTitle: title };
    }),
  addQuestion: (question: Question) =>
    set((state) => ({ questions: [...state.questions, question] })),
  removeQuestion: (id: string) =>
    set((state) => ({ questions: state.questions.filter((q) => q.id !== id) })),
  updateQuestion: (id: string, question: Question) =>
    set((state) => ({
      questions: state.questions.map((q) => (q.id === id ? question : q)),
    })),
  updateAnswer: (id: string, answer: string | number) =>
    set((state) => ({
      questions: state.questions.map((q) => 
        q.id === id ? { ...q, answer } : q
      ),
    })),
  updateRadioOptions: (index: number, radioNumber, value: string) =>
    set((state) => ({
      questions: state.questions.map((q, i) =>
        i === index
          ? {
              ...q,
              radioOptions: q.radioOptions?.map((item, optionIndex) => {
                if (optionIndex === radioNumber) {
                  return {
                    label: value,
                    value,
                  };
                }

                return item;
              }),
            }
          : q
      ),
    })),
  updateQuestionsOrder: (updatedQuestionsWithOrder: Question[]) =>
    set((state) => ({
      questions: updatedQuestionsWithOrder?.map((item, i) => ({
        ...item,
        order: i,
      })),
    })),
}));
