import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { loadContentsVideo, loadContentsFile, deleteCourseContent } from "../../services/auth";
import { useState, useEffect } from "react";

const CourseContent = ({content, onFetchData}) => {

  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(()=>{
    const fetchData = async () =>{
      const videores = await loadContentsVideo(content.id)
      setVideos(videores.data);
      const filesres = await loadContentsFile(content.id);
      setFiles(filesres.data);
    }
    fetchData();

  }, [])

  const handleContentDelete =async () =>{
    const deleteRes = await deleteCourseContent(content.id);
  }

  const menu = (
    <Menu className='mt-16 z-50' style={{ zIndex: "9999" }}>
      <Menu.Item key='profile' className='color-secendary-hover'>
        <Link rel='noopener noreferrer' to={`/content-update/${content.id}`} state={{ contentData: content }}>
          <div className='px-4 font-semibold'>Edit</div>
        </Link>
      </Menu.Item>
      <Menu.Item key='settings' className='color-secendary-hover'>
        <Link rel='noopener noreferrer' to='' onClick={handleContentDelete}>
          <div className='px-4 font-semibold' >Delete</div>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Accordion.Header>
        <h1 className='mx-6 text-black text-xl font-medium'>
          {content.title}
        </h1>
      </Accordion.Header>
      <Accordion.Body>
        <div className='container my-2 pt-4'>
          <div className='bg-white px-lg-5 rounded-3'>
            <div className="w-full flex justify-end mb-4">
              <Dropdown
                overlay={menu}
                placement='bottomRight'
                arrow
                trigger='[click]'
              >
                <div className='py-2 px-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                  Action
                </div>
              </Dropdown>
            </div>
            <div>
              <h2 className='pb-5 italic'>
                {content.details}
              </h2>
              <p></p>
            </div>
            <div className='mx-auto mt-5'>
              <h5 className='text-lg font-medium my-4 list-item'>
                video Lecture
              </h5>
              {videos && videos.map(item=>(
                <iframe
                  className='w-1/2 mx-auto mb-4'
                  height='350'
                  title='title'
                  src={item.video_link}
                ></iframe>
              ))}
            </div>
            <div className='mx-auto mt-5'>
              <h5 className='text-lg font-medium my-4 list-item'>
                Importent Links
              </h5>
              <Link to={content.links}>{content.links}</Link>
            </div>
            <div className='content mt-5 fs-5'>
              <ul className='list-disc flex flex-col'>
                <li className='text-lg font-medium my-4'>Lecture Matarial</li>
                {files && files.map((item, index)=>(
                  <a href={`${item.file}.pdf`} target="_blank">Matarial {index+1}</a>
                ))}
                <li className='text-lg font-medium my-4'>Quiz</li>
                <li className='text-lg font-medium my-4'>Homework</li>
              </ul>
            </div>
          </div>
        </div>
      </Accordion.Body>
    </div>
  );
};

export default CourseContent;
