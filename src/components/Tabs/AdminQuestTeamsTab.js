import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getQuestTeams} from "../../services/quests";
import {
    Card,
    CardHeader,
    Col, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Table,
    UncontrolledDropdown
} from "reactstrap";
import {changeTeamAcceptanceStatus} from "../../services/questTeams";

const AdminQuestTeamsTab = (props) => {
    const { id } = useParams();
    const [questTeams, setQuestTeams] = useState({teams: []});

    const acceptanceStatusText = (team) => {
        const options = {
            null: 'Очікує підтвердження',
            true: 'Прийнято до участі',
            false: 'Відхилено від участі'
        }
        return options[team.is_accepted]
    }

    const acceptanceButtonAvailable = (team) => {
        return team.is_started === false;
    }

    useEffect(async () => {
        await fetchQuestTeams();
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => fetchQuestTeams(), 15000);
        return () => clearTimeout(timer);
    }, [questTeams]);

    async function fetchQuestTeams() {
        const teamsResponse = await getQuestTeams(id);
        console.log(teamsResponse)
        setQuestTeams(teamsResponse);
    }

    async function acceptTeam(teamId) {
        const response = await changeTeamAcceptanceStatus(id, teamId, true)
        await fetchQuestTeams();
        if (response){
            alert('Команду підтверджено')
        }
    }

    async function declineTeam(teamId) {
        const response = await changeTeamAcceptanceStatus(id, teamId, false)
        await fetchQuestTeams();
        if (response){
            alert('Команду відхилено')
        }
    }

    return (
        <>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <Row className="align-items-center">
                                <Col xs="12">
                                    <h3 className="mb-0">Команди квесту</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Назва команди</th>
                                <th scope="col">Капітан</th>
                                <th scope="col">Статус</th>
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                            {questTeams.teams.map(questTeam => (
                                <tr key={questTeam.team.name}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <span className="mr-2">{questTeam.team.name}</span>
                                        </div>
                                    </td>
                                    <th scope="row">
                                                <span className="mb-0 text-sm">
                                                  {questTeam.team.captain.first_name} {questTeam.team.captain.last_name}
                                                </span>
                                    </th>

                                    <td>
                                        <div className="d-flex align-items-center">
                                            <span className="mr-2">{acceptanceStatusText(questTeam)}</span>
                                        </div>
                                    </td>
                                    <td className="text-right">
                                        <UncontrolledDropdown>
                                            <DropdownToggle
                                                className="btn-icon-only text-light"
                                                disabled={!acceptanceButtonAvailable(questTeam)}
                                                role="button"
                                                size="sm"
                                                color=""
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className="fas fa-ellipsis-v"/>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    onClick={(e) => acceptTeam(questTeam.team_id)}
                                                >
                                                    Підтвердити
                                                </DropdownItem>
                                                <DropdownItem
                                                    onClick={(e) => declineTeam(questTeam.team_id)}
                                                >
                                                    Відхилити
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </Row>
        </>
    );
}
export default AdminQuestTeamsTab