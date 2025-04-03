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

export default function Home() {
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
    { src: "/images/videosurveillance.jpg", desc: "Surveillez vos locaux en temps réel avec nos caméras haute définition." }
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
    <main className="min-h-screen bg-white text-gray-900">
      {/* 🎞 Carousel */}
      <div className="relative w-full h-96 overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute w-full h-full flex flex-col items-center justify-center text-center"
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <Image src={slide.src} alt={slide.desc} fill className="object-cover opacity-80" />
            <div className="absolute bottom-10 bg-black/60 text-white px-6 py-3 rounded text-sm md:text-base max-w-md">
              {slide.desc}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ⭐ Produits en vedette */}
      <section className="py-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Produits en vedette</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => {
            const imageUrl = product.image_1024?.startsWith('http')
              ? product.image_1024
              : `https://labelshop-backend.onrender.com${product.image_1024}`;

            return (
              <div key={product.id} className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition">
                <Link href={`/products/${product.slug}`}>
                  <Image
                    src={`${imageUrl}?t=${Date.now()}`}
                    alt={product.name}
                    width={300}
                    height={200}
                    unoptimized
                    className="w-full h-40 object-contain rounded"
                  />
                  <h3 className="mt-3 font-semibold text-sm text-gray-800">{product.name}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🧠 Pourquoi choisir nous */}
      <section className="bg-blue-50 py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-8">Pourquoi choisir Label Retail ?</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-bold text-orange-600 mb-2">Expertise reconnue</h3>
            <p>Des dizaines de projets réussis en Côte d'Ivoire.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-bold text-orange-600 mb-2">Solutions sur mesure</h3>
            <p>Nous analysons chaque besoin pour proposer des systèmes adaptés, fiables et évolutifs.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-bold text-orange-600 mb-2">Service client premium</h3>
            <p>Support agrée HIKVISION.</p>
          </div>
        </div>
      </section>

      {/* 🧩 Mosaïque services */}
      <section className="bg-orange-50 py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">Nos services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "videosurveillance",
            "controle_acces",
            "alarme_intrusion",
            "portail_motorise",
            "cloture_electrique",
            "energie_solaire",
            "connectivite_reseau",
            "temps_presence",
            "ipbx",
            "bureau_etude"
          ].map((img, idx) => (
            <div key={idx} className="relative w-full h-40 overflow-hidden rounded-lg group">
              <Image
                src={`/images/${img}.jpg`}
                alt={img.replace(/_/g, " ")}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 bg-black/50 text-white w-full text-xs text-center py-1 capitalize">
                {img.replace(/_/g, " ")}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
