export type RosarioPrayer = {
  id: string;
  titulo: string;
  conteudo: Array<{
    subtitulo: string;
    texto: string;
  }>;
};

export type RosarioMysteryGroup = {
  slug: string;
  tipo: string;
  dia: string;
  lista: Array<{
    titulo: string;
    leitura: string;
  }>;
};

export const oracoesDoRosario: RosarioPrayer[] = [
  {
    id: 'item-1',
    titulo: '1. Faça o Sinal da Cruz',
    conteudo: [
      {
        subtitulo: 'Sinal da Cruz:',
        texto: 'Em nome do Pai, do Filho e do Espírito Santo. Amém.',
      },
    ],
  },
  {
    id: 'item-2',
    titulo: '2. Reze o Credo',
    conteudo: [
      {
        subtitulo: 'Credo:',
        texto:
          'Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra, e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, está sentado à direita de Deus Pai Todo-Poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos Santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.',
      },
    ],
  },
  {
    id: 'item-3',
    titulo: '3. Reze um Pai Nosso',
    conteudo: [
      {
        subtitulo: 'Pai Nosso:',
        texto:
          'Pai Nosso que estais nos Céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade assim na terra como no Céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do Mal. Amém.',
      },
    ],
  },
  {
    id: 'item-4',
    titulo: '4. Reze três Ave Marias',
    conteudo: [
      {
        subtitulo: 'Ave Maria:',
        texto:
          'Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte. Amém.',
      },
    ],
  },
  {
    id: 'item-5',
    titulo: '5. Reze um Glória ao Pai',
    conteudo: [
      {
        subtitulo: 'Glória ao Pai:',
        texto: 'Glória ao Pai e ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.',
      },
    ],
  },
  {
    id: 'item-6',
    titulo: '6. Jaculatória de Fátima',
    conteudo: [
      {
        subtitulo: 'Ó meu Jesus:',
        texto:
          'Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente as que mais precisarem.',
      },
    ],
  },
  {
    id: 'item-7',
    titulo: '7. Anuncie o mistério e reze um Pai Nosso',
    conteudo: [
      {
        subtitulo: 'O que é um mistério?',
        texto: 'Contemple o mistério correspondente ao dia e em seguida reze um Pai Nosso.',
      },
    ],
  },
  {
    id: 'item-8',
    titulo: '8. Repita para cada um dos cinco mistérios',
    conteudo: [
      {
        subtitulo: 'Glória ao Pai e Ó meu Jesus',
        texto: 'Ao final da dezena, reze o Glória ao Pai e a oração de Fátima (Ó meu Jesus...).',
      },
    ],
  },
  {
    id: 'item-9',
    titulo: '9. Agradecimento final',
    conteudo: [
      {
        subtitulo: 'Agradecimento:',
        texto:
          'Infinitas graças vos damos, soberana Rainha, pelos benefícios que todos os dias recebemos de vossas mãos liberais. Dignai-vos, agora e para sempre, tomar-nos debaixo do vosso poderoso amparo e, para mais vos agradecer, vos saudamos com uma Salve Rainha.',
      },
    ],
  },
  {
    id: 'item-10',
    titulo: '10. Salve Rainha',
    conteudo: [
      {
        subtitulo: 'Salve Rainha (Ao final do Rosário):',
        texto:
          'Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro nos mostrai Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, santa Mãe de Deus. Para que sejamos dignos das promessas de Cristo. Amém.',
      },
    ],
  },
];

