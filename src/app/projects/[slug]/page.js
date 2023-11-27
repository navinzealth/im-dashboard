'use client'

import { useState,useEffect, useRef,useCallback} from 'react';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import Loader from '@/app/component/Loader' 
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Image from 'next/image';
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
const  modules  = {
  toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script:  "sub" }, { script:  "super" }],
      ["blockquote", "code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
  ],
  clipboard: {
    matchVisual: false
}
};


export default function Projectdetail({ params } ){

  
  let router= useRouter();
  const apiRoute = process.env.API_ROUTE;
  //const [,] = useState();
  const toastId = useRef(null);
  const [data, setData] = useState(); //API Data
  const [isLoading, setLoading] = useState(true);
  const [description, setDescription] = useState('<p>hey this is text editor</p>');
  const [name, setName]= useState();
  const [shortDesc, setShortDesc]= useState();
  const [area, setArea] = useState('');
  const [district, setDistrict] = useState();
  const [state,setState] = useState();
  const [pincode,setPincode] = useState();
  const [latitude,setLatitude] = useState();
  const [longitude,setLongitude] = useState();
  const [selectedImages, setSelectedImages] = useState(null);
  const [galleryimages, setGalleryimages] = useState([])
    const onSelectFile = (e) => {
      setSelectedImages(e.target.files[0]);
      };

      const handleQuillChange = (value) => {
        const letterSpacing = '20px';
        const fontSize = '18px';
        const fontFamily = 'Montserrat, sans-serif';
        // Replace <p> with <div> in the HTML content
        const modifiedContent = value.replace(/<p>/g, `<div style="letter-spacing: ${letterSpacing}; font-size: ${fontSize};font-family: ${fontFamily};">`).replace(/<\/p>/g, '</div>');
      
        // Set the modified content to state
        setDescription(modifiedContent);
      }



      const [opt1, setOpt1]= useState('project');
      const [opt2, setOpt2]= useState('zodiac');
      const [ans, setAns] = useState();
      const handleAns = (event) => {  setAns(event.target.value)  };
    /**---------------fetch project gallery----------- */
    const onSelectGallery=async (e)=>{
      
      const nowImage = e.target.files[0];
      let bodyContent = new FormData();
	  bodyContent.append("userId", `${process.env.NEXT_PUBLIC_USERID}`);
      bodyContent.append("projectId", params.slug);
      bodyContent.append("pro_image", nowImage);
      await fetch(`${apiRoute}/addprogallery`, {
      // Adding method type
      method: "POST",
      // Adding body or contents to send
      body: bodyContent,
  })
  // Converting to JSON
  .then(response => response.json())
  .then(fetchProjectDetail())
    }
 /**---------------fetch project gallery----------- */

    const fetchProjectDetail=useCallback(()=>{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({  "userId": `${process.env.NEXT_PUBLIC_USERID}`, "proId": params.slug });
      var requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow'  };
      fetch(`${apiRoute}/detailproject`, requestOptions)
        .then(response => response.json())
        .then((result) => {
              setData(result.Data)
              setGalleryimages(result.imageGallery)
              setSelectedImages(result.Data.image)
              setDescription(result.Data.description)
              setName(result.Data.name)
              setShortDesc(result.Data.short_desc)
              setArea(result.Data.area)
              setDistrict(result.Data.district)
              setState(result.Data.state)
              setPincode(result.Data.pincode)
              setLatitude(result.Data.latitude)
              setLongitude(result.Data.longitude)
              setAns(result.Data.type)
              setLoading(false)
                          })
      //  .catch(error => console.log('error', error))
     .then(console.log(galleryimages))
      }, [apiRoute,params.slug, galleryimages])

      useEffect(() => {
        fetchProjectDetail();
      }, [])

        if (isLoading) return <Loader />
        if (!data) return <p>No profile data</p>
/*-------------------------------------------------------update Blog-----------------------------------------------------------------------------------*/
async function uploadWithFormData() {
 
  pendingPopup()

   let bodyContent = new FormData();
   bodyContent.append("userId", `${process.env.NEXT_PUBLIC_USERID}`);
   bodyContent.append("proId", data.projectId);
   bodyContent.append("project_image", selectedImages);
   bodyContent.append("name", name);
   bodyContent.append("short_desc", shortDesc);
   bodyContent.append("description", description);
   bodyContent.append("district", district);
   bodyContent.append("state", state);
   bodyContent.append("pincode", pincode);
   bodyContent.append("area", area);
   bodyContent.append("latitude", latitude);
   bodyContent.append("longitude", longitude);
   bodyContent.append("type", ans);
   
   let response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/editproject`, { method: "POST", body: bodyContent, });
   
   const data1 = await response.json();
  // console.log(data1)

   function successPopup(){
    toast.success(`${data1.Message}` )
    toast.dismiss(toastId.current);
                           }
  function failPopup(){
  toast.error(`${data1.Message}`)
  toast.dismiss(toastId.current);
                      }
  function pendingPopup(){
    toastId.current =  toast.loading('Updating Project') }

  { data1.Status === true  ?    successPopup() : failPopup()}
  
  }
/**----------------------------------------------------------------update blog--------------------------------------------- */
/**--------------------------------------------------------------------delete Blog------------------------------ */
async function deleteProject(){
  pendingPopup1()
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "userId": `${process.env.NEXT_PUBLIC_USERID}`,
    "proId": [data.projectId]
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
 let deleteResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/deleteproject`, requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

    let deleteData = await deleteResponse.json()

    function successPopup1(){
      toast.success(`${deleteData.Message}` )
      toast.dismiss(toastId.current);
                             }
    function failPopup1(){
    toast.error(`${deleteData.Message}`)
    toast.dismiss(toastId.current);
                        }
    function pendingPopup1(){
      toastId.current =  toast.loading('Deleting Project') }
  
    { deleteData.Status === true  ?    successPopup1() : failPopup1()}
    { deleteData.Status === true  ? router.push('/projects') : ''}
   

}
  /**--------------------------------------------------------------------delete Blog------------------------------- */
/**---------------------------------------------------------------------------------------------------------------------------------------- */
    return(<>

        <div className="container">

                   <div className="row">
                     <div className='col-md-10'>
                       <h2>Project Detail</h2>
                       <p>Update project info and extras.</p>
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
                                    <Select defaultValue={ans} value={ans} onChange={handleAns} style={{fontSize:'14px'}}>
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
                                   <Image src={selectedImages} alt="project image"  width={200} height={200}/>

                                   {/* {selectedImages.map((i,r)=>{return <Image src={i.pro_image}  width={200} height={200} key={i._id} alt="project gallery"/> })} */}
                                   <p></p>
                                  <br /> 
                                  <Button component="label" variant="contained" startIcon={<UploadFileIcon />} style={{textAlign:'center'}}>Upload file
                                  <input type="file" name="images" onChange={onSelectFile} accept="image/png , image/jpeg, image/webp"  style={{opacity:'0'}}/> 
                                  </Button> <br />
                                  { selectedImages === ! null ? '' : selectedImages.name}
                                  </div>
                              </div>
                            </div>
 {/* -----------------------------------gallery--------------- ------------*/}
              <div className="row">
                <div className="col-md-4">
                  <div className="input-head">Project Gallery</div>
                </div>
                <div className="col-md-8">
                  <div className="input-field" style={{ border: '1px dashed #d5d6d7', padding: '20px' }}>
                  {galleryimages?.map((file, i)=>{
                    return <Image src={file.pro_image} alt="project image" width={100} height={100} style={{marginRight:'10px',marginBottom:'10px'}} key={file._id}/>
                  })}

                    <p></p>
                    <Button component="label" variant="contained" startIcon={<UploadFileIcon />} style={{ textAlign: 'center' }}>Upload file
                      <input type="file" name="images" accept="image/png , image/jpeg, image/webp" style={{ opacity: '0' }} onChange={onSelectGallery}/>
                    </Button> <br />
                    
                  </div>
                </div>
              </div>
 {/* -----------------------------------gallery---------------------------- */}
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
                                  <div className="input-head">Created At</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field"><Input placeholder="Type in here…" variant="soft" size="lg" style={{padding:'12px 15px',fontSize:'15px'}} value={`${new Date(data.createdAt).getDate()}/${new Date(data.createdAt).getMonth()+1}/${new Date(data.createdAt).getFullYear()}`} disabled/></div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                  <div className="input-head">Product Details</div>
                              </div>
                              <div className="col-md-8">
                                  <div className="input-field">
                                    
                                  <ReactQuill theme="snow" value={description} onChange={handleQuillChange} modules={modules} style={{height:'400px', marginBottom:'100px'}}/>
                                  </div>
                              </div>
                            </div>

                             
                            <div className='row'> 
                              <div className='col-md-4'>
                              <Link variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px', display:'inline-block', textAlign:'center',border:'1px solid #000',color:'#000'}} href="/projects">  Back </Link>
                              </div>
                              <div className='col-md-4'>
                              <Button variant="outlined" color="error" style={{width:'100%', fontSize:'15px',padding:'10px'}} onClick={deleteProject}>  Delete Project </Button>
                              </div>
                              <div className='col-md-4'>
                              <Button variant="contained" color="success" style={{width:'100%', fontSize:'15px',padding:'10px'}} onClick={uploadWithFormData}> Update Project</Button>
                              </div>
                            </div>

                                 {/*-------------------------------------------------------------------------------------------------------------- */}

                            </div>
                        </div>
                    </div>

                </div>   
    
    </>)
}