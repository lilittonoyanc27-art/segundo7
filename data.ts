export interface OptionItem {
  id: string;
  es: string;
  hy: string;
}

export interface ExerciseItem {
  id: string;
  num?: string | number;
  type: 'multiple_choice' | 'order' | 'match' | 'identify' | 'morphemes' | 'true_false' | 'analysis' | 'build' | 'error_fix' | 'text_analysis' | 'fill_gap' | 'open_explain';
  questionEs: string;
  questionHy: string;
  contextEs?: string;
  contextHy?: string;
  options?: OptionItem[];
  correctOptionId?: string;
  answerEs: string;
  answerHy: string;
  explanationEs?: string;
  explanationHy?: string;
  breakdown?: {
    partEs: string;
    partHy: string;
    meaningEs: string;
    meaningHy: string;
  }[];
  subQuestions?: {
    id: string;
    qEs: string;
    qHy: string;
    aEs: string;
    aHy: string;
  }[];
  ladderSteps?: {
    unitEs: string;
    unitHy: string;
    exampleEs: string;
    exampleHy: string;
  }[];
  matches?: {
    num: string;
    termEs: string;
    termHy: string;
    matchLetter: string;
    defEs: string;
    defHy: string;
  }[];
}

export interface SectionBlock {
  id: string;
  titleEs: string;
  titleHy: string;
  subtitleEs?: string;
  subtitleHy?: string;
  category: 'theory' | 'exercise' | 'exam1' | 'exam2' | 'summary';
  descriptionEs?: string;
  descriptionHy?: string;
  items: ExerciseItem[];
}

export const THEORY_SUMMARY = {
  titleEs: "Recordatorio breve",
  titleHy: "Կարճ հիշեցում",
  leadEs: "La lengua es un sistema organizado de signos y reglas que usamos para comunicarnos. Sus unidades se organizan desde las más pequeñas hasta las más grandes:",
  leadHy: "Լեզուն նշանների և կանոնների կազմակերպված համակարգ է, որը մենք օգտագործում ենք հաղորդակցվելու համար։ Լեզվական միավորները դասավորվում են փոքրից մեծ.",
  chain: [
    { es: "fonema", hy: "հնչույթ", descEs: "sonido sin significado", descHy: "ձայնային միավոր առանց ինքնուրույն իմաստի", example: "/p/, /m/, /s/" },
    { es: "morfema", hy: "ձևույթ", descEs: "unidad mínima con significado", descHy: "իմաստ ունեցող ամենափոքր միավոր", example: "niñ-, -o, -s" },
    { es: "palabra", hy: "բառ", descEs: "unidad con significado léxico o gramatical", descHy: "իմաստ ունեցող լեզվական միավոր", example: "casa, balón, fútbol" },
    { es: "sintagma", hy: "բառակապակցություն", descEs: "conjunto de palabras con una función", descHy: "իրար հետ կապված բառերի խումբ", example: "la casa grande, el balón rojo" },
    { es: "oración", hy: "նախադասություն", descEs: "conjunto de palabras con sentido completo", descHy: "ավարտուն միտք արտահայտող միավոր", example: "La casa es grande." },
    { es: "texto", hy: "տեքստ", descEs: "conjunto organizado de oraciones relacionadas", descHy: "կազմակերպված նախադասությունների ամբողջություն", example: "El sábado los jugadores llegaron..." }
  ]
};

