import { useState, useRef, useCallback } from 'react'
import type { Character } from '../component/character'
import { Sticker } from './Sticker'
import './StickerPack.css'

/* Pool de personagens fictícios para sortear */
const POOL: Character[] = [
    { id: 'p01', name: 'Rodrigo Moura',  age: 26, height: 1.80, weight: 76, country: { id:'001', code:'BRA', name:'Brasil' }, team: { id:'001', name:'Flamengo',   colorOne:'#CC0000', colorTwo:'#000000' } },
    { id: 'p02', name: 'Caio Ferreira',  age: 24, height: 1.77, weight: 73, country: { id:'001', code:'BRA', name:'Brasil' }, team: { id:'002', name:'Palmeiras',  colorOne:'#006400', colorTwo:'#FFFFFF' } },
    { id: 'p03', name: 'Lucas Andrade',  age: 28, height: 1.83, weight: 80, country: { id:'001', code:'BRA', name:'Brasil' }, team: { id:'003', name:'Corinthians',colorOne:'#000000', colorTwo:'#FFFFFF' } },
    { id: 'p04', name: 'Felipe Costa',   age: 23, height: 1.75, weight: 70, country: { id:'001', code:'BRA', name:'Brasil' }, team: { id:'004', name:'Santos',     colorOne:'#FFFFFF', colorTwo:'#000000' } },
    { id: 'p05', name: 'André Lima',     age: 27, height: 1.79, weight: 77, country: { id:'001', code:'BRA', name:'Brasil' }, team: { id:'005', name:'Grêmio',     colorOne:'#0000CC', colorTwo:'#808080' } },
    { id: 'p06', name: 'Mateus Vieira',  age: 25, height: 1.82, weight: 79, country: { id:'001', code:'BRA', name:'Brasil' }, team: { id:'006', name:'Internacional',colorOne:'#CC0000', colorTwo:'#FFFFFF' } },
    { id: 'p07', name: 'Bruno Sousa',    age: 29, height: 1.78, weight: 75, country: { id:'001', code:'BRA', name:'Brasil' }, team: { id:'007', name:'Fluminense', colorOne:'#8B0000', colorTwo:'#228B22' } },
    { id: 'p08', name: 'Thiago Ramos',   age: 22, height: 1.76, weight: 71, country: { id:'001', code:'BRA', name:'Brasil' }, team: { id:'008', name:'Botafogo',   colorOne:'#000000', colorTwo:'#FFFFFF' } },
    { id: 'p09', name: 'Diego Nunes',    age: 30, height: 1.85, weight: 83, country: { id:'001', code:'BRA', name:'Brasil' }, team: { id:'009', name:'Vasco',      colorOne:'#000000', colorTwo:'#FFFFFF' } },
    { id: 'p10', name: 'Leandro Pires',  age: 24, height: 1.74, weight: 69, country: { id:'001', code:'BRA', name:'Brasil' }, team: { id:'010', name:'Athletico',  colorOne:'#CC0000', colorTwo:'#000000' } },
]

const PACK_SIZE = 3

function pickRandom(exclude: string[]): Character {
    const available = POOL.filter(c => !exclude.includes(c.id))
    const pool = available.length > 0 ? available : POOL
    return pool[Math.floor(Math.random() * pool.length)]
}

function drawPack(exclude: string[]): Character[] {
    const drawn: Character[] = []
    for (let i = 0; i < PACK_SIZE; i++) {
        const used = [...exclude, ...drawn.map(c => c.id)]
        drawn.push(pickRandom(used))
    }
    return drawn
}

interface StickerPackProps {
    deckRef: React.RefObject<HTMLElement | null>
    onAddToDeck: (characters: Character[]) => void
    existingIds: string[]
}

type Phase = 'sealed' | 'revealing' | 'revealed' | 'flying'

