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
  Row,
  Col,
} from "reactstrap";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {getRedirectPath, login} from "../services/authServices";

const Login = () => {
  const history = useHistory();

  function showSorryMessage() {
    return alert('Вибачте, ще працюємо над цим. А поки - напишіть краще адміну');
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: async (values) => {
      try {
        console.log('login')
        const res = await login(values);
        if (res.data.access_token) {
          console.log('token')
          console.log(res.data.access_token)
          localStorage.setItem('access_token', res.data.access_token);
        }
        history.push(getRedirectPath());
      } catch (e) {
        alert('Неправильні логін або пароль')
        console.log(e)
      }
    }
  });

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Увійти в SEON Quests</small>
            </div>
            <Form role="form" onSubmit={formik.handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="username"
                    value={formik.values.username}
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
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Увійти
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              onClick={(e) => e.preventDefault()}
            >
              <small onClick={showSorryMessage}>Забули пароль?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
