import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react'
import {InputMarks} from "../v2-inputMarks/InputMarks";
import {Mark} from "../v3-Mark/Mark";
import {Button, Chip, Container, Grid, IconButton, Paper, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../App/store";
import {actionsMain, MarksType} from "../Redusers/mainReduser";
import {nanoid} from "nanoid";
import {actionsTags} from "../Redusers/tagsReduser";
import {Clear} from "@material-ui/icons";


function Main() {

    const dispatch = useDispatch()
    const marks = useSelector<AppRootStateType, Array<MarksType>>(state => state.main.marks);
    const tags = useSelector<AppRootStateType, Array<string>>(state => state.tag.alltags);
    const [currentmarks, setCurrentmarks] = useState<Array<MarksType>>(marks)
    const [newTag, setNewTag] = useState<boolean>(false)
    const [valueNewTag, setValueNewTag] = useState<string>('')


    useEffect(() => {
        setCurrentmarks(marks)
    }, [marks, dispatch])

    const deleteTagWithMark = (t: string) => {
        dispatch(actionsMain.deleteMarkTag(t))
        dispatch(actionsTags.deleteTag(t))
    }
    const deleteTag = (t: string) => {
        dispatch(actionsTags.deleteTag(t))
    }

    const sortMarks = (t: string) => {
        let newMarks = marks.filter(m => m.tag.includes(t))
        setCurrentmarks(newMarks)
    }

    const showAllMarks = () => {
        setCurrentmarks(marks)
    }

    const addNewTag = () => {
        dispatch(actionsTags.addTags([valueNewTag]))
        setNewTag(false)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTag()
        }
    }

    return (
        <Container>
            <Grid
                direction={'column'}
                container
                alignItems='center'
                justifyContent='space-around'

            >

                <Paper
                    style={{
                        backgroundColor: "lightgrey",
                        padding: 10,
                        margin: 20
                    }}
                >
                    <Grid
                        container
                        direction={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        item>
                        <h1>Marks list</h1>
                        <InputMarks/>

                        {
                            currentmarks.map(i => {
                                return <Mark
                                    key={nanoid()}
                                    name={i.name}
                                    id={i.id}
                                    tag={i.tag}/>
                            })
                        }

                        {tags.length > 0 && <Button
                            onClick={showAllMarks}
                            variant="contained"
                            size="medium"
                            color='primary'
                        >Show all Marks</Button>}
                    </Grid>
                </Paper>

                <Paper
                    style={{
                        backgroundColor: "lightgrey",
                        padding: 10,
                        margin: 20
                    }}
                >

                    <Grid item
                          container
                          direction={'column'}
                          justifyContent={'center'}
                          alignItems={'center'}
                    >
                        <h2>All tags</h2>
                        {
                            tags.map(t => {
                                return <Paper
                                    key={nanoid()}
                                    style={{
                                        background: 'darkkhaki',
                                        padding: '5px',
                                        width: "fit-content",
                                        margin: "10px"
                                    }}
                                >
                                    <Grid
                                        container
                                        alignItems='center'
                                    >
                                        <Chip label={t} onClick={() => sortMarks(t)}/>
                                        <IconButton
                                            size="small"
                                            color='secondary'
                                            onClick={() => deleteTag(t)}
                                        ><Clear/>
                                        </IconButton>
                                        <Button
                                            startIcon={<Clear/>}
                                            onClick={() => deleteTagWithMark(t)}
                                            variant="contained"
                                            size="small"
                                            color='secondary'
                                        >Delete with mark
                                        </Button>
                                    </Grid>
                                </Paper>
                            })
                        }

                        {newTag ?
                            <Paper
                                style={{
                                    width: 300,
                                    backgroundColor: "darkkhaki",
                                    padding: "5px",
                                    margin: "10px"
                                }}

                            >
                                <Grid item
                                      container
                                      alignItems={'center'}
                                      justifyContent={'space-between'}
                                >
                                    <TextField
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setValueNewTag(e.currentTarget.value)
                                        }
                                        }
                                        onBlur={addNewTag}
                                        onKeyPress={onKeyPressAddItem}
                                        label="Enter tag"
                                        variant="outlined"
                                        style={{width: '110'}}
                                        size={'small'}
                                    />
                                    <Button
                                        onClick={() => addNewTag()}
                                        color={'primary'}
                                        variant="outlined"
                                        size="small"
                                    >
                                        Save
                                    </Button>
                                </Grid>

                            </Paper>
                            :
                            <Button
                                onClick={() => setNewTag(true)}
                                color={'primary'}
                                variant="contained"
                                size="medium"
                                style={{margin: 10}}
                            >
                                Add Tag
                            </Button>}
                            <span>* click on the tag to sort it</span>
                    </Grid>

                </Paper>

            </Grid>
        </Container>
    )
}

export default Main;
