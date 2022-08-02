// reactstrap components
import {
    Card,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Table,
    Container,
    Row,
    Col,
    Button, CardBody, CardTitle, NavItem, NavLink, Nav, TabContent, TabPane
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import {getQuestStages} from "../../services/questStages";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getQuest} from "../../services/quests";
import classnames from "classnames";
import AdminQuestStagesListTab from "../../components/Tabs/AdminQuestStagesListTab";
import AdminQuestTeamsTab from "../../components/Tabs/AdminQuestTeamsTab";
import AdminQuestResultsTab from "../../components/Tabs/AdminQuestResultsTab";

const AdminControlQuest = () => {
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState(1);
    const [questData, setQuestData] = useState({
        "name": "Невідомо",
        "start_datetime": "Невідомо",
        "description": "Невідомо"
    });

    useEffect(() => {
        fetchQuest();
    }, []);

    async function fetchQuest() {
        try {
            const data = await getQuest(id)
            setQuestData(data);
            console.log(data)
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
                                        <span className="h3 font-weight-bold mb-0">
                                        Закрита
                                      </span>
                                        <p className="mt-3 mb-0">
                                            <Button
                                                color="primary"
                                                onClick={(e) => e.preventDefault()}
                                                size="sm"
                                            >
                                                Відкрити
                                            </Button>
                                        </p>
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
                                        <span className="h3 font-weight-bold mb-0">
                      Нерозпочата
                    </span>
                                        <p className="mt-3 mb-0">
                                            <Button
                                                color="primary"
                                                onClick={(e) => e.preventDefault()}
                                                size="sm"
                                            >
                                                Розпочати
                                            </Button>
                                        </p>
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
                        Дата і час початку: {questData.start_datetime}
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
