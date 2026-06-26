import { useState } from "react"
import { Sticker } from "./Sticker"
import { type Slot } from "../component/album"

export const SlotComponent = ({ slot, onDrop }: { slot: Slot, onDrop: (characterId: string, expectedId: string) => void }) => {
    const [rejected, setRejected] = useState(false)

    const dragover = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

    const dragdrop = (e: React.DragEvent<HTMLDivElement>) => {
        const characterId = e.dataTransfer.getData('character-id')
        if (characterId !== slot.expectedId) {
            setRejected(true)
            setTimeout(() => setRejected(false), 600)
            return
        }
        onDrop(characterId, slot.expectedId)
    }

    return (
        <div
            className={`slot ${slot.character ? 'filled' : 'empty'} ${rejected ? 'rejected' : ''}`}
            onDragOver={dragover}
            onDrop={dragdrop}
        >
            {slot.character
                ? <Sticker {...slot.character} />
                : <span className="slot-id">#{slot.expectedId}</span>
            }
        </div>
    )
}