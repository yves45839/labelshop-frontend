'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
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
    { src: "/images/temps_presence.jpg", desc: "Gérez efficacement les présences et absences avec nos solutions." },
    { src: "/images/videosurveillance.jpg", desc: "Surveillez vos locaux en temps réel avec nos caméras haute définition." },
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
    }, shouldReduceMotion ? 7000 : 5000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion, slides.length]);

  useEffect(() => {
    axios.get(apiUrl("/products/get-products/"))
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
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero section */}
      <section className="px-6 pb-16 pt-24 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-screen-xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              Label Retail • Hikvision
            </span>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              No 1 des solutions Hikvision en Côte d'Ivoire
            </h1>
            <p className="max-w-xl text-lg text-slate-700">
              Sécurité électronique lisible et performante sur tous vos écrans : caméras, alarmes et contrôle d'accès Hikvision installés et maintenus par une équipe locale certifiée.
            </p>
            <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2 rounded-xl bg-slate-50 p-3">
                <span aria-hidden className="mt-1 text-amber-600">•</span>
                Service officiel Hikvision en Côte d'Ivoire pour des déploiements sans surprise.
              </li>
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                Explorer les solutions
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
              >
                Découvrir notre équipe
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
                    <Image src={slide.src} alt={slide.desc} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 520px" priority={index === 0} />
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

      {/* Featured products */}
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
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-800 hover:border-slate-400 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
            >
              Voir tout le catalogue
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      {/* Why us */}
      <section className="px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Pourquoi nous choisir</span>
              <h2 className="text-3xl font-semibold md:text-4xl">Un partenaire qui priorise la lisibilité</h2>
              <p className="text-sm text-slate-700">
                Chaque service est pensé pour rester performant sur mobile et bureau, avec des informations claires et indexables.
              </p>
            </div>
            <div className="grid w-full gap-4 lg:max-w-2xl lg:grid-cols-3">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-slate-200 bg-white px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col gap-3 text-center">
            <span className="mx-auto text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Services</span>
            <h2 className="text-3xl font-semibold md:text-4xl">Technologies prêtes pour tous les supports</h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-700">
              Visualisez en un coup d'œil les offres phares, sans surcharge : idéal pour les décideurs mobiles et les équipes terrain.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.key}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-amber-200 hover:bg-amber-50"
              >
                <div className="relative h-36 w-full overflow-hidden rounded-xl bg-white">
                  <Image
                    src={`/images/${service.key}.jpg`}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 260px"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="text-sm text-slate-700">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-gradient-to-r from-amber-50 via-white to-amber-50 p-10 shadow-lg">
          <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold md:text-4xl">Planifions une démonstration fluide</h2>
              <p className="text-sm text-slate-700">
                Expliquez vos contraintes d'usage : nous préparons un parcours clair et compatible multi-plateforme en moins de 48h.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              Planifier un échange
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
