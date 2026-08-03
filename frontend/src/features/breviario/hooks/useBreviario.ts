import { useState, useEffect } from 'react';
import { api } from '@/shared/services/api';

export interface BreviarioHoraSection {
  introducao?: string;
  invitatorio?: string;
  hino?: string;
  salmodia?: string[];
  versiculo?: string;
  leitura1?: string;
  leitura2?: string;
  leitura?: string;
  responsorioBreve?: string;
  benedictus?: string;
  magnificat?: string;
  nunc_dimittis?: string;
  preces?: string[];
  paiNosso?: string;
  oracao?: string;
  bencao?: string;
  antifonaMariana?: string;
}

export interface BreviarioData {
  data: string;
  tempo: string;
  semana: string;
  oficio: BreviarioHoraSection;
  laudes: BreviarioHoraSection;
  vesperas: BreviarioHoraSection;
  completas: BreviarioHoraSection;
  hora_media?: BreviarioHoraSection;
}

const FALLBACK_BREVIARIO: BreviarioData = {
  data: new Date().toLocaleDateString('pt-BR'),
  tempo: 'Oração diária',
  semana: 'Ritmo de recolhimento',
  oficio: {
    introducao:
      'Ofício das Leituras - Estrutura Tradicional Simplificada\n\nV. Vinde, ó Deus, em meu auxílio.\nR. Senhor, apressai-vos em me socorrer.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém. Aleluia.',
    invitatorio:
      'Quando o Ofício das Leituras for a primeira oração do dia, pode-se iniciar com o Invitatório:\n\nV. Abri, Senhor, os meus lábios.\nR. E minha boca anunciará vosso louvor.',
    hino:
      'Senhor, que sois a luz eterna,\niluminai nossa oração.\nAbri nossos ouvidos à vossa Palavra\ne firmai nosso coração na esperança.\n\nNa vigília da fé vos procuramos,\ncom a Igreja inteira em oração;\nconduzi-nos pelo mistério de Cristo\naté a claridade sem fim.',
    salmodia: [
      'Antífona 1\n\nVinde, adoremos o Senhor, fonte de vida e salvação.\n\nSalmo 94 (95)\n\nVinde, exultemos de alegria no Senhor,\naclamemos o Rochedo que nos salva.\n\nAo seu encontro caminhemos com louvores,\ne com cantos de alegria o celebremos.\n\nPorque o Senhor é o Deus imenso,\no grande Rei acima de todos os deuses.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
      'Antífona 2\n\nNo silêncio da noite, minha alma espera no Senhor.\n\nSalmo 62 (63)\n\nÓ Deus, vós sois o meu Deus, por vós suspiro;\na minha alma tem sede de vós.\n\nA minha carne vos deseja com ardor,\ncomo terra deserta, seca e sem água.\n\nPara vos contemplar no vosso santuário,\ne ver o vosso poder e a vossa glória.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
      'Antífona 3\n\nA Palavra do Senhor ilumina os meus passos.\n\nSalmo 118 (119)\n\nFeliz o homem sem pecado em seu caminho,\nque na lei do Senhor Deus vai progredindo.\n\nFeliz o homem que observa seus preceitos,\ne de todo o coração procura a Deus.\n\nVossa palavra é uma luz para os meus passos,\ne uma lâmpada luzente em meu caminho.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
    ],
    versiculo:
      'V. Falai, Senhor, que o vosso servo escuta.\nR. Vossas palavras são espírito e vida.',
    leitura1:
      'Primeira Leitura\n\nDa Sagrada Escritura\n\nEscutemos a Palavra de Deus com atenção, para que ela ilumine este dia e forme em nós os sentimentos de Cristo.',
    leitura2:
      'Segunda Leitura\n\nDos Padres da Igreja ou autores espirituais\n\nA Igreja medita a Palavra recebida e nos conduz a aprofundar o mistério de Cristo, para que a fé se torne oração e vida.',
    responsorioBreve:
      'Responsório\n\nV. Guardai em meu coração a vossa Palavra.\nR. Para que eu viva segundo a vossa vontade.\n\nV. Conduzi-me na verdade do vosso amor.\nR. Para que eu viva segundo a vossa vontade.',
    oracao:
      'Senhor Deus, que nos falais pela Sagrada Escritura e pela voz da Igreja, abri nosso coração à vossa Palavra e fazei-nos viver hoje segundo o Evangelho.\n\nPor Cristo, nosso Senhor.\n\nAmém.',
    bencao: 'Bendigamos ao Senhor.\nR. Graças a Deus.',
  },
  laudes: {
    introducao:
      'Oração da Manhã (Laudes) - Estrutura Tradicional Simplificada\n\nV. Vinde, ó Deus, em meu auxílio.\nR. Senhor, apressai-vos em me socorrer.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém. Aleluia.',
    hino:
      'O dia claro já nasceu.\nA Deus oremos com fervor.\nQue nos defenda do pecado\ne nos afaste de todo o mal.\n\nGuarde a nossa língua e a nossa mente,\npara que hoje vivamos na paz.',
    salmodia: [
      'Antífona 1\n\nÓ Deus, vós sois o meu Deus; desde a aurora vos busco.\n\nSalmo 62 (63)\n\nÓ Deus, vós sois o meu Deus, por vós suspiro.\nA minha alma tem sede de vós.\n\nA minha carne vos deseja com ardor,\ncomo terra deserta, seca e sem água.\n\nPara vos contemplar no vosso santuário,\npara ver o vosso poder e a vossa glória.\n\nA vossa graça vale mais que a vida;\npor isso os meus lábios vos louvarão.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
      'Antífona 2\n\nBendizei o Senhor, todas as suas obras.\n\nCântico do Antigo Testamento\n\nObras do Senhor, bendizei o Senhor,\nlouvai-o e exaltai-o para sempre.\n\nCéus do Senhor, bendizei o Senhor;\nanjos do Senhor, bendizei o Senhor.\n\nSol e lua, bendizei o Senhor;\nastros e estrelas, bendizei o Senhor.\n\nBendizemos o Pai, o Filho e o Espírito Santo;\nlouvemo-lo e exaltemo-lo para sempre.',
      'Antífona 3\n\nLouvai o Senhor, porque eterna é a sua misericórdia.\n\nSalmo de Louvor\n\nCantai ao Senhor Deus um canto novo,\ne o seu louvor na assembleia dos fiéis.\n\nAlegre-se Israel em quem o fez,\ne Sião se rejubile no seu Rei.\n\nLouvem seu nome com danças,\ncantem-lhe salmos com tambor e harpa.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
    ],
    leitura:
      'Leitura Breve\n\nA luz de Cristo ilumine nossos pensamentos, palavras e escolhas neste dia.',
    responsorioBreve:
      'V. Cristo, Filho do Deus vivo, tende piedade de nós.\nR. Cristo, Filho do Deus vivo, tende piedade de nós.',
    benedictus:
      'Cântico Evangélico (Benedictus)\n\nAntífona\n\nO Senhor nos visitou e realizou a redenção do seu povo.\n\nCântico de Zacarias\n\nBendito seja o Senhor, Deus de Israel,\nporque visitou e redimiu o seu povo.\n\nE nos deu um Salvador poderoso\nna casa de Davi, seu servo.\n\nPara nos livrar dos nossos inimigos\ne das mãos de todos os que nos odeiam.\n\nPara manifestar a sua misericórdia\ne lembrar-se da sua santa aliança.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
    preces: [
      'Apresente a Deus as intenções deste novo dia.',
      'Pela Igreja e pelo Papa.',
      'Pelas vocações.',
      'Pela minha família.',
      'Pelos doentes e necessitados.',
      'Pelo meu trabalho e estudos.',
      'Pela paz no mundo.',
    ],
    paiNosso:
      'Pai nosso que estais nos céus,\nsantificado seja o vosso nome;\nvenha a nós o vosso Reino;\nseja feita a vossa vontade,\nassim na terra como no céu.\n\nO pão nosso de cada dia nos dai hoje;\nperdoai-nos as nossas ofensas,\nassim como nós perdoamos a quem nos tem ofendido;\ne não nos deixeis cair em tentação,\nmas livrai-nos do mal.\n\nAmém.',
    oracao:
      'Senhor, Pai Santo, Deus eterno e todo-poderoso, que nos fizestes chegar ao início deste dia, salvai-nos hoje com o vosso poder, para que não caiamos em nenhum pecado, mas caminhemos sempre na vossa justiça.\n\nPor Cristo, nosso Senhor.\n\nAmém.',
    bencao: 'O Senhor nos abençoe,\nnos livre de todo o mal\ne nos conduza à vida eterna.\n\nAmém.',
  },
  hora_media: {
    introducao:
      'Hora Média - Estrutura Tradicional Simplificada\n\nV. Vinde, ó Deus, em meu auxílio.\nR. Senhor, apressai-vos em me socorrer.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém. Aleluia.',
    hino:
      'No meio deste dia,\nSenhor, buscamo-vos em oração.\nSustentai nosso trabalho,\nnossa mente e nosso coração.\n\nQue vossa graça nos acompanhe,\nque vossa paz nos fortaleça,\ne que tudo o que fizermos\nseja unido ao vosso amor.',
    salmodia: [
      'Antífona 1\n\nGuiai meus passos, Senhor, segundo a vossa Palavra.\n\nSalmo 118 (119)\n\nComo amo, Senhor, a vossa lei!\nPermanece em minha mente o dia inteiro.\n\nVossos mandamentos me tornam sábio,\nporque estão sempre comigo.\n\nVossa palavra é uma luz para os meus passos,\ne uma lâmpada luzente em meu caminho.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
      'Antífona 2\n\nO Senhor guarda os que nele confiam.\n\nSalmo 120 (121)\n\nEu levanto os meus olhos para os montes:\nde onde pode vir o meu socorro?\n\nDo Senhor é que me vem o meu socorro,\ndo Senhor que fez o céu e fez a terra.\n\nEle não deixa tropeçarem os meus pés,\ne não dorme quem te guarda e te vigia.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
      'Antífona 3\n\nA paz esteja sobre o povo do Senhor.\n\nSalmo 122 (123)\n\nEu levanto os meus olhos para vós,\nque habitais nos altos céus.\n\nComo os olhos dos servos estão fitos\nnas mãos do seu senhor,\nassim nossos olhos estão voltados\npara o Senhor, nosso Deus.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
    ],
    leitura:
      'Leitura Breve\n\nTudo o que fizerdes, fazei-o de coração, como para o Senhor. Permanecei firmes no bem e na esperança.',
    versiculo:
      'V. O Senhor guiará os nossos passos.\nR. E nos conduzirá no caminho da paz.',
    oracao:
      'Senhor Deus, que nos chamais a servir-vos no meio do dia, sustentai-nos com a vossa graça, para que nosso trabalho e nosso descanso vos glorifiquem.\n\nPor Cristo, nosso Senhor.\n\nAmém.',
    bencao: 'Bendigamos ao Senhor.\nR. Graças a Deus.',
  },
  vesperas: {
    introducao:
      'Oração da Tarde (Vésperas) - Estrutura Tradicional Simplificada\n\nV. Vinde, ó Deus, em meu auxílio.\nR. Senhor, apressai-vos em me socorrer.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém. Aleluia.',
    hino:
      'Ao cair da tarde,\nSenhor, nós vos louvamos.\nRecebei nossa gratidão\npelo dia que termina.\n\nFazei brilhar em nós a vossa luz,\nquando a noite se aproxima,\ne conduzi nossos passos\nno caminho da paz.',
    salmodia: [
      'Antífona 1\n\nSuba a minha oração como incenso à vossa presença.\n\nSalmo 140 (141)\n\nSenhor, eu clamo por vós, socorrei-me;\nescutai a minha voz quando vos invoco.\n\nSuba a minha oração como incenso em vossa presença,\ne minhas mãos erguidas como oferta vespertina.\n\nPonde uma guarda, Senhor, em minha boca,\ne vigias às portas dos meus lábios.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
      'Antífona 2\n\nO Senhor é minha luz e salvação; de quem eu terei medo?\n\nSalmo 26 (27)\n\nO Senhor é minha luz e salvação;\nde quem eu terei medo?\n\nO Senhor é a proteção da minha vida;\nperante quem eu tremerei?\n\nAo Senhor eu peço apenas uma coisa,\ne é só isto que eu desejo:\nhabitar no santuário do Senhor\npor toda a minha vida.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
      'Antífona 3\n\nCristo é imagem do Deus invisível, primogênito de toda criatura.\n\nCântico do Novo Testamento\n\nCristo Jesus é a imagem do Deus invisível,\no primogênito de toda criatura.\n\nNele foram criadas todas as coisas,\nno céu e na terra, visíveis e invisíveis.\n\nTudo foi criado por ele e para ele,\ne nele tudo subsiste.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
    ],
    leitura:
      'Leitura Breve\n\nQue a palavra de Cristo habite em vós com abundância. Cantai a Deus, em vossos corações, salmos, hinos e cânticos espirituais, com gratidão.',
    responsorioBreve:
      'V. Suba até vós, Senhor, a minha oração.\nR. Suba até vós, Senhor, a minha oração.\n\nV. Como incenso na vossa presença.\nR. A minha oração.',
    magnificat:
      'Cântico Evangélico (Magnificat)\n\nAntífona\n\nO Senhor fez em mim maravilhas; santo é o seu nome.\n\nA minha alma engrandece o Senhor,\ne se alegrou o meu espírito em Deus, meu Salvador.\n\nPois ele viu a pequenez de sua serva;\ndesde agora as gerações hão de chamar-me de bendita.\n\nO Poderoso fez em mim maravilhas,\ne santo é o seu nome.\n\nSeu amor, de geração em geração,\nchega a todos os que o respeitam.\n\nManifestou o poder de seu braço,\ndispersou os soberbos.\n\nDerrubou os poderosos de seus tronos\ne elevou os humildes.\n\nSaciou de bens os famintos\ne despediu os ricos sem nada.\n\nAcolheu Israel, seu servidor,\nfiel ao seu amor.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
    preces: [
      'Ao cair da tarde, apresentemos ao Senhor as necessidades da Igreja e do mundo.',
      'Pela Igreja, para que anuncie a esperança de Cristo.',
      'Pelos governantes, para que sirvam com justiça e paz.',
      'Pelos que trabalharam neste dia, para que encontrem descanso e gratidão.',
      'Pelos doentes, pobres e aflitos, para que sejam consolados.',
      'Pelos falecidos, para que sejam acolhidos na luz eterna.',
    ],
    paiNosso:
      'Pai nosso que estais nos céus,\nsantificado seja o vosso nome;\nvenha a nós o vosso Reino;\nseja feita a vossa vontade,\nassim na terra como no céu.\n\nO pão nosso de cada dia nos dai hoje;\nperdoai-nos as nossas ofensas,\nassim como nós perdoamos a quem nos tem ofendido;\ne não nos deixeis cair em tentação,\nmas livrai-nos do mal.\n\nAmém.',
    oracao:
      'Nós vos damos graças, Senhor, pelo dia que termina. Guardai-nos nesta tarde, iluminai nossa noite e fazei que, depois dos trabalhos desta vida, cheguemos ao descanso eterno.\n\nPor Cristo, nosso Senhor.\n\nAmém.',
    bencao: 'O Senhor nos abençoe,\nnos livre de todo o mal\ne nos conduza à vida eterna.\n\nAmém.',
  },
  completas: {
    introducao:
      'Oração da Noite (Completas) - Estrutura Tradicional Simplificada\n\nV. Vinde, ó Deus, em meu auxílio.\nR. Senhor, apressai-vos em me socorrer.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém. Aleluia.',
    invitatorio:
      'Exame de consciência\n\nEm silêncio, entregue a Deus o dia que passou. Peça perdão pelas faltas cometidas e confie ao Senhor o seu descanso.',
    hino:
      'Antes que o dia termine,\nSenhor, nós vos pedimos:\nficai conosco esta noite\ne guardai-nos em vossa paz.\n\nAfastai os maus pensamentos,\nprotegei nosso coração,\ne fazei que despertemos alegres\npara louvar o vosso nome.',
    salmodia: [
      'Antífona\n\nÀ sombra de vossas asas, Senhor, eu descanso em paz.\n\nSalmo 90 (91)\n\nQuem habita ao abrigo do Altíssimo\ne vive à sombra do Senhor onipotente,\ndiz ao Senhor: sois meu refúgio e proteção,\nsois o meu Deus, no qual confio inteiramente.\n\nNenhum mal há de chegar perto de ti,\nnem a desgraça baterá à tua porta;\npois o Senhor deu uma ordem a seus anjos\npara em todos os caminhos te guardarem.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
    ],
    leitura:
      'Leitura Breve\n\nVigiai e permanecei firmes na fé. Entregai ao Senhor vossas preocupações, porque ele cuida de vós.',
    responsorioBreve:
      'V. Em vossas mãos, Senhor, entrego o meu espírito.\nR. Em vossas mãos, Senhor, entrego o meu espírito.\n\nV. Senhor, Deus fiel, vós me guardais.\nR. Entrego o meu espírito.',
    nunc_dimittis:
      'Cântico Evangélico (Cântico de Simeão)\n\nAntífona\n\nSalvai-nos, Senhor, quando velamos, e guardai-nos quando dormimos, para que vigiemos com Cristo e descansemos em paz.\n\nAgora, Senhor, deixai o vosso servo ir em paz,\nsegundo a vossa palavra.\n\nPorque meus olhos viram a vossa salvação,\nque preparastes diante de todos os povos:\n\nluz para iluminar as nações\ne glória de Israel, vosso povo.\n\nTodos:\nGlória ao Pai, ao Filho e ao Espírito Santo.\nComo era no princípio, agora e sempre. Amém.',
    oracao:
      'Visitai, Senhor, esta casa e afastai dela as ciladas do inimigo. Habitem nela os vossos santos anjos, para nos guardar em paz, e a vossa bênção permaneça sempre conosco.\n\nPor Cristo, nosso Senhor.\n\nAmém.',
    bencao: 'O Senhor nos conceda uma noite tranquila\ne, no fim da vida, uma santa morte.\n\nAmém.',
    antifonaMariana:
      'À vossa proteção recorremos, Santa Mãe de Deus. Não desprezeis as nossas súplicas em nossas necessidades, mas livrai-nos sempre de todos os perigos, ó Virgem gloriosa e bendita.',
  },
};

