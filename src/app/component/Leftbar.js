"use client"

import Image from 'next/image'
import Link from 'next/link'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import {useState} from 'react'
import Person2Icon from '@mui/icons-material/Person2';
import ImageIcon from '@mui/icons-material/Image';
import BookIcon from '@mui/icons-material/Book';
import QuizIcon from '@mui/icons-material/Quiz';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import Person4Icon from '@mui/icons-material/Person4';
import SettingsIcon from '@mui/icons-material/Settings';
import PublicIcon from '@mui/icons-material/Public';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ForestIcon from '@mui/icons-material/Forest';import ParkIcon from '@mui/icons-material/Park';
import { toast} from 'react-toastify'; 
import { useRouter } from 'next/navigation';
import { useSelector} from 'react-redux';

export default function Leftbar(){
  const logoBlack = process.env.LOGO_BLACK;
  const logoWhite = process.env.LOGO_WHITE;

  const router = useRouter();
  const [active, setActive] = useState(false);
  const { showDay } = useSelector((state) => state.toggleDay);
  const viewList=()=>{
    setActive(!active);
//    console.log(logout)
}

const removeLogin=()=>{
  localStorage.removeItem('loginResponse');
  toast.success('Logout Successfully' );
  router.push('/login');
}

   return(
        <>
       <div className="leftbar">
       
        <div className='leftbar_div'>
          <div className="leftbar-logo"><Image src={showDay ? 'http://api.zealthtechnologies.com/const_img/logo-black.png' : 'http://api.zealthtechnologies.com/const_img/logo-white.png'} alt="logo" height={40} width={200}/></div>
          <div className='leftbar-links'>
            <ul>
                <li><Link href="/dashboard"><DashboardCustomizeOutlinedIcon /> <span>Dashboard</span></Link></li>                				<li><Link href="/Orders"><ListIcon /><span>Orders</span></Link> </li>
                <li><Link href="/Users"><Person2Icon /> <span>Users</span></Link></li>
                <li><Link href="/ListBanner"><ImageIcon /><span>Banner</span></Link> </li>                <li><Link href="/projects"><ForestIcon /> <span>Projects</span></Link></li>				<li><Link href="/projects"><ParkIcon /> <span>Trees</span></Link></li>
                <li><Link href="/Blogs"><BookIcon /><span>Blogs</span></Link> </li>
                <li><Link href="/Quiz"><QuizIcon /><span>Quiz</span></Link> </li>
				        <li><Link href="/caretakers"><Person4Icon /> <span>Catetakers</span></Link></li>
                {/*<li><Link href="/dashboard"><PublicIcon /> <span>International</span></Link></li>
                <li className={active ? 'active' : ''}><AutoStoriesIcon /> <span>Pages</span></li>*/}
            </ul>
          </div>

          <div className='logout-btn'><button className='btn btn-danger' onClick={removeLogin}><LogoutIcon /> Log Out</button></div>

       </div>
       </div>

        </>
    )
}
 