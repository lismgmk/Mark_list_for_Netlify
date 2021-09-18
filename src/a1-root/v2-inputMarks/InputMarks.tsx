import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {actionsMain} from "../Redusers/mainReduser";
import {actionsTags} from "../Redusers/tagsReduser";


export type addItemFormType = {
    addItem: (title : string) => void
    disabled?: boolean
}

export const getTag = (title: string)=>{

    let valueInput = title.split(/(#[a-z\d-]+)/ig)

    let tag: string[] = []
    valueInput.forEach((i, index)=>{
        if(index % 2 !== 0){
           return  tag.push(i.replace('#',''))
        }
    })

    return tag
}
export const InputMarks = React.memo(function (){

    const [title, setTitle] = useState<string>('')
    const dispatch = useDispatch()
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {

        const trimmedTitle = title.trim()
        let tag = getTag(trimmedTitle)
        if (trimmedTitle) {
            dispatch(actionsMain.createMarks(trimmedTitle, tag))
            dispatch(actionsTags.addTags(tag))
        }

        setTitle('')
    }

    const onKeyPressAddItem = (e : KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addItem()
        }
    }

    return(
        <Paper
            style={{
                width: 500,
                height: 100,
                backgroundColor: "lightgrey",
                marginBottom: 20
            }}
        >
            <Grid
                container
                alignItems='center'
                justifyContent='space-around'
                style={{ width: 500, height: 100, backgroundColor: 'darkkhaki'}}
            >
                <TextField
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddItem}
                    label="Enter your mark"
                    variant="outlined"
                    style={{width: 350}}
                    helperText="To add press the button or key 'Enter'"
                />
                <Button onClick = {addItem}
                        variant="contained"
                        size="medium"
                        color='primary'
                >
                    Add
                </Button>
            </Grid>
        </Paper>

    )
})













