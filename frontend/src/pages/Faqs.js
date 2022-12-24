import React from "react";
import { Accordion, Container } from "react-bootstrap";

import { faqs } from "./../constants/faqs";

const Faqs = () => {
    return (
        <>
            <h1 className="text-center my-3">Frequently Asked Questions</h1>
            <Container className=" p-2 my-2 ">
                <Accordion defaultActiveKey="0">
                    {faqs.map((faq, i) => (
                        <Accordion.Item eventKey={i}>
                            <Accordion.Header>{faq.question}</Accordion.Header>
                            <Accordion.Body>{faq.answer}</Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Container>
        </>
    );
};

export default Faqs;
