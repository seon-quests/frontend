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
    Button, CardBody, CardTitle
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import {getQuestStages} from "../../services/questStages";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getQuest} from "../../services/quests";

const AdminControlQuest = () => {
    const {id} = useParams();
    const [questStages, setQuestStages] = useState([]);
    const [questData, setQuestData] = useState({
        "name": "Невідомо",
        "start_datetime": "Невідомо",
        "description": "Невідомо"
    });

    useEffect(() => {
        fetchQuestStages();
        fetchQuest();
    }, []);

    async function fetchQuestStages() {
        try {
            const data = await getQuestStages(id)
            setQuestStages(data);
        } catch (e) {
            console.log(e);
        }
    }

    async function fetchQuest() {
        try {
            const data = await getQuest(id)
            setQuestData(data);
            console.log(data)
        } catch (e) {
            console.log(e);
        }
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
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Етапи квесту</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Link to={`/admin/quests/${id}/stages/create`}>
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Додати
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Почерговість</th>
                                    <th scope="col">Опис</th>
                                    <th scope="col">Відповідь</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>
                                {questStages.map(questStage => (
                                    <tr key={questStage.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">{questStage.order_number}</span>
                                            </div>
                                        </td>
                                        <th scope="row">
                                            <span className="mb-0 text-sm">
                                              {questStage.description}
                                            </span>
                                        </th>

                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">{questStage.answer}</span>
                                            </div>
                                        </td>
                                        <td className="text-right">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    className="btn-icon-only text-light"
                                                    href="#pablo"
                                                    role="button"
                                                    size="sm"
                                                    color=""
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <i className="fas fa-ellipsis-v"/>
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        Action
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
            </Container>
        </>
    );
};

export default AdminControlQuest;
