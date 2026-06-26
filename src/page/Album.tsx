import type { AlbumPage } from '../component/album'
import { AlbumPageComponent } from './AlbumPage'

interface AlbumProps {
    pages: AlbumPage[]
    onDrop: (characterId: string, expectedId: string) => void
}

export const Album = ({ pages, onDrop }: AlbumProps) => {
    return (
        <section className="album">
            {pages.map(page => (
                <AlbumPageComponent key={page.country.id} page={page} onDrop={onDrop} />
            ))}
        </section>
    )
}