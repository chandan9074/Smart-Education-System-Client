import { Accordion } from "react-bootstrap";

const CourseContent = () => {
  return (
    <div>
      <Accordion.Header>
        <h1 className='mx-6 text-black text-xl font-medium'>
          <span className='italic font-bold'>#</span> Accordion Item
        </h1>
      </Accordion.Header>
      <Accordion.Body>
        <div className='container my-2 pt-4'>
          <div className='bg-white px-lg-5 rounded-3'>
            <div>
              <h2 className='pb-5 italic'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Placeat ratione fugiat officiis perspiciatis ut enim nam, neque,
                itaque quam aperiam error iste fugit. Quo quisquam, rerum omnis
                facilis voluptate, commodi esse odio distinctio asperiores aut
                quidem neque impedit corrupti ratione vitae eligendi nihil
                temporibus ducimus corporis aspernatur veniam. Quia iste illum
                provident impedit quidem? Sed, provident delectus repellat
                molestiae ad, velit iusto totam nihil accusamus placeat vitae
                odit quos doloremque cumque ipsa? Expedita aliquam, magnam
                numquam soluta fuga unde sint quibusdam enim nulla reiciendis
                iusto vel perspiciatis nostrum culpa ullam ad doloremque, beatae
                voluptatem. Blanditiis, repellendus. Itaque eveniet ab quo.
                Edition
              </h2>
              <p></p>
            </div>
            <div className='mx-auto mt-5'>
              <h5 className='text-lg font-medium my-4 list-item'>
                video Lecture
              </h5>
              <iframe
                className='w-1/2 mx-auto'
                height='350'
                title='title'
                src='https://www.youtube.com/embed/ivCbN12hf78'
              ></iframe>
            </div>
            <div className='content mt-5 fs-5'>
              <ul className='list-disc'>
                <li className='text-lg font-medium my-4'>Lecture-1</li>
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
