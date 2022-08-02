// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col, Button, CardBody, Form, FormGroup, Input
} from "reactstrap";
import 'moment/locale/uk';
// core components
import Header from "components/Headers/Header.js";
import {useFormik} from "formik";
import {useParams} from "react-router-dom";
import {createQuestStage} from "../../services/questStages";

const AdminCreateQuestStage = () => {
  const { id } = useParams();
  const formik = useFormik(
      {
        initialValues: {
          "answer": "",
          "description": "",
          "order_number": 1,
        },
        onSubmit: async (values, {resetForm}) => {
          try {
            const response = await createQuestStage(values, id);
            if (response.id) {
              alert('Eтап успішно створено!')
            }
            resetForm();
          } catch (error) {
            alert('Сталась помилка')
            console.log(error)
          }
        }
      }
  )
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h3 className="mb-0">Створення етапу квесту № {id}</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form role="form" onSubmit={formik.handleSubmit}>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                              className="form-control-label"
                              htmlFor="input-answer"
                          >
                            Відповідь
                          </label>
                          <Input
                              className="form-control-alternative"
                              id="input-answer"
                              placeholder="Шевченка"
                              type="text"
                              name="answer"
                              value={formik.values.answer}
                              onChange={formik.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                              className="form-control-label"
                              htmlFor="input-order-number"
                          >
                            Порядковий номер етапу
                          </label>
                          <Input
                              className="form-control-alternative"
                              id="input-order-number"
                              min={1}
                              placeholder="1"
                              type="number"
                              name="order_number"
                              value={formik.values.order_number}
                              onChange={formik.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Питання етапу</label>
                      <Input
                          className="form-control-alternative"
                          placeholder="Найкраща вулиця Здолбунова?"
                          rows="4"
                          type="textarea"
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                      />
                    </FormGroup>
                  </div>
                  <Row>
                    <Button color="primary" outline type="submit">
                      Створити етап
                    </Button>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AdminCreateQuestStage;
