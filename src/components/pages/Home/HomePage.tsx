"use client";
import React from "react";
import Button from "@/components/common/Button";
import img from "@/assets/hero-section.webp";
import img1 from "@/assets/img-1.webp";
import img2 from "@/assets/img-2.webp";
import img3 from "@/assets/img-3.webp";
import img4 from "@/assets/img-4.webp";
import trackHabitImg from "@/assets/track-habits-dark.webp";
import goalsImg from "@/assets/personalized-goals-dark.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/userContext";
import { MdOutlineTrackChanges } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";

const cardsData = [
  {
    img: img1,
    title: "Intuitive Habit Tracking Interface",
    desc: "Our app offers a seamless interface that makes tracking your habits easy and efficient. Visualize your progress with detailed charts and stay on top of your goals.",
  },
  {
    img: img2,
    title: "Goal Setting Made Simple",
    desc: "Set achievable goals with our habit tracker and receive personalized reminders to keep you on track. Achieve your personal development milestones with ease.",
  },
  {
    img: img3,
    title: "Track Your Daily Habits Effortlessly",
    desc: "Our intuitive interface allows you to easily monitor your daily habits and routines. Stay on top of your goals with seamless tracking and insightful analytics.",
  },
  // {
  //   img: img4,
  //   title: "Set Personalized Goals for Success",
  //   desc: "Achieve self-discipline by setting personalized goals. Our platform helps you tailor your habit tracking to fit your unique lifestyle and aspirations.",
  // },
];

const cardsData2 = [
  {
    img: trackHabitImg,
    title: "Track Your Daily Habits Effortlessly",
    desc: "Our intuitive interface allows you to easily monitor your daily habits and routines, helping you stay on track and achieve your personal goals.",
  },
  {
    img: goalsImg,
    title: "Set Personalized Goals",
    desc: "Tailor your goals to suit your personal development needs and enhance your self-discipline with our customizable goal-setting tools.",
  },
  {
    img: goalsImg,
    title: "Set Personalized Goals",
    desc: "Tailor your goals to suit your personal development needs and enhance your self-discipline with our customizable goal-setting tools.",
  },
];

const howItWorks = [
  {
    icon: <MdOutlineTrackChanges size={35} />,
    title: "Set Your Goals",
    desc: " Define what habits you want to build or break. Our platform helps you set clear and achievable goals.",
  },
  {
    icon: <FaCalendarCheck size={32} />,
    title: "Track Daily",
    desc: "Log your daily habits effortlessly. Keep track of your progress with our intuitive interface.",
  },
  {
    icon: <FaChartLine size={32} />,
    title: "Monitor Progress",
    desc: "Receive personalized insights and reminders to stay motivated and on track.",
  },
];

const HomePage = () => {
  const router = useRouter();
  const { userDetails } = useUserContext();

  return (
    <>
      <section
        className="min-h-screen flex flex-col items-center gap-20 z-10"
        style={{
          minHeight: "calc(100vh - 4rem)",
        }}
      >
        <div className="h-[90vh] w-full xl:w-5/6 flex flex-col md:flex-row gap-6 items-center justify-center px-3 sm:px-5 py-8">
          <div className="h-full w-full md:w-1/2 flex flex-col gap-6 justify-center items-center md:items-start">
            <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight text-center md:text-start">
              Transform Your <span className="text-habit-200">Habits</span>{" "}
              Today
            </h1>
            <p className="text-center md:text-start">
              Unlock your potential with our intuitive habit tracker. Set goals,
              track progress, and join a community dedicated to personal growth.
              Start your journey towards a more disciplined lifestyle now.
            </p>
            <div className="flex gap-4 mt-5">
              <Button
                variant="filled"
                text="Get Started"
                onClick={() =>
                  userDetails ? router.push("habits") : router.push("/login")
                }
              />
              <Button
                variant="outlined"
                text="Learn More"
                onClick={() => {
                  const el = document.getElementById("learnMore");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden md:flex w-5/6 sm:w-3/4 md:w-1/2 items-center justify-center">
            <Image
              src={img}
              alt="Hero Section"
              className="max-w-full max-h-[350px] md:max-h-[550px] object-contain"
            />
          </div>
        </div>

        <div id="features" className="w-full xl:w-5/6 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-4 justify-center px-3 sm:px-5">
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-center md:text-start">
              Explore Our Powerful Habit Tracking Features
            </h1>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-justify sm:text-start">
              Our habit tracker is designed to empower your personal growth
              journey. With intuitive tools for tracking daily habits, setting
              goals, and monitoring progress, you can build new habits or break
              old ones. Stay motivated with personalized insights and reminders,
              and join a community of like-minded individuals to share
              achievements and stay accountable.
            </p>
          </div>
        </div>

        <div className="w-full xl:w-5/6 px-3 sm:px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cardsData.map((item, index) => (
              <div
                key={index}
                className="w-[95%] max-w-[350px] md:w-full overflow-hidden mx-auto"
              >
                <Image
                  src={item.img}
                  alt="Hero Section"
                  className="w-full h-68"
                />
                <div className="py-4">
                  <h2 className="text-lg md:text-xl font-bold mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-justify md:text-start">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id="learnMore"></div>
        <div className="w-full xl:w-5/6 px-3 sm:px-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-center mb-12">
            How It Works
          </h1>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="w-3/4 sm:w-1/3 flex flex-col items-center"
              >
                {item.icon}
                <h2 className="text-xl sm:text-2xl md:text-3xl text-center font-bold mt-5 mb-2">
                  {item.title}
                </h2>
                <p className="text-center text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full xl:w-5/6 flex flex-col items-center px-3 sm:px-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-center">
            Start Your Journey
          </h1>
          <p className="text-center mt-4 mb-10">
            Join our community and take the first step towards a more
            disciplined and productive lifestyle.
          </p>
          <Button
            variant="filled"
            text="Get Started"
            onClick={() =>
              userDetails ? router.push("habits") : router.push("/login")
            }
          />
        </div>

        <section className="bg-black flex flex-col items-center gap-20 py-20">
          <div className="w-full xl:w-5/6 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-4 justify-center px-3 sm:px-5">
            <div className="w-full md:w-1/2">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-center md:text-start">
                Unlock Your Potential with Our Habit Tracker
              </h1>
            </div>
            <div className="text-white w-full md:w-1/2">
              <p className="text-justify sm:text-start">
                Our habit tracker empowers you to build new habits and break old
                ones with ease. Experience enhanced discipline and productivity
                through personalized goal setting and progress monitoring. Join
                a supportive community and stay motivated on your journey to
                self-improvement.
              </p>
            </div>
          </div>
          <div className="w-full xl:w-5/6 px-3 sm:px-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {cardsData2.map((item, index) => (
                <div
                  key={index}
                  className="w-[95%] max-w-[350px] md:w-full overflow-hidden mx-auto"
                >
                  <Image src={item.img} alt="Hero Section" className="w-full" />
                  <div className="py-4">
                    <h2 className="text-white text-lg md:text-xl font-bold mb-2">
                      {item.title}
                    </h2>
                    <p className="text-white text-justify md:text-start text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default HomePage;
