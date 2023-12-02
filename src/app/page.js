"use client"
import Topbar from './component/Topbar'
import Leftbar from './component/Leftbar'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {usePathname} from 'next/navigation'
import { useSelector} from 'react-redux';

import { withAuth } from './utils/withAuth';

// export default function Home({children}) {
  const Home = ({ children }) => {
  const pathName = usePathname();
  const { showLeftBar, payload } = useSelector((state) => state.toggleLeftBar);

  const { showDay } = useSelector((state) => state.toggleDay);

  return (
   <>
   <div className={showDay ? 'day page-wrapper' : 'night page-wrapper'} style={{ display: 'flex' }}>
   {!showLeftBar ? '' : pathName!="/login" ? <Leftbar /> : ''}
           
            <div className='pagewrapper'>
            { pathName!="/login" ? <Topbar /> : ''}
              <div className='dashboard-page'>
              <ToastContainer position="top-center" autoClose={1000}/>
                 {children}
              </div>
            </div>
          </div>
   </>
  )
}


export default withAuth(Home);