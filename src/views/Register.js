// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col, Row, FormFeedback
} from "reactstrap";
import {useFormik} from "formik";
import {getRedirectPath, registerPlayer} from "../services/authServices";
import {useHistory} from "react-router-dom";
import {object, string} from "yup";

const Register = () => {
  const history = useHistory();
  const validationSchema = object({
    first_name: string().required("Поле обов`язкове"),
    last_name: string().required("Поле обов`язкове"),
    email: string().required("Поле обов`язкове"),
    phone_number: string().required("Поле обов`язкове"),
    password: string().required("Поле обов`язкове"),
  });
  const formik = useFormik(
      {
        initialValues: {
          "first_name": "",
          "last_name": "",
          "email": "",
          "password": "",
          "phone_number": "",
          "instagram": "",
          "type": "player"
        },
        validationSchema: validationSchema,
        onSubmit: async (values, {resetForm}) => {
          try {
            const response = await registerPlayer(values);
            if (response.data.access_token) {
              console.log('token')
              console.log(response.data.access_token)
              localStorage.setItem('access_token', response.data.access_token);
            }
            resetForm();
            history.push(getRedirectPath());
          } catch (error) {
            console.log(error)
          }
        }
      }
  )
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Реєстрація в SEON Quests</small>
            </div>
            <Form role="form" onSubmit={formik.handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                      invalid={`${formik.errors.email ? 'is-invalid': ''}`}
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                  />
                  <FormFeedback>{formik.errors.email}</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                      invalid={`${formik.errors.first_name ? 'is-invalid': ''}`}
                      placeholder="Ім'я"
                      name="first_name"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                  />
                  <FormFeedback>{formik.errors.first_name}</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                      invalid={`${formik.errors.last_name ? 'is-invalid': ''}`}
                      placeholder="Прізвище"
                      name="last_name"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                  />
                  <FormFeedback>{formik.errors.last_name}</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-phone" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                      invalid={`${formik.errors.phone_number ? 'is-invalid': ''}`}
                      placeholder="Телефон"
                      name="phone_number"
                      value={formik.values.phone_number}
                      onChange={formik.handleChange}
                  />
                  <FormFeedback>{formik.errors.phone_number}</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-app" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                      placeholder="Інстаграм"
                      name="instagram"
                      value={formik.values.instagram}
                      onChange={formik.handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    invalid={`${formik.errors.password ? 'is-invalid': ''}`}
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <FormFeedback>{formik.errors.password}</FormFeedback>
                </InputGroup>
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        checked={true}
                        disabled={true}
                    />
                    <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        Я прочитав(-ла) і погоджуюсь з {" "}
                        <a href="/auth/rules" target="_blank">
                          правилами використання цього сайту
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Створити акаунт
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
