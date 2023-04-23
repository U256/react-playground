import {
	FC,
	ReactNode,
	useSyncExternalStore,
	createContext,
	useContext,
	useCallback,
	useRef,
} from 'react'

// TODO: make serialization/hydration work!!
export function createFastContext<Store>(initialState: Store) {
	function useStoreData(): {
		get: () => Store
		set: (value: Partial<Store>) => void
		subscribe: (cb: () => void) => () => void
	} {
		const store = useRef(initialState)
		const subscribers = useRef(new Set<() => void>())

		const get = useCallback(() => store.current, [])

		const set = useCallback((value: Partial<Store>) => {
			store.current = { ...store.current, ...value }
			subscribers.current.forEach((cb) => cb())
		}, [])

		const subscribe = useCallback((cb: () => void) => {
			subscribers.current.add(cb)
			return () => subscribers.current.delete(cb)
		}, [])

		return { get, set, subscribe }
	}

	type UseStoreDataReturnType = ReturnType<typeof useStoreData>
	const StoreContext = createContext<UseStoreDataReturnType | null>(null)

	const Provider: FC<{ children: ReactNode }> = ({ children }) => {
		return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>
	}

	function useStore<SelectorOutput>(
		selector: (store: Store) => SelectorOutput
	): [SelectorOutput, (value: Partial<Store>) => void] {
		const store = useContext(StoreContext)
		if (!store) {
			throw new Error('Store not found')
		}

		const state = useSyncExternalStore(
			store.subscribe,
			() => selector(store.get()),
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			() => '' as any
		)

		return [state, store.set]
	}

	return {
		Provider,
		useStore,
	}
}
