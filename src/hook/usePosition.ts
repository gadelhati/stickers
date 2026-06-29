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

interface UsePositionOptions {
    /** Só registra listeners se enabled=true. Default: false */
    enabled?: boolean
    /** Elemento container para calcular posição relativa (opcional) */
    containerRef?: React.RefObject<HTMLElement | null>
}

export const usePosition = (options: UsePositionOptions = {}) => {
    const { enabled = false, containerRef } = options
    const [movement, setMovement] = useState<Movement>(DEFAULT)

    useEffect(() => {
        if (!enabled) {
            setMovement(DEFAULT)
            return
        }

        const isMobile = () =>
            /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
            ('ontouchstart' in window)

        const handleMouse = (event: MouseEvent) => {
            // Se tiver container, calcula relativo a ele; senão usa window
            if (containerRef?.current) {
                const rect = containerRef.current.getBoundingClientRect()
                const x = event.clientX - rect.left
                const y = event.clientY - rect.top
                const abscissa = Math.floor((x / rect.width) * 100 - 50)
                const ordinate = Math.floor((y / rect.height) * 100 - 50)
                setMovement({
                    backgroundColor: `rgb(${Math.floor(x % 255)}, ${Math.floor(y % 255)}, 150)`,
                    transform: `perspective(1000px) rotateY(${abscissa * 0.4}deg) rotateX(${ordinate * -0.4}deg)`,
                    boxShadow: `${abscissa * -0.4}px ${ordinate * -0.4}px 21px 5px rgba(0,0,0,0.54)`,
                })
            } else {
                const { innerWidth: w, innerHeight: h } = window
                const abscissa = Math.floor((event.pageX * 100) / w - 50)
                const ordinate = Math.floor((event.pageY * 100) / h - 50)
                setMovement({
                    backgroundColor: `rgb(${event.clientX % 255}, ${event.clientY % 255}, 150)`,
                    transform: `perspective(1000px) rotateY(${abscissa}deg) rotateX(${ordinate * -1}deg)`,
                    boxShadow: `${abscissa * -1}px ${ordinate * -1}px 21px 5px rgba(0,0,0,0.54)`,
                })
            }
        }

        const handleOrientation = (event: DeviceOrientationEvent) => {
            const beta  = Math.max(-45, Math.min(45, event.beta  ?? 0))
            const gamma = Math.max(-45, Math.min(45, event.gamma ?? 0))
            const abscissa = (gamma / 45) * 50
            const ordinate = ((beta - 10) / 45) * 50
            const r = Math.floor(((gamma + 90) / 180) * 255)
            const g = Math.floor(((beta  + 90) / 180) * 255)
            setMovement({
                backgroundColor: `rgb(${r}, ${g}, 150)`,
                transform: `perspective(1000px) rotateY(${abscissa}deg) rotateX(${ordinate * -1}deg)`,
                boxShadow: `${abscissa * -1}px ${ordinate * -1}px 21px 5px rgba(0,0,0,0.54)`,
            })
        }

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
    }, [enabled, containerRef])

    return { movement }
}