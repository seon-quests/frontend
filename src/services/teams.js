import {authorizedRequest} from "./request";
const apiUrl = process.env.REACT_APP_API_URL;

export const createTeam = async (data) => {
    try {
        return await authorizedRequest.post(`${apiUrl}/v1/teams`, data);
    } catch (e) {
        alert(e.response.data.detail)
    }
}

export const getTeam = async () => {
    try {
        return await authorizedRequest.get(`${apiUrl}/v1/teams/my-team`);
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const teamStartedQuest = async (questId) => {
    try {
        return await authorizedRequest.post(`${apiUrl}/v1/quests/${questId}/started`);
    } catch (e) {
        console.log(e);
        return null;
    }
}