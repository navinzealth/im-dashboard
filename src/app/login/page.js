'use client'
import Image from 'next/image';
import { useState, useEffect,  useRef} from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/loginSlice';
import { toast} from 'react-toastify';

export default function Login(){


    const toastId = useRef(null);
    const router = useRouter();
    const [email,setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [sendvalid, setSendvalid]=useState(false)
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
   
  // console.log(authState)

 
    const getLogin= async()=>{
        setSendvalid(true)
       // console.log(sendvalid)
       try {
        const requestData = { email: email, password: password, };
        await dispatch(login(requestData));

        // if (authState.data.Status === true) {
        //     successPopup();
        //     console.log('true');
        //   } else if (authState.data.Status === false) {
        //     failPopup();
        //     console.log('false');
        //   }

      } catch (error) {
        // Handle error
      }
    }
  

    function successPopup(){
        toast.success('Login Successfully' )
        toast.dismiss(toastId.current);
                               }
      function failPopup(){
      toast.error('Login Failed')
      toast.dismiss(toastId.current);
                          }
      function pendingPopup(){
        toastId.current =  toast.loading('Validating credentials') }

    //     if(sendvalid){
    // if(authState.status == 'validating'){    }
    // else if(authState.data.Status == true){successPopup();console.log('true')}
    // else if(authState.data.Status == false){failPopup();console.log('false')}
    //     }
    //     else{}


  useEffect(() => {
    const loginCredentials =JSON.parse( localStorage.getItem('loginResponse'));
//  console.log(JSON.parse(loginCredentials))
    // Check if the user is already logged in
 //   console.log(loginCredentials.Status)
    const userID = loginCredentials?.Status;
    if (userID) {
      // Redirect to a different page, for example, the dashboard
      router.push('/dashboard');
    }

      
    if (sendvalid) {
        if (authState.status === 'validating') {
          // You can add a loading toast if needed
          pendingPopup();
        } else if (authState.data.Status === true) {
          successPopup();
        } else if (authState.data.Status === false) {
          failPopup();
        }
      }


  }, [authState, sendvalid, router]);



    return(
        <>
         <div className="container">
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className="login_cover">
                        <div className="login_cover_img"><Image src="http://api.zealthtechnologies.com/const_img/home-sec2-img.webp" fill={true} alt="login"/></div>
                        <div className="login_cover_field">
                            <h2>Login</h2>
                            <div className='loginput-box'>
                                <label>Email</label>
                                <input type="text" placeholder="your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className='loginput-box'>
                                <label>Password</label>
                                <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className='loginput-box'>
                                <button className="btn btn-success btn-lg" style={{width:'100%'}} onClick={getLogin}>Login</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
        </>
    )
}