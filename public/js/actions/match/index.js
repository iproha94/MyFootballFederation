import {GET_MATCH} from '../../constants';

export function getMatch(_id) {
    return (dispatch, getState) => {
        return $.when($.get("/api/match/" + _id)).then(function (result) {
            return dispatch({
                type: GET_MATCH,
                payload: result
            });
        });
    };
}