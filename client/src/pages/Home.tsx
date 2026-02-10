import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, Check, Star } from 'lucide-react';

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const benefits = [
    {
      title: 'Redução de Apetite',
      description: 'Controle natural da fome com sensação de saciedade prolongada',
      icon: '🎯',
    },
    {
      title: 'Perda de Peso Eficaz',
      description: 'Redução média de 22,5% do peso corporal em 72 semanas',
      icon: '⚖️',
    },
    {
      title: 'Controle Glicêmico',
      description: 'Melhora significativa dos níveis de açúcar no sangue',
      icon: '💉',
    },
    {
      title: 'Regulado pela ANVISA',
      description: 'Medicamento aprovado e fiscalizado pelas autoridades brasileiras',
      icon: '✅',
    },
  ];

  const testimonials = [
    {
      name: 'Carla Mendes',
      city: 'São Paulo, SP',
      result: '-12kg em 6 semanas',
      text: 'Perdi 12kg em 6 semanas! O Monjaro realmente funciona. A BeautyVida foi muito profissional na entrega.',
    },
    {
      name: 'Roberto Oliveira',
      city: 'Rio de Janeiro, RJ',
      result: '-18kg em 8 semanas',
      text: 'Melhor decisão que tomei. Controle de apetite incrível e resultados rápidos. Recomendo muito!',
    },
    {
      name: 'Fernanda Costa',
      city: 'Belo Horizonte, MG',
      result: '-15kg em 10 semanas',
      text: 'Já perdi 15kg e me sinto muito mais disposta. O atendimento da BeautyVida foi excelente!',
    },
    {
      name: 'Patricia Gomes',
      city: 'Brasília, DF',
      result: '-8kg em 3 semanas',
      text: 'Chegou rápido e bem embalado. Já estou vendo resultados depois de 3 semanas. Muito satisfeita!',
    },
    {
      name: 'Lucas Martins',
      city: 'Salvador, BA',
      result: '-20kg em 2 meses',
      text: 'Monjaro é realmente eficaz. Perdi 20kg em 2 meses. Suporte da BeautyVida foi impecável.',
    },
    {
      name: 'Juliana Silva',
      city: 'Curitiba, PR',
      result: '-14kg em 7 semanas',
      text: 'Excelente qualidade e entrega rápida. Já recomendei para minhas amigas. Muito feliz com os resultados!',
    },
    {
      name: 'Marcelo Santos',
      city: 'Porto Alegre, RS',
      result: '-22kg em 12 semanas',
      text: 'Transformação real! Perdi 22kg e minha saúde melhorou muito. Obrigado BeautyVida!',
    },
    {
      name: 'Amanda Rocha',
      city: 'Recife, PE',
      result: '-11kg em 5 semanas',
      text: 'Resultado visível em poucas semanas. Muito satisfeita com o produto e o atendimento. Voltaria a comprar!',
    },
    {
      name: 'Felipe Alves',
      city: 'Fortaleza, CE',
      result: '-19kg em 9 semanas',
      text: 'Melhor investimento em saúde que fiz. Perdi 19kg e me sinto renovado. Recomendo!',
    },
    {
      name: 'Beatriz Lima',
      city: 'Manaus, AM',
      result: '-16kg em 8 semanas',
      text: 'Mesmo morando longe, a entrega foi rápida e segura. Monjaro é incrível! Já perdi 16kg!',
    },
  ];

  const faqs = [
    {
      question: 'Como o Monjaro funciona?',
      answer: 'Monjaro é um agonista duplo de GIP e GLP-1, que imita hormônios naturais do seu corpo. Ele regula o apetite, produz sensação de saciedade e melhora o controle da glicemia, permitindo perda de peso progressiva e sustentável.',
    },
    {
      question: 'Qual é a dosagem recomendada?',
      answer: 'Monjaro é administrado uma vez por semana via injeção subcutânea. A dosagem inicial é de 2,5mg, podendo ser aumentada gradualmente conforme orientação médica. Sempre siga as recomendações do seu médico.',
    },
    {
      question: 'Quanto tempo leva para ver resultados?',
      answer: 'Os primeiros 30 dias são uma fase de adaptação do organismo. Resultados significativos geralmente aparecem entre 4 a 8 semanas de uso contínuo. Cada pessoa responde de forma diferente.',
    },
    {
      question: 'Qual é o prazo de entrega?',
      answer: 'Realizamos entrega em todo o Brasil. Em São Paulo, entregamos em até 24 horas. Para outras regiões, o prazo é de 2 a 5 dias úteis via transportadora confiável.'
    },
    {
      question: 'Há garantia de satisfação?',
      answer: 'Sim! Oferecemos garantia de 7 dias. Se você não ficar satisfeito com o produto, devolvemos 100% do valor pago, sem perguntas.',
    },
    {
      question: 'Preciso de prescrição médica?',
      answer: 'Sim, Monjaro é um medicamento sob controle especial que requer prescrição médica. Você pode usar sua prescrição existente ou consultar um de nossos médicos parceiros.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <p className="font-bold text-lg text-slate-900">BeautyVida</p>
              <p className="text-xs text-blue-600 font-semibold">Monjaro Oficial</p>
            </div>
          </div>
          <Button variant="default" size="lg" className="bg-blue-600 hover:bg-blue-700 font-bold shadow-lg" onClick={() => window.location.href = 'https://vegacheckout.com.br'}>
            💳 Comprar Agora
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 md:py-32">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Monjaro: A Solução para Sua Transformação
              </h1>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                Redução de peso eficaz, controle de apetite natural e resultados comprovados. Regulado pela ANVISA e entregamos em todo o Brasil.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all" onClick={() => window.location.href = 'https://vegacheckout.com.br'}>
                  💳 Comprar Agora - R$ 149,90
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-300" />
                  <span className="font-semibold">Aprovado pela ANVISA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-300" />
                  <span className="font-semibold">Entrega em todo o Brasil</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 rounded-3xl blur-2xl opacity-50"></div>
                {/* Card */}
                <div className="relative bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl p-12 w-full max-w-sm shadow-2xl">
                  <div className="text-center">
                    <div className="text-8xl mb-6 animate-bounce">💊</div>
                    <p className="text-2xl font-bold mb-2">Transformação</p>
                    <p className="text-lg text-blue-100">Garantida e Comprovada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-slate-900">Por Que Escolher Monjaro?</h2>
          <p className="text-center text-slate-600 mb-12 text-lg">Benefícios comprovados e resultados reais</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <CardTitle className="text-lg text-slate-900">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-slate-900">Veja a Eficácia em Ação</h2>
          <p className="text-center text-slate-600 mb-12 text-lg">Vídeos reais de resultados e depoimentos de clientes</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Monjaro Quanto Emagreci em 2 Semanas', videoId: 'j9VTK_2HuL0', description: 'Relato real de transformação com Monjaro' },
              { title: 'O que Ninguém te Contou Sobre Monjaro', videoId: 'EpuI0jHI9Vk', description: 'Emagreci 15kg e verdades sobre o tratamento' },
              { title: 'Monjaro Tirzepatida - Como Funciona', videoId: 'j9VTK_2HuL0', description: 'Explicação sobre como o Monjaro funciona' },
            ].map((video, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-slate-900 aspect-video flex items-center justify-center">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-slate-600">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-slate-900">Avaliações de Clientes Reais</h2>
          <p className="text-center text-slate-600 mb-12 text-lg">Transformações reais de nossos clientes em todo o Brasil</p>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.city}</p>
                    </div>
                    <div className="bg-green-100 px-3 py-1 rounded-full">
                      <p className="text-sm font-bold text-green-700">{testimonial.result}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 italic">\"{testimonial.text}\"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-slate-900">Perguntas Frequentes</h2>
          <p className="text-center text-slate-600 mb-12 text-lg">Tire suas dúvidas sobre Monjaro</p>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-slate-900">{faq.question}</CardTitle>
                    <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
                {expandedFaq === idx && (
                  <CardContent className="pt-0">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para Sua Transformação?</h2>
          <p className="text-xl text-blue-100 mb-8">Compre agora e comece sua jornada para uma vida mais saudável</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg px-8 py-6" onClick={() => window.location.href = 'https://vegacheckout.com.br'}>
            Comprar Monjaro - R$ 149,90
          </Button>
          <p className="text-blue-100 mt-6 text-sm">✓ Entrega em todo o Brasil | ✓ Garantia de 7 dias | ✓ Suporte ao cliente</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">BeautyVida</h3>
              <p className="text-sm">Distribuidor oficial de Monjaro - Entregamos em todo o Brasil</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Produto</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Sobre Monjaro</a></li>
                <li><a href="#" className="hover:text-white">Benefícios</a></li>
                <li><a href="#" className="hover:text-white">Preço</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Suporte</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Entrega</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Termos</a></li>
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">ANVISA</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm">
            <p>&copy; 2026 BeautyVida. Todos os direitos reservados. Regulado pela ANVISA.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
