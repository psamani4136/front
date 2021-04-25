import react, {Fragment} from "react"
import renderHTML from "react-render-html";

const Rationale = ({syllabus}) => {

    const showRationale = () => {
    return syllabus.rationale.map((r, i) => {
        return (
        <div key={i}>
            {renderHTML(r.body)}
        </div>
        );
    });
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                Read More
            </button>

            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-scrollable" style={{width: '1250px'}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel1">Rationale</h5>
                            
                        </div>
                        <div className="modal-body">
                        {showRationale()}
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

export default Rationale;