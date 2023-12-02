"use client"

import { useState } from 'react'
import TextField from '@mui/material/TextField';
import EnhancedTable from './components/allUsersTable'
export default function Products(){

    const [age, setAge] = useState('');

      

        const handleChange = (event) => {

          setAge(event.target.value);

        };

  return(

   

                <div className="container">

                   <div className="row">



                     <div className="col-md-12">

                       <div className='page-header'>Users</div>

                     </div>



                     <div className='col-md-12'>

                       <div  style={{backgroundColor:'#fff',marginBottom:'20px',padding:'15px 15px'}}>

                       <div className='row'>

                         <div className='col-md-12'><TextField id="outlined-basic" label="Search Users" variant="outlined" fullWidth/></div>

                       </div>

                       </div>

                     </div>





                     <div className="col-md-12" style={{marginBottom:'150px'}}> <EnhancedTable /> </div>

                    </div>





                </div>

   

  )

}



