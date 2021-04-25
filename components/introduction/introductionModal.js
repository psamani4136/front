import react, {Fragment} from "react"
import renderHTML from "react-render-html";

const Introduction = ({syllabus}) => {

    const showIntroduction = () => {
        return syllabus.introduction.map((introduction, i) => {
          return (
            <div key={i}>
              {renderHTML(introduction.body)}
            </div>
          );
        });
      };

    return (
        <Fragment>
            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Read More
            </button>


            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-scrollable modal-custom">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Introduction</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                       {showIntroduction()}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Introduction;