import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Upload } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import NavbarSection from '../../components/NavbarSection';
import { loadStudentsContent, loadContentsVideo, loadContentsFile, loadContentsFileDelete, loadContentsVideoDelete, updateStudentsCourseContent } from '../../services/auth';

const ContentUpdate = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const {contentData} = location.state;
    console.log(contentData)
    const {id} = useParams();
    const [files, setFiles] = useState([]);
    const [content, setContent] = useState([]);
    const [contentFiles, setContentFies] = useState([]);
    const navigate = useNavigate();
    // console.log(id);

    useEffect(()=>{
        fetchData();
    }, [] )
    const fetchData = async () =>{
        const response = await loadContentsVideo(contentData.id);
        setContent(response.data);
        console.log(response.data);
        const fileRes = await loadContentsFile(contentData.id);
        setContentFies(fileRes.data)
        // fileRes.data.forEach(items =>{
        //     const filedata = items.file.slice("media/")[1];
        //     console.log(filedata);
        // })
    }

    const onFinish = async (values) => {
        const {title, details, links, video} = values;
        const contentAllData = {title: title, details:details, links:links, courses:contentData.courses};
        console.log(video);

        console.log("data....", contentData);
        const response = await updateStudentsCourseContent(contentAllData, video, files, contentData.id);
        navigate(`/course/${contentData.courses}`);
        form.resetFields();
        
    };
    
    const handleFileDelete = async (id) =>{
        const repsone = await loadContentsFileDelete(id);
        fetchData();
    }
    const handleVideoDelete = async (id) =>{
        const response = await loadContentsVideoDelete(id)
        fetchData();
    }

    const props = {
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
        setFiles(fileList);
        // console.log("filelisht", fileList);
        }
    }
    
    };
    return ( 
        <div>
            <NavbarSection />
            <div className="container flex justify-center pt-32">
                <Form initialValues={{title:contentData.title, details:contentData.details, links:contentData.links}} form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" style={{ border:"1px solid #dbd7d7", padding:"60px", display:"flex", flexDirection:"column", width:"75%", borderRadius:5}}>
                    <div className="w-full flex justify-center">
                    <h1 className="text-3xl font-semibold">Add Course Content</h1>
                    </div>
                    <label style={{ fontSize:21, fontWeight:500, marginBottom:8 }} >Title</label>
                    <Form.Item
                    name="title"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                    
                    >
                    <Input in style={{padding: 16, border: "2px solid #bfdbfe", borderRadius:4,   }} placeholder="Enter the content title" />
                    </Form.Item>

                    <label style={{ fontSize:21, fontWeight:500, marginBottom:8 }} >Details</label>
                    <Form.Item
                    name="details"
                    rules={[{ required: true, message: 'Please input your details!' }]}
                    
                    >
                    <TextArea style={{padding: 16,marginBottom:15, border: "2px solid #bfdbfe", borderRadius:4, resize:"none", height:150   }} placeholder="Enter the content details" />
                    </Form.Item>

                    <label style={{ fontSize:21, fontWeight:500, marginBottom:8 }}>YouTube Video Link</label>
                        {content && content.map(item=>(
                            <div className='flex items-center mb-2'>
                                <span className='border border-gray-200 py-1 px-3 w-44 bg-white rounded mr-4'>{item.title}</span>
                                <span className='border border-gray-200 py-1 px-3 w-44 bg-white rounded mr-3'>{item.video_link}</span>
                                <MinusCircleOutlined className='cursor-pointer' onClick={()=>handleVideoDelete(item.id)} />
                            </div>
                        ))}
                    <Form.List name="video">
                    
                    {(fields,{ add, remove }) => (
                        <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'title']}
                                rules={[{ required: false }]}
                                
                            >
                                <Input placeholder="Enter video title" className='w-44' />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'video_link']}
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="Enter video link" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add video field
                            </Button>
                        </Form.Item>
                        </>
                    )}
                    </Form.List>

                    <label style={{ fontSize:21, fontWeight:500, marginBottom:8 }} >Other links</label>
                    <Form.Item
                    name="links"
                    rules={[{ required: false }]}
                    
                    >
                    <TextArea style={{padding: 16,marginBottom:15, border: "2px solid #bfdbfe", borderRadius:4, resize:"none", height:150   }} placeholder="Enter other links" />
                    </Form.Item>

                    <label style={{ fontSize:21, fontWeight:500, marginBottom:8 }} >File</label>

                    <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                    {contentFiles && contentFiles.map(cFile=>(
                        <div className='border-2 border-gray-100 py-1 px-4 bg-green-50 mt-3 flex justify-between items-center'>
                            <p className='m-0'>{cFile.file.split("media/")[1]}.pdf</p>
                            <DeleteOutlined className='cursor-pointer' onClick={()=>handleFileDelete(cFile.id)} />
                        </div>
                    ))}

                    <Form.Item style={{ display:"flex", justifyContent:"center"}}>
                    <div style={{width:"100%",display:"flex", justifyContent:"center" }} >
                        <Button htmlType="submit" style={{ width:"25%", backgroundColor:"#4eeb8a", height:"40px", borderRadius:5, fontSize:"16px", fontWeight:500, marginTop:"40px"}}>
                        Submit
                        </Button>
                    </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
     );
}
 
export default ContentUpdate;