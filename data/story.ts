import { Scene } from "@/types/game";

const createNameSpellingScene = (userName: string): Scene => {
  const normalizedName = userName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase();

  const expectedInput = normalizedName.split("");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const extraLetters = alphabet
    .filter((letter) => !expectedInput.includes(letter))
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  const gestureBank = [...new Set([
    ...expectedInput,
    ...extraLetters,
  ])].sort(() => Math.random() - 0.5);

  // Mostra algumas letras como dica
  const hintPositions = [
    0,
    Math.floor(expectedInput.length / 2),
    expectedInput.length - 1,
  ].filter(
    (position, index, array) =>
      position >= 0 &&
      position < expectedInput.length &&
      array.indexOf(position) === index
  );

  const hintLetters = hintPositions.map((position) => ({
    position,
    letter: expectedInput[position],
  }));

  return {
    id: "scene_zara_intro_2",

    character: {
      name: "Zara",
      dialogue: `Agora é sua vez! Tente soletrar o seu nome "${userName}" selecionando as letras na ordem correta!`,
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },

    type: "gesture_sequence",

    expectedInput,
    gestureBank,
    hintLetters,

    actionText: "Confirmar Soletração",

    nextScene: {
      success: "scene_zara_intro_3",
      error: "scene_zara_intro_2",
    },
  };
};

