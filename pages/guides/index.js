import React, { Fragment } from 'react';
import Layout from "../../components/Layout";

const Guides = () => {
    return (
       <Fragment>
           <Layout>
            <section className="guide-s1-container">
                <div className="guide-s1-wrapper">
                   <div className="guide-s1-items">
                    <h4><strong>All Teachers Guide</strong></h4>
                        <p>Where does it come from?
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, 
                        making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more 
                        obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered 
                        the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) 
                        by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 
                        "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>

                        <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus 
                        Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. 
                        Rackham.</p>
                        <div className="text-center pt-3">
                            <p className="btn btn-primary mr-3"><strong>Primary Teachers Guide</strong></p>
                            <p className="btn btn-primary mr-3"><strong>Junior Secondary Teachers Guide</strong></p>
                            <p className="btn btn-primary"><strong>Senior Secondary Teachers Guide</strong></p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="guide-s2-container">
                <div className="guide-s2-wrapper">
                    <div className="guide-s2-items">
                        <div className="guide-s1-img"></div>
                        <div className="s2-item-1">
                            <h4>Title</h4>
                        </div>
                        <div className="s2-item-2">
                            <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus 
                            Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. 
                            Rackham.</p>
                        </div>
                    </div>
                </div>
            </section>
           </Layout>
       </Fragment>
    )
}
export default Guides