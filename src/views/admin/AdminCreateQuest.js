// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col, Button, CardBody, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
import ReactDatetime from "react-datetime";
import 'moment/locale/uk';
// core components
import Header from "components/Headers/Header.js";
import {useFormik} from "formik";
import {useState} from "react";
import {createQuest} from "../../services/quests";

const AdminCreateQuest = () => {
  const [startDate, setStartDate] = useState(new Date());
  const formik = useFormik(
      {
        initialValues: {
          "name": "",
          "description": "",
          "start_datetime": startDate,
        },
        onSubmit: async (values, {resetForm}) => {
          try {
            const response = await createQuest(values);
            if (response.name) {
              alert('Квест '+response.name+' успішно створено!')
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
                    <h3 className="mb-0">Створення квесту</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form role="form" onSubmit={formik.handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    Загальна інформація
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                              className="form-control-label"
                              htmlFor="input-username"
                          >
                            Назва квесту
                          </label>
                          <Input
                              className="form-control-alternative"
                              id="input-username"
                              placeholder="Мокрий квест"
                              type="text"
                              name="name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                              className="form-control-label"
                              htmlFor="input-email"
                          >
                            Дата і час початку
                          </label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime
                                id="dateFrom"
                                name="start_datetime"
                                type="text"
                                value={formik.values.start_datetime}
                                onChange={(date) => formik.setFieldValue('start_datetime', date)}
                                timeFormat={true}
                                locale="uk"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Опис</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Опис</label>
                      <Input
                          className="form-control-alternative"
                          placeholder="Декілька слів про цей супер квест..."
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
                      Створити квест
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

export default AdminCreateQuest;
