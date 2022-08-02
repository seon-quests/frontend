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
  Col,
} from "reactstrap";
import {useFormik} from "formik";
import {getRedirectPath, registerPlayer} from "../services/authServices";
import {useHistory} from "react-router-dom";

const Register = () => {
  const history = useHistory();
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
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                      placeholder="Ім'я"
                      name="first_name"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                      placeholder="Прізвище"
                      name="last_name"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                      placeholder="Телефон"
                      name="phone_number"
                      value={formik.values.phone_number}
                      onChange={formik.handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
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
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </InputGroup>
              </FormGroup>
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
