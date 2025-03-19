import { ADD_ELEMENT, REMOVE_ELEMENT, IMPORT_DATA } from './../constants'
import { v4 as uuidv4 } from 'uuid';

const elements = (state = {}, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_ELEMENT: {
            const uniq_id = uuidv4();
            return {
                ...state,
                [uniq_id]: {
                    ...action.payload,
                    uuid: uniq_id
                },
            }
        }
        case REMOVE_ELEMENT: {
            const uuid = action.payload.uuid;
            console.log('REMOVE_ELEMENT 1', state);
            delete state[uuid]
            console.log('REMOVE_ELEMENT 2', state);

            return state
        }
        case IMPORT_DATA: {
            const images = action.payload.children[0].children.filter(item => item.className === 'Image');

            return images.reduce((acc, item) => {
                const uniq_id = uuidv4();

                return {
                    ...acc,
                    [uniq_id]: {
                        uuid: uniq_id,
                        ...item.attrs
                    }
                }
            }, state)
        }
        default:
            return state
    }
}

export default elements
