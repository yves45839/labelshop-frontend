'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";

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

  const slides = [
    { src: "/images/alarme_intrusion.jpg", desc: "Protection avancée avec nos systèmes d'alarme intrusion." },
    { src: "/images/bureau_etude.jpg", desc: "Nos experts en sécurité conçoivent des solutions adaptées à vos besoins." },
    { src: "/images/cloture_electrique.jpg", desc: "Renforcez la sécurité de votre périmètre avec nos clôtures électriques." },
    { src: "/images/connectivite_reseau.jpg", desc: "Des solutions de connectivité réseau fiables pour votre entreprise." },
    { src: "/images/controle_acces.jpg", desc: "Contrôlez l'accès à vos locaux avec nos solutions modernes." },
    { src: "/images/energie_solaire.jpg", desc: "Optez pour l'énergie solaire et sécurisez tout en économisant." },
    { src: "/images/ipbx.jpg", desc: "Des systèmes de communication IPBX performants pour vos besoins professionnels." },
    { src: "/images/portail_motorise.jpg", desc: "Motorisation de portails pour plus de confort et de sécurité." },
    { src: "/images/temps_presence.jpg", desc: "Gérez efficacement les présences et absences avec nos solutions." },
    { src: "/images/videosurveillance.jpg", desc: "Surveillez vos locaux en temps réel avec nos caméras haute définition." },
  ];

  const stats = [
    { label: "Projets livrés", value: "120+" },
    { label: "Techniciens certifiés", value: "30" },
    { label: "Années d'expertise", value: "15" },
  ];

  const pillars = [
    {
      title: "Innovation sur-mesure",
      description:
        "Nous dessinons chaque architecture de sécurité autour de vos enjeux métiers pour créer une expérience fluide et connectée.",
    },
    {
      title: "Déploiement sans friction",
      description:
        "Nos équipes interviennent rapidement et garantissent une intégration impeccable, du câblage à la formation de vos équipes.",
    },
    {
      title: "Monitoring 24/7",
      description:
        "Un centre de support proactif qui veille sur vos installations et anticipe chaque incident critique.",
    },
  ];

  const services = [
    {
      key: "videosurveillance",
      title: "Vidéosurveillance AI",
      description: "Analyse intelligente, alertes en direct et stockage sécurisé sur le cloud.",
    },
    {
      key: "controle_acces",
      title: "Contrôle d'accès connecté",
      description: "Biométrie, badges NFC et supervision centralisée pour vos sites sensibles.",
    },
    {
      key: "alarme_intrusion",
      title: "Détection périmétrique",
      description: "Capteurs intelligents et scénarios automatisés pour neutraliser toute intrusion.",
    },
    {
      key: "portail_motorise",
      title: "Portails autonomes",
      description: "Motorisation silencieuse avec contrôle mobile et planification horaire.",
    },
    {
      key: "energie_solaire",
      title: "Énergie solaire résiliente",
      description: "Des solutions hybrides pour sécuriser vos infrastructures même hors réseau.",
    },
    {
      key: "connectivite_reseau",
      title: "Backbone réseau",
      description: "WIFI pro, fibre et cybersécurité pour des communications ultra fiables.",
    },
    {
      key: "temps_presence",
      title: "Gestion du temps",
      description: "Badges, biométrie et reporting RH automatisé pour vos équipes.",
    },
    {
      key: "bureau_etude",
      title: "Bureau d'étude",
      description: "Design technique, modélisation 3D et accompagnement de bout en bout.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.get("https://labelshop-backend.onrender.com/products/get-products/")
      .then((res) => {
        const randomProducts = (res.data as Product[])
          .filter((p: Product) => p.is_online)
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setProducts(randomProducts);
      })
      .catch((error) => console.error("Erreur lors de la récupération des produits :", error));
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-56 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-pink-500 blur-3xl" />
        <div className="absolute -bottom-48 left-8 h-80 w-80 rounded-full bg-gradient-to-tr from-slate-500 via-sky-500 to-emerald-400 blur-3xl" />
        <div className="absolute bottom-32 right-6 h-72 w-72 rounded-full bg-gradient-to-t from-indigo-600 via-purple-500 to-pink-400 blur-3xl" />
      </div>

      {/* Hero section */}
      <section className="relative px-6 pb-24 pt-32 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_420px]">
          <div className="relative z-10 space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200 backdrop-blur">
              Label Retail
            </span>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              La sécurité électronique pensée pour les entreprises ultra-connectées
            </h1>
            <p className="max-w-xl text-lg text-slate-200">
              Des solutions immersives, intelligentes et évolutives pour protéger vos espaces, vos données et vos équipes partout en Côte d&apos;Ivoire.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:scale-[1.02]"
              >
                Explorer les solutions
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/40 text-xs transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white"
              >
                Découvrir notre équipe
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center shadow-2xl backdrop-blur"
                >
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent blur-2xl" />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
              {slides.map((slide, index) => (
                <motion.div
                  key={slide.src}
                  className="absolute inset-0"
                  animate={{ opacity: index === currentIndex ? 1 : 0 }}
                  transition={{ duration: 1.2 }}
                >
                  <Image src={slide.src} alt={slide.desc} fill className="object-cover" />
                  <div className="absolute inset-x-4 bottom-6 rounded-2xl bg-slate-900/70 p-4 text-sm font-medium text-slate-100 shadow-lg backdrop-blur">
                    {slide.desc}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="absolute -bottom-10 -right-6 hidden w-48 rotate-12 rounded-3xl border border-white/20 bg-white/10 p-4 text-xs text-slate-100 shadow-lg backdrop-blur md:block">
              <p className="font-semibold text-white">Trusted by industries</p>
              <p className="mt-2 text-[11px] text-slate-200/80">
                Retail, finance, énergie &amp; administrations adoptent déjà nos solutions augmentées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="relative px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Catalogue</span>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Sélection premium</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Une sélection dynamique des produits en ligne les plus plébiscités par nos clients professionnels.
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:border-white/40 hover:text-white"
            >
              Voir tout le catalogue
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.length === 0 && (
              <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-sm text-slate-300">
                Patience... Nous synchronisons nos produits phares.
              </div>
            )}
            {products.map((product) => {
              const imageUrl = product.image_1024?.startsWith("http")
                ? product.image_1024
                : `https://labelshop-backend.onrender.com${product.image_1024}`;

              return (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6 shadow-2xl backdrop-blur"
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 via-rose-500/30 to-purple-500/40" />
                  </div>
                  <Link href={`/products/${product.slug}`} className="relative z-10 block">
                    <div className="relative mx-auto h-48 w-full overflow-hidden rounded-2xl bg-slate-900/40">
                      <Image
                        src={`${imageUrl}?t=${Date.now()}`}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-contain p-4 transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-6 text-base font-semibold text-white">{product.name}</h3>
                    <p className="mt-2 text-xs text-slate-300">
                      Découvrez les caractéristiques techniques détaillées et les options d&apos;installation.
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="relative border-y border-white/10 bg-slate-900/40 px-6 py-20 backdrop-blur md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl text-center lg:text-left">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Pourquoi nous choisir</span>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Un partenaire stratégique pour vos infrastructures critiques
              </h2>
              <p className="mt-4 text-sm text-slate-300">
                De la conception à la maintenance, nous orchestrons des expériences digitales immersives qui renforcent la confiance de vos collaborateurs et de vos clients.
              </p>
            </div>
            <div className="grid w-full gap-6 lg:max-w-2xl lg:grid-cols-3">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-xl backdrop-blur"
                >
                  <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-200/90">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 text-center">
            <span className="mx-auto text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Services</span>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">Un spectre complet de technologies convergées</h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-300">
              Une équipe pluridisciplinaire pour imaginer, intégrer et faire évoluer des écosystèmes de sécurité à forte valeur ajoutée.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.key}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur transition hover:-translate-y-2 hover:border-amber-400/60"
              >
                <div className="absolute -top-32 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-500/30 via-orange-400/20 to-rose-400/30 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40">
                  <Image
                    src={`/images/${service.key}.jpg`}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="relative mt-6 text-lg font-semibold text-white">{service.title}</h3>
                <p className="relative mt-3 text-xs text-slate-200/90">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative px-6 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80 p-10 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">Prêt à transformer vos espaces en environnements intelligents ?</h2>
              <p className="mt-3 text-sm text-slate-300">
                Parlez-nous de vos enjeux : nos consultants orchestreront un plan d&apos;action concret sous 48h.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-[1.02]"
            >
              Planifier un échange
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

