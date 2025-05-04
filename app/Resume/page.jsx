"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const about = {
  title: "About me",
  description:
    "I'm a data scientist passionate about turning raw data into meaningful insights and intelligent solutions. I specialize in analyzing complex datasets, building predictive models, and delivering data-driven strategies that drive business performance.",
  info: [
    { fieldName: "Name", fieldValue: "Abhijith M" },
    { fieldName: "Phone", fieldValue: "(+91) 7306979561" },
    { fieldName: "Mail", fieldValue: "abhijith_m@hotmail.com" },
    { fieldName: "Nationality", fieldValue: "Indian" },
    { fieldName: "Languages", fieldValue: "English, Hindi, Malayalam" },
  ],
};

const experience = {
  title: "My Experience",
  items: [
    {
      company: "Luminar Technolab",
      position: "Data Science Intern",
      duration: "2024 - 2025",
    },
  ],
};

const education = {
  title: "My Education",
  items: [
    {
      institution: "College of Engineering Perumon",
      degree: "B.Tech in Computer Science Engineering",
      duration: "2021 - 2024",
    },
    {
      institution: "G.P.T.C Punalur",
      degree: "Diploma in Computer Science Engineering",
      duration: "2017 - 2020",
    },
    {
      institution: "G.H.S.S Puthoor",
      degree: "Higher Secondary Education",
      duration: "2015 - 2017",
    },
    {
      institution: "K.N.N.M.V.H.S.S Pavithreswaram",
      degree: "High School",
      duration: "2015",
    },
  ],
};

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.4,
          duration: 0.4,
          ease: "easeIn",
        },
      }}
      className="flex w-full h-auto py-6 sm:py-8 lg:py-10 xl:py-0 xl:mt-10"
    >
      <div className="container mx-auto px-4">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-8 xl:gap-[60px]"
        >
          <TabsList className=" xl:mt-40 lg:h-full flex flex-row xl:flex-col  w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience" className="text-sm sm:text-base">Experience</TabsTrigger>
            <TabsTrigger value="education" className="text-sm sm:text-base">Education</TabsTrigger>
            <TabsTrigger value="about" className="text-sm sm:text-base">About Me</TabsTrigger>
          </TabsList>

          <div className="w-full">
            {/* Experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-6 sm:gap-8 text-center xl:text-left items-center xl:items-start">
                <h3 className="text-3xl sm:text-4xl xl:text-6xl font-bold">
                  {experience.title}
                </h3>
                <ScrollArea className="w-full max-w-[320px] sm:max-w-full sm:w-full xl:w-full xl:h-[400px]">
                  <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 xl:ml-2.5">
                    {experience.items.map((item, index) => (
                      <Tilt
                        key={index}
                        glareEnable={true}
                        glareMaxOpacity={0.1}
                        scale={1.02}
                        transitionSpeed={1000}
                        tiltMaxAngleX={10}
                        tiltMaxAngleY={10}
                        className="bg-black border-4 border-[#00e1ff] h-[184px] py-6 px-4 sm:px-6 lg:px-10 rounded-2xl flex flex-col justify-center items-center lg:items-start gap-1"
                      >
                        <span className="text-[#d1d1d1] text-sm sm:text-base">{item.duration}</span>
                        <h3 className="text-[#00bfff] font-semibold text-center lg:text-left">
                          {item.position}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff33cc]"></span>
                          <p className="text-[#d1d1d1] text-sm sm:text-base">{item.company}</p>
                        </div>
                      </Tilt>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-6 sm:gap-8 text-center xl:text-left items-center xl:items-start">
                <h3 className="text-3xl sm:text-4xl xl:text-6xl font-bold">
                  {education.title}
                </h3>
                <ScrollArea className="w-full max-w-[320px] sm:max-w-full sm:w-full xl:w-full xl:h-[400px]">
                  <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 xl:ml-2.5 xl:mb-2 xl:mr-2">
                    {education.items.map((item, index) => (
                      <Tilt
                        key={index}
                        glareEnable={true}
                        glareMaxOpacity={0.1}
                        scale={1.02}
                        transitionSpeed={1000}
                        tiltMaxAngleX={10}
                        tiltMaxAngleY={10}
                        className="bg-black border-4 border-[#00e1ff] h-[184px] py-6 px-4 sm:px-6 lg:px-10 rounded-2xl flex flex-col justify-center items-center lg:items-start gap-1"
                      >
                        <span className="text-[#d1d1d1] text-sm sm:text-base">{item.duration}</span>
                        <h3 className="text-[#00bfff] font-semibold text-center lg:text-left">
                          {item.degree}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff33cc]"></span>
                          <p className="text-[#d1d1d1] text-sm sm:text-base text-center lg:text-left">{item.institution}</p>
                        </div>
                      </Tilt>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* About Me */}
            <TabsContent value="about" className="w-full">
              <div className="flex flex-col gap-6 sm:gap-8 text-center xl:text-left items-center xl:items-start">
                <h3 className="text-3xl sm:text-4xl xl:text-6xl font-bold">
                  {about.title}
                </h3>
                <p className="text-[#d1d1d1] text-sm sm:text-base xl:text-lg text-center xl:text-justify px-2 sm:px-4 xl:px-0">
                  {about.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[320px] sm:max-w-full">
                  {about.info.map((info, index) => (
                    <Tilt
                      key={index}
                      glareEnable={true}
                      glareMaxOpacity={0.1}
                      scale={1.02}
                      transitionSpeed={1000}
                      tiltMaxAngleX={10}
                      tiltMaxAngleY={10}
                      className="bg-black border-4 border-[#00e1ff] p-4 sm:p-5 rounded-2xl"
                    >
                      <div className="flex flex-col gap-2 text-center sm:text-left">
                        <span className="text-[#00bfff] font-semibold text-sm sm:text-base">
                          {info.fieldName}
                        </span>
                        <span className="text-[#d1d1d1] text-xs sm:text-sm md:text-base break-words">
                          {info.fieldValue}
                        </span>
                      </div>
                    </Tilt>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;