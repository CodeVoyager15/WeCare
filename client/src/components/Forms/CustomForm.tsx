import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";


type IFormProps = {
  children: React.ReactNode;
  onSubmit:SubmitHandler<FieldValues>;
  defaultValues?:Record<string, any>;
};

const CustomForm = ({ children,onSubmit,defaultValues }: IFormProps) => {
  const methods = useForm({defaultValues});
  const { handleSubmit,reset } = methods;



  //handler function
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data)
    reset()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default CustomForm;
