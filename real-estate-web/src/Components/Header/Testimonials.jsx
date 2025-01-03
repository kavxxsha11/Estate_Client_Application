import React from "react";
import testimonialCSS from "./Testimonials.module.css";

import user1 from "../../assets/user1.jpg";
import user2 from "../../assets/user2.jpg";
import user3 from "../../assets/user3.jpg";

import RatingImg from "../../assets/rating_01.png";   

function Testimonial() {
    return (
        <div className={testimonialCSS.testimonial_wrapper}>
            <div className={testimonialCSS.userImg}>
                <img src={user1} alt="" />
            </div>
            <div className={testimonialCSS.userContent}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi placeat sint unde saepe aut veniam nostrum, dolores velit.
            </div>
            <div className={testimonialCSS.userReview}>
                <img src={RatingImg} alt="user-review" />
            </div>
        </div>
    );
}

export default Testimonial;