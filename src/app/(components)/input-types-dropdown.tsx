import React from "react";
import { QuestionType } from "./question-block";
import Chevdown from "@/assets/chevdown";
import HashtagIcon from "@/assets/hashtag-icon";
import LinkIcon from "@/assets/link-icon";
import LongTextIcon from "@/assets/long-text-icon";
import RadioIcon from "@/assets/radio-icon";
import ShortTextIcon from "@/assets/short-text-icon";

type InputType = {
  id: QuestionType;
  label: string;
  icon: React.ElementType;
};

const inputTypes: InputType[] = [
  { id: "SHORT_ANSWER", label: "Short Answer", icon: ShortTextIcon },
  { id: "LONG_ANSWER", label: "Long Answer", icon: LongTextIcon },
  { id: "NUMBER", label: "Number", icon: HashtagIcon },
  //   { id: 'date', label: 'Date Input', icon: c },
  { id: "SINGLE_SELECT", label: "Single Select", icon: RadioIcon },
  { id: "URL", label: "URL", icon: LinkIcon },
];

type Props = {
  onSelect: (type: QuestionType) => void;
  text?: string;
};

const InputTypesDropdown = ({ onSelect, text }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (typeId: QuestionType) => {
    onSelect?.(typeId);

    setIsOpen(false);
  };

  return (
    <div className="group relative">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {text || (
          <span role="img">
            <Chevdown />
          </span>
        )}
      </div>

      <div
        className={`absolute z-50 top-full left-0 mt-1 min-w-[300px] rounded-[16px] bg-white shadow-lg border-[1px] p-[4px] border-gray-200 
        transition-[opacity,visibility] flex flex-col gap-1
        ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="flex items-center gap-2 px-4 py- cursor-pointer rounded-[8px] bg-gray-100">
          <span className="text-[14px] leading-[20px] text-gray-400 font-semibold  px-2 py-1">
            Input Types
          </span>
        </div>
        {inputTypes.map((type) => (
          <div
            key={type.id}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-[8px]"
            onClick={() => handleSelect(type.id)}
          >
            <type.icon className="h-5 w-5 text-gray-500" />
            <span className="text-[14px] leading-[20px] text-gray-400 font-semibold">
              {type.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputTypesDropdown;