export const misteriosDoRosario: RosarioMysteryGroup[] = [
  {
    slug: 'gozosos',
    tipo: 'Mistérios Gozosos',
    dia: 'Segunda e Sábado',
    lista: [
      {
        titulo: '1. A Anunciação do Anjo Gabriel a Maria',
        leitura:
          '"No sexto mês, o anjo Gabriel foi enviado por Deus a uma cidade da Galileia, chamada Nazaré, a uma virgem desposada com um homem que se chamava José, da casa de Davi e o nome da virgem era Maria. Entrando, o anjo disse-lhe: \'Ave, cheia de graça, o Senhor é contigo\'." (Lc 1, 26-28)',
      },
      {
        titulo: '2. A Visitação de Maria a sua prima Isabel',
        leitura:
          '"Naqueles dias, Maria se levantou e foi às pressas às montanhas, a uma cidade de Judá. Entrou em casa de Zacarias e saudou Isabel. Ora, apenas Isabel ouviu a saudação de Maria, a criança estremeceu no seu seio; e Isabel ficou cheia do Espírito Santo." (Lc 1, 39-41)',
      },
      {
        titulo: '3. O Nascimento de Jesus em Belém',
        leitura:
          '"Estando eles ali, completaram-se os dias dela. E deu à luz seu filho primogênito, e, envolvendo-o em faixas, reclinou-o numa manjedoura; porque não havia lugar para eles na hospedaria." (Lc 2, 6-7)',
      },
      {
        titulo: '4. A Apresentação de Jesus no Templo',
        leitura:
          '"Concluídos os dias da sua purificação segundo a Lei de Moisés, levaram-no a Jerusalém para o apresentar ao Senhor, conforme o que está escrito na lei do Senhor: \'Todo primogênito do sexo masculino será consagrado ao Senhor\'." (Lc 2, 22-23)',
      },
      {
        titulo: '5. A Perda e o Encontro do Menino Jesus no Templo',
        leitura:
          '"Três dias depois o acharam no templo, sentado no meio dos doutores, ouvindo-os e interrogando-os. Todos os que o ouviam estavam maravilhados da sabedoria de suas respostas." (Lc 2, 46-47)',
      },
    ],
  },
  {
    slug: 'luminosos',
    tipo: 'Mistérios Luminosos',
    dia: 'Quinta-feira',
    lista: [
      {
        titulo: '1. O Batismo de Jesus no Rio Jordão',
        leitura:
          '"Logo que foi batizado, Jesus saiu da água. Eis que os céus se abriram e viu descer sobre ele, em forma de pomba, o Espírito de Deus. E do céu baixou uma voz: \'Eis meu Filho muito amado em quem ponho minha afeição\'." (Mt 3, 16-17)',
      },
      {
        titulo: '2. A Auto-Revelação de Jesus nas Bodas de Caná',
        leitura:
          '"Três dias depois, celebravam-se bodas em Caná da Galileia, e achava-se ali a mãe de Jesus. Também foram convidados Jesus e os seus discípulos. Como viesse a faltar vinho, a mãe de Jesus disse-lhe: \'Eles já não têm vinho\'." (Jo 2, 1-3)',
      },
      {
        titulo: '3. O Anúncio do Reino de Deus',
        leitura: '"Completou-se o tempo e o Reino de Deus está próximo; fazei penitência e crede no Evangelho." (Mc 1, 15)',
      },
      {
        titulo: '4. A Transfiguração de Jesus',
        leitura:
          '"Seis dias depois, Jesus tomou consigo a Pedro, Tiago e João, seu irmão, e conduziu-os à parte a uma alta montanha. Lá se transfigurou na presença deles: seu rosto brilhou como o sol, suas vestes tornaram-se resplandecentes de brancura." (Mt 17, 1-2)',
      },
      {
        titulo: '5. A Instituição da Eucaristia',
        leitura:
          '"Durante a refeição, Jesus tomou o pão, benzeu-o, partiu-o e o deu aos discípulos, dizendo: \'Tomai e comei, isto é o meu corpo\'." (Mt 26, 26)',
      },
    ],
  },
  {
    slug: 'dolorosos',
    tipo: 'Mistérios Dolorosos',
    dia: 'Terça e Sexta',
    lista: [
      {
        titulo: '1. A Agonia de Jesus no Horto das Oliveiras',
        leitura:
          '"Em seguida, Jesus foi com eles a um lugar chamado Getsêmani e disse a seus discípulos: \'Sentai-vos aqui, enquanto vou orar ali adiante\'... E, caindo em agonia, orava com mais instância." (Mt 26, 36; Lc 22, 44)',
      },
      {
        titulo: '2. A Flagelação de Jesus',
        leitura: '"Pilatos então mandou prender Jesus e flagelá-lo." (Jo 19, 1)',
      },
      {
        titulo: '3. A Coroação de Espinhos',
        leitura:
          '"Os soldados teceram de espinhos uma coroa, puseram-lha sobre a cabeça e cobriram-no com um manto de púrpura." (Jo 19, 2)',
      },
      {
        titulo: '4. Jesus Carregando a Cruz',
        leitura:
          '"Pilatos lho entregou para ser crucificado. Tomaram então a Jesus. E ele mesmo, carregando a sua cruz, saiu para o lugar chamado Calvário (ou Gólgota em hebraico)." (Jo 19, 16-17)',
      },
      {
        titulo: '5. A Crucificação e Morte de Jesus',
        leitura:
          '"Quando chegaram ao lugar chamado Calvário, lá o crucificaram, bem como aos malfeitores, um à direita e outro à esquerda... Era quase à hora sexta e em toda a terra houve trevas até a hora nona." (Lc 23, 33.44)',
      },
    ],
  },
  {
    slug: 'gloriosos',
    tipo: 'Mistérios Gloriosos',
    dia: 'Quarta e Domingo',
    lista: [
      {
        titulo: '1. A Ressurreição de Jesus',
        leitura:
          '"O anjo, porém, tomando a palavra, disse às mulheres: \'Não temais! Sei que procurais Jesus, que foi crucificado. Ele não está aqui, porque ressuscitou, como havia dito\'." (Mt 28, 5-6)',
      },
      {
        titulo: '2. A Ascensão de Jesus ao Céu',
        leitura: '"Depois que o Senhor Jesus lhes falou, foi levado ao céu e está sentado à direita de Deus." (Mc 16, 19)',
      },
      {
        titulo: '3. A Vinda do Espírito Santo',
        leitura:
          '"Chegando o dia de Pentecostes, estavam todos reunidos no mesmo lugar... E todos ficaram cheios do Espírito Santo." (At 2, 1.4)',
      },
      {
        titulo: '4. A Assunção de Maria ao Céu',
        leitura:
          '"Apareceu em seguida um grande sinal no céu: uma Mulher revestida do sol, a lua debaixo dos seus pés e na cabeça uma coroa de doze estrelas." (Ap 12, 1)',
      },
      {
        titulo: '5. A Coroação de Maria como Rainha',
        leitura:
          '"Tu és a glória de Jerusalém... Tu és a honra do nosso povo. Que sejas bendita pelo Senhor Todo-poderoso, para sempre." (Jt 15, 9-10)',
      },
    ],
  },
];

const mysteryByWeekday: Record<number, string> = {
  0: 'gloriosos',
  1: 'gozosos',
  2: 'dolorosos',
  3: 'gloriosos',
  4: 'luminosos',
  5: 'dolorosos',
  6: 'gozosos',
};

export function getTodaysMystery() {
  const saoPauloNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const slug = mysteryByWeekday[saoPauloNow.getDay()];

  return misteriosDoRosario.find((misterio) => misterio.slug === slug) ?? misteriosDoRosario[0];
}
