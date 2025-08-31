"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Menu, X, Phone, MapPin, Instagram } from "lucide-react";
import content from "@/data/content.json";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export default function SynergyPilatesLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "inicio",
        "nosotros",
        "servicios",
        "planes",
        "equipo",
        "contacto",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };

    if (selectedMember) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedMember]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const copyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText(content.contact.phone);
      setShowToast(true);
    } catch (err) {
      console.error("Failed to copy phone number:", err);
    }
  };

  const ContractPlanButton = () => (
    <div className="mt-8 text-center">
      <a
        href={content.pricing.unlimited.contractCta.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#7F6246] text-white hover:bg-[#475045] px-8 py-3 text-sm font-light tracking-wide transition-colors rounded-full"
      >
        {content.pricing.unlimited.contractCta.text}
      </a>
    </div>
  );

  const navItems = content.navigation.items;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-[#D6CBBF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-light text-[#475045] tracking-wider">
              {content.navigation.brand}
            </div>

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
            <button
              className="md:hidden text-[#475045]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
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
              <p className="text-sm font-light text-[#909B99] mb-4 tracking-widest uppercase">
                {content.hero.subtitle}
              </p>
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
                className="bg-[#7F6246] text-white hover:bg-[#475045] px-8 py-3 text-sm font-light tracking-wide transition-colors mb-4"
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
          <h2 className="text-3xl md:text-4xl font-light text-[#475045] mb-4">
            {content.about.title}
          </h2>
          <h2 className="text-3xl md:text-4xl font-light text-[#475045] mb-8">
            {content.about.subtitle}
          </h2>

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
          <h2 className="text-3xl md:text-4xl font-light text-[#475045] text-center mb-16">
            {content.services.title}
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {content.services.items.map((service, index) => (
              <Card
                key={index}
                className="border-none shadow-lg bg-white w-full sm:w-80 md:w-72 lg:w-80"
              >
                <div className="relative h-64">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-light text-[#475045] mb-3">
                    {service.name}
                  </h3>
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
          <h2 className="text-3xl md:text-4xl font-light text-[#475045] text-center mb-16">
            {content.pricing.title}
          </h2>

          {/* Primera vista - Imagen izquierda, contenido derecha */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Imagen */}
            <div className="relative h-[600px] lg:h-[700px]">
              <Image
                src="/images/valores_y_planes.png"
                alt="Valores y Planes Synergy"
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Contenido de precios */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <p className="text-[#909B99] font-light italic mb-8">
                  {content.pricing.subtitle}
                </p>
              </div>

              {/* Primeras dos categorías dinámicas */}
              <div className="grid md:grid-cols-2 gap-8">
                {content.pricing.sections.slice(0, 2).map((section, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-light text-[#B79F8E] mb-4 uppercase tracking-wide">
                      {section.title}
                      {section.status && (
                        <span className="text-xs ml-2">({section.status})</span>
                      )}
                    </h4>
                    <div className="space-y-3">
                      <div className="border-b border-[#D6CBBF] pb-2">
                        <p className="font-medium text-[#475045]">
                          {section.monthly.title}
                        </p>
                        <div className="text-sm text-[#909B99] space-y-1">
                          {section.monthly.plans.map((plan, planIndex) => (
                            <p key={planIndex}>{plan}</p>
                          ))}
                        </div>
                      </div>
                      {section.quarterly && (
                        <div>
                          <p className="font-medium text-[#475045]">
                            {section.quarterly.title}
                          </p>
                          <div className="text-sm text-[#909B99] space-y-1">
                            {section.quarterly.plans.map((plan, planIndex) => (
                              <p key={planIndex}>{plan}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-16 text-center">
                <ContractPlanButton />
              </div>
            </div>
          </div>

          {/* Segunda vista - Contenido izquierda, imagen derecha */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido de precios */}
            <div className="order-2 lg:order-1 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {content.pricing.sections.slice(2, 5).map((section, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-light text-[#B79F8E] mb-4 uppercase tracking-wide">
                      {section.title}
                      {section.status && (
                        <span className="text-xs ml-2">({section.status})</span>
                      )}
                    </h4>
                    <div className="space-y-3">
                      <div
                        className={
                          section.quarterly
                            ? "border-b border-[#D6CBBF] pb-2"
                            : ""
                        }
                      >
                        <p className="font-medium text-[#475045]">
                          {section.monthly.title}
                        </p>
                        <div className="text-sm text-[#909B99] space-y-1">
                          {section.monthly.plans.map((plan, planIndex) => (
                            <p key={planIndex}>{plan}</p>
                          ))}
                        </div>
                      </div>
                      {section.quarterly && (
                        <div>
                          <p className="font-medium text-[#475045]">
                            {section.quarterly.title}
                          </p>
                          <div className="text-sm text-[#909B99] space-y-1">
                            {section.quarterly.plans.map((plan, planIndex) => (
                              <p key={planIndex}>{plan}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-16 text-center">
                <ContractPlanButton />
              </div>
            </div>

            {/* Imagen */}
            <div className="order-1 lg:order-2 relative h-[600px] lg:h-[700px]">
              <Image
                src="/images/valores_y_planes_2.png"
                alt="Planes de Yoga"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Accesos Ilimitados */}
          <div className="text-center mt-20 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-light text-[#475045] mb-4 tracking-wide">
              {content.pricing.unlimited.title}
            </h3>
            <h4 className="text-lg font-light text-[#B79F8E] mb-8 tracking-widest uppercase">
              {content.pricing.unlimited.subtitle}
            </h4>
            <p className="text-lg font-light text-[#7F6246] leading-relaxed mb-12 max-w-3xl mx-auto">
              {content.pricing.unlimited.description}
            </p>

            {/* Planes Mensuales */}
            <div className="mb-16">
              <h5 className="text-xl font-medium text-[#475045] mb-8">
                {content.pricing.unlimited.monthly.title}
              </h5>
              <div className="space-y-8">
                {content.pricing.unlimited.monthly.plans.map((plan, index) => (
                  <div
                    key={index}
                    className="border-b border-[#D6CBBF] pb-8 last:border-b-0"
                  >
                    <h6 className="text-lg font-medium text-[#475045] mb-3">
                      {plan.name}
                    </h6>
                    <p className="text-[#909B99] font-light leading-relaxed max-w-2xl mx-auto">
                      {plan.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Planes Trimestrales */}
            <div className="space-y-8">
              <h5 className="text-xl font-medium text-[#475045] mb-8">
                {content.pricing.unlimited.quarterly.title}
              </h5>
              <div className="space-y-8">
                {content.pricing.unlimited.quarterly.plans.map(
                  (plan, index) => (
                    <div
                      key={index}
                      className="border-b border-[#D6CBBF] pb-8 last:border-b-0"
                    >
                      <h6 className="text-lg font-medium text-[#475045] mb-3">
                        {plan.name}
                      </h6>
                      <p className="text-[#909B99] font-light leading-relaxed max-w-2xl mx-auto">
                        {plan.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            <ContractPlanButton />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipo" className="py-20 bg-[#D6CBBF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#475045] mb-8">
              {content.team.title}
            </h2>
            <div className="relative h-64 md:h-80 lg:h-96 max-w-4xl mx-auto">
              <Image
                src={content.team.heroImage}
                alt="Equipo Synergy"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Terapias complementarias */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-light text-[#475045] text-center mb-12">
              {content.team.sections.therapies.title}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.team.sections.therapies.members.map(
                (member: TeamMember, index: number) => (
                  <div key={index} className="text-center">
                    <div className="relative aspect-[4/5] max-h-[350px] mb-4 mx-auto">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <h4 className="text-lg font-light text-[#475045] mb-2">
                      {member.name}
                    </h4>
                    <p className="text-[#909B99] font-light text-sm mb-4">
                      {member.role}
                    </p>
                    <Button
                      onClick={() => setSelectedMember(member)}
                      className="bg-[#7F6246] text-white hover:bg-[#475045] px-4 py-2 text-xs font-light tracking-wide transition-colors hover:cursor-pointer"
                    >
                      Más sobre mí
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Instructoras */}
          <div>
            <h3 className="text-2xl md:text-3xl font-light text-[#475045] text-center mb-12">
              {content.team.sections.instructors.title}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.team.sections.instructors.members.map(
                (member: TeamMember, index: number) => (
                  <div key={index} className="text-center">
                    <div className="relative aspect-[4/5] max-h-[350px] mb-4 mx-auto">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <h4 className="text-lg font-light text-[#475045] mb-2">
                      {member.name}
                    </h4>
                    <p className="text-[#909B99] font-light text-sm mb-4">
                      {member.role}
                    </p>
                    <Button
                      onClick={() => setSelectedMember(member)}
                      className="bg-[#7F6246] text-white hover:bg-[#475045] px-4 py-2 text-xs font-light tracking-wide transition-colors hover:cursor-pointer"
                    >
                      Más sobre mí
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Modal para biografías */}
        {selectedMember && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-light text-[#475045] mb-1">
                      {selectedMember.name}
                    </h3>
                    <p className="text-[#909B99] font-light">
                      {selectedMember.role}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-[#909B99] hover:text-[#475045] text-2xl hover:cursor-pointer"
                  >
                    ×
                  </button>
                </div>

                {/* Blog post-like layout with floating image */}
                <div className="relative">
                  {/* Floating image at top-left */}
                  <div className="float-left w-1/2 pr-4 pb-4">
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Biography text that wraps around the image */}
                  <div className="text-[#7F6246] font-light leading-relaxed">
                    <p>{selectedMember.bio}</p>
                  </div>

                  {/* Clear float to ensure proper layout */}
                  <div className="clear-both"></div>
                </div>
              </div>
            </div>
          </div>
        )}
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
                  <p className="text-[#475045] font-light">
                    - {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <ContractPlanButton />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-[#D6CBBF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-[#475045] mb-8">
                {content.contact.title}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-[#909B99] mt-1" size={20} />
                  <div>
                    <p className="text-[#475045] font-light">
                      {content.contact.address.street}
                    </p>
                    <p className="text-[#7F6246] font-light">
                      {content.contact.address.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="text-[#909B99]" size={20} />
                  <button
                    onClick={copyPhoneNumber}
                    className="text-[#475045] font-light hover:text-[#7F6246] transition-colors cursor-pointer"
                  >
                    {content.contact.phone}
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-light text-[#475045] mb-4">
                  {content.contact.schedule.title}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-[#7F6246]">
                      {content.contact.schedule.weekdays.days}:
                    </span>
                    <span className="text-[#475045] font-light">
                      {content.contact.schedule.weekdays.hours}
                    </span>
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
                style={{ border: 0, borderRadius: "0.5rem" }}
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
            <h3 className="text-2xl font-light tracking-wider mb-4">
              {content.footer.brand}
            </h3>
            <p className="text-[#B79F8E] font-light mb-8">
              {content.footer.tagline}
            </p>
            <div className="flex justify-center space-x-6">
              <Link
                href={content.footer.social.instagram}
                className="text-[#B79F8E] hover:text-white transition-colors"
              >
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

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-[#475045] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-2 duration-300">
          <p className="text-sm font-light">Número copiado al portapapeles</p>
        </div>
      )}
    </div>
  );
}
