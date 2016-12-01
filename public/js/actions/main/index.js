import {
    GET_DATABASE
} from '../../constants';


export function getDatabase(idUser) {
    return (dispatch, getState) => {
        $.when($.post("/api/get-interesting-matches", {idUser: idUser})).then(function (result) {
            return dispatch({
                type: GET_DATABASE,
                payload: result
            });
        });
    };
}