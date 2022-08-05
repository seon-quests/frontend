// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
import Header from "components/Headers/Header.js";
// core components
import {useEffect, useState} from "react";
import {getQuests} from "../../services/quests";
import {Link} from "react-router-dom";
import {humanDateTime} from "../../services/dateTimeConfig";

const AdminQuests = () => {
  // to store all the hospitals
  const [quests, setQuests] = useState([]);

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

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Квести</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Link to={`/admin/quests/create`}>
                      <Button
                          color="primary"
                          size="sm"
                      >
                        Створити
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Назва</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Дата і час початку</th>
                  </tr>
                </thead>
                <tbody>
                {quests.map(quest => (
                    <tr key={quest.id}>
                      <th scope="row">
                        <Link to={`/admin/quests/${quest.id}`}>
                          <div className="align-items-center">
                            <span className="mb-0 text-sm">
                              {quest.name}
                            </span>
                          </div>
                        </Link>
                      </th>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          {quest.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{humanDateTime(quest.start_datetime)}</span>
                        </div>
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

export default AdminQuests;
