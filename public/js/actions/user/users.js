import {GET_ALL_USER} from '../../constants';

export function getAllUser() {
    return (dispatch) => {
        $.get('/api/users', function (result) {
            dispatch({
                type: GET_ALL_USER,
                payload: result
            });
        });
    };
}