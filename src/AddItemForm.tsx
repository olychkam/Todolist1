import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError('Error')
        }
        setTitle('')
    }
    return (
        <div>
            <input value={title}
                   onChange={changeTitle}
                   onKeyPress={onKeyPressTask}
                   className={error ? 'error' : ''}
                   onBlur={() => {
                       setError(null)
                   }}/>
            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}