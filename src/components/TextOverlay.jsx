import React from 'react';
import { Scroll } from '@react-three/drei';

const TextOverlay = () => {
  return (
    <Scroll html>
      <div className="scroll-container">
        
        <section id="section1" className="scroll-section section1">
          <h1 className="section-title">Vos bijoux ont une histoire. Prolongez-la.</h1>
          <p className="section-text">
            Chez L'Atelier, nous comprenons que chaque bijou est unique et chargé de sens. 
            Confiez-nous vos pièces les plus précieuses pour un travail minutieux et passionné.
          </p>
          <button>Demander un devis gratuit</button>
        </section>

        <section id="section2" className="scroll-section section2">
          <h1 className="section-title">Ce que nous pouvons faire pour vous</h1>
          <ul className="section-text">
            <li>Réparation de chaînes et de fermoirs <span role="img" aria-label="chaine">🔗</span></li>
            <li>Sertissage de pierres <span role="img" aria-label="pierre">💎</span></li>
            <li>Polissage et nettoyage <span role="img" aria-label="polissage">✨</span></li>
            <li>Mise à taille des bagues <span role="img" aria-label="bague">💍</span></li>
          </ul>
        </section>

        <section id="section3" className="scroll-section section3">
          <h1 className="section-title">Comment ça marche ?</h1>
          <ol className="section-text">
            <li><strong>Contactez-nous :</strong> Envoyez une photo de votre bijou via notre formulaire sécurisé.</li>
            <li><strong>Recevez votre devis :</strong> Notre équipe vous recontacte sous 48h avec une estimation détaillée.</li>
            <li><strong>Rendez-vous et réparation :</strong> Une fois le devis accepté, nous fixons un rendez-vous pour la remise en état de votre bijou.</li>
          </ol>
        </section>

        <section id="section4" className="scroll-section section4">
          <h1 className="section-title">Quelques-unes de nos réalisations</h1>
          <div className="portfolio-grid">
            <div className="portfolio-item">
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" 
                alt="Bague restaurée" 
              />
              <p>Restauration d'une bague en or blanc avec ajout de diamants sertis.</p>
            </div>
            <div className="portfolio-item">
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" 
                alt="Collier réparé" 
              />
              <p>Réparation d'un collier ancien avec remise en état du fermoir et polissage.</p>
            </div>
            <div className="portfolio-item">
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" 
                alt="Boucles d'oreilles rénovées" 
              />
              <p>Remise à neuf de boucles d’oreilles vintage avec sertissage de pierres précieuses.</p>
            </div>
          </div>
        </section>

      </div>
    </Scroll>
  );
};

export default TextOverlay;
