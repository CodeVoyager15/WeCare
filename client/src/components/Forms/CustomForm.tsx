import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type IFormProps = {
  children: React.ReactNode;
  onSubmit:SubmitHandler<FieldValues>
};

const CustomForm = ({ children,onSubmit }: IFormProps) => {
  const methods = useForm();
  const { handleSubmit } = methods;

  //handler function
  const submit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    onSubmit(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default CustomForm;
