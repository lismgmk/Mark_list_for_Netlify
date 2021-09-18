import {nanoid} from 'nanoid'

const initialState = {
    marks: []
};

export const mainReduser =
    (state: InitialMainStateType = initialState, action: actionsMainType): InitialMainStateType => {
        switch (action.type) {

            case "MAIN/CREATE-MARKS":
                return {
                    ...state,
                    marks: [
                        ...state.marks,
                        {
                            id: nanoid(),
                            name: action.name,
                            tag: action.tag.filter((it, index, arr) => index === arr.indexOf(it))
                        }
                    ]
                };
            case "MAIN/RENAME-MARK":
                return {
                    ...state,
                    marks:
                        state.marks.map(m => m.id === action.id ? {
                            ...m,
                            name: action.nameMark,
                            tag: action.tag.filter((it, index, arr) => index === arr.indexOf(it))
                        } : m)
                };
            case "MAIN/DELETE-MARK":
                return {
                    ...state,
                    marks: state.marks.filter(m => m.id !== action.id)
                };
            case "MAIN/DELETE-MARK-TAG":
                let current: MarksType[] = []
                state.marks.map((i, index) => {
                    if (i.tag.includes(action.tag) && i.tag.length === 1) {
                       return current.push(state.marks[index])
                    }
                })
                if (current) {
                    return {
                        ...state,
                        marks: state.marks.filter(m => m !== current[current.indexOf(m)])
                    }
                }
                return state;


            default:
                return state;
        }
    };


// actions
export const actionsMain = {

    createMarks: (name: string, tag: Array<string>,) => ({
        type: "MAIN/CREATE-MARKS",
        name, tag
    } as const),
    deleteMark: (id: string) => ({
        type: "MAIN/DELETE-MARK",
        id
    } as const),
    deleteMarkTag: (tag: string) => ({
        type: "MAIN/DELETE-MARK-TAG",
        tag
    } as const),
    updateMark: (nameMark: string, id: string, tag: Array<string>) => ({
        type: "MAIN/RENAME-MARK",
        nameMark, id, tag
    } as const)
};


// types
export type InitialMainStateType = {
    marks: Array<MarksType>
};
export type MarksType = {
    id: string,
    name: string,
    tag: Array<string>
};
export type actionsMainType = InferActionType<typeof actionsMain>

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
