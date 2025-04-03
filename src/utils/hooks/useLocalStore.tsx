import { useEffect, useRef } from "react"

export interface ILocalStore {
    destroy: () => void
}

export const useLocalStore = <T extends ILocalStore>(creator: () => T ): T => {
    const refStore = useRef<null | T>(null)

    if(refStore.current === null) {
        refStore.current = creator()
    }

    useEffect(() => {
        return () => refStore.current?.destroy()
    }, [])

    return refStore.current
}