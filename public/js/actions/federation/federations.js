import {GET_FEDERATIONS} from '../../constants';

export function getFederations() {
    return (dispatch, getState) => {
        return $.when($.get("/api/federation/get")).then(function (result) {
            return dispatch({
                type: GET_FEDERATIONS,
                payload: result
            });
        });
    };
}