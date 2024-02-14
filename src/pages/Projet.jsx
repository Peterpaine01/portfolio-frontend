import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// images
import Profil from "../assets/photo-profil.png";
import Reacteur from "../assets/reacteur.jpg";
import DigitalCampus from "../assets/digitalcampusparis.jpg";
import Gobelins from "../assets/gobelins.jpeg";
import ESAD from "../assets/esadorleans3.jpg";

const Projet = () => {
  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--portfolio-backend--fklc4pfyn242.code.run/project/${id}`
          // `${process.env.REACT_APP_SERVER_URL}/projects`
        );
        setProject(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleToggle = (el) => {
    el.classList.toggle("active");
  };

  // Settings slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: (
      <button type="button" class="slick-prev">
        <i class="fa-solid fa-angle-left"></i>
      </button>
    ),
    nextArrow: (
      <button type="button" class="slick-prev">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // infinite: true,
          dots: false,
          // arrows: false,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // arrows: false,
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // arrows: false,
        },
      },
    ],
  };

  // Settings slider project App
  const settingsApp = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    prevArrow: (
      <button type="button" class="slick-prev">
        <i class="fa-solid fa-angle-left"></i>
      </button>
    ),
    nextArrow: (
      <button type="button" class="slick-prev">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // infinite: true,
          dots: false,
          // arrows: false,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          // arrows: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // arrows: false,
        },
      },
    ],
  };

  console.log(project);

  if (isLoading === true) {
    // We haven't finished checking for the data yet
    return <p>Loading</p>;
  }

  return (
    <main className="project-page">
      <div className="wrap">
        <div className="container">
          <section
            className="flex-parent resume-project"
            // style={{
            //   backgroundImage: `url(` + project.preview.secure_url + `)`,
            // }}
          >
            <aside className="project-preview">
              <div className="preview-container">
                <img src={project.preview.secure_url} alt=""></img>
                {project.url && (
                  <Link
                    className="btn btn-solid btn-full btn-online"
                    to={project.url}
                    target="_blank"
                  >
                    Voir en ligne <i className="fa-solid fa-chevron-right"></i>
                  </Link>
                )}
              </div>
            </aside>
            <div className="right-col">
              <div className="tags-container">
                {project.tag.map((tag, index) => {
                  return <p key={index}>{tag}</p>;
                })}
              </div>
              <h1>{project.title}</h1>
              {project.resume && (
                <Markdown remarkPlugins={[remarkGfm]}>
                  {project.resume}
                </Markdown>
              )}

              {(project.repoback || project.repofront || project.figma) && (
                <div className="project-links">
                  {project.repoback && (
                    <Link
                      className="btn btn-light-small "
                      to={project.repoback}
                      target="_blank"
                    >
                      Repositorie backend{" "}
                      <i className="fa-solid fa-chevron-right"></i>
                    </Link>
                  )}
                  {project.repofront && (
                    <Link
                      className="btn btn-light-small"
                      to={project.repofront}
                      target="_blank"
                    >
                      Repositorie frontend{" "}
                      <i className="fa-solid fa-chevron-right"></i>
                    </Link>
                  )}
                  {project.figma && (
                    <Link
                      className="btn btn-light-small"
                      to={project.figma}
                      target="_blank"
                    >
                      Figma <i className="fa-solid fa-chevron-right"></i>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <div className="container">
        <section className="flex-parent project-details">
          <aside
            className={
              !project.images || project.images.length > 0 ? "col-2" : "col-1"
            }
          >
            <Markdown remarkPlugins={[remarkGfm]}>
              {project.description}
            </Markdown>
          </aside>

          {(!project.images || project.images.length > 0) && (
            <div className="right-col">
              <h2>En images</h2>

              {project.type === "App" ? (
                <Slider {...settingsApp}>
                  {project.images.map((image) => {
                    // console.log(image);
                    return (
                      <img key={image.asset_id} src={image.secure_url} alt="" />
                    );
                  })}
                </Slider>
              ) : (
                <Slider {...settings}>
                  {project.images.map((image) => {
                    console.log(image);
                    return (
                      <img key={image.asset_id} src={image.secure_url} alt="" />
                    );
                  })}
                </Slider>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Projet;