export const SECTIONS: SectionBlock[] = [
  // EJERCICIO 1
  {
    id: "ejercicio-1",
    titleEs: "Ejercicio 1 — Elige la respuesta correcta",
    titleHy: "Վարժություն 1 — Ընտրի՛ր ճիշտ պատասխանը",
    category: "exercise",
    items: [
      {
        id: "ej1-q1",
        num: "1",
        type: "multiple_choice",
        questionEs: "¿Qué es una lengua?",
        questionHy: "Ի՞նչ է լեզուն։",
        options: [
          { id: "A", es: "A. Una lista de palabras sin reglas", hy: "A. Բառերի ցանկ առանց կանոնների" },
          { id: "B", es: "B. Un sistema de signos y reglas", hy: "B. Նշանների և կանոնների համակարգ" },
          { id: "C", es: "C. Solo sonidos", hy: "C. Միայն հնչյուններ" },
          { id: "D", es: "D. Una forma de escribir", hy: "D. Միայն գրելու ձև" },
        ],
        correctOptionId: "B",
        answerEs: "B. Un sistema de signos y reglas",
        answerHy: "B. Նշանների և կանոնների համակարգ",
      },
      {
        id: "ej1-q2",
        num: "2",
        type: "multiple_choice",
        questionEs: "¿Cuál es la unidad mínima de sonido que puede diferenciar palabras?",
        questionHy: "Ո՞րն է ձայնային ամենափոքր միավորը, որը կարող է տարբերակել բառերը։",
        options: [
          { id: "A", es: "A. Morfema", hy: "A. Ձևույթ" },
          { id: "B", es: "B. Texto", hy: "B. Տեքստ" },
          { id: "C", es: "C. Fonema", hy: "C. Հնչույթ" },
          { id: "D", es: "D. Sintagma", hy: "D. Բառակապակցություն" },
        ],
        correctOptionId: "C",
        answerEs: "C. Fonema",
        answerHy: "C. Հնչույթ",
      },
      {
        id: "ej1-q3",
        num: "3",
        type: "multiple_choice",
        questionEs: "¿Cuál es la unidad mínima con significado?",
        questionHy: "Ո՞րն է իմաստ ունեցող ամենափոքր լեզվական միավորը։",
        options: [
          { id: "A", es: "A. Fonema", hy: "A. Հնչույթ" },
          { id: "B", es: "B. Morfema", hy: "B. Ձևույթ" },
          { id: "C", es: "C. Oración", hy: "C. Նախադասություն" },
          { id: "D", es: "D. Texto", hy: "D. Տեքստ" },
        ],
        correctOptionId: "B",
        answerEs: "B. Morfema",
        answerHy: "B. Ձևույթ",
      },
      {
        id: "ej1-q4",
        num: "4",
        type: "multiple_choice",
        questionEs: "¿Cuál de estas unidades puede tener varios morfemas?",
        questionHy: "Այս միավորներից ո՞րը կարող է բաղկացած լինել մի քանի ձևույթներից։",
        options: [
          { id: "A", es: "A. Palabra", hy: "A. Բառ" },
          { id: "B", es: "B. Fonema", hy: "B. Հնչույթ" },
          { id: "C", es: "C. Sonido", hy: "C. Հնչյուն" },
          { id: "D", es: "D. Letra", hy: "D. Տառ" },
        ],
        correctOptionId: "A",
        answerEs: "A. Palabra",
        answerHy: "A. Բառ",
      },
      {
        id: "ej1-q5",
        num: "5",
        type: "multiple_choice",
        questionEs: "¿Qué unidad está formada por palabras relacionadas entre sí?",
        questionHy: "Ո՞ր միավորն է կազմված իրար հետ կապված բառերից։",
        options: [
          { id: "A", es: "A. Fonema", hy: "A. Հնչույթ" },
          { id: "B", es: "B. Morfema", hy: "B. Ձևույթ" },
          { id: "C", es: "C. Sintagma", hy: "C. Բառակապակցություն" },
          { id: "D", es: "D. Letra", hy: "D. Տառ" },
        ],
        correctOptionId: "C",
        answerEs: "C. Sintagma",
        answerHy: "C. Բառակապակցություն",
      },
    ],
  },

  // EJERCICIO 2
  {
    id: "ejercicio-2",
    titleEs: "Ejercicio 2 — Ordena de menor a mayor",
    titleHy: "Վարժություն 2 — Դասավորի՛ր փոքրից մեծ",
    category: "exercise",
    items: [
      {
        id: "ej2-q1",
        num: "1",
        type: "order",
        questionEs: "Ordena: texto — palabra — morfema — oración — fonema — sintagma",
        questionHy: "Դասավորի՛ր. տեքստ — բառ — ձևույթ — նախադասություն — հնչույթ — բառակապակցություն",
        answerEs: "fonema → morfema → palabra → sintagma → oración → texto",
        answerHy: "հնչույթ → ձևույթ → բառ → բառակապակցություն → նախադասություն → տեքստ",
      },
    ],
  },

  // EJERCICIO 3
  {
    id: "ejercicio-3",
    titleEs: "Ejercicio 3 — Relaciona",
    titleHy: "Վարժություն 3 — Համապատասխանեցրո՛ւ",
    category: "exercise",
    items: [
      {
        id: "ej3-q1",
        num: "1",
        type: "match",
        questionEs: "Relaciona las unidades con su definición:",
        questionHy: "Համապատասխանեցրո՛ւ լեզվական միավորները սահմանումների հետ.",
        matches: [
          { num: "1", termEs: "Fonema", termHy: "Հնչույթ", matchLetter: "C", defEs: "Unidad mínima de sonido", defHy: "ամենափոքր ձայնային միավոր" },
          { num: "2", termEs: "Morfema", termHy: "Ձևույթ", matchLetter: "B", defEs: "Unidad mínima con significado", defHy: "իմաստ ունեցող ամենափոքր միավոր" },
          { num: "3", termEs: "Palabra", termHy: "Բառ", matchLetter: "E", defEs: "Unidad con significado léxico o gramatical", defHy: "իմաստ ունեցող լեզվական միավոր" },
          { num: "4", termEs: "Sintagma", termHy: "Բառակապակցություն", matchLetter: "D", defEs: "Conjunto de palabras con una función", defHy: "իրար հետ կապված բառերի խումբ" },
          { num: "5", termEs: "Oración", termHy: "Նախադասություն", matchLetter: "F", defEs: "Conjunto de palabras con sentido completo", defHy: "ավարտուն միտք արտահայտող միավոր" },
          { num: "6", termEs: "Texto", termHy: "Տեքստ", matchLetter: "A", defEs: "Conjunto de oraciones relacionadas", defHy: "իրար հետ կապված նախադասությունների ամբողջություն" },
        ],
        answerEs: "1 → C, 2 → B, 3 → E, 4 → D, 5 → F, 6 → A",
        answerHy: "1 → C (ամենափոքր ձայնային միավոր), 2 → B (իմաստ ունեցող ամենափոքր միավոր), 3 → E (իմաստ ունեցող լեզվական միավոր), 4 → D (իրար հետ կապված բառերի խումբ), 5 → F (ավարտուն միտք արտահայտող միավոր), 6 → A (իրար հետ կապված նախադասությունների ամբողջություն)",
      },
    ],
  },

  // EJERCICIO 4
  {
    id: "ejercicio-4",
    titleEs: "Ejercicio 4 — ¿Qué unidad es?",
    titleHy: "Վարժություն 4 — Ի՞նչ լեզվական միավոր է",
    category: "exercise",
    items: [
      {
        id: "ej4-q1",
        num: "1",
        type: "identify",
        questionEs: "¿Qué unidad es: /p/ ?",
        questionHy: "Ի՞նչ լեզվական միավոր է՝ /p/ :",
        answerEs: "Fonema",
        answerHy: "Հնչույթ",
      },
      {
        id: "ej4-q2",
        num: "2",
        type: "identify",
        questionEs: "¿Qué unidad es: -s en niños ?",
        questionHy: "Ի՞նչ լեզվական միավոր է՝ niños բառում -s :",
        answerEs: "Morfema",
        answerHy: "Ձևույթ",
      },
      {
        id: "ej4-q3",
        num: "3",
        type: "identify",
        questionEs: "¿Qué unidad es: casa ?",
        questionHy: "Ի՞նչ լեզվական միավոր է՝ casa :",
        answerEs: "Palabra",
        answerHy: "Բառ",
      },
      {
        id: "ej4-q4",
        num: "4",
        type: "identify",
        questionEs: "¿Qué unidad es: la casa grande ?",
        questionHy: "Ի՞նչ լեզվական միավոր է՝ la casa grande :",
        answerEs: "Sintagma",
        answerHy: "Բառակապակցություն",
      },
      {
        id: "ej4-q5",
        num: "5",
        type: "identify",
        questionEs: "¿Qué unidad es: La casa es grande. ?",
        questionHy: "Ի՞նչ լեզվական միավոր է՝ La casa es grande. :",
        answerEs: "Oración",
        answerHy: "Նախադասություն",
      },
      {
        id: "ej4-q6",
        num: "6",
        type: "identify",
        questionEs: "¿Qué unidad es: La casa es grande. Tiene tres habitaciones y un jardín. Está cerca del parque. ?",
        questionHy: "Ի՞նչ լեզվական միավոր է՝ La casa es grande. Tiene tres habitaciones y un jardín. Está cerca del parque. :",
        answerEs: "Texto",
        answerHy: "Տեքստ",
      },
    ],
  },

  // EJERCICIO 5
  {
    id: "ejercicio-5",
    titleEs: "Ejercicio 5 — Encuentra los morfemas",
    titleHy: "Վարժություն 5 — Գտի՛ր ձևույթները",
    category: "exercise",
    items: [
      {
        id: "ej5-q1",
        num: "1",
        type: "morphemes",
        questionEs: "Encuentra los morfemas en: niños",
        questionHy: "Գտի՛ր ձևույթները niños բառում.",
        answerEs: "niñ- + -o + -s (niñ- → raíz / lexema; -o → masculino; -s → plural)",
        answerHy: "niñ- + -o + -s (niñ- → արմատ; -o → արական սեռ; -s → հոգնակի թիվ)",
        breakdown: [
          { partEs: "niñ-", partHy: "niñ-", meaningEs: "raíz / lexema", meaningHy: "արմատ" },
          { partEs: "-o", partHy: "-o", meaningEs: "masculino", meaningHy: "արական սեռ" },
          { partEs: "-s", partHy: "-s", meaningEs: "plural", meaningHy: "հոգնակի թիվ" },
        ],
      },
      {
        id: "ej5-q2",
        num: "2",
        type: "morphemes",
        questionEs: "Encuentra los morfemas en: jugadoras",
        questionHy: "Գտի՛ր ձևույթները jugadoras բառում.",
        answerEs: "jugador- + -a + -s (jugador- → base léxica; -a → femenino; -s → plural)",
        answerHy: "jugador- + -a + -s (jugador- → բառի հիմնական մասը; -a → իգական սեռ; -s → հոգնակի թիվ)",
        breakdown: [
          { partEs: "jugador-", partHy: "jugador-", meaningEs: "base léxica", meaningHy: "բառի հիմնական մասը" },
          { partEs: "-a", partHy: "-a", meaningEs: "femenino", meaningHy: "իգական սեռ" },
          { partEs: "-s", partHy: "-s", meaningEs: "plural", meaningHy: "հոգնակի թիվ" },
        ],
      },
      {
        id: "ej5-q3",
        num: "3",
        type: "morphemes",
        questionEs: "Encuentra los morfemas en: casas",
        questionHy: "Գտի՛ր ձևույթները casas բառում.",
        answerEs: "cas- + -a + -s (-s indica plural)",
        answerHy: "cas- + -a + -s (-s-ը ցույց է տալիս հոգնակի թիվ)",
        breakdown: [
          { partEs: "cas-", partHy: "cas-", meaningEs: "raíz / lexema", meaningHy: "արմատ" },
          { partEs: "-a", partHy: "-a", meaningEs: "marca de palabra / vocal temática", meaningHy: "վերջավորություն" },
          { partEs: "-s", partHy: "-s", meaningEs: "indica plural", meaningHy: "ցույց է տալիս հոգնակի թիվ" },
        ],
      },
    ],
  },

  // EJERCICIO 6
  {
    id: "ejercicio-6",
    titleEs: "Ejercicio 6 — Verdadero o falso",
    titleHy: "Վարժություն 6 — Ճի՞շտ, թե՞ սխալ",
    category: "exercise",
    items: [
      {
        id: "ej6-q1",
        num: "1",
        type: "true_false",
        questionEs: "La lengua está formada por unidades que se relacionan entre sí.",
        questionHy: "Լեզուն կազմված է իրար հետ կապված միավորներից։",
        answerEs: "Verdadero",
        answerHy: "Ճիշտ",
      },
      {
        id: "ej6-q2",
        num: "2",
        type: "true_false",
        questionEs: "El fonema tiene significado léxico completo.",
        questionHy: "Հնչույթն ունի ամբողջական բառային իմաստ։",
        answerEs: "Falso. El fonema distingue sonidos, pero por sí solo normalmente no tiene significado.",
        answerHy: "Սխալ։ Հնչույթը տարբերակում է հնչյունները, բայց ինքնուրույն սովորաբար իմաստ չունի։",
        explanationEs: "El fonema distingue sonidos, pero por sí solo normalmente no tiene significado.",
        explanationHy: "Հնչույթը տարբերակում է հնչյունները, բայց ինքնուրույն սովորաբար իմաստ չունի։",
      },
      {
        id: "ej6-q3",
        num: "3",
        type: "true_false",
        questionEs: "Un texto puede estar formado por varias oraciones.",
        questionHy: "Տեքստը կարող է կազմված լինել մի քանի նախադասություններից։",
        answerEs: "Verdadero",
        answerHy: "Ճիշտ",
      },
      {
        id: "ej6-q4",
        num: "4",
        type: "true_false",
        questionEs: "Un sintagma siempre es una sola palabra.",
        questionHy: "Բառակապակցությունը միշտ մեկ բառից է կազմված։",
        answerEs: "Falso",
        answerHy: "Սխալ (Բառակապակցությունը կազմված է կապակցված բառերից)",
      },
      {
        id: "ej6-q5",
        num: "5",
        type: "true_false",
        questionEs: "Los morfemas pueden aportar información de género y número.",
        questionHy: "Ձևույթները կարող են ցույց տալ սեռ և թիվ։",
        answerEs: "Verdadero",
        answerHy: "Ճիշտ",
      },
    ],
  },

  // EJERCICIO 7
  {
    id: "ejercicio-7",
    titleEs: "Ejercicio 7 — Encuentra las unidades",
    titleHy: "Վարժություն 7 — Գտի՛ր լեզվական միավորները",
    category: "exercise",
    items: [
      {
        id: "ej7-q1",
        num: "Frase",
        type: "analysis",
        questionEs: "Analiza la oración: «Los jugadores jóvenes entrenan cada tarde.»",
        questionHy: "Վերլուծի՛ր նախադասությունը՝ «Երիտասարդ խաղացողները մարզվում են ամեն երեկո։»",
        contextEs: "Los jugadores jóvenes entrenan cada tarde.",
        contextHy: "Երիտասարդ խաղացողները մարզվում են ամեն երեկո։",
        subQuestions: [
          {
            id: "ej7-sq1",
            qEs: "1. ¿Cuántas palabras hay?",
            qHy: "1. Քանի՞ բառ կա։",
            aEs: "6 palabras: Los / jugadores / jóvenes / entrenan / cada / tarde",
            aHy: "6 բառ՝ Los / jugadores / jóvenes / entrenan / cada / tarde",
          },
          {
            id: "ej7-sq2",
            qEs: "2. Busca un sintagma nominal.",
            qHy: "2. Գտի՛ր գոյականական բառակապակցություն։",
            aEs: "Los jugadores jóvenes",
            aHy: "Los jugadores jóvenes (Երիտասարդ խաղացողները)",
          },
          {
            id: "ej7-sq3",
            qEs: "3. Busca un sintagma verbal.",
            qHy: "3. Գտի՛ր բայական բառակապակցություն։",
            aEs: "entrenan cada tarde",
            aHy: "entrenan cada tarde (մարզվում են ամեն երեկո)",
          },
          {
            id: "ej7-sq4",
            qEs: "4. ¿Es una oración?",
            qHy: "4. Սա նախադասությո՞ւն է։",
            aEs: "Sí, porque expresa una idea completa.",
            aHy: "Այո, որովհետև արտահայտում է ավարտուն միտք։",
          },
        ],
        answerEs: "1. 6 palabras | 2. Los jugadores jóvenes | 3. entrenan cada tarde | 4. Sí, porque expresa una idea completa.",
        answerHy: "1. 6 բառ | 2. Los jugadores jóvenes | 3. entrenan cada tarde | 4. Այո, որովհետև արտահայտում է ավարտուն միտք։",
      },
    ],
  },

  // EJERCICIO 8
  {
    id: "ejercicio-8",
    titleEs: "Ejercicio 8 — De pequeño a grande",
    titleHy: "Վարժություն 8 — Փոքրից դեպի մեծ",
    category: "exercise",
    items: [
      {
        id: "ej8-q1",
        num: "Ejemplo",
        type: "build",
        questionEs: "Te damos una unidad y tienes que construir las siguientes (ejemplo: balón):",
        questionHy: "Տրված միավորից կազմի՛ր ավելի մեծ լեզվական միավորներ (օրինակ՝ balón / գնդակ).",
        ladderSteps: [
          { unitEs: "Palabra", unitHy: "Բառ", exampleEs: "balón", exampleHy: "գնդակ" },
          { unitEs: "Sintagma", unitHy: "Բառակապակցություն", exampleEs: "el balón rojo", exampleHy: "կարմիր գնդակը" },
          { unitEs: "Oración", unitHy: "Նախադասություն", exampleEs: "El jugador golpeó el balón rojo.", exampleHy: "Խաղացողը հարվածեց կարմիր գնդակին։" },
          { unitEs: "Texto", unitHy: "Տեքստ", exampleEs: "El jugador golpeó el balón rojo. El portero intentó pararlo, pero el balón entró en la portería.", exampleHy: "Խաղացողը հարվածեց կարմիր գնդակին։ Դարպասապահը փորձեց կանգնեցնել այն, բայց գնդակը մտավ դարպասը։" },
        ],
        answerEs: "Palabra: balón → Sintagma: el balón rojo → Oración: El jugador golpeó el balón rojo. → Texto: El jugador golpeó el balón rojo. El portero intentó pararlo, pero el balón entró en la portería.",
        answerHy: "Բառ՝ գնդակ → Բառակապակցություն՝ կարմիր գնդակը → Նախադասություն՝ Խաղացողը հարվածեց կարմիր գնդակին։ → Տեքստ՝ Խաղացողը հարվածեց կարմիր գնդակին։ Դարպասապահը փորձեց կանգնեցնել այն, բայց գնդակը մտավ դարպասը։",
      },
    ],
  },

  // EJERCICIO 9
  {
    id: "ejercicio-9",
    titleEs: "Ejercicio 9 — Encuentra el error",
    titleHy: "Վարժություն 9 — Գտի՛ր սխալը",
    category: "exercise",
    items: [
      {
        id: "ej9-q1",
        num: "1",
        type: "error_fix",
        questionEs: "Corrige el error: ❌ «Un fonema es un conjunto de oraciones.»",
        questionHy: "Ուղղի՛ր սխալը. ❌ «Հնչույթը նախադասությունների ամբողջություն է։»",
        answerEs: "Un texto es un conjunto de oraciones relacionadas.",
        answerHy: "Տեքստը իրար հետ կապված նախադասությունների ամբողջություն է։",
      },
      {
        id: "ej9-q2",
        num: "2",
        type: "error_fix",
        questionEs: "Corrige el error: ❌ «Un morfema no tiene nunca significado.»",
        questionHy: "Ուղղի՛ր սխալը. ❌ «Ձևույթը երբեք իմաստ չունի։»",
        answerEs: "Un morfema es la unidad mínima con significado.",
        answerHy: "Ձևույթը իմաստ ունեցող ամենափոքր միավորն է։",
      },
      {
        id: "ej9-q3",
        num: "3",
        type: "error_fix",
        questionEs: "Corrige el error: ❌ «Una oración es más pequeña que una palabra.»",
        questionHy: "Ուղղի՛ր սխալը. ❌ «Նախադասությունն ավելի փոքր է, քան բառը։»",
        answerEs: "Una oración está formada por palabras y es una unidad mayor.",
        answerHy: "Նախադասությունը կազմված է բառերից և ավելի մեծ լեզվական միավոր է։",
      },
    ],
  },

  // EJERCICIO 10
  {
    id: "ejercicio-10",
    titleEs: "Ejercicio 10 — Lee y analiza",
    titleHy: "Վարժություն 10 — Կարդա՛ և վերլուծի՛ր",
    category: "exercise",
    items: [
      {
        id: "ej10-q1",
        num: "Texto",
        type: "text_analysis",
        questionEs: "Lee y analiza el fragmento:",
        questionHy: "Կարդա՛ և վերլուծի՛ր հատվածը.",
        contextEs: "El sábado los jugadores llegaron temprano al campo. El entrenador preparó el entrenamiento y explicó los ejercicios. Después todos empezaron a correr.",
        contextHy: "Շաբաթ օրը խաղացողները շուտ հասան խաղադաշտ։ Մարզիչը պատրաստեց մարզումը և բացատրեց վարժությունները։ Հետո բոլորը սկսեցին վազել։",
        subQuestions: [
          {
            id: "ej10-sq1",
            qEs: "1. ¿Es una palabra, oración o texto?",
            qHy: "1. Բա՞ռ է, նախադասությո՞ւն, թե՞ տեքստ։",
            aEs: "Texto",
            aHy: "Տեքստ",
          },
          {
            id: "ej10-sq2",
            qEs: "2. ¿Cuántas oraciones hay?",
            qHy: "2. Քանի՞ նախադասություն կա։",
            aEs: "3",
            aHy: "3",
          },
          {
            id: "ej10-sq3",
            qEs: "3. Busca una palabra en plural.",
            qHy: "3. Գտի՛ր հոգնակի թվով բառ։",
            aEs: "jugadores / ejercicios",
            aHy: "jugadores / ejercicios",
          },
          {
            id: "ej10-sq4",
            qEs: "4. ¿Qué morfema indica el plural en “jugadores”?",
            qHy: "4. Ո՞ր ձևույթն է ցույց տալիս հոգնակին “jugadores” բառում։",
            aEs: "-s",
            aHy: "-s",
          },
          {
            id: "ej10-sq5",
            qEs: "5. Busca un sintagma nominal.",
            qHy: "5. Գտի՛ր գոյականական բառակապակցություն։",
            aEs: "El entrenador / los jugadores",
            aHy: "El entrenador / los jugadores",
          },
        ],
        answerEs: "1. Texto | 2. 3 oraciones | 3. jugadores / ejercicios | 4. -s | 5. El entrenador / los jugadores",
        answerHy: "1. Տեքստ | 2. 3 | 3. jugadores / ejercicios | 4. -s | 5. El entrenador / los jugadores",
      },
    ],
  },

  // EXAMEN FINAL
  {
    id: "examen-final",
    titleEs: "Examen final",
    titleHy: "Վերջնական քննություն",
    category: "exam1",
    items: [
      {
        id: "ef-q1",
        num: "1",
        type: "fill_gap",
        questionEs: "Completa: fonema → ______ → palabra → ______ → oración → ______",
        questionHy: "Լրացրո՛ւ. հնչույթ → ______ → բառ → ______ → նախադասություն → ______",
        answerEs: "morfema → sintagma → texto",
        answerHy: "ձևույթ → բառակապակցություն → տեքստ",
      },
      {
        id: "ef-q2",
        num: "2",
        type: "open_explain",
        questionEs: "¿Qué diferencia hay entre fonema y morfema?",
        questionHy: "Ի՞նչ տարբերություն կա հնչույթի և ձևույթի միջև։",
        answerEs: "El fonema es una unidad de sonido; el morfema es la unidad mínima con significado.",
        answerHy: "Հնչույթը ձայնային միավոր է, իսկ ձևույթը՝ իմաստ ունեցող ամենափոքր միավորը։",
      },
      {
        id: "ef-q3",
        num: "3",
        type: "multiple_choice",
        questionEs: "En “las jugadoras rápidas”, ¿qué tipo de unidad tenemos?",
        questionHy: "«las jugadoras rápidas» արտահայտության մեջ ի՞նչ տիպի միավոր ունենք։",
        options: [
          { id: "A", es: "A. Fonema", hy: "A. Հնչույթ" },
          { id: "B", es: "B. Morfema", hy: "B. Ձևույթ" },
          { id: "C", es: "C. Sintagma", hy: "C. Բառակապակցություն" },
          { id: "D", es: "D. Texto", hy: "D. Տեքստ" },
        ],
        correctOptionId: "C",
        answerEs: "C. Sintagma",
        answerHy: "C. Բառակապակցություն",
      },
      {
        id: "ef-q4",
        num: "4",
        type: "multiple_choice",
        questionEs: "¿Qué indica -s en jugadores?",
        questionHy: "Ի՞նչ է ցույց տալիս -s-ը jugadores բառում։",
        options: [
          { id: "A", es: "A. Pasado", hy: "A. Անցյալ ժամանակ" },
          { id: "B", es: "B. Femenino", hy: "B. Իգական սեռ" },
          { id: "C", es: "C. Plural", hy: "C. Հոգնակի թիվ" },
          { id: "D", es: "D. Presente", hy: "D. Ներկա ժամանակ" },
        ],
        correctOptionId: "C",
        answerEs: "C. Plural",
        answerHy: "C. Հոգնակի թիվ",
      },
      {
        id: "ef-q5",
        num: "5",
        type: "open_explain",
        questionEs: "Explica por qué la lengua es un sistema.",
        questionHy: "Բացատրի՛ր, թե ինչու է լեզուն համակարգ։",
        answerEs: "Porque está formada por unidades y reglas que se relacionan y se combinan para crear mensajes.",
        answerHy: "Որովհետև լեզուն կազմված է իրար հետ կապված միավորներից և կանոններից, որոնք միավորվում են հաղորդագրություններ ստեղծելու համար։",
      },
    ],
  },

  // EXAMEN DE PRÁCTICA 2 (30 QUESTIONS)
  {
    id: "examen-practica-2",
    titleEs: "Examen de práctica 2 (1.º ESO / 7 класс)",
    titleHy: "Փորձնական քննություն 2 (7-րդ դասարան / 1.º ESO)",
    subtitleEs: "30 preguntas típicas de examen sobre la lengua como sistema",
    subtitleHy: "30 տիպիկ քննական հարց՝ «Լեզուն որպես համակարգ» թեմայով",
    category: "exam2",
    items: [
      {
        id: "ep2-q1",
        num: "1",
        type: "multiple_choice",
        questionEs: "¿Cuál es el orden correcto de las unidades de la lengua, de menor a mayor?",
        questionHy: "Ո՞րն է լեզվական միավորների ճիշտ հերթականությունը՝ փոքրից մեծ։",
        options: [
          { id: "A", es: "A. palabra → fonema → morfema → texto", hy: "A. բառ → հնչույթ → ձևույթ → տեքստ" },
          { id: "B", es: "B. fonema → morfema → palabra → sintagma → oración → texto", hy: "B. հնչույթ → ձևույթ → բառ → բառակապակցություն → նախադասություն → տեքստ" },
          { id: "C", es: "C. texto → oración → palabra → fonema", hy: "C. տեքստ → նախադասություն → բառ → հնչույթ" },
          { id: "D", es: "D. morfema → texto → palabra → oración", hy: "D. ձևույթ → տեքստ → բառ → նախադասություն" },
        ],
        correctOptionId: "B",
        answerEs: "B. fonema → morfema → palabra → sintagma → oración → texto",
        answerHy: "B. հնչույթ → ձևույթ → բառ → բառակապակցություն → նախադասություն → տեքստ",
      },
      {
        id: "ep2-q2",
        num: "2",
        type: "multiple_choice",
        questionEs: "/m/ es…",
        questionHy: "/m/-ը ի՞նչ է։",
        options: [
          { id: "A", es: "A. una palabra", hy: "A. բառ" },
          { id: "B", es: "B. un morfema", hy: "B. ձևույթ" },
          { id: "C", es: "C. un fonema", hy: "C. հնչույթ" },
          { id: "D", es: "D. un sintagma", hy: "D. բառակապակցություն" },
        ],
        correctOptionId: "C",
        answerEs: "C. Un fonema",
        answerHy: "C. Հնչույթ",
      },
      {
        id: "ep2-q3",
        num: "3",
        type: "multiple_choice",
        questionEs: "¿Cuál es la unidad mínima que aporta significado?",
        questionHy: "Ո՞րն է իմաստ ունեցող ամենափոքր լեզվական միավորը։",
        options: [
          { id: "A", es: "A. Fonema", hy: "A. Հնչույթ" },
          { id: "B", es: "B. Morfema", hy: "B. Ձևույթ" },
          { id: "C", es: "C. Letra", hy: "C. Տառ" },
          { id: "D", es: "D. Sonido", hy: "D. Հնչյուն" },
        ],
        correctOptionId: "B",
        answerEs: "B. Morfema",
        answerHy: "B. Ձևույթ",
      },
      {
        id: "ep2-q4",
        num: "4",
        type: "multiple_choice",
        questionEs: "En la palabra niñas, ¿qué indica -s?",
        questionHy: "niñas բառում -s-ը ի՞նչ է ցույց տալիս։",
        options: [
          { id: "A", es: "A. femenino", hy: "A. իգական սեռ" },
          { id: "B", es: "B. masculino", hy: "B. արական սեռ" },
          { id: "C", es: "C. plural", hy: "C. հոգնակի թիվ" },
          { id: "D", es: "D. pasado", hy: "D. անցյալ ժամանակ" },
        ],
        correctOptionId: "C",
        answerEs: "C. Plural",
        answerHy: "C. Հոգնակի թիվ",
      },
      {
        id: "ep2-q5",
        num: "5",
        type: "multiple_choice",
        questionEs: "En niñas, ¿qué indica -a?",
        questionHy: "niñas բառում -a-ն ի՞նչ է ցույց տալիս։",
        options: [
          { id: "A", es: "A. plural", hy: "A. հոգնակի թիվ" },
          { id: "B", es: "B. femenino", hy: "B. իգական սեռ" },
          { id: "C", es: "C. pasado", hy: "C. անցյալ ժամանակ" },
          { id: "D", es: "D. verbo", hy: "D. բայ" },
        ],
        correctOptionId: "B",
        answerEs: "B. Femenino",
        answerHy: "B. Իգական սեռ",
      },
      {
        id: "ep2-q6",
        num: "6",
        type: "multiple_choice",
        questionEs: "¿Palabra, sintagma u oración?: «el jugador rápido»",
        questionHy: "Բա՞ռ, բառակապակցությո՞ւն, թե՞ նախադասություն՝ «արագ խաղացողը»",
        options: [
          { id: "A", es: "A. palabra", hy: "A. բառ" },
          { id: "B", es: "B. sintagma", hy: "B. բառակապակցություն" },
          { id: "C", es: "C. oración", hy: "C. նախադասություն" },
          { id: "D", es: "D. texto", hy: "D. տեքստ" },
        ],
        correctOptionId: "B",
        answerEs: "B. Sintagma",
        answerHy: "B. Բառակապակցություն",
      },
      {
        id: "ep2-q7",
        num: "7",
        type: "multiple_choice",
        questionEs: "¿Qué unidad es?: «El jugador corre muy rápido.»",
        questionHy: "Ի՞նչ միավոր է՝ «Խաղացողը շատ արագ է վազում։»",
        options: [
          { id: "A", es: "A. morfema", hy: "A. ձևույթ" },
          { id: "B", es: "B. palabra", hy: "B. բառ" },
          { id: "C", es: "C. oración", hy: "C. նախադասություն" },
          { id: "D", es: "D. fonema", hy: "D. հնչույթ" },
        ],
        correctOptionId: "C",
        answerEs: "C. Oración",
        answerHy: "C. Նախադասություն",
      },
      {
        id: "ep2-q8",
        num: "8",
        type: "multiple_choice",
        questionEs: "¿Qué unidad es?: «fútbol»",
        questionHy: "Ի՞նչ միավոր է՝ «fútbol»",
        options: [
          { id: "A", es: "A. palabra", hy: "A. բառ" },
          { id: "B", es: "B. oración", hy: "B. նախադասություն" },
          { id: "C", es: "C. texto", hy: "C. տեքստ" },
          { id: "D", es: "D. sintagma", hy: "D. բառակապակցություն" },
        ],
        correctOptionId: "A",
        answerEs: "A. Palabra",
        answerHy: "A. Բառ",
      },
      {
        id: "ep2-q9",
        num: "9",
        type: "multiple_choice",
        questionEs: "Encuentra el sintagma nominal en: «Los jugadores jóvenes entrenan cada tarde.»",
        questionHy: "Գտի՛ր գոյականական բառակապակցությունը՝ «Երիտասարդ խաղացողները մարզվում են ամեն երեկո։»",
        options: [
          { id: "A", es: "A. entrenan", hy: "A. entrenan" },
          { id: "B", es: "B. cada tarde", hy: "B. cada tarde" },
          { id: "C", es: "C. los jugadores jóvenes", hy: "C. los jugadores jóvenes" },
          { id: "D", es: "D. entrenan cada tarde", hy: "D. entrenan cada tarde" },
        ],
        correctOptionId: "C",
        answerEs: "C. Los jugadores jóvenes",
        answerHy: "C. Los jugadores jóvenes (Երիտասարդ խաղացողները)",
      },
      {
        id: "ep2-q10",
        num: "10",
        type: "multiple_choice",
        questionEs: "Encuentra el sintagma verbal en: «El delantero marca muchos goles.»",
        questionHy: "Գտի՛ր բայական բառակապակցությունը՝ «Հարձակվողը շատ գոլեր է խփում։»",
        options: [
          { id: "A", es: "A. el delantero", hy: "A. el delantero" },
          { id: "B", es: "B. muchos goles", hy: "B. muchos goles" },
          { id: "C", es: "C. marca muchos goles", hy: "C. marca muchos goles" },
          { id: "D", es: "D. delantero", hy: "D. delantero" },
        ],
        correctOptionId: "C",
        answerEs: "C. marca muchos goles",
        answerHy: "C. marca muchos goles (շատ գոլեր է խփում — բայական բառակապակցություն)",
      },
      {
        id: "ep2-q11",
        num: "11",
        type: "multiple_choice",
        questionEs: "¿Cuántas palabras hay en: «Mi hermano juega al fútbol los domingos.»?",
        questionHy: "Քանի՞ բառ կա՝ «Mi hermano juega al fútbol los domingos.» նախադասության մեջ։",
        options: [
          { id: "A", es: "A. 5", hy: "A. 5" },
          { id: "B", es: "B. 6", hy: "B. 6" },
          { id: "C", es: "C. 7", hy: "C. 7" },
          { id: "D", es: "D. 8", hy: "D. 8" },
        ],
        correctOptionId: "C",
        answerEs: "C. 7 palabras (Mi / hermano / juega / al / fútbol / los / domingos)",
        answerHy: "C. 7 բառ (Mi / hermano / juega / al / fútbol / los / domingos)",
      },
      {
        id: "ep2-q12",
        num: "12",
        type: "multiple_choice",
        questionEs: "Encuentra el morfema de plural en: «jugadores». ¿Qué parte indica plural?",
        questionHy: "Գտի՛ր հոգնակի ձևույթը «jugadores» բառում. ո՞ր մասն է ցույց տալիս հոգնակին։",
        options: [
          { id: "A", es: "A. jug-", hy: "A. jug-" },
          { id: "B", es: "B. -dor", hy: "B. -dor" },
          { id: "C", es: "C. -e", hy: "C. -e" },
          { id: "D", es: "D. -s", hy: "D. -s" },
        ],
        correctOptionId: "D",
        answerEs: "D. -s (en la terminación -es)",
        answerHy: "D. -s (հոգնակի թվի ցուցիչ)",
      },
      {
        id: "ep2-q13",
        num: "13",
        type: "true_false",
        questionEs: "Verdadero o falso: «Un fonema tiene siempre significado por sí solo.»",
        questionHy: "Ճի՞շտ, թե՞ սխալ. «Հնչույթը միշտ ինքնուրույն իմաստ ունի։»",
        answerEs: "Falso. El fonema distingue sonidos, pero normalmente no tiene significado por sí solo.",
        answerHy: "Սխալ։ Հնչույթը տարբերակում է հնչյունները, բայց սովորաբար ինքնուրույն իմաստ չունի։",
        explanationEs: "El fonema distingue sonidos, pero normalmente no tiene significado por sí solo.",
        explanationHy: "Հնչույթը տարբերակում է հնչյունները, բայց սովորաբար ինքնուրույն իմաստ չունի։",
      },
      {
        id: "ep2-q14",
        num: "14",
        type: "true_false",
        questionEs: "Verdadero o falso: «Una palabra puede estar formada por varios morfemas.»",
        questionHy: "Ճի՞շտ, թե՞ սխալ. «Բառը կարող է կազմված լինել մի քանի ձևույթներից։»",
        answerEs: "Verdadero. Ejemplo: niñ-a-s",
        answerHy: "Ճիշտ։ Օրինակ՝ niñ-a-s",
      },
      {
        id: "ep2-q15",
        num: "15",
        type: "true_false",
        questionEs: "Verdadero o falso: «Un texto está formado normalmente por oraciones relacionadas entre sí.»",
        questionHy: "Ճի՞շտ, թե՞ սխալ. «Տեքստը սովորաբար կազմված է իրար հետ կապված նախադասություններից։»",
        answerEs: "Verdadero",
        answerHy: "Ճիշտ",
      },
      {
        id: "ep2-q16",
        num: "16",
        type: "error_fix",
        questionEs: "Encuentra el error: «“La casa grande” es una oración completa.» ¿Es correcto?",
        questionHy: "Գտի՛ր սխալը. «“La casa grande” ամբողջական նախադասություն է։» Ճի՞շտ է։",
        answerEs: "No. Es un sintagma nominal. Para ser una oración: «La casa es grande.»",
        answerHy: "Ոչ։ Դա գոյականական բառակապակցություն է։ Որպես նախադասություն լինելու համար՝ «La casa es grande.» (Տունը մեծ է։)",
      },
      {
        id: "ep2-q17",
        num: "17",
        type: "fill_gap",
        questionEs: "Completa: fonema → ______ → palabra → ______ → oración → ______",
        questionHy: "Լրացրո՛ւ. հնչույթ → ______ → բառ → ______ → նախադասություն → ______",
        answerEs: "morfema → sintagma → texto",
        answerHy: "ձևույթ → բառակապակցություն → տեքստ",
      },
      {
        id: "ep2-q18",
        num: "18",
        type: "morphemes",
        questionEs: "Analiza esta palabra: «perros». Separa sus partes.",
        questionHy: "Վերլուծի՛ր բառը՝ «perros». Առանձնացրո՛ւ նրա մասերը։",
        answerEs: "perr- + -o + -s (perr- → lexema / raíz; -o → morfema de género masculino; -s → morfema de número plural)",
        answerHy: "perr- + -o + -s (perr- → արմատ; -o → արական սեռ; -s → հոգնակի թիվ)",
        breakdown: [
          { partEs: "perr-", partHy: "perr-", meaningEs: "lexema / raíz", meaningHy: "արմատ" },
          { partEs: "-o", partHy: "-o", meaningEs: "morfema de género masculino", meaningHy: "արական սեռ" },
          { partEs: "-s", partHy: "-s", meaningEs: "morfema de número plural", meaningHy: "հոգնակի թիվ" },
        ],
      },
      {
        id: "ep2-q19",
        num: "19",
        type: "morphemes",
        questionEs: "Analiza «jugadoras». Divide la palabra.",
        questionHy: "Վերլուծի՛ր «jugadoras» բառը. բաժանի՛ր մասերի։",
        answerEs: "jugador- + -a + -s (-a → femenino; -s → plural)",
        answerHy: "jugador- + -a + -s (-a → իգական սեռ; -s → հոգնակի թիվ)",
        breakdown: [
          { partEs: "jugador-", partHy: "jugador-", meaningEs: "base léxica", meaningHy: "բառի հիմքը" },
          { partEs: "-a", partHy: "-a", meaningEs: "femenino", meaningHy: "իգական սեռ" },
          { partEs: "-s", partHy: "-s", meaningEs: "plural", meaningHy: "հոգնակի թիվ" },
        ],
      },
      {
        id: "ep2-q20",
        num: "20",
        type: "open_explain",
        questionEs: "¿Es oración o no?: «Los perros pequeños.»",
        questionHy: "Նախադասությո՞ւն է, թե՞ ոչ՝ «Los perros pequeños.» (Փոքր շները։)",
        answerEs: "No es una oración completa. Es un sintagma nominal.",
        answerHy: "Ամբողջական նախադասություն չէ։ Գոյականական բառակապակցություն է։",
      },
      {
        id: "ep2-q21",
        num: "21",
        type: "open_explain",
        questionEs: "Ahora compáralo: «Los perros pequeños corren por el parque.» ¿Es una oración? ¿Por qué?",
        questionHy: "Այժմ համեմատի՛ր՝ «Los perros pequeños corren por el parque.» Նախադասությո՞ւն է։ Ինչո՞ւ։",
        answerEs: "Es una oración. Porque tiene sentido completo y contiene un verbo: corren.",
        answerHy: "Սա նախադասություն է, որովհետև ունի ավարտուն իմաստ և բայ՝ corren։",
      },
      {
        id: "ep2-q22",
        num: "22",
        type: "analysis",
        questionEs: "Lee y clasifica: 1) «El jugador nuevo» y 2) «El jugador nuevo entrena todos los días.»",
        questionHy: "Կարդա՛ և դասակարգի՛ր՝ 1) «El jugador nuevo» և 2) «El jugador nuevo entrena todos los días.»",
        answerEs: "1) El jugador nuevo → Sintagma nominal | 2) El jugador nuevo entrena todos los días. → Oración",
        answerHy: "1) El jugador nuevo (Նոր խաղացողը) → Գոյականական բառակապակցություն | 2) El jugador nuevo entrena todos los días. (Նոր խաղացողն ամեն օր մարզվում է։) → Նախադասություն",
      },
      {
        id: "ep2-q23",
        num: "23",
        type: "open_explain",
        questionEs: "Pregunta de razonamiento: ¿Por qué «casa» es una palabra, pero «la casa blanca» es un sintagma?",
        questionHy: "Մտածելու հարց. Ինչո՞ւ է «casa»-ն բառ, իսկ «la casa blanca»-ն՝ բառակապակցություն։",
        answerEs: "Porque “casa” es una sola palabra y “la casa blanca” está formado por varias palabras relacionadas entre sí.",
        answerHy: "Որովհետև «casa»-ն մեկ բառ է, իսկ «la casa blanca»-ն կազմված է իրար հետ կապված մի քանի բառերից։",
      },
      {
        id: "ep2-q24",
        num: "24",
        type: "text_analysis",
        questionEs: "Lee el texto y responde a las preguntas a, b, c, d:",
        questionHy: "Կարդա՛ տեքստը և պատասխանի՛ր a, b, c, d հարցերին.",
        contextEs: "Carlos juega al fútbol. Entrena tres días por semana. Los sábados juega partidos con su equipo.",
        contextHy: "Կառլոսը ֆուտբոլ է խաղում։ Նա շաբաթական երեք օր մարզվում է։ Շաբաթ օրերին իր թիմի հետ խաղեր է խաղում։",
        subQuestions: [
          {
            id: "ep2-24a",
            qEs: "a. ¿Es una oración o un texto?",
            qHy: "a. Նախադասությո՞ւն է, թե՞ տեքստ։",
            aEs: "Un texto",
            aHy: "Տեքստ",
          },
          {
            id: "ep2-24b",
            qEs: "b. ¿Cuántas oraciones contiene?",
            qHy: "b. Քանի՞ նախադասություն ունի։",
            aEs: "3 oraciones",
            aHy: "3 նախադասություն",
          },
          {
            id: "ep2-24c",
            qEs: "c. Busca un verbo.",
            qHy: "c. Գտի՛ր մեկ բայ։",
            aEs: "juega / entrena",
            aHy: "juega / entrena",
          },
          {
            id: "ep2-24d",
            qEs: "d. Busca un sintagma nominal.",
            qHy: "d. Գտի՛ր գոյականական բառակապակցություն։",
            aEs: "su equipo",
            aHy: "su equipo",
          },
        ],
        answerEs: "a. Un texto | b. 3 oraciones | c. juega / entrena | d. su equipo",
        answerHy: "a. Տեքստ | b. 3 նախադասություն | c. juega / entrena | d. su equipo",
      },
      {
        id: "ep2-q25",
        num: "25",
        type: "multiple_choice",
        questionEs: "¿Qué opción contiene una oración completa?",
        questionHy: "Ո՞ր տարբերակն է ամբողջական նախադասություն։",
        options: [
          { id: "A", es: "A. el balón rojo", hy: "A. կարմիր գնդակը" },
          { id: "B", es: "B. los jugadores jóvenes", hy: "B. երիտասարդ խաղացողները" },
          { id: "C", es: "C. El delantero chutó el balón.", hy: "C. Հարձակվողը հարվածեց գնդակին։" },
          { id: "D", es: "D. muy rápido", hy: "D. շատ արագ" },
        ],
        correctOptionId: "C",
        answerEs: "C. El delantero chutó el balón.",
        answerHy: "C. El delantero chutó el balón. (Հարձակվողը հարվածեց գնդակին։)",
      },
      {
        id: "ep2-q26",
        num: "26",
        type: "multiple_choice",
        questionEs: "¿Qué opción contiene solamente una palabra?",
        questionHy: "Ո՞ր տարբերակն է պարունակում միայն մեկ բառ։",
        options: [
          { id: "A", es: "A. la casa", hy: "A. la casa" },
          { id: "B", es: "B. fútbol", hy: "B. fútbol" },
          { id: "C", es: "C. el jugador rápido", hy: "C. el jugador rápido" },
          { id: "D", es: "D. juega muy bien", hy: "D. juega muy bien" },
        ],
        correctOptionId: "B",
        answerEs: "B. fútbol",
        answerHy: "B. fútbol",
      },
      {
        id: "ep2-q27",
        num: "27",
        type: "multiple_choice",
        questionEs: "¿Qué opción es un sintagma?",
        questionHy: "Ո՞ր տարբերակն է բառակապակցություն։",
        options: [
          { id: "A", es: "A. /p/", hy: "A. /p/" },
          { id: "B", es: "B. -s", hy: "B. -s" },
          { id: "C", es: "C. la camiseta azul", hy: "C. la camiseta azul (կապույտ մարզաշապիկը)" },
          { id: "D", es: "D. Pedro juega.", hy: "D. Pedro juega. (Պեդրոն խաղում է։)" },
        ],
        correctOptionId: "C",
        answerEs: "C. la camiseta azul",
        answerHy: "C. la camiseta azul",
      },
      {
        id: "ep2-q28",
        num: "28",
        type: "open_explain",
        questionEs: "Explica con tus palabras: ¿Por qué decimos que la lengua es un sistema?",
        questionHy: "Բացատրի՛ր քո բառերով. Ինչո՞ւ ենք ասում, որ լեզուն համակարգ է։",
        answerEs: "Porque sus unidades están organizadas y se combinan siguiendo unas reglas para formar mensajes.",
        answerHy: "Որովհետև լեզվի միավորները կազմակերպված են և որոշակի կանոններով միավորվում են՝ հաղորդագրություններ կազմելու համար։",
      },
      {
        id: "ep2-q29",
        num: "29",
        type: "analysis",
        questionEs: "Pregunta típica de examen. Clasifica cada ejemplo: a. /s/ | b. -s | c. jugadores | d. los jugadores jóvenes | e. Los jugadores entrenan. | f. Los jugadores entrenan. Después juegan un partido.",
        questionHy: "Քննության տիպիկ հարց. Դասակարգի՛ր յուրաքանչյուր օրինակը.",
        breakdown: [
          { partEs: "a. /s/", partHy: "a. /s/", meaningEs: "fonema", meaningHy: "հնչույթ" },
          { partEs: "b. -s", partHy: "b. -s", meaningEs: "morfema", meaningHy: "ձևույթ" },
          { partEs: "c. jugadores", partHy: "c. jugadores", meaningEs: "palabra", meaningHy: "բառ" },
          { partEs: "d. los jugadores jóvenes", partHy: "d. los jugadores jóvenes", meaningEs: "sintagma", meaningHy: "բառակապակցություն" },
          { partEs: "e. Los jugadores entrenan.", partHy: "e. Los jugadores entrenan.", meaningEs: "oración", meaningHy: "նախադասություն" },
          { partEs: "f. Los jugadores entrenan. Después juegan un partido.", partHy: "f. Los jugadores entrenan. Después juegan un partido.", meaningEs: "texto", meaningHy: "տեքստ" },
        ],
        answerEs: "a. fonema | b. morfema | c. palabra | d. sintagma | e. oración | f. texto",
        answerHy: "a. հնչույթ | b. ձևույթ | c. բառ | d. բառակապակցություն | e. նախադասություն | f. տեքստ",
      },
      {
        id: "ep2-q30",
        num: "30",
        type: "fill_gap",
        questionEs: "Completa la explicación: «Los ______ se combinan para formar morfemas; los morfemas forman ______; las palabras pueden formar ______; los sintagmas forman oraciones y las oraciones pueden formar un ______.»",
        questionHy: "Լրացրո՛ւ բացատրությունը. «Հնչույթները միավորվում են՝ կազմելով ձևույթներ, ձևույթներից կազմվում են բառեր, բառերից՝ բառակապակցություններ, բառակապակցություններից՝ նախադասություններ, իսկ նախադասություններից՝ տեքստ։»",
        answerEs: "fonemas / palabras / sintagmas / texto",
        answerHy: "հնչույթներ / բառեր / բառակապակցություններ / տեքստ",
      },
    ],
  },
];

