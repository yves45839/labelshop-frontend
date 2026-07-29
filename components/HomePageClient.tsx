'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import {
  FaBoxOpen,
  FaTools,
  FaClock,
  FaGraduationCap,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaCheckCircle,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import { apiUrl } from "@/lib/api";

type Product = {
  id: number;
  name: string;
  slug: string;
  image_1024?: string;
  is_online?: boolean;
};

export default function HomePageClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const slides = [
    { src: "/images/alarme_intrusion.jpg", desc: "Alarmes intrusion installées et supervisées." },
    { src: "/images/bureau_etude.jpg", desc: "Notre bureau d'études dessine la solution qui colle à votre site." },
    { src: "/images/cloture_electrique.jpg", desc: "Clôtures électriques pour protéger le périmètre." },
    { src: "/images/connectivite_reseau.jpg", desc: "Réseau d'entreprise stable, du câblage au Wi-Fi pro." },
    { src: "/images/controle_acces.jpg", desc: "Contrôle d'accès pour vos bureaux, dépôts et chantiers." },
    { src: "/images/energie_solaire.jpg", desc: "Énergie solaire pour faire tourner vos équipements sans coupure." },
    { src: "/images/ipbx.jpg", desc: "Standard IPBX pour gérer vos communications internes." },
    { src: "/images/portail_motorise.jpg", desc: "Motorisation de portails, pour ouvrir vos sites sans descendre de voiture." },
    { src: "/images/temps_presence.jpg", desc: "Suivi des présences et des absences avec LR Time." },
    { src: "/images/videosurveillance.jpg", desc: "Vidéosurveillance HD, en direct sur votre téléphone." },
  ];

  const expertisePillars = [
    {
      key: "products",
      title: "Produits",
      tagline: "Caméras, alarmes et contrôle d'accès Hikvision, plus tout l'écosystème qui va autour.",
      cta: "Voir le catalogue",
      href: "/products",
      icon: FaBoxOpen,
      accent: "amber",
    },
    {
      key: "services",
      title: "Services & Intégration",
      tagline: "De l'étude au câblage, du déploiement à la supervision 24/7. On vous livre clé en main.",
      cta: "Demander un devis",
      href: "/contact?sujet=devis",
      icon: FaTools,
      accent: "amber",
    },
    {
      key: "lrtime",
      title: "LR Time",
      tagline: "Notre logiciel de pointage et de gestion du temps, développé à Abidjan pour les entreprises ivoiriennes.",
      cta: "Voir une démo",
      href: "/lr-time",
      icon: FaClock,
      accent: "indigo",
    },
    {
      key: "formations",
      title: "Formations",
      tagline: "Techniques Hikvision, prise en main de LR Time, parcours certifiants et programmes sur mesure.",
      cta: "Voir les sessions",
      href: "/formations",
      icon: FaGraduationCap,
      accent: "amber",
    },
  ] as const;

  const trustStats = [
    { value: "12 ans", label: "à installer du Hikvision en Côte d'Ivoire" },
    { value: "350+", label: "sites sécurisés" },
    { value: "40+", label: "entreprises sur LR Time" },
    { value: "600+", label: "professionnels formés" },
  ];

  const lrTimeBenefits = [
    "Pointage par empreinte, badge ou mobile, mis à jour en temps réel.",
    "Calcul des heures, suivi des congés et exports paie automatisés.",
    "Hébergé en Côte d'Ivoire, aligné sur la réglementation locale.",
  ];

  const trainingFamilies = [
    {
      title: "Techniques Hikvision",
      description: "Installation, configuration et maintenance de la vidéosurveillance et du contrôle d'accès.",
    },
    {
      title: "Utilisateurs LR Time",
      description: "Prise en main du logiciel pour les managers, les RH et les utilisateurs finaux.",
    },
    {
      title: "Certifiantes & habilitations",
      description: "Courants faibles, sécurité électronique, habilitations électriques.",
    },
    {
      title: "Sur mesure pour entreprises",
      description: "Un programme bâti à votre demande, dispensé chez vous ou dans nos salles.",
    },
  ];

  const upcomingSessions = [
    { date: "15 juin", title: "Configuration HikCentral Pro", duration: "3 jours", location: "Plateau, Abidjan" },
    { date: "22 juin", title: "LR Time pour managers", duration: "1 jour", location: "En ligne" },
    { date: "5 juillet", title: "Habilitation B1V/H1V", duration: "2 jours", location: "Marcory, Abidjan" },
  ];

  const pillars = [
    {
      icon: FaShieldAlt,
      title: "Un seul interlocuteur, quatre expertises",
      description:
        "Plus besoin d'aligner les sous-traitants. Matériel, intégration, logiciel et formation : tout vient de chez nous.",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Ancrage local, support local",
      description:
        "Nos équipes sont à Abidjan. On intervient sous 48 h, et on répond en français pendant les heures ouvrées.",
    },
    {
      icon: FaUserGraduate,
      title: "L'autonomie par la formation",
      description:
        "Vos équipes prennent le relais. Vous dépendez moins de nous, et votre coût total baisse.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, shouldReduceMotion ? 7000 : 5000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion, slides.length]);

  useEffect(() => {
    axios.get(apiUrl("/products/get-products/"))
      .then((res) => {
        const randomProducts = (res.data as Product[])
          .filter((p: Product) => p.is_online)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setProducts(randomProducts);
      })
      .catch((error) => console.error("Erreur lors de la récupération des produits :", error));
  }, []);

  return (
    <div className="min-h-screen bg-white text-[var(--lr-navy-900)]">

      {/* ───────────── 1. HERO industriel ───────────── */}
      <section className="relative overflow-hidden lr-blueprint">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[var(--lr-steel-50)]" />
        <div className="relative lr-container py-16 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7 space-y-6">
              <div className="lr-section-heading">
                <span className="bar" />
                <span className="lr-eyebrow text-[var(--lr-orange-700)]">
                  Intégrateur certifié Hikvision · Côte d'Ivoire
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-[var(--lr-navy-900)] uppercase tracking-tight">
                Sécurité électronique &<br />
                <span className="text-[var(--lr-orange-600)]">vidéosurveillance Hikvision</span><br />
                à Abidjan.
              </h1>
              <p className="max-w-xl text-base md:text-lg text-[var(--lr-steel-700)] leading-relaxed">
                Sécuriser vos sites, suivre vos équipes, former vos techniciens : on installe vos
                caméras Hikvision, on développe <strong className="text-[var(--lr-navy-900)]">LR Time</strong> pour
                gérer vos pointages, et on forme vos équipes partout en Côte d'Ivoire.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/products" className="lr-btn-primary">
                  Voir nos solutions
                </Link>
                <Link href="/lr-time" className="lr-btn-secondary">
                  Découvrir LR Time
                </Link>
                <Link
                  href="/formations"
                  className="font-display text-sm font-semibold uppercase tracking-widest text-[var(--lr-navy-700)] hover:text-[var(--lr-orange-600)] border-b border-[var(--lr-navy-700)] hover:border-[var(--lr-orange-600)] pb-1 transition-colors"
                >
                  Voir les formations →
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 pt-4 border-t border-[var(--lr-border)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500" />
                  <span className="lr-eyebrow text-[var(--lr-steel-700)]">Support 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--lr-orange-500)]" />
                  <span className="lr-eyebrow text-[var(--lr-steel-700)]">Intervention 48 h</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--lr-navy-800)]" />
                  <span className="lr-eyebrow text-[var(--lr-steel-700)]">Hébergé en CI</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative border border-[var(--lr-navy-900)] bg-[var(--lr-navy-900)] shadow-2xl">
                {/* Header technique */}
                <div className="flex items-center justify-between bg-[var(--lr-navy-950)] border-b border-white/10 px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[var(--lr-orange-500)]" />
                    <span className="lr-mono text-[10px] text-white/60">LR-CAM-FEED · LIVE</span>
                  </div>
                  <span className="lr-mono text-[10px] text-emerald-400">● REC</span>
                </div>
                <div className="relative aspect-[4/3]">
                  {slides.map((slide, index) => (
                    <motion.div
                      key={slide.src}
                      className="absolute inset-0"
                      animate={{ opacity: index === currentIndex ? 1 : 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
                      aria-hidden={index !== currentIndex}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.desc}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 520px"
                        priority={index === 0}
                      />
                      {/* Crosshair central */}
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-px bg-[var(--lr-orange-500)]/80" />
                        <div className="absolute w-px h-8 bg-[var(--lr-orange-500)]/80" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                        <span className="lr-mono text-[10px] text-[var(--lr-orange-400)]">// {String(index + 1).padStart(2,'0')}</span>
                        <p className="text-xs md:text-sm font-medium text-white mt-0.5">{slide.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center justify-between bg-[var(--lr-navy-950)] border-t border-white/10 px-3 py-1.5">
                  <span className="lr-mono text-[10px] text-white/60">FEED {String(currentIndex + 1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</span>
                  <span className="lr-mono text-[10px] text-white/60">MOBILE · DESKTOP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 2. Bandeau de réassurance ───────────── */}
      <section className="bg-[var(--lr-navy-900)] text-white border-y border-[var(--lr-orange-500)]">
        <div className="lr-container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {trustStats.map((stat, i) => (
              <div key={stat.label} className={`px-4 py-2 ${i === 0 ? 'pl-0' : ''}`}>
                <div className="font-display text-3xl md:text-4xl font-bold text-[var(--lr-orange-400)] lr-tnum leading-none">
                  {stat.value}
                </div>
                <div className="lr-eyebrow text-white/70 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 3. 4 pôles d'expertise ───────────── */}
      <section className="lr-section">
        <div className="lr-container">
          <div className="max-w-2xl mb-12">
            <div className="lr-section-heading">
              <span className="bar" />
              <span className="lr-eyebrow text-[var(--lr-orange-700)]">Nos 4 pôles d'expertise</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
                Un partenaire qui couvre toute la chaîne
              </h2>
            </div>
            <p className="mt-4 text-sm md:text-base text-[var(--lr-steel-700)]">
              Équipement, intégration, logiciel ou formation : on commence par où vous voulez, on suit jusqu'au bout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--lr-border)] border border-[var(--lr-border)]">
            {expertisePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isLrTime = pillar.accent === "indigo";
              return (
                <motion.div
                  key={pillar.key}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  transition={{ duration: 0.15 }}
                  className={`group relative flex flex-col gap-4 p-6 transition-colors ${
                    isLrTime ? 'bg-[var(--lr-navy-900)] text-white' : 'bg-white hover:bg-[var(--lr-steel-50)]'
                  }`}
                >
                  <span className={`absolute top-0 left-0 h-0.5 w-12 ${isLrTime ? 'bg-[var(--lr-orange-500)]' : 'bg-[var(--lr-orange-500)]'}`} />
                  <span className={`lr-mono text-[10px] ${isLrTime ? 'text-white/40' : 'text-[var(--lr-steel-400)]'}`}>
                    0{idx + 1} / 04
                  </span>
                  <div className={`flex h-12 w-12 items-center justify-center text-xl border ${
                    isLrTime
                      ? 'bg-[var(--lr-orange-600)] border-[var(--lr-orange-700)] text-white'
                      : 'bg-[var(--lr-navy-900)] border-[var(--lr-navy-900)] text-white'
                  }`}>
                    <Icon />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className={`font-display text-xl font-bold uppercase tracking-wide ${isLrTime ? 'text-white' : 'text-[var(--lr-navy-900)]'}`}>
                      {pillar.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isLrTime ? 'text-white/70' : 'text-[var(--lr-steel-700)]'}`}>
                      {pillar.tagline}
                    </p>
                  </div>
                  <Link
                    href={pillar.href}
                    className={`inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-widest pt-2 border-t ${
                      isLrTime
                        ? 'text-[var(--lr-orange-400)] hover:text-white border-white/10'
                        : 'text-[var(--lr-orange-600)] hover:text-[var(--lr-navy-900)] border-[var(--lr-border)]'
                    } transition-colors`}
                  >
                    {pillar.cta}
                    <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── 4. Spotlight LR Time ───────────── */}
      <section className="lr-section bg-[var(--lr-steel-50)] border-y border-[var(--lr-border)]">
        <div className="lr-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 bg-[var(--lr-navy-900)] border border-[var(--lr-navy-800)] shadow-2xl">
            <div className="space-y-6 text-white p-8 md:p-12">
              <div className="flex items-center gap-3">
                <span className="lr-mono text-[10px] text-[var(--lr-orange-400)]">// MODULE 03</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <span className="lr-eyebrow text-[var(--lr-orange-400)]">Notre logiciel maison</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase leading-[1.05] tracking-tight">
                LR Time, le pointage et la gestion du temps adaptés à votre réalité.
              </h2>
              <p className="text-base text-white/70 leading-relaxed max-w-md">
                Pointages, congés, heures supplémentaires, exports paie : tout se pilote depuis votre navigateur,
                en temps réel, sur tous vos sites.
              </p>
              <ul className="space-y-3">
                {lrTimeBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-white/80 border-l-2 border-[var(--lr-orange-500)] pl-3">
                    <FaCheckCircle className="mt-0.5 flex-shrink-0 text-[var(--lr-orange-400)]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link href="/contact?sujet=demo" className="lr-btn-primary">
                  Demander une démo gratuite
                </Link>
                <Link
                  href="/lr-time"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/30 font-display text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                >
                  En savoir plus
                </Link>
              </div>
            </div>

            <div className="relative p-8 md:p-12 lr-blueprint-dark border-l border-white/10">
              <div className="border border-white/15 bg-black/30 backdrop-blur">
                <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                  <span className="h-2 w-2 bg-rose-400" />
                  <span className="h-2 w-2 bg-amber-400" />
                  <span className="h-2 w-2 bg-emerald-400" />
                  <span className="ml-2 lr-mono text-[10px] text-white/60">app.lr-time.ci</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between bg-white/5 border border-white/10 p-3 text-xs">
                    <span className="lr-eyebrow text-white/60">Présents aujourd'hui</span>
                    <span className="font-display font-bold text-white text-lg lr-tnum">128 / 142</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 border border-white/10 p-3 text-xs">
                    <span className="lr-eyebrow text-white/60">Heures sup. ce mois</span>
                    <span className="font-display font-bold text-[var(--lr-orange-400)] text-lg lr-tnum">+ 87 h</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 border border-white/10 p-3 text-xs">
                    <span className="lr-eyebrow text-white/60">Congés à valider</span>
                    <span className="font-display font-bold text-white text-lg lr-tnum">06</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 pt-3">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-6 ${
                          i % 7 === 5 || i % 7 === 6
                            ? "bg-white/5"
                            : i % 5 === 0
                            ? "bg-[var(--lr-orange-500)]/80"
                            : "bg-emerald-500/70"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="pt-2 text-center lr-eyebrow text-white/40">
                    Aperçu du tableau de bord
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 5. Catalogue produits phares ───────────── */}
      <section className="lr-section">
        <div className="lr-container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
            <div className="max-w-2xl">
              <div className="lr-section-heading">
                <span className="bar" />
                <span className="lr-eyebrow text-[var(--lr-orange-700)]">Catalogue</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
                  Une sélection prête à installer
                </h2>
              </div>
              <p className="mt-4 text-sm text-[var(--lr-steel-700)]">
                Les produits qu'on installe le plus souvent : stables, faciles à piloter depuis le mobile, plébiscités par nos clients pros.
              </p>
            </div>
            <Link href="/products" className="lr-btn-secondary self-start md:self-auto">
              Voir tout le catalogue
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.length === 0 && (
              <div className="col-span-full border border-dashed border-[var(--lr-border)] bg-[var(--lr-steel-50)] p-10 text-center text-sm text-[var(--lr-steel-700)]">
                <span className="lr-mono">// </span>On charge la sélection du moment…
              </div>
            )}
            {products.map((product) => {
              const imageUrl = product.image_1024 ? apiUrl(product.image_1024) : '';
              return (
                <motion.div
                  key={product.id}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  transition={{ duration: 0.15 }}
                  className="group relative flex flex-col bg-white border border-[var(--lr-border)] hover:border-[var(--lr-navy-800)] transition-colors hover:shadow-lg"
                >
                  <span className="absolute top-0 left-0 h-0.5 w-12 bg-[var(--lr-orange-500)] z-10" />
                  <Link href={`/products/${product.slug}`} className="flex-1 flex flex-col">
                    <div className="relative h-44 w-full lr-blueprint border-b border-[var(--lr-border)]">
                      <Image
                        src={`${imageUrl}?t=${Date.now()}`}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-contain p-4 transition duration-300 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 350px"
                      />
                    </div>
                    <div className="p-4 space-y-2 flex-1">
                      <span className="lr-tag lr-tag--green">Disponible</span>
                      <h3 className="font-display text-base font-bold uppercase tracking-wide text-[var(--lr-navy-900)] line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[var(--lr-steel-700)] leading-relaxed">
                        Fiche complète, options d'installation et compatibilité multi-sites.
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── 6. Catalogue formations ───────────── */}
      <section className="lr-section bg-[var(--lr-steel-50)] border-y border-[var(--lr-border)]">
        <div className="lr-container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
            <div className="max-w-2xl">
              <div className="lr-section-heading">
                <span className="bar" />
                <span className="lr-eyebrow text-[var(--lr-orange-700)]">Formations</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
                  Apprenez avec nos formateurs
                </h2>
              </div>
              <p className="mt-4 text-sm text-[var(--lr-steel-700)]">
                Quatre familles de formations, animées par des formateurs Hikvision et LR Time certifiés.
                À Abidjan ou en visio.
              </p>
            </div>
            <Link href="/formations" className="lr-btn-secondary self-start md:self-auto">
              Tout le catalogue
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingFamilies.map((family, idx) => (
              <div
                key={family.title}
                className="flex items-start gap-4 bg-white border border-[var(--lr-border)] p-5 hover:border-[var(--lr-navy-800)] transition-colors"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center bg-[var(--lr-navy-900)] text-white">
                    <FaGraduationCap />
                  </div>
                  <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">
                    0{idx + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">{family.title}</h3>
                  <p className="mt-2 text-sm text-[var(--lr-steel-700)] leading-relaxed">{family.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white border border-[var(--lr-border)] p-6 md:p-8">
            <div className="flex items-center gap-3 pb-4 border-b border-[var(--lr-border)]">
              <FaCalendarAlt className="text-[var(--lr-orange-600)]" />
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--lr-navy-900)]">Prochaines sessions ouvertes</h3>
              <span className="ml-auto lr-mono text-[10px] text-[var(--lr-steel-400)]">
                {upcomingSessions.length} sessions
              </span>
            </div>
            <ul className="divide-y divide-[var(--lr-border)]">
              {upcomingSessions.map((session) => (
                <li
                  key={session.title}
                  className="flex flex-col gap-2 py-4 text-sm text-[var(--lr-steel-700)] md:flex-row md:items-center md:justify-between hover:bg-[var(--lr-steel-50)] -mx-6 md:-mx-8 px-6 md:px-8 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="lr-mono text-xs font-bold text-[var(--lr-orange-700)] bg-[var(--lr-orange-500)]/10 border border-[var(--lr-orange-500)]/30 px-3 py-1 lr-tnum">
                      {session.date}
                    </span>
                    <span className="font-display font-semibold uppercase tracking-wide text-[var(--lr-navy-900)]">{session.title}</span>
                  </div>
                  <div className="lr-mono text-xs text-[var(--lr-steel-500)] tracking-wider">
                    {session.duration} · {session.location}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/formations" className="lr-btn-primary">
                S'inscrire à une session
                <FaArrowRight className="text-[10px] ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 7. Pourquoi Label Retail ───────────── */}
      <section className="lr-section">
        <div className="lr-container">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="lr-section-heading">
                <span className="bar" />
                <span className="lr-eyebrow text-[var(--lr-orange-700)]">Pourquoi Label Retail</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[var(--lr-navy-900)]">
                  Notre travail ne s'arrête pas à la mise en service
                </h2>
              </div>
              <p className="text-sm text-[var(--lr-steel-700)] leading-relaxed">
                On ne se contente pas de livrer du matériel. On vous laisse une exploitation sécurisée, que vos équipes
                savent piloter, et qui tient dans la durée.
              </p>
            </div>
            <div className="lg:col-span-8 grid gap-px bg-[var(--lr-border)] border border-[var(--lr-border)] md:grid-cols-3">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="bg-white p-5 relative"
                  >
                    <span className="absolute top-0 left-0 h-0.5 w-10 bg-[var(--lr-orange-500)]" />
                    <span className="lr-mono text-[10px] text-[var(--lr-steel-400)]">
                      0{idx + 1}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center bg-[var(--lr-navy-900)] text-white mt-3">
                      <Icon />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold uppercase tracking-wide text-[var(--lr-navy-900)] leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--lr-steel-700)]">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 8. Double CTA ───────────── */}
      <section className="lr-section bg-[var(--lr-navy-950)] text-white relative overflow-hidden">
        <div className="absolute inset-0 lr-blueprint-dark opacity-50" />
        <div className="lr-stripe absolute top-0 left-0 right-0" />
        <div className="relative lr-container">
          <div className="grid gap-px bg-white/10 md:grid-cols-2 max-w-5xl mx-auto border border-white/10">
            <div className="bg-[var(--lr-navy-900)] p-8 md:p-10 space-y-4 relative">
              <span className="absolute top-0 left-0 h-1 w-16 bg-[var(--lr-orange-500)]" />
              <span className="lr-mono text-[10px] text-[var(--lr-orange-400)]">// 01 — DEVIS</span>
              <div className="flex h-12 w-12 items-center justify-center bg-[var(--lr-orange-600)] text-white">
                <FaTools />
              </div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Vous avez un projet sécurité ou réseau ?</h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Étude technique, devis chiffré et plan de déploiement sous 48 h ouvrées. Dites-nous ce que vous avez sur le terrain.
              </p>
              <div className="pt-2">
                <Link href="/contact?sujet=devis" className="lr-btn-primary">
                  Demander un devis
                </Link>
              </div>
            </div>

            <div className="bg-[var(--lr-navy-900)] p-8 md:p-10 space-y-4 relative">
              <span className="absolute top-0 left-0 h-1 w-16 bg-[var(--lr-orange-500)]" />
              <span className="lr-mono text-[10px] text-[var(--lr-orange-400)]">// 02 — DÉMO</span>
              <div className="flex h-12 w-12 items-center justify-center bg-[var(--lr-orange-600)] text-white">
                <FaClock />
              </div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Vous voulez tester LR Time ?</h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Une démo de 30 min, avec des cas concrets de votre secteur. Réservez un créneau, on s'occupe du reste.
              </p>
              <div className="pt-2">
                <Link href="/contact?sujet=demo" className="lr-btn-primary">
                  Réserver une démo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
