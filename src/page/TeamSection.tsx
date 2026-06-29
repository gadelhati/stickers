import type { TeamSection } from '../component/album'
import { SlotComponent } from './Slot'
import './TeamSection.css'

interface TeamSectionProps {
    section: TeamSection
    onDrop: (characterId: string, expectedId: string) => void
}

export const TeamSectionComponent = ({ section, onDrop }: TeamSectionProps) => {
    const filledCount = section.slots.filter(s => s.character).length
    const totalCount = section.slots.length

    return (
        <div className="team-section">
            {/* Cabeçalho do time */}
            <div
                className="team-section-header"
                style={{
                    borderLeftColor: section.team.colorOne,
                    background: `linear-gradient(90deg, ${section.team.colorOne}18 0%, transparent 100%)`
                }}
            >
                <div className="team-section-colors">
                    <span
                        className="team-color-dot"
                        style={{ background: section.team.colorOne }}
                    />
                    <span
                        className="team-color-dot"
                        style={{ background: section.team.colorTwo }}
                    />
                </div>
                <span className="team-section-name">{section.team.name}</span>
                <span className="team-section-progress">
                    {filledCount}/{totalCount}
                </span>
            </div>

            {/* Grid de slots */}
            <div className="team-section-slots">
                {section.slots.map(slot => (
                    <SlotComponent
                        key={slot.expectedId}
                        slot={slot}
                        onDrop={onDrop}
                    />
                ))}
            </div>
        </div>
    )
}