import { useSyncExternalStore, createContext, useContext, memo, useCallback, useRef } from 'react'
import styles from './styles.module.scss'

interface Store {
	first: string
	last: string
}

function useStoreData(): {
	get: () => Store
	set: (value: Partial<Store>) => void
	subscribe: (cb: () => void) => () => void
} {
	const store = useRef({ first: '', last: '' })
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

function useStore<SelectorOutput>(
	selector: (store: Store) => SelectorOutput
): [SelectorOutput, (value: Partial<Store>) => void] {
	const store = useContext(StoreContext)
	if (!store) {
		throw new Error('Store not found')
	}

	// old analog
	// const [state, setState] = useState(store.get())
	// useEffect(() => {
	// 	return store.subscribe(() => setState(store.get()))
	// }, [])

	const state = useSyncExternalStore(
		store.subscribe,
		() => selector(store.get()),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		() => '' as any
	)

	return [state, store.set]
}

const TextInput = ({ value }: { value: 'first' | 'last' }) => {
	const [fieldValue, setStore] = useStore((store) => store[value])
	return (
		<div className="field">
			{value}:{' '}
			<input value={fieldValue || ''} onChange={(e) => setStore({ [value]: e.target.value })} />
		</div>
	)
}

const Display = ({ value }: { value: 'first' | 'last' }) => {
	const [fieldValue] = useStore((store) => store[value])
	return (
		<div className="value">
			{value}: {fieldValue}
		</div>
	)
}

const FormContainer = memo(() => {
	return (
		<div className="container">
			<h5>FormContainer</h5>
			<TextInput value="first" />
			<TextInput value="last" />
		</div>
	)
})

const DisplayContainer = memo(() => {
	return (
		<div className="container">
			<h5>DisplayContainer</h5>
			<Display value="first" />
			<Display value="last" />
		</div>
	)
})
const FormTest = memo(() => {
	return (
		<StoreContext.Provider value={useStoreData()}>
			<div className={styles.wrapper}>
				<h5>ContentContainer</h5>
				<FormContainer />
				<DisplayContainer />
			</div>
		</StoreContext.Provider>
	)
})

export default FormTest
