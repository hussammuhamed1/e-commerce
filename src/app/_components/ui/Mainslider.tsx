"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <Slider {...settings}>
            <div className="mb-5">
                <Image src="/images/banner-1.png" alt="Slider Image 1" width={2880} height={896} />
            </div>
            <div className="mb-5">
                <Image src="/images/banner-2.png" alt="Slider Image 2" width={2880} height={896} />
            </div>
        </Slider>
    );
}
