import { memo } from 'react'
import { createFastContext } from 'util/fastContext'
import styles from './styles.module.scss'

const { Provider, useStore } = createFastContext({
	first: '',
	last: '',
})

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
		<Provider>
			<div className={styles.wrapper}>
				<h5>ContentContainer</h5>
				<FormContainer />
				<DisplayContainer />
			</div>
		</Provider>
	)
})

export default FormTest
