import { forwardRef } from 'react'
import type { Character } from '../component/character'
import { Sticker } from './Sticker'
import './Deck.css'

interface DeckProps {
    characters: Character[]
}

export const Deck = forwardRef<HTMLElement, DeckProps>(({ characters }, ref) => {
    const ghostCount = Math.min(characters.length - 1, 3)

    return (
        <aside className="deck" ref={ref}>
            <div className="deck-label">
                <span className="deck-label-text">Figurinhas</span>
                <span className="deck-count">{characters.length}</span>
            </div>

            <div className="deck-stack">
                {Array.from({ length: ghostCount }).map((_, i) => (
                    <div key={i} className={`deck-ghost deck-ghost--${i + 1}`} />
                ))}

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
})

Deck.displayName = 'Deck'