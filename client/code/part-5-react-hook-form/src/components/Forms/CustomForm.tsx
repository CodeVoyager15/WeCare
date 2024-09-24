import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";


type TFormConfig={
  resolver?:any;
  defaultValues?:Record<string, any>;
}

type IFormProps = {
  children: React.ReactNode;
  onSubmit:SubmitHandler<FieldValues>;
  
}& TFormConfig;

const CustomForm = ({ children,onSubmit,defaultValues,resolver }: IFormProps) => {

  const formConfig:TFormConfig ={};
  if(resolver){
    formConfig['resolver']=resolver;
  }
  if(defaultValues){
    formConfig['defaultValues']=defaultValues;
  }

  const methods = useForm(formConfig);
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
