import type { Character } from '../component/character'
import { Sticker } from './Sticker'
import './Deck.css'

interface DeckProps {
    characters: Character[]
}

export const Deck = ({ characters }: DeckProps) => {
    return (
        <aside className="deck">
            <div className="deck-label">
                <span className="deck-label-text">Figurinhas</span>
                <span className="deck-count">{characters.length}</span>
            </div>

            <div className="deck-stack">
                {/* Cartas fantasmas empilhadas atrás */}
                {characters.length > 2 && (
                    <>
                        <div className="deck-ghost deck-ghost--3" />
                        <div className="deck-ghost deck-ghost--2" />
                        <div className="deck-ghost deck-ghost--1" />
                    </>
                )}
                {characters.length > 1 && <div className="deck-ghost deck-ghost--1" />}

                {/* Figurinha do topo — interativa */}
                {characters.length > 0 ? (
                    <div className="deck-top">
                        <Sticker key={characters[0].id} {...characters[0]} />
                    </div>
                ) : (
                    <div className="deck-empty">
                        <span>Sem figurinhas</span>
                    </div>
                )}
            </div>
        </aside>
    )
}