function hasSectionContent(section?: BreviarioHoraSection | null) {
  if (!section) return false;

  return Object.values(section).some((value) => {
    if (Array.isArray(value)) return value.some((item) => item.trim().length > 0);
    return typeof value === 'string' && value.trim().length > 0;
  });
}

function mergeSection(
  fallbackSection: BreviarioHoraSection,
  apiSection?: BreviarioHoraSection | null
) {
  if (!hasSectionContent(apiSection)) return fallbackSection;

  const mergedSection: BreviarioHoraSection = { ...fallbackSection };
  const sectionMap = mergedSection as Record<string, string | string[] | undefined>;

  Object.entries(apiSection ?? {}).forEach(([key, value]) => {
    const field = key as keyof BreviarioHoraSection;
    const fallbackValue = fallbackSection[field];

    if (Array.isArray(value)) {
      if (value.length === 0) return;
      if (Array.isArray(fallbackValue) && fallbackValue.length > value.length) return;

      sectionMap[field] = value;
      return;
    }

    if (typeof value === 'string' && value.trim().length > 0) {
      sectionMap[field] = value;
    }
  });

  return mergedSection;
}

function normalizeBreviario(apiData: Partial<BreviarioData>): BreviarioData {
  return {
    data: apiData.data || FALLBACK_BREVIARIO.data,
    tempo: apiData.tempo || FALLBACK_BREVIARIO.tempo,
    semana: apiData.semana || FALLBACK_BREVIARIO.semana,
    oficio: mergeSection(FALLBACK_BREVIARIO.oficio, apiData.oficio),
    laudes: mergeSection(FALLBACK_BREVIARIO.laudes, apiData.laudes),
    hora_media: mergeSection(FALLBACK_BREVIARIO.hora_media ?? {}, apiData.hora_media),
    vesperas: mergeSection(FALLBACK_BREVIARIO.vesperas, apiData.vesperas),
    completas: mergeSection(FALLBACK_BREVIARIO.completas, apiData.completas),
  };
}

export function useBreviario() {
  const [data, setData] = useState<BreviarioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBreviario() {
      try {
        setLoading(true);
        const response = await api.get('/liturgia/hoje');

        setData(normalizeBreviario(response.data));
        setError(null);
      } catch (error: unknown) {
        setData(FALLBACK_BREVIARIO);
        setError(null);
        console.error('Erro no fetch do breviario', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBreviario();
  }, []);

  return { data, loading, error };
}
