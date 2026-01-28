
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Sparkles, 
  ArrowRight, 
  Info, 
  Menu, 
  Heart, 
  Baby,
  CheckCircle2,
  ChevronRight,
  Instagram,
  X,
  Send,
  Loader2
} from 'lucide-react';
import { SERVICES, VALUES, GALLERY, TESTIMONIALS } from './constants';
import { GeminiAssistant } from './geminiService';

// --- Animation Wrapper Component ---

const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

// --- AI Chat Widget ---

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: 'Olá! Sou a assistente virtual da Tia Susu. Como posso ajudar com o desenvolvimento do seu pequeno hoje?'}
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const assistant = new GeminiAssistant();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await assistant.askQuestion(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Ops, tive um probleminha. Pode tentar novamente?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end">
      {isOpen && (
        <div className="w-[320px] sm:w-[380px] h-[500px] bg-white rounded-[2.5rem] shadow-2xl mb-4 flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-gradient-to-r from-susu-blue to-susu-pink p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="font-bold">Assistente Tia Susu</p>
                <p className="text-[10px] uppercase tracking-wider opacity-80">Online agora</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar bg-gray-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium ${
                  m.role === 'user' 
                  ? 'bg-susu-blue text-white rounded-tr-none shadow-md' 
                  : 'bg-white text-gray-700 rounded-tl-none border border-gray-100 shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                  <Loader2 size={16} className="animate-spin text-susu-pink" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tire sua dúvida aqui..."
              className="flex-grow bg-gray-50 border-none focus:ring-2 focus:ring-susu-blue rounded-full px-5 py-3 text-sm font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-susu-blue text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-susu-blue p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all border border-blue-50 relative group"
      >
        <div className="absolute -top-2 -right-2 bg-susu-pink text-white text-[10px] px-2 py-1 rounded-full animate-bounce">
          Dúvidas?
        </div>
        <Sparkles size={28} />
      </button>
    </div>
  );
};

// --- Other Components ---

const Logo = ({ light = false }: { light?: boolean }) => (
  <div className="flex items-center gap-3 group cursor-pointer">
    <div className="relative w-14 h-14 overflow-hidden rounded-2xl shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 border-2 border-white/50">
      <img 
        src="https://i.ibb.co/mCBCptSV/d27c5715-b90a-40e7-814b-c82d9c47bd93.jpg" 
        alt="Logo Tia Susu" 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex flex-col leading-tight">
      <span className={`text-2xl font-bold tracking-tight ${light ? 'text-white' : 'text-gray-900'}`}>
        Tia <span className="text-susu-blue">Susu</span>
      </span>
      <span className={`text-[10px] uppercase tracking-[0.15em] font-bold ${light ? 'text-blue-200' : 'text-gray-400'}`}>
        Desenvolvimento Infantil
      </span>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#inicio">
          <Logo />
        </a>
        
        <div className="hidden md:flex gap-8 items-center font-medium">
          <a href="#inicio" className="hover:text-susu-blue transition-colors">Início</a>
          <a href="#servicos" className="hover:text-susu-pink transition-colors">Serviços</a>
          <a href="#clinica" className="hover:text-susu-yellow transition-colors">A Clínica</a>
          <a href="#programas" className="hover:text-susu-blue transition-colors">Programas</a>
          <a href="#localizacao" className="hover:text-susu-pink transition-colors">Localização</a>
          <a href="https://wa.me/559884952333" target="_blank" className="bg-gradient-to-r from-susu-blue to-blue-700 text-white px-6 py-3 rounded-full hover:scale-105 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 font-bold">
            <MessageCircle size={18} />
            Agendar Avaliação
          </a>
        </div>

        <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
          <div className="flex flex-col p-6 gap-6 font-semibold">
            <a href="#inicio" onClick={() => setIsOpen(false)} className="text-lg">Início</a>
            <a href="#servicos" onClick={() => setIsOpen(false)} className="text-lg text-susu-pink">Serviços</a>
            <a href="#clinica" onClick={() => setIsOpen(false)} className="text-lg text-susu-yellow">A Clínica</a>
            <a href="#programas" onClick={() => setIsOpen(false)} className="text-lg text-susu-blue">Programas</a>
            <a href="#localizacao" onClick={() => setIsOpen(false)} className="text-lg text-susu-pink">Localização</a>
            <a href="https://wa.me/559884952333" target="_blank" className="bg-susu-blue text-white text-center py-4 rounded-2xl font-bold shadow-lg">Agendar Avaliação</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section id="inicio" className="relative pt-12 pb-20 md:py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 scroll-mt-24">
    {/* Floating WhatsApp Button */}
    <a 
      href="https://wa.me/559884952333" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group border border-white/20"
    >
      <MessageCircle size={28} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap px-0 group-hover:px-2 font-bold">
        Fale Conosco
      </span>
    </a>

    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
      <Reveal>
        <div className="text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-pink-200 text-susu-pink px-4 py-2 rounded-full text-sm font-bold mb-8 shadow-sm">
            <Sparkles size={16} />
            <span>CLÍNICA ESPECIALIZADA</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-8">
            Criando <span className="text-susu-blue">conexões</span> e transformando o <span className="text-susu-pink">desenvolvimento</span> da sua criança.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-medium">
            Nosso espaço foi pensado nas famílias e suas crianças, temos serviços voltados para a individualidade de cada criança, para desenvolver habilidades que fazem sentido para o dia a dia.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <a href="https://wa.me/559884952333" target="_blank" className="bg-gradient-to-r from-susu-blue to-susu-pink text-white px-10 py-5 rounded-full text-lg font-bold hover:scale-105 hover:shadow-2xl transition-all shadow-xl shadow-blue-200/50 flex items-center justify-center gap-3">
              Agendar uma visita hoje
              <ArrowRight size={22} strokeWidth={3} />
            </a>
            <a href="#servicos" className="bg-white text-gray-700 border-2 border-gray-100 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
              Nossas Especialidades
            </a>
          </div>
        </div>
      </Reveal>
      
      <Reveal delay={200}>
        <div className="relative w-full max-w-[380px] md:max-w-[420px] mx-auto">
          <div className="absolute -top-12 -right-12 w-80 h-80 bg-susu-blue/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-susu-pink/20 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-susu-yellow/20 rounded-full blur-3xl opacity-40"></div>
          
          <div className="relative animate-float rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(244,143,177,0.3)] border-4 md:border-8 border-white bg-gray-100 aspect-[9/16] w-full flex items-center justify-center transform transition-all duration-500 hover:scale-[1.03] group/video">
            <iframe
              src="https://player.vimeo.com/video/1158739684?autoplay=1&muted=0&loop=1&autopause=0"
              className="absolute inset-0 w-full h-full z-0 transition-transform duration-700 group-hover/video:scale-[1.1]"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Ambiente da Clínica Tia Susu"
            ></iframe>
            
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-[3rem] z-10"></div>
            <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-full z-10 hidden md:block group-hover/video:bg-white/40 transition-colors">
              <Sparkles size={20} className="text-white" />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const PainSection = () => (
  <section className="py-20 bg-white scroll-mt-24">
    <div className="container mx-auto px-4">
      <Reveal>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">O peso da dúvida não precisa ser carregado sozinho.</h2>
          <p className="text-gray-600 text-xl font-medium">
            Muitas vezes, como pais, sentimos que algo não está fluindo como o esperado. As comparações machucam e a busca por respostas parece interminável.
          </p>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { text: "Você sente que seu filho está lutando para ser compreendido pela fala?", color: "pastel-blue", iconColor: "text-susu-blue" },
          { text: "Percebe atrasos em marcos simples do desenvolvimento comparado a outros colegas?", color: "pastel-pink", iconColor: "text-susu-pink" },
          { text: "Busca um acompanhamento que realmente veja seu filho como uma pessoa, e não apenas um número?", color: "pastel-yellow", iconColor: "text-susu-yellow" }
        ].map((q, idx) => (
          <Reveal key={idx} delay={idx * 200}>
            <div className={`bg-${q.color}/40 p-10 rounded-[2.5rem] border-2 border-${q.color} flex flex-col items-center text-center h-full transition-all hover:-translate-y-2 hover:shadow-xl`}>
              <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6 ${q.iconColor}`}>
                <Info size={28} />
              </div>
              <p className="text-xl font-bold text-gray-800 italic leading-relaxed">"{q.text}"</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const ServiceCard: React.FC<{ service: any, index: number }> = ({ service, index }) => {
  const themes = [
    { border: 'border-susu-blue', text: 'text-susu-blue', iconBg: 'bg-pastel-blue' },
    { border: 'border-susu-pink', text: 'text-susu-pink', iconBg: 'bg-pastel-pink' },
    { border: 'border-susu-yellow', text: 'text-susu-yellow', iconBg: 'bg-pastel-yellow' },
  ];
  const theme = themes[index % themes.length];

  return (
    <div className={`bg-white p-10 rounded-[2.5rem] border-2 ${theme.border} shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group flex flex-col h-full cursor-default`}>
      <div className={`mb-8 p-5 rounded-2xl ${theme.iconBg} group-hover:scale-110 transition-transform duration-500 w-fit shadow-inner`}>
        {service.icon}
      </div>
      <h3 className={`text-3xl font-bold mb-4 ${theme.text}`}>{service.title}</h3>
      <p className="text-gray-600 mb-8 flex-grow leading-relaxed font-medium">{service.description}</p>
      <div className={`mt-auto pt-8 border-t-2 border-gray-50`}>
        <p className={`${theme.text} font-bold text-sm uppercase tracking-widest mb-3`}>O Benefício:</p>
        <p className="text-gray-800 font-bold italic text-base">"{service.benefit}"</p>
      </div>
    </div>
  );
};

const Services = () => (
  <section id="servicos" className="py-24 bg-gray-50/50 scroll-mt-24">
    <div className="container mx-auto px-4">
      <Reveal>
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">Nossa Rede de <span className="text-susu-pink">Cuidados</span></h2>
          <p className="text-gray-600 text-xl font-medium">Especialidades integradas com as cores do amor e da ciência.</p>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {SERVICES.map((s, idx) => (
          <Reveal key={s.id} delay={idx * 100}>
            <ServiceCard service={s} index={idx} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="clinica" className="py-24 bg-white relative overflow-hidden scroll-mt-24">
    <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">
      <div className="lg:w-1/2">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">A Tia Susu: Onde o <span className="text-susu-pink">Rosa</span> do Cuidado encontra o <span className="text-susu-blue">Azul</span> da Ciência.</h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
            Nossa clínica nasceu do sonho de criar um porto seguro para famílias. Não somos apenas terapeutas; somos parceiros na jornada de desenvolvimento do seu filho. Cada sala, cada brinquedo e cada profissional foi escolhido para oferecer o melhor estímulo em um ambiente que respira acolhimento e alegria.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-8">
          {VALUES.map((v, i) => {
             const iconColors = ['text-susu-blue', 'text-susu-pink', 'text-susu-yellow', 'text-susu-blue'];
             return (
              <Reveal key={i} delay={200 + i * 100}>
                <div className="flex gap-5 items-start group">
                  <div className={`bg-gray-50 p-4 rounded-2xl ${iconColors[i]} group-hover:scale-110 transition-all shadow-sm`}>
                    {v.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-800 mb-1">{v.title}</h4>
                    <p className="text-base text-gray-500 font-medium">{v.description}</p>
                  </div>
                </div>
              </Reveal>
             );
          })}
        </div>
      </div>
      <div className="lg:w-1/2 grid grid-cols-2 gap-5">
        {GALLERY.map((img, idx) => {
          const borderClasses = ['border-susu-blue', 'border-susu-pink', 'border-susu-yellow', 'border-susu-blue'];
          return (
            <Reveal key={img.id} delay={idx * 150}>
              <div className={`relative group overflow-hidden rounded-[2.5rem] shadow-xl aspect-square border-4 ${borderClasses[idx]}`}>
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-bold text-base">{img.label}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-gradient-to-b from-white to-pink-50/50 scroll-mt-24">
    <div className="container mx-auto px-4 text-center">
      <Reveal>
        <h2 className="text-5xl font-bold mb-16">Relatos que nos <span className="text-susu-pink">emocionam</span></h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {TESTIMONIALS.map((t, idx) => (
          <Reveal key={t.id} delay={idx * 200}>
            <div className={`bg-white p-12 rounded-[3rem] shadow-lg border-2 ${idx === 0 ? 'border-susu-blue/20' : 'border-susu-pink/20'} relative h-full hover:shadow-2xl transition-all`}>
              <div className="flex justify-center gap-1 text-susu-yellow mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" />)}
              </div>
              <p className="text-2xl text-gray-700 font-bold italic mb-10 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center justify-center gap-5">
                <img src={t.avatar} alt={t.author} className={`w-16 h-16 rounded-full border-4 ${idx === 0 ? 'border-susu-blue/10' : 'border-susu-pink/10'}`} />
                <div className="text-left">
                  <h4 className="font-bold text-xl text-gray-900">{t.author}</h4>
                  <p className="text-base text-gray-500 font-semibold">{t.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const SpecialPrograms = () => {
  const programs = [
    {
      title: "Psicoterapia / Atendimento Clínico",
      image: "https://i.ibb.co/1FLxwVQ/f6cead5c-d6d8-4059-b220-70ab410d292a.jpg",
      items: [
        "Psicoterapia para crianças e adolescentes de 2 a 16 anos (Teoria Cognitivo Comportamental);",
        "Atendimento em ABA;",
        "Avaliação Neuropsicológica;",
        "Reabilitação cognitiva;",
        "Orientação de pais;",
        "Supervisão e acompanhamento de AT’s."
      ],
      color: "pastel-blue",
      accent: "susu-blue"
    },
    {
      title: "ConectaMente",
      image: "https://i.ibb.co/dJ4bjmy3/7cba7ea0-c036-4ead-85f9-93e16b3d9c94.jpg",
      items: [
        "Projeto de contraturno;",
        "Oficinas de desenvolvimento emocional;",
        "Acompanhamento pedagógico;",
        "Aprendizagem de língua estrangeiro (inglês);",
        "Para crianças de 3 a 8 anos;",
        "Acontece 2 vezes por semana, de 13h30 às 17h."
      ],
      color: "pastel-pink",
      accent: "susu-pink"
    }
  ];

  return (
    <section id="programas" className="py-24 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nossos Programas <span className="text-susu-blue">Especiais</span></h2>
            <p className="text-gray-500 text-xl font-medium">Soluções completas para cada fase da infância.</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {programs.map((program, idx) => (
            <Reveal key={idx} delay={idx * 200}>
              <div className={`bg-${program.color}/30 border-2 border-${program.color} rounded-[3rem] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col h-full group`}>
                <div className="h-64 overflow-hidden relative">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-${program.color}/90 to-transparent`}></div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className={`text-3xl font-bold mb-8 text-gray-900`}>{program.title}</h3>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {program.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <CheckCircle2 size={24} className={`text-${program.accent} flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a 
                    href="https://wa.me/559884952333" 
                    target="_blank" 
                    className={`bg-white border-2 border-${program.accent} text-${program.accent} px-8 py-4 rounded-full font-bold text-center hover:bg-${program.accent} hover:text-white transition-all shadow-md flex items-center justify-center gap-2 group/btn`}
                  >
                    Saiba mais
                    <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Location = () => (
  <section id="localizacao" className="py-24 bg-white scroll-mt-24">
    <div className="container mx-auto px-4 max-w-5xl">
      <Reveal>
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-[4rem] p-10 md:p-20 border-4 border-pastel-yellow shadow-2xl flex flex-col items-center text-center">
          <h2 className="text-5xl font-bold mb-12">Onde <span className="text-susu-blue">estamos</span></h2>
          <div className="grid md:grid-cols-3 gap-12 w-full">
            <div className="flex flex-col items-center gap-5 group">
              <div className="bg-white p-5 rounded-[2rem] text-susu-blue shadow-lg border border-blue-50 group-hover:scale-110 transition-transform">
                <MapPin size={32} />
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-2 text-susu-blue">Endereço</h4>
                <p className="text-gray-600 text-base font-bold leading-relaxed">Avenida dos Holandeses<br />Centro Comercial Fecomércio<br />Sala 208 - São Luís, MA</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 group">
              <div className="bg-white p-5 rounded-[2rem] text-susu-pink shadow-lg border border-pink-50 group-hover:scale-110 transition-transform">
                <Clock size={32} />
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-2 text-susu-pink">Horário</h4>
                <p className="text-gray-600 text-base font-bold leading-relaxed">Segunda a Sexta: 08:00 às 19:00<br />Sábados: Consultas agendadas</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 group">
              <div className="bg-white p-5 rounded-[2rem] text-susu-yellow shadow-lg border border-yellow-50 group-hover:scale-110 transition-transform">
                <Phone size={32} />
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-2 text-susu-yellow">Contato</h4>
                <p className="text-gray-600 text-base font-bold leading-relaxed">(98) 8495-2333<br />tiasusucfi@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="mt-16 p-8 bg-pastel-pink rounded-[2.5rem] border-2 border-susu-pink/30 max-w-xl shadow-inner">
            <p className="text-susu-pink font-extrabold text-lg uppercase tracking-wider">Ambiente seguro, acolhedor e profissional. Esperamos você!</p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-950 text-gray-400 py-20">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-16 mb-16">
        <div className="col-span-2">
          <div className="mb-8">
            <Logo light />
          </div>
          <p className="max-w-md mb-8 text-base font-medium leading-relaxed">
            Transformando o desenvolvimento infantil através do amor (rosa), respeito (amarelo) e excelência técnica (azul). Sua família merece o melhor acompanhamento.
          </p>
          <div className="flex gap-5">
             <a href="https://www.instagram.com/tiasusu_desenvolvimento/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center hover:bg-susu-pink hover:text-white transition-all shadow-lg group">
                <Instagram size={24} className="group-hover:scale-110 transition-transform" />
             </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold text-xl mb-8">Links Rápidos</h4>
          <ul className="space-y-5 font-bold text-base">
            <li><a href="#inicio" className="hover:text-susu-blue transition-colors">Início</a></li>
            <li><a href="#servicos" className="hover:text-susu-pink transition-colors">Serviços</a></li>
            <li><a href="#clinica" className="hover:text-susu-yellow transition-colors">A Clínica</a></li>
            <li><a href="#programas" className="hover:text-susu-blue transition-colors">Programas</a></li>
            <li><a href="#localizacao" className="hover:text-susu-pink transition-colors">Localização</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-xl mb-8">Contato</h4>
          <ul className="space-y-5 font-bold text-base">
            <li className="flex items-center gap-3"><Phone size={18} /> (98) 8495-2333</li>
            <li className="flex items-center gap-3 underline decoration-susu-pink">tiasusucfi@gmail.com</li>
            <li>São Luís - MA</li>
          </ul>
        </div>
      </div>
      <div className="pt-10 border-t border-gray-900 text-xs font-bold flex flex-col md:flex-row justify-between items-center gap-6">
        <p>&copy; {new Date().getFullYear()} Tia Susu - Desenvolvimento Infantil. Todos os direitos reservados.</p>
        <div className="flex gap-3">
            <div className="w-3 h-3 rounded-full bg-susu-blue animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-susu-pink animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 rounded-full bg-susu-yellow animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <PainSection />
      <About />
      <Services />
      <Testimonials />
      <SpecialPrograms />
      <Location />
      
      <section id="contato" className="py-24 bg-gradient-to-br from-susu-blue via-susu-pink to-susu-yellow text-white overflow-hidden relative scroll-mt-24">
        <Reveal>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">Pronta para ver seu filho prosperar com todas as <span className="underline decoration-white decoration-wavy underline-offset-8">cores</span>?</h2>
            <p className="text-2xl md:text-3xl mb-12 opacity-95 max-w-3xl mx-auto font-bold">
              Buscar ajuda cedo é o ato de amor mais transformador que você pode oferecer. Nossa equipe colorida e profissional está pronta para receber sua família.
            </p>
            <div className="flex justify-center">
              <a href="https://wa.me/559884952333" target="_blank" className="bg-white text-gray-900 px-12 py-6 rounded-full text-2xl font-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-4 group">
                <MessageCircle size={32} className="text-susu-pink group-hover:rotate-12 transition-transform" />
                Agendar Avaliação Agora
              </a>
            </div>
            <p className="mt-16 text-white text-xl font-black italic tracking-wider">Avenida dos Holandeses, Centro Comercial Fecomércio, Sala 208</p>
          </div>
        </Reveal>
      </section>

      <Footer />
      <AIChatWidget />
    </div>
  );
}
