import { useState } from "react"
import { Sticker } from "./Sticker"
import { type Slot } from "../component/album"
import './Slot.css'

export const SlotComponent = ({ slot, onDrop }: { slot: Slot, onDrop: (characterId: string, expectedId: string) => void }) => {
    const [rejected, setRejected] = useState(false)
    const [dragOver, setDragOver] = useState(false)

    const dragover = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragOver(true)
    }
    const dragleave = () => setDragOver(false)

    const dragdrop = (e: React.DragEvent<HTMLDivElement>) => {
        setDragOver(false)
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
            className={[
                'slot',
                slot.character ? 'slot--filled' : 'slot--empty',
                rejected ? 'slot--rejected' : '',
                dragOver ? 'slot--dragover' : '',
            ].join(' ')}
            onDragOver={dragover}
            onDragLeave={dragleave}
            onDrop={dragdrop}
        >
            {slot.character ? (
                <div className="slot-sticker">
                    <Sticker {...slot.character} />
                </div>
            ) : (
                <div className="slot-placeholder">
                    <span className="slot-number">#{slot.expectedId}</span>
                </div>
            )}
        </div>
    )
}