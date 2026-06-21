// Página inicial — conteúdo institucional (texto estático, vindo do site original).
export default function Home() {
  return (
    <div>
      <section className="paragrafo-content">
        <h2>Quem somos</h2>
        <p>
          O Vôlei CBBSO é o Time B de vôlei do CAASO, da USP São Carlos. A equipe
          surgiu da vontade coletiva de ter um espaço e horário voltados à prática
          do esporte, visando a evolução individual e do grupo. Todos os anos,
          fazemos uma seletiva para definir o time da temporada, que participará
          dos treinos semanais e disputará campeonatos. Qualquer aluno da USP, da
          graduação ou pós-graduação, pode fazer parte do time e contribuir para o
          nosso crescimento.
        </p>
      </section>

      <section className="paragrafo-content">
        <h2>Times</h2>
        <p>
          Com o crescente interesse pela modalidade do vôlei e o grande número de
          pessoas buscando uma vaga no grupo, precisamos dividir o time em duas
          equipes, B e C. O time B tem um elenco fechado, definido pela seletiva no
          início do ano, enquanto os treinos do time C são abertos, ou seja,
          qualquer pessoa pode participar. No entanto, para garantir a qualidade dos
          treinos, o número de vagas é limitado. Para se candidatar, preencha o
          formulário na seção Inscrição de Atletas.
        </p>
      </section>

      <section className="paragrafo-content">
        <h2>Horários de treino</h2>
        <p>
          <b>Time B:</b> Terças e quintas, de 20h às 22h.
        </p>
        <p>
          <b>Time C:</b> Segundas e quartas, de 19h às 21h.
        </p>
        <p>
          <b>Local:</b> Quadra 4 do CEFER.
        </p>
      </section>
    </div>
  );
}
