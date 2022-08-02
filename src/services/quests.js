import {authorizedRequest, unauthorizedRequest} from "./request";
const apiUrl = process.env.REACT_APP_API_URL;

export const getQuest = async (questId) =>
    await authorizedRequest.get(`${apiUrl}/v1/quests/${questId}`);

export const getQuests = async () => {
    try {
        return await authorizedRequest.get(`${apiUrl}/v1/quests`);
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const createQuest = async (data) => {
    try {
        return await authorizedRequest.post(`${apiUrl}/v1/quests`, data);
    } catch (e) {
        console.log(e);
    }
}

export const registerTeamToQuest = async (questId, teamId) => {
    try {
        return await authorizedRequest.post(`${apiUrl}/v1/quests/${questId}/team-for-quest`, {'team_id': teamId});
    } catch (e) {
        console.log(e);
    }
}

export const getQuestResults = async (questId) => {
    try {
        return await authorizedRequest.get(`${apiUrl}/v1/quests/${questId}/results`);
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const getQuestTeams = async (questId) => {
    try {
        return await authorizedRequest.get(`${apiUrl}/v1/quests/${questId}/teams`);
    } catch (e) {
        console.log(e);
        return {"teams": []};
    }
};