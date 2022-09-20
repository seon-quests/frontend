// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col, Button, CardBody, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, FormFeedback
} from "reactstrap";
import ReactDatetime from "react-datetime";
import 'moment/locale/uk';
// core components
import Header from "components/Headers/Header.js";
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import {createQuest, editQuest, getQuest} from "../../services/quests";
import {useParams} from "react-router-dom";
import moment from "moment/moment";
import {object, string} from "yup";

const AdminCreateUpdateQuest = () => {
  const [initValues, setInitValues] = useState(
      {
        "name": "",
        "description": "",
        "start_datetime": moment().toDate(),
        "has_plug_stage": false
      }
  );
  const { id } = useParams();
  const isEditMode = id;
  const validationSchema = object({
    name: string().required("Поле обов`язкове"),
    description: string().required("Поле обов`язкове"),
  });
  const formik = useFormik(
      {
        initialValues: initValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: onSubmit
      }
  )

  async function onSubmit(values, {resetForm}) {
    if (isEditMode) {
      try {
        const response = await editQuest(values, id);
        if (response.id) {
          alert('Квест успішно оновлено!')
        }
      } catch (error) {
        alert('Сталась помилка')
      }
    }
    else {
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

  useEffect(() => {
    if(isEditMode){
      async function fetchQuest() {
        try {
          const data = await getQuest(id)
          data['start_datetime'] = moment(data['start_datetime']).toDate()
          setInitValues(data);
        } catch (e) {
          console.log(e);
        }
      }
      fetchQuest();
    }
  }, [])

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
                    <h3 className="mb-0">
                      {isEditMode ? `Редагування квесту № ${id}` : `Створення квесту` }
                    </h3>
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
                              className={`form-control-alternative ${formik.errors.name ? 'is-invalid': ''}`}
                              id="input-username"
                              placeholder="Мокрий квест"
                              type="text"
                              name="name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                          />
                          <FormFeedback>{formik.errors.name}</FormFeedback>
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
                                type="date"
                                value={formik.values.start_datetime}
                                onChange={(date) => formik.setFieldValue('start_datetime', moment(date).toDate())}
                                dateFormat="DD.MM.yyyy"
                                timeFormat="HH:mm"
                                locale="uk"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <div className="custom-control custom-checkbox">
                          <input
                              className="custom-control-input"
                              id="hasPlugStageCheckbox"
                              type="checkbox"
                              name="has_plug_stage"
                              checked={formik.values.has_plug_stage}
                              onChange={formik.handleChange}
                          />
                          <label className="custom-control-label" htmlFor="hasPlugStageCheckbox">
                            Рахувати час з другого раунду
                          </label>
                        </div>
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
                          className={`form-control-alternative ${formik.errors.description ? 'is-invalid': ''}`}
                          placeholder="Декілька слів про цей супер квест..."
                          rows="4"
                          type="textarea"
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                      />
                      <FormFeedback>{formik.errors.description}</FormFeedback>
                    </FormGroup>
                  </div>
                  <Row>
                    <Button color="primary" outline type="submit">
                      {isEditMode ? "Редагувати квест" : "Створити квест" }
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

export default AdminCreateUpdateQuest;
