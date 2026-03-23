import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Book, Sun, Moon, Heart, X, Cross } from "lucide-react";

const oracoesDatabase: Record<string, string> = {
  "Oferta do Dia": "Senhor meu Deus, a Vós elevo o meu pensamento no começo deste dia. Eu Vos adoro, eu Vos amo de todo o coração. Agradeço a Vossa imensa bondade por me terdes criado, redimido, feito cristão e me terdes conservado a vida nesta noite.\n\nOfereço-Vos todas as minhas ações, o meu trabalho e o meu sofrimento, para a Vossa glória e para o bem de todas as almas. Fazei que não Vos ofenda e dai-me a graça de cumprir a Vossa vontade.",
  "Oração da Manhã a Maria": "Ó minha Senhora e minha Mãe, eu me ofereço todo a Vós e, em prova de minha devoção para convosco, Vos consagro neste dia os meus olhos, os meus ouvidos, a minha boca, o meu coração e inteiramente todo o meu ser.\nE porque assim sou Vosso, ó incomparável Mãe, guardai-me e defendei-me como posse e propriedade Vossa. Amém.",
  "Oração ao Anjo da Guarda": "Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a piedade divina, sempre me rege, me guarda, me governa e me ilumina. Amém.",
  "Salmo 23 - O Senhor é meu Pastor": "O Senhor é o meu pastor: nada me faltará. Ele me faz repousar em pastos verdejantes; leva-me para junto das águas de descanso; refrigera-me a alma. Guia-me pelas veredas da justiça por amor do seu nome.\n\nAinda que eu ande pelo vale da sombra da morte, não temerei mal nenhum, porque tu estás comigo: o teu bordão e o teu cajado me consolam.",
  "Exame de Consciência": "Meu Senhor e meu Deus, dai-me a luz para conhecer os meus pecados, e a graça para me arrepender deles e me emendar. (Faça uma breve pausa e reflita sobre o seu dia). Meu Deus, porque sois infinitamente bom e digno de ser amado, pesa-me de todo o coração de Vos ter ofendido. Proponho firmemente, com a Vossa graça, não tornar a pecar e fugir das ocasiões de pecar.",
  "Oração da Noite": "Meu Deus, eu Vos adoro e Vos amo com todo o meu coração. Agradeço-Vos todos os benefícios que de Vós recebi neste dia. Peço-Vos perdão por todos os meus pecados; dai-me a Vossa graça para nunca mais os cometer.\nProtegei a minha família, os meus amigos e todos aqueles por quem devo rezar. E a Vós, Virgem Maria, peço a Vossa proteção materna.",
  "Proteção de São Miguel Arcanjo": "São Miguel Arcanjo, defendei-nos no combate. Sede o nosso refúgio contra as maldades e ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos. E vós, príncipe da milícia celeste, pela virtude divina, precipitai no inferno a satanás e a todos os espíritos malignos que andam pelo mundo para perder as almas. Amém.",
  "Salmo 91 - Proteção Divina": "Aquele que habita no esconderijo do Altíssimo e descansa à sombra do Onipotente diz ao Senhor: Meu refúgio e meu baluarte, Deus meu, em quem confio.\nPois ele te livrará do laço do passarinheiro e da peste perniciosa. Cobrir-te-á com as suas penas, e, sob suas asas, estarás seguro.",
  "Pai Nosso": "Pai nosso que estais nos céus, santificado seja o vosso nome, venha a nós o vosso reino, seja feita a vossa vontade, assim na terra como no céu.\n\nO pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
  "Ave Maria": "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus.\nSanta Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.",
  "Glória ao Pai": "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.",
  "Credo Apostólico": "Creio em Deus Pai todo-poderoso, criador do céu e da terra. E em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado.\nDesceu à mansão dos mortos, ressuscitou ao terceiro dia, subiu aos céus, está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos.\nCreio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",
  "Salve Rainha": "Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve!\nA vós bradamos os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei. E depois deste desterro mostrai-nos Jesus, bendito fruto do vosso ventre.\nÓ clemente, ó piedosa, ó doce e sempre Virgem Maria.\nRogai por nós, Santa Mãe de Deus. Para que sejamos dignos das promessas de Cristo. Amém.",
  "Ato de Contrição": "Meu Deus, eu me arrependo de todo o coração de Vos ter ofendido, porque sois tão bom e amável. Prometo firmemente, com a ajuda da Vossa graça, não mais pecar e evitar as ocasiões de pecado. Amém.",
  "Oração de São Francisco": "Senhor, fazei-me instrumento de vossa paz.\nOnde houver ódio, que eu leve o amor;\nOnde houver ofensa, que eu leve o perdão;\nOnde houver discórdia, que eu leve a união;\nOnde houver dúvida, que eu leve a fé;\nOnde houver erro, que eu leve a verdade;\nOnde houver desespero, que eu leve a esperança;\nOnde houver tristeza, que eu leve a alegria;\nOnde houver trevas, que eu leve a luz.\n\nÓ Mestre, fazei que eu procure mais consolar que ser consolado;\ncompreender que ser compreendido;\namar que ser amado.\nPois é dando que se recebe;\né perdoando que se é perdoado;\ne é morrendo que se vive para a vida eterna.",
  "Magnificat - Cântico de Maria": "A minha alma engrandece ao Senhor, e o meu espírito se alegra em Deus, meu Salvador, porque olhou para a humildade de sua serva. Doravante todas as gerações me chamarão bem-aventurada, porque o Todo-Poderoso fez grandes coisas em meu favor. O seu nome é santo, e a sua misericórdia se estende de geração em geração sobre os que o temem.\nManifestou o poder de seu braço: desconcertou os corações dos soberbos. Derrubou do trono os poderosos e exaltou os humildes. Saciou de bens os indigentes, e despediu de mãos vazias os ricos. Acolheu a Israel, seu servo, lembrado da sua misericórdia, conforme prometera a nossos pais, em favor de Abraão e de sua descendência, para sempre.",
  "Oração a São José": "A vós, São José, recorremos em nossa tribulação e, depois de ter implorado o auxílio de vossa santíssima esposa, cheios de confiança solicitamos também o vosso patrocínio. Por esse laço sagrado de caridade que vos uniu à Virgem Imaculada Mãe de Deus, e pelo amor paternal que tivestes ao Menino Jesus, ardentemente vos suplicamos que lanceis um olhar benigno à herança que Jesus Cristo conquistou com seu sangue, e nos assistais nas nossas necessidades com vosso auxílio e poder.",
  "Oração ao Sagrado Coração": "Coração de Jesus, que por mim sofreste tanto, tende piedade de nós e do mundo inteiro! Sagrado Coração de Jesus, eu confio em Vós!",
  "Terço da Misericórdia": "Eterno Pai, eu Vos ofereço o Corpo e Sangue, Alma e Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro.\nPela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.\nSanto Deus, Santo Forte, Santo Imortal, tende piedade de nós e do mundo inteiro."
};

