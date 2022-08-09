// reactstrap components
import {
    Card,
    Container,
    Row,
    Col,
    Button, CardBody, CardTitle, NavItem, NavLink, Nav, TabContent, TabPane
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {changeQuestStatus, getQuest} from "../../services/quests";
import classnames from "classnames";
import AdminQuestStagesListTab from "../../components/Tabs/AdminQuestStagesListTab";
import AdminQuestTeamsTab from "../../components/Tabs/AdminQuestTeamsTab";
import AdminQuestResultsTab from "../../components/Tabs/AdminQuestResultsTab";
import {humanDateTime} from "../../services/dateTimeConfig";

const AdminControlQuest = () => {
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState(1);
    const [questData, setQuestData] = useState({
        "name": "Невідомо",
        "start_datetime": "Невідомо",
        "description": "Невідомо"
    });

    async function changeStatus(status) {
        const response = await changeQuestStatus(id, status)
        if(response){
            await fetchQuest()
            alert('Статус успішно змінено')
            return
        }
        alert('Статус чомусь не змінився')
        return
    }

    const questRegistrationStatus = () => {
        let text = "Нерозпочата"
        let status = "registration"
        let buttonText = "Відкрити"
        let buttonDisabled = false
        if(questData.status==='registration'){
            text = "Відкрита"
            status = "draft"
            buttonText = "Закрити"
        }
        else if(questData.status==='started'||questData.status==='finished'){
            text = "Завершена"
            status = "draft"
            buttonText = "Неможливо здійснити дію"
            buttonDisabled = true
        }
        return <>
            <span className="h3 font-weight-bold mb-0">
                {text}
            </span>
            <p className="mt-3 mb-0">
                <Button
                    color="primary"
                    onClick={(e) => changeStatus(status)}
                    disabled={buttonDisabled}
                    size="sm"
                >
                    {buttonText}
                </Button>
            </p>
        </>
    }

    const questStartStatus = () => {
        let text = "Нерозпочатий"
        let status = "started"
        let buttonText = "Розпочати"
        let buttonDisabled = false
        if(questData.status==='started'){
            text = "Розпочатий"
            status = "finished"
            buttonText = "Завершити"
        }
        else if(questData.status==='finished'){
            text = "Завершений"
            status = "draft"
            buttonText = "Неможливо здійснити дію"
            buttonDisabled = true
        }
        return <>
            <span className="h3 font-weight-bold mb-0">
                {text}
            </span>
            <p className="mt-3 mb-0">
                <Button
                    color="primary"
                    onClick={(e) => changeStatus(status)}
                    disabled={buttonDisabled}
                    size="sm"
                >
                    {buttonText}
                </Button>
            </p>
        </>
    }

    useEffect(() => {
        fetchQuest();
    }, []);

    async function fetchQuest() {
        try {
            const data = await getQuest(id)
            setQuestData(data);
        } catch (e) {
            console.log(e);
        }
    }

   function toggleTab(tabIndex) {
       setActiveTab(tabIndex)
   }

    return (
        <>
            <Header/>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row className="pb-4">
                    <Col lg="6" xl="4">
                        <Card className="card-stats mb-4 mb-xl-0 text-center">
                            <CardBody>
                                <Row>
                                    <div className="col">
                                        <CardTitle
                                            tag="h5"
                                            className="text-uppercase text-muted mb-4"
                                        >
                                            Реєстрація
                                        </CardTitle>
                                        {questRegistrationStatus()}
                                    </div>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6" xl="4">
                        <Card className="card-stats mb-4 mb-xl-0 text-center">
                            <CardBody>
                                <Row>
                                    <div className="col">
                                        <CardTitle
                                            tag="h5"
                                            className="text-uppercase text-muted mb-4"
                                        >
                                            Статус
                                        </CardTitle>
                                        {questStartStatus()}
                                    </div>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="12" xl="4">
                        <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody>
                                <Row>
                                    <div className="col">
                                        <CardTitle
                                            tag="h5"
                                            className="text-uppercase text-muted mb-0 text-center"
                                        >
                                            Деталі
                                        </CardTitle>
                                    </div>
                                </Row>
                                <p className="mt-4 mb-0 text-muted text-sm">
                      <span className="mr-2">
                        Назва: {questData.name}
                      </span>
                                </p>
                                <p className="mt-0 mb-0 text-muted text-sm">
                      <span className="mr-2">
                        Дата і час початку: {humanDateTime(questData.start_datetime)}
                      </span>
                                </p>
                                <p className="mt-0 mb-0 text-muted text-sm w-100 big-description">
                      <span className="mr-2">
                        Опис: {questData.description}
                      </span>
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {/* Table */}
                <div className="nav-wrapper">
                    <Nav
                        className="nav-fill flex-column flex-md-row"
                        id="tabs-icons-text"
                        pills
                        role="tablist"
                    >
                        <NavItem>
                            <NavLink
                                aria-selected={activeTab === 1}
                                className={classnames("mb-sm-3 mb-md-0", {
                                    active: activeTab === 1
                                })}
                                onClick={e => toggleTab(1)}
                                role="tab"
                            >
                                <i className="ni ni-cloud-upload-96 mr-2" />
                                Етапи квесту
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                aria-selected={activeTab === 2}
                                className={classnames("mb-sm-3 mb-md-0", {
                                    active: activeTab === 2
                                })}
                                onClick={e => toggleTab(2)}
                                href="#pablo"
                                role="tab"
                            >
                                <i className="ni ni-bell-55 mr-2" />
                                Команди
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                aria-selected={activeTab === 3}
                                className={classnames("mb-sm-3 mb-md-0", {
                                    active: activeTab === 3
                                })}
                                onClick={e => toggleTab(3)}
                                href="#pablo"
                                role="tab"
                            >
                                <i className="ni ni-calendar-grid-58 mr-2" />
                                Результати
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <TabContent activeTab={"tabs" + activeTab}>
                    <TabPane tabId="tabs1">
                        <AdminQuestStagesListTab id={id} />
                    </TabPane>
                    <TabPane tabId="tabs2">
                        <AdminQuestTeamsTab id={id} />
                    </TabPane>
                    <TabPane tabId="tabs3">
                        <AdminQuestResultsTab id={id} />
                    </TabPane>
                </TabContent>
            </Container>
        </>
    );
};

export default AdminControlQuest;
