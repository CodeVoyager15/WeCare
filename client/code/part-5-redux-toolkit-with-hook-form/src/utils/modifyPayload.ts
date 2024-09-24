export const modifyPayload = (values: any) => {

  console.log(values)
  const obj = { ...values };
  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append("data", data);


  return formData;
};
