import styled from "./styles/home.module.css";

export default function Home() {
  return (
    <div className={styled.container}>
      <h1 className={styled.title}>Cadastrar um estudante</h1>
      <input
        className={styled.input}
        type="text"
        placeholder="Digite o nome aqui"
      />
      <div className={styled.content}>
        <p>Maick Souza</p>
        <p>Enilda Maria</p>
      </div>
    </div>
  );
}