export function OracoesPage() {
  const navigate = useNavigate();
  const [oracaoAberta, setOracaoAberta] = useState<{ titulo: string, texto: string } | null>(null);

  const categorias = [
    {
      titulo: "Orações da Manhã",
      icon: Sun,
      oracoes: [
        "Oferta do Dia",
        "Oração da Manhã a Maria",
        "Oração ao Anjo da Guarda",
        "Salmo 23 - O Senhor é meu Pastor",
      ],
    },
    {
      titulo: "Orações da Noite",
      icon: Moon,
      oracoes: [
        "Exame de Consciência",
        "Oração da Noite",
        "Proteção de São Miguel Arcanjo",
        "Salmo 91 - Proteção Divina",
      ],
    },
    {
      titulo: "Orações Tradicionais",
      icon: Book,
      oracoes: [
        "Pai Nosso",
        "Ave Maria",
        "Glória ao Pai",
        "Credo Apostólico",
        "Salve Rainha",
        "Ato de Contrição",
      ],
    },
    {
      titulo: "Orações Especiais",
      icon: Heart,
      oracoes: [
        "Oração de São Francisco",
        "Magnificat - Cântico de Maria",
        "Oração a São José",
        "Oração ao Sagrado Coração",
        "Terço da Misericórdia",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans">
      <header className="bg-church-bg/95 border-b border-church-border backdrop-blur-md sticky top-0 z-50 py-6 transition-all">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-4">
            <button
              onClick={() => navigate("/igreja")}
              className="flex items-center gap-2 text-church-accent hover:text-church-accent-hover transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Book className="w-8 h-8 text-church-accent-hover" />
            <h1 className="text-4xl text-center font-serif text-church-accent">
              Orações
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-church-bg-secondary rounded-2xl p-8 mb-12 border border-church-border-hover shadow-none">
          
          <div className="overflow-hidden h-64 mb-8 rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1616428882609-7443facdbe81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMG9wZW4lMjBib29rJTIwY2h1cmNofGVufDF8fHx8MTc3MzQwOTg2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Bíblia Aberta"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="mb-8">
            <p className="text-church-text/80 text-lg leading-relaxed text-center font-serif italic">
              "Orai sem cessar" - 1 Tessalonicenses 5:17
            </p>
            <p className="text-church-text/60 mt-4 leading-relaxed text-center">
              A oração é a elevação da alma a Deus. É através dela que nos
              comunicamos com nosso Criador, agradecemos Suas bênçãos, pedimos Sua
              ajuda e nos unimos a Ele em amor.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categorias.map((categoria, index) => {
            const Icon = categoria.icon;
            return (
              <div
                key={index}
                className="bg-church-bg-secondary rounded-2xl p-8 border border-church-border-hover shadow-none"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-church-bg border border-church-border-hover">
                    <Icon className="w-7 h-7 text-church-accent-hover" />
                  </div>
                  <h2 className="text-2xl font-serif text-church-accent">
                    {categoria.titulo}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {categoria.oracoes.map((oracao, idx) => (
                    <li
                      key={idx}
                      onClick={() => setOracaoAberta({ titulo: oracao, texto: oracoesDatabase[oracao] || "Texto desta oração ainda não foi adicionado ao acervo." })}
                      className="bg-church-bg hover:bg-church-bg-darker p-4 rounded-lg cursor-pointer transition-all border border-church-border-hover hover:border-[#D4AF37]/50 flex justify-between items-center group"
                    >
                      <span className="text-church-text font-medium group-hover:text-church-accent-hover transition-colors">
                        {oracao}
                      </span>
                      <Book className="w-4 h-4 text-church-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Oração */}
      {oracaoAberta && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-church-bg-secondary w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col border border-church-border animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-church-border-hover shrink-0">
              <h3 className="text-2xl font-serif text-church-accent flex items-center gap-3">
                <Book className="w-5 h-5" />
                {oracaoAberta.titulo}
              </h3>
              <button 
                onClick={() => setOracaoAberta(null)}
                className="p-2 rounded-full hover:bg-church-bg transition-colors text-church-text/60 hover:text-church-accent-hover"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Corpo do Modal (Rolável) */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                {oracaoAberta.texto.split('\n').map((paragrafo, index) => (
                  paragrafo.trim() !== '' ? (
                    <p key={index} className="text-lg leading-relaxed text-church-text/90 font-serif">
                      {paragrafo}
                    </p>
                  ) : null
                ))}
              </div>
              <div className="mt-12 text-center text-church-text/40">
                <Cross className="w-4 h-4 mx-auto opacity-50" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