export const StickerPack = ({ deckRef, onAddToDeck, existingIds }: StickerPackProps) => {
    const [phase, setPhase] = useState<Phase>('sealed')
    const [pack, setPack] = useState<Character[]>([])
    const [flipped, setFlipped] = useState<boolean[]>([])
    const [flyingIdx, setFlyingIdx] = useState<number | null>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({})

    /* Abre um novo pacote */
    const openPack = useCallback(() => {
        const drawn = drawPack(existingIds)
        setPack(drawn)
        setFlipped(new Array(PACK_SIZE).fill(false))
        setPhase('revealing')
    }, [existingIds])

    /* Vira uma carta individual */
    const flipCard = useCallback((idx: number) => {
        if (phase !== 'revealing') return
        setFlipped(prev => {
            const next = [...prev]
            next[idx] = !next[idx]
            return next
        })
        setPhase(prev => {
            // Se todas as cartas estiverem viradas após este flip, passa para 'revealed'
            // verificamos depois do setState via useEffect — usamos callback simples
            return prev
        })
    }, [phase])

    /* Após qualquer flip, checa se todas estão viradas */
    const allFlipped = flipped.every(Boolean) && flipped.length === PACK_SIZE

    /* Anima uma carta voando para o deck */
    const flyCard = useCallback((idx: number) => {
        const cardEl = cardRefs.current[idx]
        if (!cardEl || !deckRef.current) return

        const cardRect = cardEl.getBoundingClientRect()
        const deckRect = deckRef.current.getBoundingClientRect()

        const dx = deckRect.left + deckRect.width / 2 - (cardRect.left + cardRect.width / 2)
        const dy = deckRect.top + deckRect.height / 2 - (cardRect.top + cardRect.height / 2)

        setFlyingIdx(idx)
        setFlyStyle({
            '--fly-dx': `${dx}px`,
            '--fly-dy': `${dy}px`,
        } as React.CSSProperties)

        setTimeout(() => {
            /* Adiciona ao deck e remove do pack */
            onAddToDeck([pack[idx]])
            setPack(prev => prev.filter((_, i) => i !== idx))
            setFlipped(prev => prev.filter((_, i) => i !== idx))
            setFlyingIdx(null)
            cardRefs.current = cardRefs.current.filter((_, i) => i !== idx)
        }, 520)
    }, [pack, deckRef, onAddToDeck])

    /* Envia todas de uma vez */
    const flyAll = useCallback(() => {
        if (phase !== 'revealed' && !allFlipped) return
        setPhase('flying')
        // Dispara uma por uma com delay escalonado
        pack.forEach((_, idx) => {
            setTimeout(() => flyCard(idx - (pack.length - pack.length)), idx * 140)
        })
        setTimeout(() => {
            setPhase('sealed')
            setPack([])
            setFlipped([])
        }, pack.length * 140 + 600)
    }, [phase, allFlipped, pack, flyCard])

    return (
        <div className="sticker-pack">
            {/* Cabeçalho */}
            <div className="pack-label">
                <span className="pack-label-text">Pacote</span>
            </div>

            {/* Estado: lacrado */}
            {phase === 'sealed' && (
                <button className="pack-sealed" onClick={openPack}>
                    <div className="pack-sealed-visual">
                        <div className="pack-sealed-foil" />
                        <div className="pack-sealed-strip" />
                        <div className="pack-sealed-logo">⚽</div>
                        <div className="pack-sealed-text">COPA 2026</div>
                    </div>
                    <span className="pack-open-hint">Toque para abrir</span>
                </button>
            )}

            {/* Estado: revelando / revelado */}
            {(phase === 'revealing' || phase === 'revealed' || phase === 'flying') && pack.length > 0 && (
                <div className="pack-cards">
                    {pack.map((char, idx) => (
                        <div
                            key={char.id}
                            ref={el => { cardRefs.current[idx] = el }}
                            className={[
                                'pack-card-wrap',
                                flipped[idx] ? 'pack-card-wrap--flipped' : '',
                                flyingIdx === idx ? 'pack-card-wrap--flying' : '',
                            ].join(' ')}
                            style={flyingIdx === idx ? flyStyle : {}}
                            onClick={() => !flipped[idx] ? flipCard(idx) : undefined}
                        >
                            <Sticker {...char} disableFlip disableHover />
                        </div>
                    ))}
                </div>
            )}

            {/* Botões de ação */}
            {phase === 'revealing' && (
                <div className="pack-actions">
                    {allFlipped ? (
                        <button className="pack-btn pack-btn--primary" onClick={flyAll}>
                            Adicionar ao deck
                        </button>
                    ) : (
                        <span className="pack-hint">Toque nas cartas para revelar</span>
                    )}
                </div>
            )}
        </div>
    )
}