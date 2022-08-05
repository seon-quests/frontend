// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Col,
  Button, CardBody
} from "reactstrap";
import Header from "components/Headers/Header.js";
// core components
import {useEffect, useState} from "react";
import {getQuests, registerTeamToQuest} from "../../services/quests";
import CreateTeamModal from "../../components/Modals/CreateTeamModal";
import {createTeam, getTeam, teamStartedQuest} from "../../services/teams";
import QuestActionButton from "../../components/Buttons/QuestActionButton";
import TeamRegisterToQuestModal from "../../components/Modals/TeamRegisterToQuestModal";
import {useHistory} from "react-router-dom";
import {humanDateTime} from "../../services/dateTimeConfig";

const PlayerHome = () => {
  const [quests, setQuests] = useState([]);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [isTeamRegisterToQuestModalOpen, setIsTeamRegisterToQuestModalOpen] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [team, setTeam] = useState({"id":null, "name": "Невідомо", "quests": []});
  // const [questAcceptanceStatuses, setQuestAcceptanceStatuses] = useState({});
  const [selectedQuestId, setSelectedQuestId] = useState(null);
  const [questsWithStatuses, setQuestsWithStatuses] = useState([]);
  const history = useHistory();

  // створення команди
  const handleClickCreateTeam = () => {
    setIsCreateTeamModalOpen(true);
  };
  const handleCloseCreateTeam = () => {
    setIsCreateTeamModalOpen(false);
  };
  const handleCreateTeam = async (values) => {
    try {
      const response = await createTeam(values);
      if (response.id) {
        await fetchTeam();
        alert('Команду успішно створено!')
        handleCloseCreateTeam();
      }
    } catch (error) {
      console.log(error)
    }
  };

  // реєстрація команди на квест
  const handleOpenRegisterTeamToQuestModal = (questId) => {
    setSelectedQuestId(questId)
    setIsTeamRegisterToQuestModalOpen(true);
  };
  const handleCloseRegisterTeamToQuestModal = () => {
    setSelectedQuestId(null)
    setIsTeamRegisterToQuestModalOpen(false);
  };
  const handleRegisterTeamToQuest = async () => {
    const response = await registerTeamToQuest(selectedQuestId, team.id);
    if (response.is_accepted===null) {
      alert('зареєстровано!');
      handleCloseRegisterTeamToQuestModal();
      window.location.reload();
    }
  }

  // початок квесту командою
  const handleOpenStartingQuestModal = async (questId) => {
    setSelectedQuestId(questId)
    await teamStartedQuest(questId)
    history.push(`quests/${questId}/playing/`);
  }

  const handleContinuingQuest = (questId) => {
    setSelectedQuestId(questId)
    history.push(`quests/${questId}/playing/`);
  }

  // function parseQuestAcceptanceStatuses(fetchedTeam) {
  //   let questStatuses = {}
  //   fetchedTeam.quests.map(quest => questStatuses[quest.quest_id]=quest.is_accepted)
  //   setQuestAcceptanceStatuses(questStatuses)
  // }

  function fillQuestsWithStatuses() {
    let questsStatuses = {}
    let updatedQuests = []
    team.quests.map(quest => questsStatuses[quest.quest_id]={...quest})
    quests.map(
        function (quest) {
          if (quest.id in questsStatuses) {
            updatedQuests.push({...questsStatuses[quest.id], ...quest})
          } else {
            updatedQuests.push({...quest})
          }
        }
    )
    setQuestsWithStatuses(updatedQuests)
    console.log(updatedQuests)
  }

  useEffect( () => {
    async function fetchQuests() {
      try {
        const data = await getQuests();
        setQuests(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchQuests();
  }, []);

  async function fetchTeam() {
    const fetchedTeam = await getTeam();
    if (fetchedTeam){
      setTeam(fetchedTeam);
      setHasTeam(true);
      // parseQuestAcceptanceStatuses(fetchedTeam)
    }
  }
  useEffect(()=>{
    fetchTeam();
  }, []);

  useEffect(()=>{
    fillQuestsWithStatuses()
  }, [team, quests])

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mb-1">
          <div className="col">
            <Card>
              <CardBody>
                {
                  hasTeam ?
                    <Row className="align-items-center">
                      <Col className="text-left" xs="12" lg="12" md="12">
                        Ваша команда:
                        <span className="text-right text-dark font-weight-bold ml-1">{team.name}</span>
                      </Col>
                    </Row>
                    :
                    <Row className="align-items-center">
                      <Col className="text-left" xs="7" lg="8" md="8">
                        Команда не створена
                      </Col>
                      <Col className="text-right" xs="5" lg="4" md="4">
                        <Button color="info" outline type="button" onClick={handleClickCreateTeam}>
                          Створити
                        </Button>
                      </Col>
                    </Row>
                }
              </CardBody>
            </Card>
          </div>
        </Row>
        <CreateTeamModal isOpen={isCreateTeamModalOpen} onClose={handleCloseCreateTeam} onConfirm={handleCreateTeam} />
        <TeamRegisterToQuestModal
            isOpen={isTeamRegisterToQuestModalOpen}
            onClose={handleCloseRegisterTeamToQuestModal}
            onConfirm={handleRegisterTeamToQuest}
        />
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col>
                    <h3 className="mb-0">Доступні квести</h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Назва</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Дата і час початку</th>
                    <th scope="col">Дія</th>
                  </tr>
                </thead>
                <tbody>
                {questsWithStatuses.map(quest => (
                    <tr key={quest.id}>
                      <th scope="row">
                        <div className="align-items-center">
                          <span className="mb-0 text-sm">
                            {quest.name}
                          </span>
                        </div>
                      </th>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{quest.status}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{humanDateTime(quest.start_datetime)}</span>
                        </div>
                      </td>
                      <td className="d-flex align-items-left">
                        <QuestActionButton
                            hasTeam={hasTeam}
                            quest={quest}
                            registerAction={handleOpenRegisterTeamToQuestModal}
                            startingQuestAction={handleOpenStartingQuestModal}
                            continuingQuestAction={handleContinuingQuest}
                        />
                      </td>
                    </tr>
                ))}
                </tbody>
              </Table>
              <CardFooter>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default PlayerHome;
