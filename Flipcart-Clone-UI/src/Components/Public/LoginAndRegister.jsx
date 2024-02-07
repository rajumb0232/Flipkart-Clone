import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
import FormImageBlock from '../Util/FormImageBlock';
import AxiosPrivateInstance from '../API/AxiosPrivateInstance';

const Register = ({role, isLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [isSubmitFailed, setSubmitFailed] = useState(false);
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth();
  const axiosInstance = AxiosPrivateInstance();

  const emailRegex = /[a-zA-Z0-9+_.-]+@[g][m][a][i][l]+.[c][o][m]/
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*#$^@]).{8,}$/

  const isEmailValid = (email) => emailRegex.test(email);
  const isPwdValid = (pwd) => pwdRegex.test(pwd);
  
  // when isSubmitFailed changed from false to true
  useEffect(() => {
    if(isSubmitFailed !== false){
      setIsSubmited(false)
      console.log(isSubmited)
    }
  }, [isSubmitFailed])
  // when isSubmited get changed perform login or register
  useEffect(() => {
    if(isSubmited !== false){
    const result = (isLogin)? handleLogin() : handleRegister();
    console.log("result: " + result);
    setIsSubmited(false);
    }
  }, [isSubmited])
    
  //handling submit
  const submit = (event) => {
  event.preventDefault();
  setSubmitFailed(false);
  setIsSubmited(true);
  }

  // basic request config
  const endPoint =  isLogin? "/login" : "/users/register";

  // method to handle login reguest
  const handleLogin = async () => {
    console.log({email, password})
    try{
      const response = await axiosInstance.post(endPoint,{email, password});    
      if(response.status === 200){
        console.log(response.data)
        setAuth({
          ...auth,
          userId: response.data.data.userId,
          username: response.data.data.username,
          role: response.data.data.role,
          isAuthenticated: response.data.data.authenticated
        })
        navigate('/');
      } else console.log(response);  
    }catch(error){
      console.log(error);
    }     
  }   

  // method to handle register request
  const handleRegister = () => {
    try{
      const response = axiosInstance.post(endPoint, {email, password});
      if(response.status === 202){
        setAuth({
          ...auth,
          userId:response.data.data.userId,
          username:email,
          fromLocation:"register"
        });
        navigate("/verify-email");
      }
    }catch(error){
      console.log(error);
    }
  }


  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center bg-slate-100'>
      <form className='flex flex-row justify-center items-center w-4/5 h-5/6 px-10 py-6  mt-16 rounded-lg bg-white'>

        {
        (role=="SELLER")
        ? <FormImageBlock src={"/src/Images/registerSeller.jpg"} alt={"Seller JPG"} 
          credit={{href:"https://www.freepik.com/free-vector/support-local-business-concept_9010726.htm#fromView=search&term=seller&track=sph&regularType=vector&page=1&position=1&uuid=dc030a6f-b617-4a88-9a41-1a2b8f4f865f",
                  tb:"Image by ",
                  ta:"",
                  tl:"Freepik"}}/>
        : <FormImageBlock src={"/src/Images/registerCustomer.jpg"} alt={"Shopping JPG"}
          credit={{href:"https://www.freepik.com/free-vector/seasonal-sale-discounts-presents-purchase-visiting-boutiques-luxury-shopping-price-reduction-promotional-coupons-special-holiday-offers-vector-isolated-concept-metaphor-illustration_12083346.htm#fromView=search&term=shopping&track=sph&regularType=vector&page=1&position=0&uuid=8e4c697b-0e19-4ca8-b235-d2bf59d415c3",
                tb:"",
                ta:" on Freepik",
                tl:"Image by vectorjuice"}}/>
        }

        <div className='flex flex-col justify-center w-6/12 h-full'>
          <h1 className='text-slate-700 font-semibold text-4xl my-8'>
            {isLogin? "Login" : "Register"}
          </h1>

          <label htmlFor="email" 
          className='text-slate-700 text-xl'
          >Email: </label>
          <input type="email" id='email' onChange={(event) => setEmail(event.target.value)} required={true}
          className='border-b-2 border-slate-400 mb-0'
          />
          <p className='text-xs text-red-400 font-mono font-semibold min-h-2 mb-4' 
          >{ email !== "" && !isEmailValid(email) ? "Invalid Email Id" : "" }
          </p>

          <label htmlFor="password" 
          className='text-slate-700 text-xl my-2'
          >Password: </label>
          <input type="password" id='password' onChange={(event) => setPassword(event.target.value)} required={true}
          className='border-b-2 border-slate-400 mb-0'
          />
          <p className='text-xs text-red-400 font-mono font-semibold min-h-2 mb-4' 
          >{ password !== "" && !isPwdValid(password) ? "Password must contain at least 1 letter, 1 number, 1 special character" : "" }
          </p>

          <button onClick={submit} disabled={isSubmited}
          className='bg-blue-500 text-slate-100 font-bold rounded-lg w-1/5 px-4 py-2 my-8 ml-auto'
          >
           { (isSubmited)
            ? <i className="fa-solid fa-circle-notch animate-spin"></i>
            : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}
export default Register;