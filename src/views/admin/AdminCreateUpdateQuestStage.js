// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col, Button, CardBody, Form, FormGroup, Input, FormFeedback
} from "reactstrap";
import 'moment/locale/uk';
// core components
import Header from "components/Headers/Header.js";
import {useFormik} from "formik";
import {useParams} from "react-router-dom";
import {createQuestStage, editQuestStage, getQuestStage} from "../../services/questStages";
import {useEffect, useState} from "react";
import { object, string, number } from 'yup';

const AdminCreateUpdateQuestStage = () => {
  const [initValues, setInitValues] = useState(
      {
        "answer": "",
        "description": "",
        "order_number": 1,
      }
  );
  const { id } = useParams();
  const { stage_id } = useParams();
  const isEditMode = stage_id;
  const validationSchema = object({
    answer: string().required("Поле обов`язкове"),
    description: string().required("Поле обов`язкове"),
    order_number: number().required("Поле обов`язкове").positive("Більше 0").integer("Ціле число, бляха")
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
        const response = await editQuestStage(values, id, stage_id);
        if (response.id) {
          alert('Eтап успішно оновлено!')
        }
      } catch (error) {
        alert('Сталась помилка')
      }
    }
    else {
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

  useEffect( () => {
    if(isEditMode){
      async function fetchQuestStageValues() {
        try {
          const data = await getQuestStage(id, stage_id);
          setInitValues(data);
        } catch (e) {
          console.log(e);
        }
      }
      fetchQuestStageValues();
    }
  }, []);

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
                      {isEditMode ? `Редагування етапу квесту № ${id}` : `Створення етапу квесту № ${id}` }
                    </h3>
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
                              className={`form-control-alternative ${formik.errors.answer ? 'is-invalid': ''}`}
                              id="input-answer"
                              placeholder="Шевченка"
                              type="text"
                              name="answer"
                              value={formik.values.answer}
                              onChange={formik.handleChange}
                          />
                          <FormFeedback>{formik.errors.answer}</FormFeedback>
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
                              className={`form-control-alternative ${formik.errors.order_number ? 'is-invalid': ''}`}
                              id="input-order-number"
                              min={1}
                              placeholder="1"
                              type="number"
                              name="order_number"
                              value={formik.values.order_number}
                              onChange={formik.handleChange}
                          />
                          <FormFeedback>{formik.errors.order_number}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Питання етапу</label>
                      <Input
                          className={`form-control-alternative ${formik.errors.description ? 'is-invalid': ''}`}
                          placeholder="Найкраща вулиця Здолбунова?"
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
                      {isEditMode ? "Редагувати етап" : "Створити етап" }
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

export default AdminCreateUpdateQuestStage;