export const SUMMARY_POINTS = [
  { es: "Fonema", hy: "Հնչույթ", noteEs: "Sonido (unidad mínima sin significado por sí solo). Ejemplo: /p/, /m/, /s/", noteHy: "Ամենափոքր ձայնային միավոր, առանց ինքնուրույն իմաստի։ Օրինակ՝ /p/, /m/, /s/" },
  { es: "Morfema", hy: "Ձևույթ", noteEs: "Unidad mínima con significado. Ejemplo: niñ- (raíz), -o (masculino), -s (plural)", noteHy: "Իմաստ ունեցող ամենափոքր միավոր։ Օրինակ՝ niñ- (արմատ), -o (արական սեռ), -s (հոգնակի թիվ)" },
  { es: "Palabra", hy: "Բառ", noteEs: "Palabra independiente con significado léxico o gramatical. Ejemplo: balón, fútbol, casa", noteHy: "Ինքնուրույն իմաստ ունեցող բառ։ Օրինակ՝ balón, fútbol, casa" },
  { es: "Sintagma", hy: "Բառակապակցություն", noteEs: "Grupo de palabras relacionadas con una función. Ejemplo: la casa grande, los jugadores jóvenes", noteHy: "Իրար հետ կապված բառերի խումբ։ Օրինակ՝ la casa grande, los jugadores jóvenes" },
  { es: "Oración", hy: "Նախադասություն", noteEs: "Mensaje con sentido completo y normalmente un verbo. Ejemplo: La casa es grande.", noteHy: "Ավարտուն միտք և բայ պարունակող միավոր։ Օրինակ՝ La casa es grande." },
  { es: "Texto", hy: "Տեքստ", noteEs: "Conjunto organizado de oraciones relacionadas. Ejemplo: El sábado los jugadores...", noteHy: "Կապված նախադասությունների կազմակերպված ամբողջություն։" }
];

export const LADDER_CHAIN = [
  { level: "1", es: "/p/", hy: "/p/", unitEs: "fonema", unitHy: "հնչույթ" },
  { level: "2", es: "-s", hy: "-s", unitEs: "morfema", unitHy: "ձևույթ" },
  { level: "3", es: "jugadores", hy: "jugadores (խաղացողներ)", unitEs: "palabra", unitHy: "բառ" },
  { level: "4", es: "los jugadores jóvenes", hy: "los jugadores jóvenes (երիտասարդ խաղացողները)", unitEs: "sintagma", unitHy: "բառակապակցություն" },
  { level: "5", es: "Los jugadores entrenan.", hy: "Los jugadores entrenan. (Խաղացողները մարզվում են։)", unitEs: "oración", unitHy: "նախադասություն" },
  { level: "6", es: "Los jugadores entrenan. Después juegan un partido.", hy: "Խաղացողները մարզվում են։ Հետո խաղում են հանդիպում։", unitEs: "texto", unitHy: "տեքստ" }
];
