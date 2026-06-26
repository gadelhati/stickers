import { useState } from "react"
import { type Character, initialCharacter } from "../component/character"
import { type AlbumPage } from "../component/album"
import { initialCountry } from "../component/country"
import { initialTeam } from "../component/team"
import { Deck } from "./Deck"
import { Album } from "./Album"

export const Desk = () => {
    const [deck, setDeck] = useState<Character[]>([
        initialCharacter,
        // ...
    ])

    const [pages, setPages] = useState<AlbumPage[]>([
        {
            country: initialCountry,
            sections: [
                {
                    team: initialTeam,
                    slots: [
                        { expectedId: '001' },
                        { expectedId: '002' },
                    ]
                }
            ]
        }
    ])

    const dropOnSlot = (characterId: string, expectedId: string): void => {
        if (characterId !== expectedId) return

        const character = deck.find(c => c.id === characterId)
        if (!character) return

        setDeck(prev => prev.filter(c => c.id !== characterId))
        setPages(prev => prev.map(page => ({
            ...page,
            sections: page.sections.map(section => ({
                ...section,
                slots: section.slots.map(slot =>
                    slot.expectedId === expectedId
                        ? { ...slot, character }
                        : slot
                )
            }))
        })))
    }

    return (
        <main className="desk">
            <Deck characters={deck} />
            <Album pages={pages} onDrop={dropOnSlot} />
        </main>
    )
}