import { useState } from 'react';
import { initialCharacter } from '../component/character';
import cup from '../assets/logo-cup-white.png';
import photo from '../assets/photo.png';
import uniform from '../assets/uniform.png';
import panini from '../assets/panini-logo.svg';
import flag from '../assets/flagBrazil.webp';
import './sticker.css';

export const StickerPage = () => {
   const [character, ] = useState(initialCharacter);
   return (
      <article className="sticker">
         <header><img src={cup} alt="Taça 2026" /></header>

         <center className="photo">
            <img src={uniform} alt="Photo" />
         </center>

         <footer>
            <section className="player">
               <span className="character">
                  <span className="name">{character.name.toUpperCase()}</span><br />
                  {character.age} | {character.height.toFixed(2).replace('.', ',')}m | {character.weight}kg
               </span>
               <span className="country">
                  <span className="flag"><img src={flag} alt="Flag"/></span>
                  <span className="code">{character.country.code.toUpperCase()}</span>
               </span>
            </section>
            <section className="team">
               <span>{character.team.name.toUpperCase()} ({character.country.code.toUpperCase()})</span>
               <img src={panini} alt="Panini"/>
            </section>
         </footer>   
      </article>
   )
}