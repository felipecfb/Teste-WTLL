import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "./styles/globalStyles.css";

interface FormProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const schema = yup
  .object({
    name: yup
      .string()
      .required("O nome é obrigatório")
      .max(30, "O nome deve ter no máximo 30 caracteres"),
    email: yup
      .string()
      .email("Digite um endereço de email válido")
      .required("O email é obrigatório")
      .max(20, "O email deve ter no máximo 20 caracteres"),
    subject: yup
      .string()
      .required("O assunto é obrigatório")
      .max(50, "O assunto deve ter no máximo 50 caracteres"),
    message: yup
      .string()
      .required("A mensagem é obrigatória")
      .max(200, "A mensagem deve ter no máximo 200 caracteres"),
  })
  .required();

function App() {
  const { register, handleSubmit, formState } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;
  console.log(errors);

  const onSubmit = (data: any) => {
    setForm(data);
  };

  const [form, setForm] = useState<FormProps>({} as FormProps);

  return (
    <>
      <header>
        <h1>Fale Conosco</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Nome"
            {...register("name", {
              required: "O nome é obrigatório",
              maxLength: 30,
            })}
          />
          <span>{errors.name?.message}</span>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "O email é obrigatório",
              maxLength: 20,
            })}
          />
          <span>{errors.email?.message}</span>
          <input
            type="text"
            placeholder="Assunto"
            {...register("subject", {
              required: "O assunto é obrigatório",
              maxLength: 50,
            })}
          />
          <span>{errors.subject?.message}</span>
          <textarea
            placeholder="Mensagem"
            {...register("message", {
              required: "a mensagem é obrigatória",
              maxLength: 200,
            })}
          />
          <span>{errors.message?.message}</span>
          <input type="submit" value="Enviar" />
        </form>

        {JSON.stringify(form) !== "{}" && <div>{JSON.stringify(form)}</div>}
      </main>
    </>
  );
}

export default App;
