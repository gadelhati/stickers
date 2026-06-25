import { useState } from "react"
import { initialCharacter, type Character } from "../component/character"
import { Field } from "./Field"

export const Desk = () => {
    const [fields, setFields] = useState<Record<string, Character[]>>({
		'field-1': [initialCharacter],
		'field-2': [],
	})

    const moveCard = (characterId: string, toFieldId: string): void => {
		setFields(prev => {
            const updated = { ...prev }
			let character: Character | undefined
            // Remove the character from all fields
            for (const key in updated) {
                const found = updated[key].find(c => c.id === characterId)
				if (found) { character = found }
				updated[key] = updated[key].filter(c => c.id !== characterId)
            }
            // Add to destination field
			if (character) {
            	updated[toFieldId] = [...updated[toFieldId], character]
			}
            return updated
        })
	}
    
    return (
        <main>
			<Field id="field-1" characters={fields['field-1']} onCardDrop={moveCard} />
            <Field id="field-2" characters={fields['field-2']} onCardDrop={moveCard} />
        </main>
    )
}