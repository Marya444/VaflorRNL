import { useEffect } from "react";
import LogInForm from "../../components/forms/form/LogInForm";





const Login = () => {
    useEffect(() => {
    document.title = "Login Page";
}, []);
    return (
        <>
        <LogInForm />
        </>
    );
};

export default Login;