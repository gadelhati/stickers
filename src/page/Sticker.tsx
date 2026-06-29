import { type JSX } from 'react';
import { type Character } from '../component/character';
import cup from '../assets/logo-cup-white.png';
import photo from '../assets/gael_photo.png';
import uniform from '../assets/uniform.png';
import panini from '../assets/panini-logo.svg';
import flag from '../assets/flagBrazil.webp';
import back from '../assets/logo-cup-black.png';
import './Sticker.css';
import { usePosition } from '../hook/usePosition';

interface StickerProps extends Character {
    /**
     * Ativa o efeito parallax + flip ao clicar.
     * Só deve ser true dentro do StickerPack.
     * Default: false
     */
    interactive?: boolean
    /** Ref do container para calcular posição relativa do mouse */
    containerRef?: React.RefObject<HTMLElement | null>
}

export const Sticker = ({
    id, name, age, height, weight, country, team,
    interactive = false,
    containerRef,
}: StickerProps): JSX.Element => {

    const { movement } = usePosition({ enabled: interactive, containerRef })

    // Modo interativo: parallax + draggable
    // Modo passivo: transform neutro, não draggable
    const cardStyle = interactive
        ? { ...movement }
        : { transform: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }

    const dragstart = (e: React.DragEvent<HTMLDivElement>): void => {
        const target = e.currentTarget as HTMLDivElement
        e.dataTransfer.setData('character-id', target.id)
    }

    return (
        <article
            id={id}
            style={cardStyle}
            className={`card${interactive ? ' card--interactive' : ''}`}
            draggable={!interactive}
            onDragStart={!interactive ? dragstart : undefined}
        >
            <section className="sticker front">
                <header><img src={cup} alt="Taça 2026" /></header>

                <center>
                    <svg className="six year" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 327.24 412.75 309.56">
                        <path fill={team.colorTwo} d="M309.56 327.24H103.19C46.2 327.24 0 373.44 0 430.43v103.19c0 56.99 46.2 103.19 103.19 103.19h206.37c56.99 0 103.19-46.2 103.19-103.19s-46.2-103.19-103.19-103.19h103.19c0-56.99-46.2-103.19-103.19-103.19" />
                    </svg>
                    <svg className="two year" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412.75 309.56">
                        <path fill={team.colorOne} d="M309.56 0H103.19C46.2 0 0 46.2 0 103.19h103.19C46.2 103.19 0 149.38 0 206.37v103.19h412.75V206.37H309.56c56.99 0 103.19-46.2 103.19-103.19S366.55 0 309.56 0" />
                    </svg>
                    <img className="photo" src={photo} alt="Photo" />
                    <img className="uniform" src={uniform} alt="Uniform" />
                </center>

                <footer>
                    <section className="player">
                        <span className="character">
                            <span className="name">{name.toUpperCase()}</span><br />
                            {age} | {height.toFixed(2).replace('.', ',')}m | {weight}kg
                        </span>
                        <span className="country">
                            <span className="flag"><img src={flag} alt="Flag" /></span>
                            <span className="code">{country.code.toUpperCase()}</span>
                        </span>
                    </section>
                    <section className="team">
                        <span>{team.name.toUpperCase()} ({country.code.toUpperCase()})</span>
                        <img src={panini} alt="Panini" />
                    </section>
                </footer>
            </section>

            <section className="sticker back" style={interactive ? { backgroundColor: movement.backgroundColor } : {}}>
                <img src={back} alt='Card back image' />
            </section>
        </article>
    )
}