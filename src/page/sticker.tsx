import { useState } from 'react';
import { initialCharacter, type Character } from '../component/character';
import cup from '../assets/logo-cup-white.png';
import photo from '../assets/photo.png';
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
               <svg className="six year" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 327.24 412.75 309.56">
                  <path fill={character.team.colorTwo} d="M309.56 327.24H103.19C46.2 327.24 0 373.44 0 430.43v103.19c0 56.99 46.2 103.19 103.19 103.19h206.37c56.99 0 103.19-46.2 103.19-103.19s-46.2-103.19-103.19-103.19h103.19c0-56.99-46.2-103.19-103.19-103.19"/>
               </svg>
               <svg className="two year" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412.75 309.56" >
                  <path fill={character.team.colorOne} d="M309.56 0H103.19C46.2 0 0 46.2 0 103.19h103.19C46.2 103.19 0 149.38 0 206.37v103.19h412.75V206.37H309.56c56.99 0 103.19-46.2 103.19-103.19S366.55 0 309.56 0"/>
               </svg>
               <img src={photo} alt="Photo" />
               <img src={uniform} alt="Uniform" />
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

         <section className="sticker back" style={{ backgroundColor: movement.backgroundColor }}>
            <img src={back} alt='Card back image' />
         </section>
      </article>
   )
}
