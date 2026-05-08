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
    { src: "/images/alarme_intrusion.jpg", desc: "Protection avancée avec nos systèmes d'alarme intrusion." },
    { src: "/images/bureau_etude.jpg", desc: "Nos experts en sécurité conçoivent des solutions adaptées à vos besoins." },
    { src: "/images/cloture_electrique.jpg", desc: "Renforcez la sécurité de votre périmètre avec nos clôtures électriques." },
    { src: "/images/connectivite_reseau.jpg", desc: "Des solutions de connectivité réseau fiables pour votre entreprise." },
    { src: "/images/controle_acces.jpg", desc: "Contrôlez l'accès à vos locaux avec nos solutions modernes." },
    { src: "/images/energie_solaire.jpg", desc: "Optez pour l'énergie solaire et sécurisez tout en économisant." },
    { src: "/images/ipbx.jpg", desc: "Des systèmes de communication IPBX performants pour vos besoins professionnels." },
    { src: "/images/portail_motorise.jpg", desc: "Motorisation de portails pour plus de confort et de sécurité." },
    { src: "/images/temps_presence.jpg", desc: "Gérez efficacement les présences et absences avec LR Time." },
    { src: "/images/videosurveillance.jpg", desc: "Surveillez vos locaux en temps réel avec nos caméras haute définition." },
  ];

  // 4 pôles d'expertise — section pivot de la home
  const expertisePillars = [
    {
      key: "products",
      title: "Produits",
      tagline: "Caméras, alarmes, contrôle d'accès Hikvision et solutions périphériques certifiées.",
      cta: "Voir le catalogue",
      href: "/products",
      icon: FaBoxOpen,
      accent: "amber",
    },
    {
      key: "services",
      title: "Services & Intégration",
      tagline: "Étude, câblage, déploiement, supervision 24/7. Du plan technique à la mise en service.",
      cta: "Demander un devis",
      href: "/contact?sujet=devis",
      icon: FaTools,
      accent: "amber",
    },
    {
      key: "lrtime",
      title: "LR Time",
      tagline: "Notre SaaS de pointage et de gestion du temps, pensé pour le marché africain.",
      cta: "Lancer une démo",
      href: "/lr-time",
      icon: FaClock,
      accent: "indigo",
    },
    {
      key: "formations",
      title: "Formations",
      tagline: "Techniques Hikvision, utilisateurs LR Time, certifiantes et programmes sur-mesure.",
      cta: "Voir les sessions",
      href: "/formations",
      icon: FaGraduationCap,
      accent: "amber",
    },
  ] as const;

  // Bandeau de réassurance — chiffres clés (à ajuster avec les vrais chiffres)
  const trustStats = [
    { value: "+12 ans", label: "d'expertise Hikvision en Côte d'Ivoire" },
    { value: "350+", label: "sites sécurisés" },
    { value: "40+", label: "entreprises sur LR Time" },
    { value: "600+", label: "professionnels formés" },
  ];

  // Bénéfices LR Time pour le spotlight
  const lrTimeBenefits = [
    "Pointage biométrique, badge ou mobile, en temps réel.",
    "Calculs d'heures, congés et exports paie automatisés.",
    "Hébergé localement, conforme à la réglementation ivoirienne.",
  ];

  // 4 familles de formations
  const trainingFamilies = [
    {
      title: "Techniques Hikvision",
      description: "Installation, configuration et maintenance des produits de vidéosurveillance et contrôle d'accès.",
    },
    {
      title: "Utilisateurs LR Time",
      description: "Prise en main du logiciel pour managers, RH et utilisateurs finaux.",
    },
    {
      title: "Certifiantes & habilitations",
      description: "Courants faibles, sécurité électronique, habilitations électriques.",
    },
    {
      title: "Sur-mesure entreprises",
      description: "Programmes adaptés à la demande, déployés chez vous ou en salle.",
    },
  ];

  // Sessions à venir — en dur pour démarrer, à brancher ensuite sur une route API
  const upcomingSessions = [
    { date: "15 juin", title: "Configuration HikCentral Pro", duration: "3 jours", location: "Plateau, Abidjan" },
    { date: "22 juin", title: "LR Time pour managers", duration: "1 jour", location: "En ligne" },
    { date: "5 juillet", title: "Habilitation B1V/H1V", duration: "2 jours", location: "Marcory, Abidjan" },
  ];

  // Pillars repositionnés (pourquoi Label Retail)
  const pillars = [
    {
      icon: FaShieldAlt,
      title: "Un seul interlocuteur, quatre expertises",
      description:
        "Fini les sous-traitants empilés : matériel, intégration, logiciel et formation, le tout chez nous.",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Ancrage local, support local",
      description:
        "Équipes basées à Abidjan, intervention sous 48h, support en français à toute heure ouvrée.",
    },
    {
      icon: FaUserGraduate,
      title: "Continuité par la formation",
      description:
        "Vos équipes deviennent autonomes : moins de dépendance, moins de coût total de possession.",
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
    <main className="min-h-screen bg-white text-slate-900">
      {/* ───────────────────────────── Section 1 — Hero recadré ───────────────────────────── */}
      <section className="px-6 pb-16 pt-24 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-screen-xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              Label Retail • Intégrateur certifié Hikvision
            </span>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Sécurité électronique, gestion du temps et formations certifiantes — sous un seul toit en Côte d'Ivoire.
            </h1>
            <p className="max-w-xl text-lg text-slate-700">
              De la caméra Hikvision installée sur votre site à la solution <strong>LR Time</strong> qui pilote vos pointages,
              jusqu'aux sessions certifiantes pour vos équipes : un partenaire local, quatre expertises.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                Explorer les solutions
              </Link>
              <Link
                href="/lr-time"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Découvrir LR Time
              </Link>
              <Link
                href="/formations"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
              >
                Voir les formations
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-xl">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[16/10]">
                {slides.map((slide, index) => (
                  <motion.div
                    key={slide.src}
                    className="absolute inset-0"
                    animate={{ opacity: index === currentIndex ? 1 : 0 }}
                    transition={{ duration: shouldReduceMotion ? 0.2 : 0.9 }}
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
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent p-4 text-sm font-medium text-white">
                      {slide.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
              <span>Visualisation {currentIndex + 1} / {slides.length}</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">Compatibilité multi-plateforme</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── Section 2 — Bandeau de réassurance ───────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-900 px-6 py-10 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-6 text-center md:grid-cols-4">
          {trustStats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="text-3xl font-bold text-amber-400 md:text-4xl">{stat.value}</div>
              <div className="text-xs uppercase tracking-wider text-slate-300 md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────────── Section 3 — Les 4 pôles d'expertise ───────────────────────────── */}
      <section className="px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Nos 4 pôles d'expertise</span>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Un seul partenaire pour toute votre chaîne</h2>
            <p className="mt-3 text-sm text-slate-700">
              Choisissez votre point d'entrée : équipement, intégration, logiciel SaaS ou formation des équipes.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {expertisePillars.map((pillar) => {
              const Icon = pillar.icon;
              const isLrTime = pillar.accent === "indigo";
              return (
                <motion.div
                  key={pillar.key}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 240, damping: 20 }}
                  className={`group flex flex-col gap-4 rounded-2xl border p-6 shadow-sm transition ${
                    isLrTime
                      ? "border-indigo-200 bg-indigo-50 hover:border-indigo-400"
                      : "border-slate-200 bg-white hover:border-amber-300"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${
                      isLrTime ? "bg-indigo-600 text-white" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    <Icon />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                    <p className="text-sm text-slate-700">{pillar.tagline}</p>
                  </div>
                  <Link
                    href={pillar.href}
                    className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold transition ${
                      isLrTime ? "text-indigo-700 hover:text-indigo-900" : "text-amber-700 hover:text-amber-900"
                    }`}
                  >
                    {pillar.cta}
                    <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────── Section 4 — Spotlight LR Time ───────────────────────────── */}
      <section className="px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 px-6 py-12 shadow-2xl md:px-12 md:py-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6 text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-100">
                Notre logiciel maison
              </span>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                LR Time : la gestion du temps et des présences pensée pour l'Afrique.
              </h2>
              <p className="text-base text-indigo-100">
                Plus qu'une badgeuse : un SaaS complet pour piloter pointages, congés et exports paie depuis votre navigateur,
                en temps réel, sur tous vos sites.
              </p>
              <ul className="space-y-3">
                {lrTimeBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-indigo-50">
                    <FaCheckCircle className="mt-0.5 flex-shrink-0 text-amber-400" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/contact?sujet=demo"
                  className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-amber-400"
                >
                  Demander une démo gratuite
                </Link>
                <Link
                  href="/lr-time"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  En savoir plus
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs text-indigo-100">app.lr-time.ci</span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-white/5 p-3 text-xs text-indigo-100">
                    <span>Présents aujourd'hui</span>
                    <span className="font-semibold text-white">128 / 142</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/5 p-3 text-xs text-indigo-100">
                    <span>Heures sup. ce mois</span>
                    <span className="font-semibold text-amber-300">+ 87 h</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/5 p-3 text-xs text-indigo-100">
                    <span>Congés à valider</span>
                    <span className="font-semibold text-white">6</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 pt-2">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-6 rounded ${
                          i % 7 === 5 || i % 7 === 6
                            ? "bg-white/5"
                            : i % 5 === 0
                            ? "bg-amber-400/70"
                            : "bg-emerald-400/60"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="pt-2 text-center text-[10px] uppercase tracking-wider text-indigo-200">
                    Aperçu indicatif du tableau de bord
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── Section 5 — Catalogue produits phares ───────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50 px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Catalogue</span>
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Sélection prête à déployer</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-700">
                Produits en ligne mis en avant pour leur stabilité, leur support mobile et leur popularité chez nos clients pros.
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-800 hover:border-slate-400 hover:text-slate-900"
            >
              Voir tout le catalogue
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-700">
                Patience... Nous synchronisons nos produits phares.
              </div>
            )}
            {products.map((product) => {
              const imageUrl = product.image_1024 ? apiUrl(product.image_1024) : '';
              return (
                <motion.div
                  key={product.id}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  transition={{ type: "spring", stiffness: 240, damping: 20 }}
                  className="group relative flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
                >
                  <Link href={`/products/${product.slug}`} className="space-y-4">
                    <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-100">
                      <Image
                        src={`${imageUrl}?t=${Date.now()}`}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-contain p-4 transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 350px"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                        Disponible
                      </span>
                      <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
                      <p className="text-sm text-slate-700">
                        Fiche détaillée, options d'installation et compatibilité multi-site.
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────── Section 6 — Catalogue formations ───────────────────────────── */}
      <section className="px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Formations</span>
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Montez en compétence avec nos formateurs</h2>
              <p className="mt-2 text-sm text-slate-700">
                Catalogue construit autour de quatre familles, animé par des formateurs Hikvision et LR Time certifiés,
                à Abidjan ou en distanciel.
              </p>
            </div>
            <Link
              href="/formations"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-800 hover:border-slate-400 hover:text-slate-900"
            >
              Tout le catalogue
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {trainingFamilies.map((family) => (
              <div
                key={family.title}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-300 hover:shadow-md"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <FaGraduationCap />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{family.title}</h3>
                  <p className="mt-1 text-sm text-slate-700">{family.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-amber-700" />
              <h3 className="text-lg font-semibold text-slate-900">Prochaines sessions ouvertes</h3>
            </div>
            <ul className="mt-5 divide-y divide-slate-200">
              {upcomingSessions.map((session) => (
                <li
                  key={session.title}
                  className="flex flex-col gap-2 py-4 text-sm text-slate-700 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                      {session.date}
                    </span>
                    <span className="font-semibold text-slate-900">{session.title}</span>
                  </div>
                  <div className="text-xs text-slate-600 md:text-sm">
                    {session.duration} • {session.location}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/formations"
                className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-amber-700"
              >
                S'inscrire à une session
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── Section 7 — Pourquoi Label Retail ───────────────────────────── */}
      <section className="border-y border-slate-200 bg-white px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Pourquoi Label Retail</span>
              <h2 className="text-3xl font-semibold md:text-4xl">L'intégrateur qui pense aussi à l'après-installation</h2>
              <p className="text-sm text-slate-700">
                Notre objectif n'est pas de vendre une caméra, c'est de rendre votre exploitation autonome, sécurisée et
                pilotable, de bout en bout.
              </p>
            </div>
            <div className="grid w-full gap-4 lg:max-w-2xl lg:grid-cols-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      <Icon />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── Section 8 — Double CTA ───────────────────────────── */}
      <section className="px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-8 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <FaTools />
            </div>
            <h2 className="text-2xl font-semibold">Vous avez un projet sécurité ou réseau ?</h2>
            <p className="text-sm text-slate-700">
              Étude technique, devis chiffré et plan de déploiement sous 48h ouvrées. Parlez-nous de vos contraintes terrain.
            </p>
            <div>
              <Link
                href="/contact?sujet=devis"
                className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-amber-700"
              >
                Demander un devis
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-8 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <FaClock />
            </div>
            <h2 className="text-2xl font-semibold">Vous voulez tester LR Time ?</h2>
            <p className="text-sm text-slate-700">
              Démo de 30 min, données de votre secteur, scénarios concrets. Réservez un créneau, on s'occupe du reste.
            </p>
            <div>
              <Link
                href="/contact?sujet=demo"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-indigo-700"
              >
                Réserver une démo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
