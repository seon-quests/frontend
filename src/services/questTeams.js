import {authorizedRequest} from "./request";
const apiUrl = process.env.REACT_APP_API_URL;


export const changeTeamAcceptanceStatus = async (questId, teamId, acceptanceStatus) => {
    const data = {
        "acceptance_status": acceptanceStatus,
        "team_id": teamId
    }
    try {
        return await authorizedRequest.post(`${apiUrl}/v1/quests/${questId}/team-acceptance`, data);
    } catch (e) {
        console.log(e);
        return null;
    }
};
