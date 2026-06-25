import type { Character } from "../component/character";
import { Sticker } from "./Sticker";
import './field.css';

interface FieldProps {
    id: string
    characters: Character[]
    onCardDrop: (_cardId: string, _toFieldId: string) => void
}

export const Field = ({ id, characters, onCardDrop }: FieldProps) => {
    const dragover = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault()
    }
    const dragdrop = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault()
        const character_id = e.dataTransfer.getData('character-id')
        if (character_id) {
            onCardDrop(character_id, id)
        }
    }

    return (
        <div id={id} className="field" onDragOver={dragover} onDrop={dragdrop}>
            {characters?.map(character => <Sticker key={character.id} id={character.id} name={character.name} age={character.age} height={character.height} weight={character.weight} country={character.country} team={character.team} />)}
        </div>
    );
};