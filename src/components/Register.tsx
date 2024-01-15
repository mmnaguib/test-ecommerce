import { useCallback, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { register } from "../redux/slices/AuthSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import loginImg from '../assets/images/login.jpg';
import logoImg from '../assets/images/logo.png';
import '../assets/css/login.css';
const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      dispatch(register({name, email, password })).then((result) => {
        if (result.type === 'auth/register/fulfilled') {
          navigate("/");
          toast.success(' تم الحفظ بنجاح .. سجل الآن ي ')
        } else {
          toast.error('البريد الإلكتروني او كلمة المرور  غير صحيح')
        }
      });
    },
    [dispatch, email, name, password, navigate, ]
  );
  return (
    <div className="loginPage">
      <div className="loginForm register">
        <img src={logoImg} alt="logo" width='200px' className="logoImg"/>
        <h4>مرحباً بك في موقعنا .. سجل دخولك الآن </h4>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label className="label-control" htmlFor="username">اسم المستخدم</Label>
            <Input
              type="text"
              placeholder="اسم المستخدم"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="username"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label className="label-control" htmlFor="email">البريد الإلكتروني</Label>
            <Input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              required
            />
          </FormGroup>
          <FormGroup>
            <label className="label-control" htmlFor="password">كلمة المرور</label>
            <Input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              required
            />
          </FormGroup>
          <Button className="btn btn-md" color="primary" type="submit">دخول</Button>
          <NavLink to='/'>تسجيل الدخول</NavLink>
        </Form>
      </div>
      <div className="loginImage">
        <img src={loginImg} alt="login" width='100%'/>
      </div>
    </div>
  );
};

export default Register;
