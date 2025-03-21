"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

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
        const randomProducts = res.data.sort(() => 0.5 - Math.random()).slice(0, 5);
        setProducts(randomProducts);
      })
      .catch((error) => console.error("Erreur lors de la récupération des produits :", error));
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Carousel avec description */}
      <div className="relative w-full h-96 overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute w-full h-full flex flex-col items-center justify-center text-center"
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <Image src={slide.src} alt={slide.desc} fill className="object-cover opacity-80" />
            <div className="absolute bottom-10 bg-black/60 text-white px-4 py-2 rounded">
              {slide.desc}
            </div>
          </motion.div>
        ))}
      </div>


      {/* Section Services en mosaïque */}
      <section className="bg-orange-50 py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">Services</h2>
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
                alt={img.replace("_", " ")}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 bg-black/50 text-white w-full text-xs text-center py-1">
                {img.replace("_", " ").replace("_", " ")}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
