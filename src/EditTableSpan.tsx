import React, {ChangeEvent, useCallback, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditTableSpanPropsType = {
    title: string
    changeItem: (title: string) => void
}

export const EditTableSpan=React.memo((props: EditTableSpanPropsType)=> {
    console.log('editTable')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title);
    const onEditMode =() => {
        setEditMode(true)
    }
    const offEditMode = ( )=> {
        setEditMode(false)
        props.changeItem(title)
    }
    const changeTitle =(e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressEditMode = (e:KeyboardEventInit) => {
        if (e.key === 'Enter') offEditMode()
    }
    return (
        editMode
            ? <TextField variant={"outlined"}
                value={title}
                     autoFocus
                     onBlur={offEditMode}
                     onChange={changeTitle}
                     onKeyPress={onKeyPressEditMode}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})