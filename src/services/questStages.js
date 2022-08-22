import {authorizedRequest} from "./request";
const apiUrl = process.env.REACT_APP_API_URL;

export const createQuestStage = async (data, questId) => {
    try {
        return await authorizedRequest.post(`${apiUrl}/v1/quests/${questId}/quest-stages`, data);
    } catch (e) {
        console.log(e);
    }
}

export const getQuestStage = async (questId, questStageId) =>
    await authorizedRequest.get(`${apiUrl}/v1/quests/${questId}/quest-stages/${questStageId}`);

export const editQuestStage = async (data, questId, questStageId) =>
    await authorizedRequest.patch(`${apiUrl}/v1/quests/${questId}/quest-stages/${questStageId}`, data);

export const deleteQuestStage = async (questId, questStageId) => {
    try {
        return await authorizedRequest.delete(`${apiUrl}/v1/quests/${questId}/quest-stages/${questStageId}`);
    } catch (e) {
        console.log(e);
    }
}

export const getQuestStages = async (questId) =>
    await authorizedRequest.get(`${apiUrl}/v1/quests/${questId}/quest-stages`);

export const getCurrentQuestStage = async (questId) =>
    await authorizedRequest.get(`${apiUrl}/v1/quests/${questId}/current-stage`);

export const answerQuestStage = async (data, questId, questStageId) => {
    try {
        return await authorizedRequest.post(
            `${apiUrl}/v1/quests/${questId}/quest-stages/${questStageId}/answer`,
            data
        );
    } catch (e) {
        console.log(e);
    }
}