
import React from 'react';
import { 
  Heart, 
  Brain, 
  Music, 
  Speech, 
  Puzzle, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Baby
} from 'lucide-react';

export const SERVICES = [
  {
    id: 'fono',
    title: 'Fonoaudiologia',
    description: 'Trabalha a comunicação, deglutição e fala da criança.',
    benefit: 'Para que seu filho consiga se expressar e ser compreendido pelo mundo.',
    icon: <Speech className="w-8 h-8 text-blue-500" />
  },
  {
    id: 'psico',
    title: 'Psicologia Infantil',
    description: 'Suporte emocional e comportamental especializado.',
    benefit: 'Ajuda a criança a entender suas emoções e lidar com frustrações de forma saudável.',
    icon: <Heart className="w-8 h-8 text-pink-500" />
  },
  {
    id: 'to',
    title: 'Terapia Ocupacional',
    description: 'Desenvolvimento de autonomia e habilidades sensoriais.',
    benefit: 'Promove a independência nas atividades do dia a dia e integração sensorial.',
    icon: <Puzzle className="w-8 h-8 text-orange-500" />
  },
  {
    id: 'musico',
    title: 'Musicoterapia',
    description: 'A música como ferramenta de estímulo cognitivo e social.',
    benefit: 'Desbloqueia canais de comunicação através do ritmo e da melodia.',
    icon: <Music className="w-8 h-8 text-purple-500" />
  },
  {
    id: 'psicoped',
    title: 'Psicopedagogia',
    description: 'Foco nos processos de aprendizagem e dificuldades escolares.',
    benefit: 'Resgata o prazer de aprender e supera barreiras cognitivas.',
    icon: <Brain className="w-8 h-8 text-green-500" />
  },
  {
    id: 'multi',
    title: 'Equipe Multidisciplinar',
    description: 'Olhar integrado de diversos especialistas.',
    benefit: 'Garante que cada aspecto do desenvolvimento seja assistido simultaneamente.',
    icon: <Users className="w-8 h-8 text-teal-500" />
  }
];

export const VALUES = [
  { title: 'Amor', description: 'A base de todo o nosso cuidado.', icon: <Heart className="w-6 h-6" /> },
  { title: 'Respeito', description: 'Honramos o tempo e a individualidade de cada criança.', icon: <Baby className="w-6 h-6" /> },
  { title: 'Ciência', description: 'Práticas baseadas em evidências para resultados reais.', icon: <ShieldCheck className="w-6 h-6" /> },
  { title: 'Integralidade', description: 'Vemos a criança como um todo, não apenas um diagnóstico.', icon: <Sparkles className="w-6 h-6" /> }
];

export const GALLERY: {id: string, url: string, alt: string, label: string}[] = [
  { id: '1', url: 'https://i.ibb.co/qL6fMw8V/Whats-App-Image-2026-01-26-at-18-32-50.jpg', alt: 'Espaço Tia Susu 1', label: 'Nossa Clínica' },
  { id: '2', url: 'https://i.ibb.co/zTFmGxny/Whats-App-Image-2026-01-27-at-07-56-14.jpg', alt: 'Espaço Tia Susu 2', label: 'Ambiente de Terapia' },
  { id: '3', url: 'https://i.ibb.co/5g7w4ZMW/Whats-App-Image-2026-01-26-at-18-32-50-1.jpg', alt: 'Espaço Tia Susu 3', label: 'Consultório Integrado' },
  { id: '4', url: 'https://i.ibb.co/xrLnJV8/Whats-App-Image-2026-01-26-at-18-32-51.jpg', alt: 'Espaço Tia Susu 4', label: 'Sala de Estimulação' }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    author: 'Mariana S.',
    role: 'Mãe do Lucca',
    text: '"Me senti acolhida desde o primeiro dia. O Lucca evoluiu em meses o que não tinha evoluído em um ano inteiro antes de chegarmos aqui."',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't2',
    author: 'Ricardo F.',
    role: 'Pai da Bia',
    text: '"Hoje minha filha se comunica melhor e sorri com confiança. A equipe da Tia Susu é parte da nossa família agora."',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  }
];
