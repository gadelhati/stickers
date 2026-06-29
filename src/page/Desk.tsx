import { useState, useRef } from "react"
import { type Character, initialCharacter } from "../component/character"
import { type AlbumPage } from "../component/album"
import { initialCountry } from "../component/country"
import { initialTeam } from "../component/team"
import { Deck } from "./Deck"
import { Album } from "./Album"
import { StickerPack } from "./StickerPack"
import './Desk.css'

export const Desk = () => {
    const deckRef = useRef<HTMLElement>(null)

    const [deck, setDeck] = useState<Character[]>([
        initialCharacter,
        {
            id: '002',
            name: 'Pedro Alves',
            age: 24,
            height: 1.82,
            weight: 78,
            country: initialCountry,
            team: { id: '002', name: 'Fluminense', colorOne: '#8B0000', colorTwo: '#228B22' },
            photo: '',
        },
        {
            id: '003',
            name: 'Lucas Santos',
            age: 27,
            height: 1.75,
            weight: 72,
            country: initialCountry,
            team: { id: '003', name: 'Palmeiras', colorOne: '#006400', colorTwo: '#F5F5F5' },
            photo: '',
        },
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
                        { expectedId: '003' },
                        { expectedId: '004' },
                        { expectedId: '005' },
                        { expectedId: '006' },
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

    const addToDeck = (characters: Character[]) => {
        setDeck(prev => [...prev, ...characters])
    }

    const existingIds = deck.map(c => c.id)

    return (
        <div className="desk-room">
            <div className="desk">
                <div className="desk-surface" />
                <div className="desk-content">
                    {/* Coluna esquerda: deck + pack */}
                    <div className="desk-left-col">
                        <Deck ref={deckRef} characters={deck} />
                        <StickerPack
                            deckRef={deckRef}
                            onAddToDeck={addToDeck}
                            existingIds={existingIds}
                        />
                    </div>
                    <Album pages={pages} onDrop={dropOnSlot} />
                </div>
            </div>
        </div>
    )
}