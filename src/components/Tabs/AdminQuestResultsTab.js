import {useTheme} from "@table-library/react-table-library/theme";
import {Body, Cell, Header, HeaderCell, HeaderRow, Table, Row} from "@table-library/react-table-library";
import {useEffect, useState} from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import {getQuestResults} from "../../services/quests";
import {useParams} from "react-router-dom";
momentDurationFormatSetup(moment);


const AdminQuestResultsTab = (props) => {
    const { id } = useParams();
    const [questResults, setQuestResults] = useState({nodes: []});

    const theme = useTheme({
        Table: `
        --data-table-library_grid-template-columns:  150px repeat(${questResults.totalStages}, 1fr) 150px !important;
      `,
        BaseCell: `
        &:nth-of-type(1) {
          left: 0px;
        }
        

        &:nth-of-type(n) {
          right: 0px;
        }
  
      `,
    });

    useEffect(async () => {
        await fetchAndTransformQuestResults();
    }, []);

    async function fetchAndTransformQuestResults() {
        const resultsResponse = await getQuestResults(id);
        console.log(resultsResponse);
        setQuestResults(transformResultsData(resultsResponse));
    }

    function calculateTotalTime(startDateTime, latestAnsweredAt){
        const date = new Date(startDateTime);
        const last_answered_date = new Date(latestAnsweredAt)
        return moment.duration(last_answered_date.getTime() - date.getTime(), "milliseconds").format("hh:mm:ss", {trim: false})
    }

    function transformResultsData(originalResponse){
        let result = {
            totalStages: originalResponse.total_stages,
            startDateTime: originalResponse.start_datetime,
            nodes: []
        }

        originalResponse.teams_with_progresses.forEach((team)=>{
            const newTeamObject = {};
            newTeamObject['teamName'] = team.name;
            newTeamObject['totalTime'] =  team.progresses.length > 0 ? calculateTotalTime(result.startDateTime, team.progresses.at(-1).answered_at) : "00:00:00";
            newTeamObject['progresses'] = team.progresses.map((progress)=>(moment.duration(progress.time_to_answer, "seconds").format("hh:mm:ss", {trim: false})))
            result.nodes.push(newTeamObject)
        })
        return result;
    }

    return (
        <>
            <Table data={questResults} theme={theme} layout={{ custom: true }}>
                {(tableList) => (
                    <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell pinLeft>Команда</HeaderCell>
                                {[...Array(questResults.totalStages)].map((_, i) =>
                                    <HeaderCell key={i}>Етап {i+1}</HeaderCell>
                                )}
                                <HeaderCell pinRight>Загальний час</HeaderCell>
                            </HeaderRow>
                        </Header>

                        <Body>
                            {tableList.map((item) => (
                                <Row key={item.teamName} item={item}>
                                    <Cell pinLeft>{item.teamName}</Cell>
                                    {
                                        item.progresses.map((progress, index) => (
                                            <Cell key={index}>{progress}</Cell>
                                        ))
                                    }
                                    {[...Array(questResults.totalStages-item.progresses.length)].map((_, i) =>
                                        <Cell key={i}>-</Cell>
                                    )}
                                    <Cell pinRight>{item.totalTime}</Cell>
                                </Row>
                            ))}
                        </Body>
                    </>
                )}
            </Table>
        </>
    )
}
export default AdminQuestResultsTab