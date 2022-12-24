import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { faqs } from "./../constants/faqs";

const Faqs = () => {
    const [toggle, setToggle] = useState(false);

 
    const [showId, setShowId] = useState();

    const handleShow = (id) => setShowId(id);
  
    return (
        <>
            <h1 className="text-center my-2">Frequently Asked Questions</h1>
            <Container className="bg-light p-2 my-2 ">
                {faqs.map((faq, i) => (
                    <div className="my-2" key={i}>
                        <div onClick={handleShow}>
                            {toggle ? (
                                <FaChevronRight className="me-2" />
                            ) : (
                                <FaChevronDown className="me-2" />
                            )}
                            <span className="bg-light me-2">
                                {faq.question}
                            </span>
                        </div>

                        {showId && toggle && (
                            <div className="bg-white py-2 m-0 p-5">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </Container>
        </>
    );
};

export default Faqs;
