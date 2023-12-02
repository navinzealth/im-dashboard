import { Suspense } from 'react'
import LayersIcon from '@mui/icons-material/Layers'; 
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AutorenewSharpIcon from '@mui/icons-material/AutorenewSharp'; 
import StyleSharpIcon from '@mui/icons-material/StyleSharp'; 
import LocalShippingSharpIcon from '@mui/icons-material/LocalShippingSharp'; 
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import LineChart from '../component/LineChart';
import PieChart from '../component/PieChart'; 
//import EnhancedTable from '../component/dataTable'
import Loader from '@/app/component/Loader';import ProjectTable from '@/app/projects/components/projectTable';

// const LineChart = dynamic(() => import("../component/LineChart"), {
//     loading: () => <p>Loading...</p>,
//   })
 
export default function dashboard(){
    
    return (
        <>
            
                        <div className="container">

                            <div className="row">
                                <div className="col-md-12">
                                    <h3>Dashboard Overview</h3>
                                    <div className='dashboard-sale-box-row'>
                                        <div className='dashboard-sale-box' style={{ backgroundColor: '#0694a2' }}>
                                            <LayersIcon style={{fontSize:'45px'}}/>
                                            <p>Today&apos;s Order</p>
                                            <b>₹0.00</b>
                                            <span>Cash : ₹0.00 Card : ₹0.00 Credit : ₹0.00</span>
                                        </div>

                                        <div className='dashboard-sale-box' style={{ backgroundColor: '#ff8a4c' }}>
                                        <LayersIcon style={{fontSize:'45px'}}/>
                                            <p>Yesterday Orders</p>
                                            <b>₹0.00</b>
                                            <span>Cash : ₹0.00 Card : ₹0.00 Credit : ₹0.00</span>
                                        </div>

                                        <div className='dashboard-sale-box' style={{ backgroundColor: '#3f83f8' }}>
                                            <ShoppingCartOutlinedIcon style={{fontSize:'45px'}}/>
                                            <p>This Month</p>
                                            <b>₹213455.45</b>
                                            <span>Cash : ₹0.00 Card : ₹0.00 Credit : ₹0.00</span>
                                        </div>

                                        <div className='dashboard-sale-box' style={{ backgroundColor: '#0e9f6e' }}>
                                            <StyleSharpIcon style={{fontSize:'45px'}}/>
                                            <p>All-Time Sales</p>
                                            <b>₹5532.76</b>
                                            <span>Cash : ₹0.00 Card : ₹0.00 Credit : ₹0.00</span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                           <div className='row'>
                             <div className='col-md-12'>
                                <div className='dashboard-order-row'>

                                <div className='dashboard-order-box'>
                                    <div className='dashboard-order-icon' style={{backgroundColor:'#feecdc'}}><ShoppingCartOutlinedIcon style={{color:'#d03801'}}/></div>
                                    <div className='dashboard-order-txt'>
                                        <span>Total Order</span>
                                        <p>325</p>
                                    </div>
                                </div>

                                <div className='dashboard-order-box'>
                                    <div className='dashboard-order-icon' style={{backgroundColor:'#e1effe'}}><AutorenewSharpIcon  style={{color:'#1c64f2'}}/></div>
                                    <div className='dashboard-order-txt'>
                                        <span>Orders Pending</span>
                                        <p>91</p>
                                    </div>
                                </div>

                                <div className='dashboard-order-box'>
                                    <div className='dashboard-order-icon' style={{backgroundColor:'#d5f5f6'}}><LocalShippingSharpIcon style={{color:'#047481'}}/></div>
                                    <div className='dashboard-order-txt'>
                                        <span>Orders Processing</span>
                                        <p>18</p>
                                    </div>
                                </div>

                                <div className='dashboard-order-box'>
                                    <div className='dashboard-order-icon' style={{backgroundColor:'#def7ec'}}><DoneSharpIcon style={{color:'#057a55'}}/></div>
                                    <div className='dashboard-order-txt'>
                                        <span>Orders Delivered</span>
                                        <p>214</p>
                                    </div>
                                </div>

                                </div>
                             </div>
                           </div>


                           <div className='row'>
                            <div className='col-md-6'>
                            <Suspense fallback={<Loader/>}>
                                <div className='dashboard-bar-chart'>
                                    <LineChart />
                                </div>
                            </Suspense>
                            </div>
                            <div className='col-md-6'>
                            <div className='dashboard-bar-chart'>
                                    <PieChart />
                                </div>
                            </div>
                           </div>

                           <div className='row'>
                            <div className='col-md-12'>
                                <div className="dashboard-table">
								{/*<EnhancedTable /> */}								<Suspense fallback={<Loader/>}>								  <ProjectTable />								</Suspense>
                                 </div>
                            </div>

                            
                           </div>

                        </div>
                    
        </>
    )
}

