import React from "react";
import BackButton from "../common/BackButton";
import Header from "../common/Header";

interface AddTaskHeaderProps {
  logo: string;
  title?: string;
}

const AddTaskHeader: React.FC<AddTaskHeaderProps> = ({
  logo,
  title = "Create New Task",
}) => {
  return (
    <div>
      <Header logo={logo} title={title} />
      <div className="">
        <BackButton />
      </div>
    </div>
  );
};

export default AddTaskHeader;
