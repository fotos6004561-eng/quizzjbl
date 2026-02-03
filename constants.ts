import { QuizStep } from './types';

// The copy specifically crafted for the Spanish (ES-ES) market as requested.
export const QUIZ_DATA: QuizStep[] = [
  {
    id: 0,
    type: 'intro',
    feature_name: "INTRO",
    visual_brief_es: "Fondo negro absoluto. Un sonido de bajo (BWOOM). Una línea de neón naranja dibuja el contorno del logo JBL rápidamente. El logo se llena de luz y pulsa una vez, emitiendo partículas naranjas.",
    question: "¿ESTÁS LISTO PARA DESPERTAR A LA BESTIA?",
    options: [
      { text: "INICIAR EXPERIENCIA", isCorrect: true }
    ],
    feedback_hype: ""
  },
  {
    id: 1,
    type: 'question',
    feature_name: "AI Sound Boost",
    visual_brief_es: "Ondas de sonido naranjas neón pulsando desde el centro de la pantalla, distorsionando el aire como una onda expansiva de bajo. Partículas de polvo brillante flotando en cámara lenta. Estética Cyberpunk oscura pero vibrante.",
    question: "¿Qué pasa cuando le metes caña al volumen a tope?",
    options: [
      { text: "Se escucha de lujo, cero distorsión.", isCorrect: true },
      { text: "Suena a lata vieja, qué bajón.", isCorrect: false }
    ],
    feedback_hype: "¡Ahí le has dao! Sonido brutal y cristalino."
  },
  {
    id: 2,
    type: 'question',
    feature_name: "Resistencia IP68",
    visual_brief_es: "Gotas de agua macro chocando contra una superficie metálica naranja rugosa. El agua brilla con reflejos neón. Sensación de frescura explosiva, como si el altavoz emergiera de una piscina en slow-motion.",
    question: "La fiesta se mueve a la piscina y el altavoz se cae al agua...",
    options: [
      { text: "¡Pánico total! A secarlo corriendo.", isCorrect: false },
      { text: "¡Qué más da! Sigue sonando bajo el agua.", isCorrect: true }
    ],
    feedback_hype: "¡Eso es, chaval! Este bicho es un tanque."
  },
  {
    id: 3,
    type: 'question',
    feature_name: "Powerbank Incorporado",
    visual_brief_es: "Primer plano del puerto USB lateral brillando con electricidad estática azul y naranja. Un cable se conecta y se ve una batería de móvil cargándose a velocidad absurda (rayos recorriendo el cable). Humo de hielo seco alrededor.",
    question: "Tu móvil muere en mitad del temazo...",
    options: [
      { text: "Game over. A casa a cargar.", isCorrect: false },
      { text: "¡Ni de coña! Lo enchufo al altavoz y seguimos.", isCorrect: true }
    ],
    feedback_hype: "¡Toma ya! Energía infinita para todos."
  },
  {
    id: 4,
    type: 'question',
    feature_name: "PartyBoost Stereo",
    visual_brief_es: "Un Boombox 4 en el centro emite una señal wifi naranja que conecta con otros 50 altavoces en la oscuridad. De repente, todos se iluminan y vibran al unísono. Una pared de sonido visualizada como una onda expansiva masiva.",
    question: "¿Y si tus colegas también se traen sus JBL?",
    options: [
      { text: "Cada uno con su música, vaya lío.", isCorrect: false },
      { text: "Los conectamos todos y montamos un festival.", isCorrect: true }
    ],
    feedback_hype: "¡Festival montado! Sincronización total."
  },
  {
    id: 5,
    type: 'question',
    feature_name: "Diseño Icónico",
    visual_brief_es: "Primer plano del asa de metal texturizada con agarre de silicona naranja. Una mano la agarra con fuerza y levanta el altavoz sin esfuerzo. El metal refleja luces de discoteca. Sensación de robustez industrial.",
    question: "¿Cómo te llevas este monstruo a la playa?",
    options: [
      { text: "Con cuidado que pesa mucho.", isCorrect: false },
      { text: "Del asa metálica y a tirar millas.", isCorrect: true }
    ],
    feedback_hype: "¡Indestructible! Agarre de acero."
  },
  {
    id: 6,
    type: 'question',
    feature_name: "Batería 34H",
    visual_brief_es: "Time-lapse acelerado de un cielo pasando de noche estrellada a amanecer naranja intenso, y luego atardecer. Un ciclo de energía infinito representado por un anillo de luz brillante que nunca se apaga.",
    question: "Son las 6:00 AM, sale el sol y la gente quiere más jarana...",
    options: [
      { text: "Seguimos hasta que el cuerpo aguante.", isCorrect: true },
      { text: "Se acabó lo que se daba, a buscar enchufe.", isCorrect: false }
    ],
    feedback_hype: "¡Mola mazo! La fiesta no para nunca."
  }
];

export const CTA_CONTENT = {
  headline: "LA BESTIA NARANJA YA ESTÁ AQUÍ.",
  subheadline: "No es solo un altavoz. Es el alma de la fiesta.",
  buttonText: "QUIERO MI BOOMBOX AHORA",
  disclaimer: "Unidades limitadas. No te quedes fuera."
};