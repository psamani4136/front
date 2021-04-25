import { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronCircleRight } from "react-icons/fa";
import { listRelatedSyllabusesStrand } from "../../actions/syllabus";

const SidebarSyllabus = ({ syllabus }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    // listRelatedSyllabusesStrand({syllabus}).then((data) => {
    //   if (data.error) {
    //     console.log(data.error);
    //   } else {
    //     setRelated(data);
    //   }
    // });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const showRelatedSyllabuses = () => {
    return related.map((syllabus, i) => {        
      return (
        <div key={i}>
          <Link
            href="/syllabus/[slug]"
            as={`/syllabus/${syllabus.subject.slug}`}
          >
            <a>
              <p>
                <FaChevronCircleRight /> {syllabus.name}
              </p>
            </a>
          </Link>
        </div>
      );
    });
  };

  const myCategory = () => {
    return syllabus.map((syllabus, i) => {        
      return (
        <div key={i}>
         {syllabus.category}
        </div>
      );
    });
  }

  return <React.Fragment>
    {/* {JSON.stringify(syllabus)} */}
    </React.Fragment>;
  // return <React.Fragment>{showRelatedSyllabuses()}</React.Fragment>;
};

export default SidebarSyllabus;
