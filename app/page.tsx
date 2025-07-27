"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, X, Phone, MapPin, Instagram } from "lucide-react"
import content from "@/data/content.json"

export default function SynergyPilatesLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "nosotros", "servicios", "planes", "equipo", "contacto"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = content.navigation.items

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-[#D6CBBF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-light text-[#475045] tracking-wider">{content.navigation.brand}</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-light tracking-wide transition-colors ${
                    activeSection === item.id
                      ? "text-[#475045] border-b border-[#475045]"
                      : "text-[#909B99] hover:text-[#475045]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Link
                href={content.navigation.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#7F6246] text-white hover:bg-[#475045] px-4 py-2 rounded-full text-sm font-light tracking-wide transition-colors"
              >
                {content.navigation.cta.text}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-[#475045]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#D6CBBF]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-[#909B99] hover:text-[#475045] transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-4 pt-4 border-t border-[#D6CBBF]">
                <Link
                  href={content.navigation.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#7F6246] text-white hover:bg-[#475045] py-3 rounded-lg text-sm font-light tracking-wide transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {content.navigation.cta.text}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen lg:min-h-[80vh]">
            {/* Content Column */}
            <div className="order-2 lg:order-1 space-y-8">
              <p className="text-sm font-light text-[#909B99] mb-4 tracking-widest uppercase">{content.hero.subtitle}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#475045] mb-8 leading-tight">
                {content.hero.title.map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < content.hero.title.length - 1 && <br />}
                  </span>
                ))}
              </h1>
              <Button
                onClick={() => scrollToSection(content.hero.cta.action)}
                className="bg-[#7F6246] text-white hover:bg-[#475045] px-8 py-3 text-sm font-light tracking-wide transition-colors"
              >
                {content.hero.cta.text}
              </Button>
            </div>

            {/* Image Column */}
            <div className="order-1 lg:order-2 relative h-[50vh] lg:h-[80vh]">
              <Image
                src={content.hero.image}
                alt="Persona en posición de meditación y pilates"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 bg-[#D6CBBF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#475045] mb-4">{content.about.title}</h2>
          <h2 className="text-3xl md:text-4xl font-light text-[#475045] mb-8">{content.about.subtitle}</h2>

          <p className="text-lg font-light text-[#7F6246] leading-relaxed mb-8">
          {content.about.description[0]}

          {content.about.description[1]}
          </p>
          <p className="text-lg font-light text-[#7F6246] leading-relaxed">
            {content.about.closing}
          </p>
          <Button
            onClick={() => scrollToSection(content.about.cta.action)}
            className="mt-8 bg-[#7F6246] text-white hover:bg-[#475045] px-8 py-3 text-sm font-light tracking-wide transition-colors"
          >
            {content.about.cta.text}
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-[#475045] text-center mb-16">{content.services.title}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {content.services.items.map((service, index) => (
              <Card key={index} className="border-none shadow-lg bg-white">
                <div className="relative h-64">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-light text-[#475045] mb-3">{service.name}</h3>
                  <p className="text-[#909B99] font-light leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planes" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-[#475045] text-center mb-16">{content.pricing.title}</h2>
          
          {/* Primera vista - Imagen izquierda, contenido derecha */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Imagen */}
            <div className="relative h-[600px] lg:h-[700px]">
              <Image
                src="/images/valore_y_planes.png"
                alt="Valores y Planes Synergy"
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Contenido de precios */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <p className="text-[#909B99] font-light italic mb-8">
                  Nuestra prioridad es tener un plan que se ajuste a tu estilo de vida.
                </p>
              </div>

              {/* Pilates Reformer y Suelo */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-light text-[#B79F8E] mb-4 uppercase tracking-wide">Pilates Reformer</h4>
                  <div className="space-y-3">
                    <div className="border-b border-[#D6CBBF] pb-2">
                      <p className="font-medium text-[#475045]">MENSUAL</p>
                      <div className="text-sm text-[#909B99] space-y-1">
                        <p>Plan Body - 4 clases / $55.000</p>
                        <p>Plan Mind - 8 clases / $96.000</p>
                        <p>Plan Soul - 12 o más clases / $155.000</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-[#475045]">TRIMESTRAL</p>
                      <div className="text-sm text-[#909B99] space-y-1">
                        <p>Plan Body - 4 clases / $157.000</p>
                        <p>Plan Mind - 8 clases / $275.000</p>
                        <p>Plan Soul - 12 o más clases / $445.000</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-light text-[#B79F8E] mb-4 uppercase tracking-wide">Pilates Suelo</h4>
                  <div className="space-y-3">
                    <div className="border-b border-[#D6CBBF] pb-2">
                      <p className="font-medium text-[#475045]">MENSUAL</p>
                      <div className="text-sm text-[#909B99] space-y-1">
                        <p>Plan Body - 4 clases / $43.000</p>
                        <p>Plan Mind - 8 clases / $75.000</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-[#475045]">TRIMESTRAL</p>
                      <div className="text-sm text-[#909B99] space-y-1">
                        <p>Plan Body - 4 clases / $116.000</p>
                        <p>Plan Mind - 8 clases / $202.000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Segunda vista - Contenido izquierda, imagen derecha */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido de precios */}
            <div className="order-2 lg:order-1 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-light text-[#B79F8E] mb-4 uppercase tracking-wide">Yoga</h4>
                  <div className="space-y-3">
                    <div className="border-b border-[#D6CBBF] pb-2">
                      <p className="font-medium text-[#475045]">MENSUAL</p>
                      <div className="text-sm text-[#909B99] space-y-1">
                        <p>Plan Body - 4 clases / $38.000</p>
                        <p>Plan Mind - 8 clases / $68.000</p>
                        <p>Plan Soul - 12 clases / $90.000</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-[#475045]">TRIMESTRAL</p>
                      <div className="text-sm text-[#909B99] space-y-1">
                        <p>Plan Body - 4 clases / $102.000</p>
                        <p>Plan Mind - 8 clases / $183.000</p>
                        <p>Plan Soul - 12 clases / $243.000</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-light text-[#B79F8E] mb-4 uppercase tracking-wide">Barre</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-[#475045]">MENSUAL</p>
                      <div className="text-sm text-[#909B99] space-y-1">
                        <p>Plan Body - 4 clases / $45.000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#D6CBBF] p-6 rounded-lg">
                <h4 className="text-lg font-light text-[#475045] mb-4">PLANES COMBINADOS</h4>
                <div className="text-sm text-[#7F6246] space-y-2">
                  <p>• Combina cualquier disciplina en un solo plan</p>
                  <p>• Flexibilidad total para adaptar tu práctica</p>
                  <p>• Ideal para explorar diferentes modalidades</p>
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="order-1 lg:order-2 relative h-[600px] lg:h-[700px]">
              <Image
                src="/images/valores_y_planes_3.png"
                alt="Planes de Yoga y Barre Synergy"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Accesos Ilimitados */}
          <div className="text-center mt-20 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-light text-[#475045] mb-4 tracking-wide">
              ACCESOS ILIMITADO A TU BIENESTAR
            </h3>
            <h4 className="text-lg font-light text-[#B79F8E] mb-8 tracking-widest uppercase">
              SYNERGY MEMBER
            </h4>
            <p className="text-lg font-light text-[#7F6246] leading-relaxed mb-12 max-w-3xl mx-auto">
              Un pase libre para explorar y disfrutar todas nuestras disciplinas — 
              Pilates Reformer y Suelo, Yoga y Barre — sin ataduras ni límites. 
              Diseñado para que vivas el bienestar a tu ritmo, eligiendo cada día lo 
              que tu cuerpo y mente necesitan.
            </p>

            {/* Planes Ilimitados */}
            <div className="space-y-12">
              {/* Body Plus */}
              <div className="border-b border-[#D6CBBF] pb-8">
                <h5 className="text-xl font-medium text-[#475045] mb-3">
                  Body Plus – 4 clases: $66.000
                </h5>
                <p className="text-[#909B99] font-light leading-relaxed max-w-2xl mx-auto">
                  Ideal para quienes quieren comenzar a conectar cuerpo y mente a su ritmo. 
                  Una clase por semana para incorporar el bienestar en tu rutina.
                </p>
              </div>

              {/* Mind Plus */}
              <div className="border-b border-[#D6CBBF] pb-8">
                <h5 className="text-xl font-medium text-[#475045] mb-3">
                  Mind Plus – 8 clases $115.000
                </h5>
                <p className="text-[#909B99] font-light leading-relaxed max-w-2xl mx-auto">
                  La opción perfecta para profundizar tu práctica. Dos clases por semana que 
                  te ayudarán a mantener el equilibrio, la energía y el compromiso contigo 
                  misma.
                </p>
              </div>

              {/* Soul Plus */}
              <div className="pb-8">
                <h5 className="text-xl font-medium text-[#475045] mb-3">
                  Soul Plus – 12+ clases $185.000
                </h5>
                <p className="text-[#909B99] font-light leading-relaxed max-w-2xl mx-auto">
                  Nuestro plan más completo. Diseñado para quienes hacen del movimiento 
                  una prioridad y buscan una transformación integral y constante.
                </p>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <Button
                onClick={() => scrollToSection("contacto")}
                className="bg-[#7F6246] text-white hover:bg-[#475045] px-8 py-3 text-sm font-light tracking-wide transition-colors"
              >
                CONSULTA TU PLAN IDEAL
              </Button>
              
              <div className="flex justify-center">
                <Link
                  href="https://l.instagram.com/?u=https%3A%2F%2Fboxmagic.cl%2Fsport_page%2FSynergy&e=AT1vQQ9pYfggbBA6y-zJwADPsvw_kNJRGb1a2j5zVpNom-JSIlN0FkcaSL7Wbl5paLF1eCDvGTBqyDhB5jtDNBiC0wHpDxgetaUfCpJb-EcpM8MSL1X_CJjq1lpyRkpRTNAF_Wne2R6m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#B79F8E] text-white hover:bg-[#7F6246] px-8 py-3 text-sm font-light tracking-wide transition-colors rounded-lg"
                >
                  CONTRATA TU PLAN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipo" className="py-20 bg-[#D6CBBF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-[#475045] text-center mb-16">{content.team.title}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.team.members.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-80 mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-light text-[#475045] mb-2">{member.name}</h3>
                <p className="text-[#909B99] font-light text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-[#475045] text-center mb-16">
            {content.testimonials.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.testimonials.items.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <p className="text-[#7F6246] font-light leading-relaxed mb-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <p className="text-[#475045] font-light">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-[#D6CBBF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-[#475045] mb-8">{content.contact.title}</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-[#909B99] mt-1" size={20} />
                  <div>
                    <p className="text-[#475045] font-light">{content.contact.address.street}</p>
                    <p className="text-[#7F6246] font-light">{content.contact.address.city}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="text-[#909B99]" size={20} />
                  <p className="text-[#475045] font-light">{content.contact.phone}</p>
                </div>

              </div>

              <div className="mt-8">
                <h3 className="text-xl font-light text-[#475045] mb-4">{content.contact.schedule.title}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#7F6246]">{content.contact.schedule.weekdays.days}</span>
                    <span className="text-[#475045] font-light">{content.contact.schedule.weekdays.hours}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Mapa de ubicación */}
            <div className="relative h-96 md:h-full">
              <iframe
                src={content.contact.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.5rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Ubicación de Synergy - ${content.contact.address.street}, ${content.contact.address.city}`}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#475045] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
            <h3 className="text-2xl font-light tracking-wider mb-4">{content.footer.brand}</h3>
            <p className="text-[#B79F8E] font-light mb-8">{content.footer.tagline}</p>
            <div className="flex justify-center space-x-6">
              <Link href={content.footer.social.instagram} className="text-[#B79F8E] hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
 
            </div>
            <div className="mt-8 pt-8 border-t border-[#7F6246]">
              <p className="text-[#909B99] text-sm font-light">
                {content.footer.copyright}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
