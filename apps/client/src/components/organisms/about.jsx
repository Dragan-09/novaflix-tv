import React from "react";
import Li from "../atoms/li";
import config from "../../config";

function About() {
  return (
    <div className="about grid grid-cols-1 lg:grid-cols-2 gap-y-10 mt-10">
      <div className="about-list flex items-center justify-center">
        <div className="text px-5 sm:px-7 py-7 bg-slate-200 rounded-xl w-11/12 sm:w-10/12 2xl:w-9/12 relative shadow-xl">
          <div className="title text-[#9980FA] text-center p-3 md:absolute md:-top-10 md:left-1/2 md:translate-x-[-50%] text-xl lg:-left-10 lg:translate-x-0 bg-slate-200 uppercase lg:text-3xl font-bold rounded-xl shadow-md px-5">
            about {config.app_name}
          </div>
          <ul
            className="pt-4 font-semibold leading-7 text-sm sm:text-md hyphens-auto"
            style={{ textJustify: "distribute" }}>
            <Li icon={"check"}>
              Experience unforgettable moments with your family and dearones.
            </Li>
            <Li icon={"check"}>Tune in to the biggest events.</Li>
            <Li icon={"check"}>
              Enjoy top-notch animal, news, and kids' channels.
            </Li>
            <Li icon={"check"}>
              Stream the newest global movies and TV shows.
            </Li>
            <Li icon={"check"}>Channels available in FULL HD, HD, and 4K.</Li>
            <Li icon={"check"}>We promise a 100% satisfaction guarantee.</Li>
          </ul>
        </div>
      </div>{" "}
      <div className="tv flex items-center justify-center h-full order-2 lg:order-none aspect-video hidden sm:block">
        <div
          style={{
            backgroundImage:
              "url(https://media.istockphoto.com/id/1066472014/photo/rear-view-of-a-family-watching-tv-on-sofa-at-home.webp?s=2048x2048&w=is&k=20&c=ebpzWWaccbYeg8EHSCryJk6UH5k9bYFLVhXAkriIZo4=)",
          }}
          className="image relative w-10/12 h-full rounded-lg border-2 border-primary bg-cover bg-no-repeat bg-center shadow-md mx-auto">
          <div className="bg absolute -top-4 -left-4 lg:-top-7 lg:-left-7 w-full h-full bg-primary -z-10 rounded-lg"></div>
          <div className="absolute bottom-3 w-1/2 h-[7px] bg-[#9980FA] rounded-full left-1/2 translate-x-[-50%]"></div>
        </div>
      </div>
    </div>
  );
}

export default About;
