import { useState } from 'react';
import { initialCharacter } from '../component/character';
import cup from '../assets/logo-cup.png';
import photo from '../assets/photo.png';
import uniform from '../assets/uniform.png';
import panini from '../assets/panini-logo.svg';
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
            <section className="character">
               <span className="name">{character.name.toUpperCase()}</span><br />
               {character.age} | {character.height.toFixed(2).replace('.', ',')}m | {character.weight}kg
            </section>
            <div className="team">
               <span>{character.team.name} ({character.country.code})</span>
               <img src={panini} alt="Panini"/>
            </div>
         </footer>   
      </article>
   )
}