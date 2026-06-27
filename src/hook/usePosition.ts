import { useEffect, useState } from "react"

type Movement = {
    backgroundColor: string
    transform: string
    boxShadow: string
}

const DEFAULT: Movement = {
    backgroundColor: 'lightblue',
    transform: `perspective(1000px) rotateX(0deg)`,
    boxShadow: `0px 0px 21px 5px rgba(0,0,0,0.54)`,
}

export const usePosition = () => {
    const [movement, setMovement] = useState<Movement>(DEFAULT)

    useEffect(() => {
        const isMobile = () =>
            /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
            ('ontouchstart' in window)

        // ── DESKTOP: mousemove ──────────────────────────────────────────
        const handleMouse = (event: MouseEvent) => {
            const { innerWidth: w, innerHeight: h } = window
            const abscissa = Math.floor((event.pageX * 100) / w - 50)
            const ordinate = Math.floor((event.pageY * 100) / h - 50)

            setMovement({
                backgroundColor: `rgb(${event.clientX % 255}, ${event.clientY % 255}, 150)`,
                transform: `perspective(1000px) rotateY(${abscissa}deg) rotateX(${ordinate * -1}deg)`,
                boxShadow: `${abscissa * -1}px ${ordinate * -1}px 21px 5px rgba(0,0,0,0.54)`,
            })
        }

        // ── MOBILE: DeviceOrientation (giroscópio) ──────────────────────
        const handleOrientation = (event: DeviceOrientationEvent) => {
            // beta  = inclinação frente/trás  (-180..180)
            // gamma = inclinação esq/dir      (-90..90)
            const beta  = Math.max(-45, Math.min(45, event.beta  ?? 0))
            const gamma = Math.max(-45, Math.min(45, event.gamma ?? 0))

            // mapeia ângulos para a mesma escala do mouse (-50..50)
            const abscissa = (gamma / 45) * 50          // esq/dir  → rotateY
            const ordinate = ((beta - 10) / 45) * 50   // offset de 10° (postura natural)

            const r = Math.floor(((gamma + 90) / 180) * 255)
            const g = Math.floor(((beta  + 90) / 180) * 255)

            setMovement({
                backgroundColor: `rgb(${r}, ${g}, 150)`,
                transform: `perspective(1000px) rotateY(${abscissa}deg) rotateX(${ordinate * -1}deg)`,
                boxShadow: `${abscissa * -1}px ${ordinate * -1}px 21px 5px rgba(0,0,0,0.54)`,
            })
        }

        // ── MOBILE: fallback com touch (se não houver giroscópio) ───────
        const handleTouch = (event: TouchEvent) => {
            const touch = event.touches[0]
            if (!touch) return
            const { innerWidth: w, innerHeight: h } = window
            const abscissa = Math.floor((touch.clientX * 100) / w - 50)
            const ordinate = Math.floor((touch.clientY * 100) / h - 50)

            setMovement({
                backgroundColor: `rgb(${Math.floor(touch.clientX % 255)}, ${Math.floor(touch.clientY % 255)}, 150)`,
                transform: `perspective(1000px) rotateY(${abscissa}deg) rotateX(${ordinate * -1}deg)`,
                boxShadow: `${abscissa * -1}px ${ordinate * -1}px 21px 5px rgba(0,0,0,0.54)`,
            })
        }

        if (isMobile()) {
            // iOS 13+ exige permissão explícita para DeviceOrientationEvent
            if (
                typeof DeviceOrientationEvent !== 'undefined' &&
                typeof (DeviceOrientationEvent as any).requestPermission === 'function'
            ) {
                ;(DeviceOrientationEvent as any)
                    .requestPermission()
                    .then((state: string) => {
                        if (state === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation)
                        } else {
                            window.addEventListener('touchmove', handleTouch, { passive: true })
                        }
                    })
                    .catch(() => {
                        window.addEventListener('touchmove', handleTouch, { passive: true })
                    })
            } else if (typeof DeviceOrientationEvent !== 'undefined') {
                // Android / outros — não precisa pedir permissão
                window.addEventListener('deviceorientation', handleOrientation)
            } else {
                window.addEventListener('touchmove', handleTouch, { passive: true })
            }
        } else {
            window.addEventListener('mousemove', handleMouse)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouse)
            window.removeEventListener('deviceorientation', handleOrientation)
            window.removeEventListener('touchmove', handleTouch)
        }
    }, [])

    return { movement }
}