import moment from "moment/moment";

export function humanDateTime(datetime) {
    return moment(datetime).format('DD/MM/YYYY HH:mm');
}