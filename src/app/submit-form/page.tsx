import React from "react";
import CreateForm from "../(components)/form";

type Props = {};

const isSubmitForm = (props: Props) => {
  return (
    <div className="font-inter flex items-center justify-center">
      <CreateForm isSubmitForm />
    </div>
  );
};

export default isSubmitForm;
