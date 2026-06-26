import type { Character } from '../component/character'
import { Sticker } from './Sticker'

interface DeckProps {
    characters: Character[]
}

export const Deck = ({ characters }: DeckProps) => {
    return (
        <aside className="deck">
            <h2>Figurinhas</h2>
            <div className="deck-grid">
                {characters.map(character => (
                    <Sticker key={character.id} {...character} />
                ))}
            </div>
        </aside>
    )
}