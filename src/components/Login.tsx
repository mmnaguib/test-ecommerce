import React, { useCallback, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/slices/AuthSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import loginImg from '../assets/images/login.jpg';
import logoImg from '../assets/images/logo.png';
import '../assets/css/login.css';
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      dispatch(login({ email, password })).then((result) => {
        if (result.payload.access_token === true) {
          navigate("/home");
          toast.success('مرحباً بك في موقعنا')
        } else {
          toast.error('البريد الإلكتروني او كلمة المرور  غير صحيح')
        }
      });
    },
    [dispatch, email, navigate, password]
  );
  return (
    <div className="loginPage">
      <div className="loginImage">
        <img src={loginImg} alt="login" width='100%'/>
      </div>
      <div className="loginForm">
        <img src={logoImg} alt="logo" width='200px' className="logoImg"/>
        <h4>مرحباً بك في موقعنا .. سجل دخولك الآن </h4>
        <Form onSubmit={handleSubmit}>
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
          <NavLink to='/register'>تسجيل لأول مرة ؟</NavLink>
        </Form>
      </div>
    </div>
  );
};

export default Login;
