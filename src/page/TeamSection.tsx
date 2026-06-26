import type { TeamSection } from '../component/album'
import { SlotComponent } from './Slot'

interface TeamSectionProps {
    section: TeamSection
    onDrop: (characterId: string, expectedId: string) => void
}

export const TeamSectionComponent = ({ section, onDrop }: TeamSectionProps) => {
    return (
        <div className="team-section">
            <h3 className="section-team">{section.team.name}</h3>
            <div className="section-slots">
                {section.slots.map(slot => (
                    <SlotComponent key={slot.expectedId} slot={slot} onDrop={onDrop} />
                ))}
            </div>
        </div>
    )
}