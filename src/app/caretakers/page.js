"use client"
import { useState, Suspense } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Loader from '@/app/component/Loader'
import Link from 'next/link'
import CareTable from './components/careTable'

export default function caretakers(){
    return(
        <>
          <div className="container">
                   <div className="row">
                     <div className="col-md-12">
                       <div className='page-header'>Caretakers</div>
                     </div>
                     <div className="col-md-12" style={{marginBottom:'20px'}}>
                        <div className="row">
                            <div className="col-md-3">
                            </div>
                             <div className='col-md-6'></div>
                            <div className='col-md-3'>
                            {/* <Button variant="contained" color="error" style={{padding:'10px 20px', fontSize:'13px', marginLeft:'10px'}}><RiDeleteBinLine /> Delete</Button> */}
                            <Button variant="contained" color="success" style={{padding:'10px 20px', fontSize:'13px', marginLeft:'10px'}}>
                              <Link href="/caretakers/addCareTaker" style={{color:'#fff'}}><AddIcon /> Add CareTaker</Link></Button>
                            </div>
                        </div>
                     </div>
                     <div className='col-md-12'>
                       <div  style={{backgroundColor:'#fff',marginBottom:'20px',padding:'15px 15px'}}>
                       <div className='row'>
                         <div className='col-md-12'><TextField id="outlined-basic" label="Search Caretaker" variant="outlined" fullWidth/></div>
                       </div>
                       </div>
                     </div>
                     <div className="col-md-12" style={{marginBottom:'150px'}}>
                     <Suspense fallback={<Loader/>}><CareTable /></Suspense>
                     </div>
                    </div>
                </div>
        </>
    )
}