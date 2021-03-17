import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm=React.memo((props: AddItemFormPropsType)=>{
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error!==null){setError(null)}
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
            <TextField variant={"outlined"}
                       value={title}
                       onChange={changeTitle}
                       onKeyPress={onKeyPressTask}
                       onBlur={() => {
                           setError(null)
                       }}
            helperText={error?'Title is required!':''}
            label={'Title'}
            error={!!error}/>
            {/*<input value={title}
                   onChange={changeTitle}
                   onKeyPress={onKeyPressTask}
                   className={error ? 'error' : ''}
                   onBlur={() => {
                       setError(null)
                   }}/>*/}
            <IconButton onClick={addItem}>+</IconButton>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    )
})