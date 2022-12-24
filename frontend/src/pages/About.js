import React from "react";
import { Container } from "react-bootstrap";
import "./About.css";
const About = () => {
    return (
        <Container>
            <h1 className="text-center">About Us</h1>
            <div className="about-container">
                <div className="about-content">
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Vero reiciendis ad aliquam culpa aliquid aut,
                        soluta nesciunt sunt inventore tempora ex amet, maiores
                        eius. Maxime atque nihil voluptates magni magnam qui
                        esse, vel architecto, voluptatem eveniet ullam
                        reprehenderit. Ea quaerat asperiores praesentium quod
                        voluptates, nemo tempore quae velit iste distinctio
                        officiis ut corporis mollitia eligendi placeat molestiae
                        porro, ducimus voluptatem perferendis, pariatur laborum
                        provident non. Possimus accusantium, eos qui hic eum
                        adipisci quisquam eligendi, cupiditate quis est totam
                        nulla rerum voluptate distinctio laboriosam, iusto eius
                        expedita ut excepturi aspernatur earum magnam harum et
                        tempore. Facilis natus nulla molestiae ad velit.
                    </p>
                </div>
                <div className="about-img">
                    <img
                        src="https://i0.wp.com/www.tycoonstory.com/wp-content/uploads/2016/11/list-of-online-shopping-sites-in-india-tycoonstory.png?fit=700%2C400&ssl=1"
                        alt=""
                    />
                </div>
            </div>
        </Container>
    );
};

export default About;
