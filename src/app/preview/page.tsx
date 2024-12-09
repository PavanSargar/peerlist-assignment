import React from "react";
import CreateForm from "../(components)/form";

type Props = {};

const Preview = (props: Props) => {
  return (
    <div className="font-inter flex items-center justify-center">
      <CreateForm isPreview />
    </div>
  );
};

export default Preview;