export const zaraStories: Record<string, Scene> = {
  // ============================================
  // PRÓLOGO: SANDRA (ONBOARDING)
  // ============================================
  scene_welcome: {
    id: "scene_welcome",
    character: {
      name: "Sandra",
      dialogue: "Hey! Você deve ser o novato, prazer em te conhecer, espero que goste do seu primeiro dia na ACME, qual o seu nome?",
      image: "/characters/Sandra-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#EA580C",
    },
    type: "input_text",
    actionText: "Dizer nome",
    inputPlaceholder: "Digite seu nome...",
    nextScene: {
      success: "scene_welcome_2",
    },
  },

  scene_welcome_2: {
    id: "scene_welcome_2",
    character: {
      name: "Sandra",
      dialogue: "Muito prazer, {userName}! Aqui na ACME nós incentivamos a inclusão e o aprendizado de Libras. Você já conhece algum sinal em Libras?",
      image: "/characters/Sandra-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#EA580C",
    },
    type: "options",
    options: [
      { label: "Sim, já conheço alguns!", nextSceneId: "scene_test_intro" },
      { label: "Ainda não, mas gostaria de aprender", nextSceneId: "scene_test_intro" },
    ],
    nextScene: {
      success: "scene_test_intro",
    },
  },

  scene_test_intro: {
    id: "scene_test_intro",
    character: {
      name: "Sandra",
      dialogue: "Que ótimo! Para começarmos nosso primeiro desafio, tente soletrar a palavra 'OI' selecionando os gestos em Libras abaixo na ordem correta!",
      image: "/characters/Sandra-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#EA580C",
    },
    type: "gesture_sequence",
    expectedInput: ["O", "I"],
    gestureBank: ["O", "I", "A"],
    actionText: "Confirmar Sequência",
    nextScene: {
      success: "scene_success_end",
      error: "scene_test_intro",
    },
  },

  scene_success_end: {
    id: "scene_success_end",
    character: {
      name: "Sandra",
      dialogue: "Parabéns, {userName}! Você fez os gestos da palavra 'OI' perfeitamente em Libras! Bem-vindo à equipe da ACME! Agora vou te levar ao seu setor...",
      image: "/characters/Sandra-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#EA580C",
    },
    type: "dialogue",
    actionText: "Ir para o Setor",
    nextScene: {
      success: "scene_zara_intro",
    },
  },

  // ============================================
  // HISTÓRIA 1: APRESENTAÇÕES NO SETOR
  // ============================================
  scene_zara_intro: {
    id: "scene_zara_intro",
    character: {
      name: "Zara",
      dialogue: "Olá! Bem-vindo ao setor! Eu sou a Zara, me comunico em Libras. Vamos aprender juntos? Primeiro, vou soletrar meu nome...",
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },
    type: "dialogue",
    actionText: "Continuar",
    nextScene: {
      success: "scene_zara_intro_2",
    },
  },

  scene_zara_intro_3: {
    id: "scene_zara_intro_3",
    character: {
      name: "Zara",
      dialogue: "Excelente! Você conseguiu soletrar seu nome em Libras! 🎉 Prazer em conhecê-lo, {userName}!",
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },
    type: "options",
    options: [
      { label: "Próxima lição", nextSceneId: "scene_timmy_intro" },
      { label: "Recomeçar", nextSceneId: "scene_zara_intro" },
    ],
    nextScene: {
      success: "scene_timmy_intro",
    },
  },

  // ============================================
  // HISTÓRIA 2: ORGANIZANDO O DIA COM TIMMY E ZARA
  // ============================================
  scene_timmy_intro: {
    id: "scene_timmy_intro",
    character: {
      name: "Timmy",
      dialogue: "Oi, {userName}! Sou o Timmy, também estou aprendendo Libras. Você quer aprender qual é a programação do dia?",
      image: "/characters/Timmy-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#3168E0",
    },
    type: "options",
    options: [
      { label: "Claro! Vamos aprender com Zara", nextSceneId: "scene_daily_schedule" },
      { label: "Melhor depois", nextSceneId: "scene_colors_intro" },
    ],
    nextScene: {
      success: "scene_daily_schedule",
    },
  },

  scene_daily_schedule: {
    id: "scene_daily_schedule",
    character: {
      name: "Zara",
      dialogue: "Vou mostrar o dia de hoje! Preste atenção nos gestos enquanto eu soletro as palavras... REUNIÃO, CAFÉ, PAUSA, ALMOÇO. Qual é a primeira palavra que você viu?",
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },
    type: "gesture_sequence",
    expectedInput: ["R", "E", "U", "N", "I", "A", "O"],
    gestureBank: ["R", "E", "U", "N", "I", "A", "O", "C", "P"],
    actionText: "Confirmar Soletração",
    nextScene: {
      success: "scene_daily_schedule_2",
      error: "scene_daily_schedule",
    },
  },

  scene_daily_schedule_2: {
    id: "scene_daily_schedule_2",
    character: {
      name: "Timmy",
      dialogue: "Legal! Você acertou REUNIÃO! Agora tente identificar a terceira palavra que Zara mostrou... PAUSA!",
      image: "/characters/Timmy-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#3168E0",
    },
    type: "gesture_sequence",
    expectedInput: ["P", "A", "U", "S", "A"],
    gestureBank: ["P", "A", "U", "S", "C", "R", "E"],
    actionText: "Confirmar Soletração",
    nextScene: {
      success: "scene_daily_schedule_3",
      error: "scene_daily_schedule_2",
    },
  },

  scene_daily_schedule_3: {
    id: "scene_daily_schedule_3",
    character: {
      name: "Zara",
      dialogue: "Parabéns! Você aprendeu as palavras do dia! Timmy e você estão indo muito bem!",
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },
    type: "options",
    options: [
      { label: "Próxima lição", nextSceneId: "scene_colors_intro" },
      { label: "Voltar ao menu", nextSceneId: "scene_zara_intro" },
    ],
    nextScene: {
      success: "scene_colors_intro",
    },
  },

  // ============================================
  // HISTÓRIA 3: CORES E OBJETOS COM ZARA
  // ============================================
  scene_colors_intro: {
    id: "scene_colors_intro",
    character: {
      name: "Zara",
      dialogue: "Agora vamos aprender cores e objetos! Vou apontar para coisas ao meu redor e você tenta soletrar a cor correta em Libras!",
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },
    type: "dialogue",
    actionText: "Pronto!",
    nextScene: {
      success: "scene_colors_challenge_1",
    },
  },

  scene_colors_challenge_1: {
    id: "scene_colors_challenge_1",
    character: {
      name: "Zara",
      dialogue: "Primeira cor: Minha caneta é... AZUL! Tente soletrar!",
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },
    type: "gesture_sequence",
    expectedInput: ["A", "Z", "U", "L"],
    gestureBank: ["A", "Z", "U", "L", "V", "E", "R"],
    actionText: "Confirmar Cor",
    nextScene: {
      success: "scene_colors_challenge_2",
      error: "scene_colors_challenge_1",
    },
  },

  scene_colors_challenge_2: {
    id: "scene_colors_challenge_2",
    character: {
      name: "Zara",
      dialogue: "Ótimo! Agora a segunda cor: A mesa é... MARROM! Tente soletrar!",
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },
    type: "gesture_sequence",
    expectedInput: ["M", "A", "R", "R", "O", "M"],
    gestureBank: ["M", "A", "R", "O", "V", "E", "L"],
    actionText: "Confirmar Cor",
    nextScene: {
      success: "scene_colors_challenge_3",
      error: "scene_colors_challenge_2",
    },
  },

  scene_colors_challenge_3: {
    id: "scene_colors_challenge_3",
    character: {
      name: "Timmy",
      dialogue: "Parabéns, {userName}! Você acertou as cores! Zara ficou impressionada com seu desempenho!",
      image: "/characters/Timmy-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#3168E0",
    },
    type: "options",
    options: [
      { label: "Próxima lição", nextSceneId: "scene_help_intro" },
      { label: "Voltar ao menu", nextSceneId: "scene_zara_intro" },
    ],
    nextScene: {
      success: "scene_help_intro",
    },
  },

  // ============================================
  // HISTÓRIA 4: PEDINDO AJUDA A ZARA
  // ============================================
  scene_help_intro: {
    id: "scene_help_intro",
    character: {
      name: "Zara",
      dialogue: "Agora vamos praticar pedir ajuda! Você precisa encontrar algo na mesa, mas não sabe o nome em Libras. Vou te ensinar!",
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },
    type: "dialogue",
    actionText: "Continuar",
    nextScene: {
      success: "scene_help_challenge_1",
    },
  },

  scene_help_challenge_1: {
    id: "scene_help_challenge_1",
    character: {
      name: "Zara",
      dialogue: "Você quer encontrar uma CANETA. Tente soletrar a palavra corretamente!",
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },
    type: "gesture_sequence",
    expectedInput: ["C", "A", "N", "E", "T", "A"],
    gestureBank: ["C", "A", "N", "E", "T", "L", "V", "O"],
    actionText: "Confirmar Soletração",
    nextScene: {
      success: "scene_help_challenge_2",
      error: "scene_help_challenge_1",
    },
  },

  scene_help_challenge_2: {
    id: "scene_help_challenge_2",
    character: {
      name: "Zara",
      dialogue: "Excelente! Agora procure uma IMPRESSORA. Essa é mais longa, mas você consegue!",
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },
    type: "gesture_sequence",
    expectedInput: ["I", "M", "P", "R", "E", "S", "S", "O", "R", "A"],
    gestureBank: ["I", "M", "P", "R", "E", "S", "O", "A", "N", "T"],
    actionText: "Confirmar Soletração",
    nextScene: {
      success: "scene_help_challenge_3",
      error: "scene_help_challenge_2",
    },
  },

  scene_help_challenge_3: {
    id: "scene_help_challenge_3",
    character: {
      name: "Timmy",
      dialogue: "Incrível! {userName}, você conseguiu soletrar IMPRESSORA! Zara está impressionada com seu progresso!",
      image: "/characters/Timmy-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#3168E0",
    },
    type: "options",
    options: [
      { label: "Próxima lição", nextSceneId: "scene_schedule_meet" },
      { label: "Voltar ao menu", nextSceneId: "scene_zara_intro" },
    ],
    nextScene: {
      success: "scene_schedule_meet",
    },
  },

  // ============================================
  // HISTÓRIA 5: COMBINANDO ENCONTROS COM TIMMY
  // ============================================
  scene_schedule_meet: {
    id: "scene_schedule_meet",
    character: {
      name: "Zara",
      dialogue: "Você aprendeu muito hoje! Que tal a gente se encontrar AMANHÃ para aprender mais Libras? Tente soletrar AMANHÃ!",
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },
    type: "gesture_sequence",
    expectedInput: ["A", "M", "A", "N", "H", "A"],
    gestureBank: ["A", "M", "N", "H", "O", "I", "E"],
    actionText: "Confirmar Soletração",
    nextScene: {
      success: "scene_schedule_meet_2",
      error: "scene_schedule_meet",
    },
  },

  scene_schedule_meet_2: {
    id: "scene_schedule_meet_2",
    character: {
      name: "Zara",
      dialogue: "Perfeito! Agora, a que hora? MANHÃ ou TARDE? Tente soletrar MANHÃ!",
      image: "/characters/Zara-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#00C864",
    },
    type: "gesture_sequence",
    expectedInput: ["M", "A", "N", "H", "A"],
    gestureBank: ["M", "A", "N", "H", "T", "R", "D", "E"],
    actionText: "Confirmar Soletração",
    nextScene: {
      success: "scene_schedule_meet_3",
      error: "scene_schedule_meet_2",
    },
  },

  scene_schedule_meet_3: {
    id: "scene_schedule_meet_3",
    character: {
      name: "Timmy",
      dialogue: "Combinado! Amanhã de manhã nós nos encontramos para aprender mais com Zara! Você foi incrível hoje!",
      image: "/characters/Timmy-nobackground.png",
      background: "/backgrounds/office.jpg",
      badgeColor: "#3168E0",
    },
    type: "dialogue",
    actionText: "Encerrar",
    nextScene: {
      success: "scene_welcome",
    },
  },
};

export const createStoryData = (userName: string): Record<string, Scene> => ({
  ...zaraStories,
  scene_zara_intro_2: createNameSpellingScene(userName),
});