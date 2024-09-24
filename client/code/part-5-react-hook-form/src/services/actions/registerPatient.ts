"use server";

export const registerPatient = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-patient`,
    {
      method: "POST",
      body: formData,   // register is formdata in backend but log in is json data in backend
      cache: "no-store",
    }
  );

  const patientInfo = await res.json();
  return patientInfo;
};
