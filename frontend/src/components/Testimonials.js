import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Container } from "react-bootstrap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Testimonials.css";
import { testimonials } from "./../constants/testimonials";

const Testimonials = () => {
    return (
        <Container>
            <h1 className="text-center my-3">Testimonials</h1>
            <div>
                <Swiper
                    modules={[Pagination]}
                    loop={true}
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    className="testimonials"
                >
                    {testimonials.map((testimonial, i) => (
                        <SwiperSlide key={i}>
                            <div className="text-center testimonial-content  px-5">
                                <div>
                                    <img
                                        src={testimonial.image}
                                        className="image-swipe "
                                        alt=""
                                    />
                                </div>
                                <p className="mx-4">
                                    {testimonial.description}
                                </p>
                                <span className="my-2 fw-bold d-block">
                                    {testimonial.name}
                                </span>
                                <span className="my-2  d-block">
                                    {testimonial.designation}
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Container>
    );
};

export default Testimonials;
