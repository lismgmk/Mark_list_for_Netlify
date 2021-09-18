import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {
    Button,
    Chip,
    Grid,
    IconButton,
    Paper,
    Typography
} from "@material-ui/core";
import {Clear} from "@material-ui/icons";
import {actionsMain} from "../Redusers/mainReduser";
import {useDispatch} from "react-redux";
import {actionsTags} from "../Redusers/tagsReduser";
import {getTag} from "../v2-inputMarks/InputMarks";
import style from "./Mark.module.css"
import {nanoid} from "nanoid";

type MarkType = {
    name: string
    tag: Array<string>
    id: string
}

export const Mark = React.memo(function (props: MarkType) {

    const dispatch = useDispatch()
    const [title, setTitle] = useState<string>(props.name)
    const [titleKey, setTitleKey] = useState<string>(props.name)
    const [changeInput, setChangeInput] = useState<boolean>(false)


    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleKey(e.currentTarget.value)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onChangeInput()
        }
    }

    const getColorTitle = (title: string) => {

        let valueInput = title.split(/(#[a-z\d-]+)/ig)

        return valueInput.map((i, index) => {
            if (index % 2 === 0) {
                return <span key={nanoid()} style={{color: 'black'}}>{i}</span>
            } else {
                return <span key={nanoid()} style={{color: 'red'}}>{i}</span>
            }
        })
    }
    const onChangeSpan = () => setChangeInput(true);
    const onChangeInput = () => {
        setChangeInput(false)

        const trimmedTitle = title.trim()
        let tag = getTag(trimmedTitle)
        if (trimmedTitle) {
            dispatch(actionsMain.updateMark(trimmedTitle, props.id, tag))
            dispatch(actionsTags.addTags(tag))
        }

    }
    return (
        <Paper
            className={style.containerCustom}
            style={{
                backgroundColor: 'darkkhaki',
                margin: 20,
                width: 'fit-content',
                height: 'fit-content',
                padding: 20
            }}
        >
            <Grid>
                {
                    changeInput
                        ?
                        <Grid
                            container
                            // direction='column'
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            style={{
                                position: "relative",
                                width: 'fit-content',
                                height: 'fit-content'
                            }}
                        >
                            <input
                                className={style.customInput}
                                value={title}
                                onBlur={onChangeInput}
                                onChange={changeTitle}
                                onKeyPress={onKeyPressAddItem}
                                onKeyPressCapture={(e) => setTitleKey(e.currentTarget.value)}
                            />

                            <Typography
                                variant="h5"
                                component="div"
                                className={style.customDiv}
                                style={{height: 'fit-content'}}
                            >
                                {getColorTitle(titleKey)}
                            </Typography>
                            <Button
                                color={'primary'}
                                variant="outlined"
                                size="small"
                                onClick={() => {
                                    onChangeInput()
                                }}>Save
                            </Button>
                        </Grid>
                        : <Grid
                            container
                            direction='column'
                            alignItems={'center'}
                            justifyContent={'space-between'}
                        >
                            <Grid item
                                  container
                            >
                                <Grid item>
                                    <Typography className={style.customDiv}
                                                variant="h5"
                                                component="div"
                                                onDoubleClick={onChangeSpan}
                                    >{title}
                                    </Typography>
                                </Grid>

                                <IconButton
                                    color='secondary'
                                    size="small"
                                    style={{margin: 5}}
                                    onClick={() => {
                                        dispatch(actionsMain.deleteMark(props.id))
                                    }}><Clear/>
                                </IconButton>
                                <Button
                                    color={'primary'}
                                    variant="outlined"
                                    size="small"
                                    onClick={() => {
                                        setChangeInput(true)
                                    }}>Edit
                                </Button>

                            </Grid>

                            <Grid item>
                                {props.tag.map(i => {
                                    return <Chip label={i}
                                                 key={nanoid()}
                                                 style={{margin: 10}}
                                                 onDoubleClick={() => dispatch(actionsTags.addTags([i]))}
                                    />
                                })}
                            </Grid>
                        </Grid>
                }
            </Grid>
        </Paper>

    )
})
