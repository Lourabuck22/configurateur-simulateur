import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Configurateur de Portes</h1>
      <p className="text-lg mb-4">
        Bienvenue dans votre outil de configuration de portes.
      </p>
      {/* Le configurateur 3D sera intégré ici */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p>Zone de configuration 3D</p>
      </div>
    </main>
  );
}