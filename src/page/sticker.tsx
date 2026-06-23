import { useState } from 'react';
import { initialCharacter, type Character } from '../component/character';
import cup from '../assets/logo-cup-white.png';
// import photo from '../assets/photo.png';
import uniform from '../assets/uniform.png';
import panini from '../assets/panini-logo.svg';
import flag from '../assets/flagBrazil.webp';
import back from '../assets/logo-cup-black.png';
import './sticker.css';
import { usePosition } from '../hook/usePosition';

export const StickerPage = () => {
   const [character,] = useState<Character>(initialCharacter);
   const { movement } = usePosition();
   const [isFlipped, setIsFlipped] = useState(false);
   const cardStyle = {
      ...movement,
      transform: `${movement.transform} rotateY(${isFlipped ? 180 : 0}deg)`
   };

   return (
      <article style={cardStyle} id="card" onClick={() => setIsFlipped(!isFlipped)}>
         <section className="sticker front">
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
                     <span className="flag"><img src={flag} alt="Flag" /></span>
                     <span className="code">{character.country.code.toUpperCase()}</span>
                  </span>
               </section>
               <section className="team">
                  <span>{character.team.name.toUpperCase()} ({character.country.code.toUpperCase()})</span>
                  <img src={panini} alt="Panini" />
               </section>
            </footer>
         </section>

         <section className="sticker back">
            <center>
               <img src={back} alt='Card back image' />
            </center>
         </section>
      </article>
   )
}
