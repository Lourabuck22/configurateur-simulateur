import React from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
            CONFIGURATEUR PRO
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-12">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Configurez et estimez votre projet de portes sur mesure
            </h1>
            <p className="text-xl text-gray-600">
              Consultez en temps réel l'estimation de vos portes personnalisées,
              avec un accompagnement professionnel pour votre projet.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              CRÉER VOTRE PROJET
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[500px] bg-gray-100 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Image de présentation</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { title: "Bureau", icon: "🏢" },
              { title: "Salon", icon: "🛋️" },
              { title: "Entrée", icon: "🚪" },
              { title: "Cuisine", icon: "🍳" },
              { title: "Escalier", icon: "🏃" }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center space-y-3 p-4 text-center">
                <span className="text-3xl">{feature.icon}</span>
                <span className="text-sm font-medium text-gray-700">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}