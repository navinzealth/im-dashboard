
'use client'

import { useState, useRef} from 'react';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button'; 
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { toast} from 'react-toastify';
import FormData from 'form-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ReactQuill = dynamic(
    () => import('react-quill'),
    { ssr: false }
  )

export default function Addproject(){
    let router= useRouter()

    const toastId = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const [description, setDescription] = useState('<p></p>');
  const [name, setName]= useState();
  const [shortDesc, setShortDesc]= useState();
  const [area, setArea] = useState('');
  const [district, setDistrict] = useState();
  const [state,setState] = useState();
  const [pincode,setPincode] = useState();
  const [latitude,setLatitude] = useState();
  const [longitude,setLongitude] = useState();
  const [selectedImages, setSelectedImages] = useState();
      const onSelectFile = (e) => {
        setSelectedImages(e.target.files[0]);
      //  console.log(selectedImages)
        }; 

        const [opt1, setOpt1]= useState('project');
      const [opt2, setOpt2]= useState('zodiac');
      const [ans, setAns] = useState('project');
      const handleAns = (event) => { 
        if(event.target.value == 'project'){
          setAns('project')
        } 
        else{setAns('zodiac')}
        //setAns(event.target.value)  
       
      };
  /*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
  async function uploadWithFormData() {
    pendingPopup()
     let bodyContent = new FormData();
     bodyContent.append("userId", `${process.env.NEXT_PUBLIC_USERID}`); 
     bodyContent.append("name", name);
     bodyContent.append("project_image", selectedImages);
     bodyContent.append("description", description);
     bodyContent.append("short_desc", shortDesc);
     bodyContent.append("area", area);
     bodyContent.append("district", district);
     bodyContent.append("state", state);
     bodyContent.append("pincode", pincode);
     bodyContent.append("latitude", latitude);
     bodyContent.append("longitude", longitude);
     bodyContent.append("type", ans);
     
     let response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/addproject`, { method: "POST", body: bodyContent, });
     
     const data1 = await response.json();
  
     function successPopup(){
      toast.success(`${data1.Message}` )
      toast.dismiss(toastId.current);
                             }
    function failPopup(){
    toast.error(`${data1.Message}`)
    toast.dismiss(toastId.current);
                        }
    function pendingPopup(){
      toastId.current =  toast.loading('Updating Projects') }
  
    { data1.Status === true  ?    successPopup() : failPopup()}
    { data1.Status === true  ? router.push('/projects') : ''}

    }
  /**----------------------------------------------------------------update blog--------------------------------------------- */
 
  /**---------------------------------------------------------------------------------------------------------------------------------------- */
      return(<>
  
          <div className="container">
  
                     <div className="row">
                       <div className='col-md-10'>
                         <h2>Add Project</h2>
                         <p>Add project info and extras.</p>
                       </div>
                       
                      </div>
                      
                      <div className='row' style={{borderBottom:'1px solid #e1e1e1',marginBottom:'25px'}} >
                         <div className='col-md-3'>
                           <div className='product_detail_tabs'>
                               <li className='active'>Basic Info</li>
                             </div>
                         </div>
                         <div className='col-md-5'></div>
                         
                      </div>
  
                      <div className='row'>
                          <div className='col-md-12'>
                             <div className=''>
                          {/*-------------------------------------------------------------------------------------------------------------------------- */}
                        <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Project Title/Name</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Project Type</div>
                              </div>
                              <div className="col-md-8">
                              <div className="input-field">
                                    <FormControl fullWidth> 
                                    <Select defaultValue={opt1} value={ans} onChange={handleAns} style={{fontSize:'14px'}}>
                                    <MenuItem value={opt1}>{opt1}</MenuItem>
                                    <MenuItem value={opt2}>{opt2}</MenuItem> 
                                    </Select>
                                    </FormControl>
                                    
                                    </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Short Description</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Textarea disabled={false} minRows={2} size="lg" variant="soft" placeholder="Product Description" value={shortDesc} onChange={(e)=>{setShortDesc(e.target.value)}}
                                    style={{padding:'12px 15px',fontSize:'15px'}}/></div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Project Thumbnail Image</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field" style={{border:'1px dashed #d5d6d7',padding:'20px'}}>
                                   {/* <Image src={selectedImages} alt="project image"  width={200} height={200}/> */}

                                   {/* {selectedImages.map((i,r)=>{return <Image src={i.pro_image}  width={200} height={200} key={i._id} alt="project gallery"/> })} */}
                                   <p></p>
                                  <br /> 
                                  <Button component="label" variant="contained" startIcon={<UploadFileIcon />} style={{textAlign:'center'}}>Upload file
                                  <input type="file" name="images" onChange={onSelectFile} accept="image/png , image/jpeg, image/webp"  style={{opacity:'0'}}/> 
                                  </Button> <br />
                                  {/* { selectedImages === ! null ? '' : selectedImages.name} */}
                                  {selectedImages?.name}
                                  </div>
                              </div>
                            </div>
 
                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Area</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={area} onChange={(e)=>setArea(e.target.value)}/></div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">District</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={district} onChange={(e)=>setDistrict(e.target.value)}/></div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">State</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={state} onChange={(e)=>setState(e.target.value)}/></div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Pincode</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={pincode} onChange={(e)=>setPincode(e.target.value)}/></div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Latitude</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={latitude} onChange={(e)=>setLatitude(e.target.value)}/></div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">longitude</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={longitude} onChange={(e)=>setLongitude(e.target.value)}/></div>
                              </div>
                            </div>

                           

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Product Details</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field">
                                  {/* <TextEditor item={data.blog_desc} /> */}
                                  <ReactQuill theme="snow" value={description} onChange={setDescription}  style={{height:'200px', marginBottom:'100px'}}/>
                                  </div>
                              </div>
                            </div>

                             
                            <div className='row'>
                                <div className='col-md-2'></div>
                              <div className='col-md-4'>
                              <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href="/projects">  Back </Link>
                              </div>
                              {/* <div className='col-md-4'>
                              <Button variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px'}} onClick={deleteBlog}>  Delete Project </Button>
                              </div> */}
                              <div className='col-md-4'>
                              <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px'}} onClick={uploadWithFormData}> Update Project</Button>
                              </div>
                            </div>

                                 {/*-------------------------------------------------------------------------------------------------------------- */}

                              </div>
                          </div>
                      </div>
  
                  </div>   
                  </>

)
}