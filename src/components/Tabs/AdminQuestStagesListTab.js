import {
    Button,
    Card,
    CardHeader,
    Col,
    Row,
    Table
} from "reactstrap";
import {Link} from "react-router-dom";
import {deleteQuestStage, getQuestStages} from "../../services/questStages";
import {useEffect, useState} from "react";
import ConfirmationDeletingQuestStageModal from "../Modals/ConfirmationDeletingQuestStageModal";

const AdminQuestStagesListTab = (props) => {
    const [questStages, setQuestStages] = useState([]);
    const [selectedQuestStageId, setSelectedQuestStageId] = useState(null);
    const [confirmDeletingStageModalOpen, setConfirmDeletingStageModalOpen] = useState(null);

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

    const handeCallingDeletingModal = (questStageId) => {
        setSelectedQuestStageId(questStageId);
        setConfirmDeletingStageModalOpen(true);
    }

    const handeConfirmingDeletingStageModal = async () => {
        await deleteQuestStage(props.id, selectedQuestStageId)
        await fetchQuestStages();
        handleCloseConfirmDeletingStageModal()
    }

    const handleCloseConfirmDeletingStageModal = () => {
        setConfirmDeletingStageModalOpen(false);
    };

    return (
        <>
            <ConfirmationDeletingQuestStageModal
                isOpen={confirmDeletingStageModalOpen}
                onClose={handleCloseConfirmDeletingStageModal}
                onConfirm={handeConfirmingDeletingStageModal}
            />
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
                                <th scope="col" />
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
                                    <td>
                                        <a className="table-action table-action-delete" onClick={()=>handeCallingDeletingModal(questStage.id)}>
                                            <i className="fas fa-trash"></i>
                                        </a>
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