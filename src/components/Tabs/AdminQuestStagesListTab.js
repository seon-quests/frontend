import {
    Button,
    Card,
    CardHeader,
    Col, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Table,
    UncontrolledDropdown
} from "reactstrap";
import {Link} from "react-router-dom";
import {getQuestStages} from "../../services/questStages";
import {useEffect, useState} from "react";

const AdminQuestStagesListTab = (props) => {
    const [questStages, setQuestStages] = useState([]);

    useEffect(() => {
        fetchQuestStages();
    }, []);

    async function fetchQuestStages() {
        try {
            const data = await getQuestStages(props.id)
            setQuestStages(data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Етапи квесту</h3>
                                </Col>
                                <Col className="text-right" xs="4">
                                    <Link to={`/admin/quests/${props.id}/stages/create`}>
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
        </>
    );
}
export default AdminQuestStagesListTab