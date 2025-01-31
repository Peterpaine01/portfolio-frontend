import { Link } from "react-router-dom";
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

const Resume = ({ user }) => {
  const [projectsList, setProjectsList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/projects`
        );

        setProjectsList(response.data);
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
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 10000,
    cssEase: "linear",
    swipeToSlide: true,
    infinite: true,
    prevArrow: (
      <button type="button" class="slick-prev">
        <i className="fa-solid fa-angle-left"></i>
      </button>
    ),
    nextArrow: (
      <button type="button" class="slick-prev">
        <i className="fa-solid fa-angle-right"></i>
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          swipeToSlide: true,
          rtl: true,
          dots: false,
          // arrows: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // arrows: false,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          rtl: true,
          // arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          // arrows: false,
        },
      },
    ],
  };

  if (isLoading === true) {
    // We haven't finished checking for the data yet
    return <p>Loading</p>;
  }

  console.log("user resume > ", user);

  return (
    <main>
      <div className="wrap red top-section">
        <div className="container">
          <section className="presentation flex-parent">
            <div className="avatar flex-parent">
              <img src={user.photo} alt="Fanny Carlier portrait" />
            </div>

            <div className="identity">
              <p className="text-emphase">{user.account.username}</p>
              <h1>{user.job}</h1>
              <p className="sub-title">{user.search}</p>
              <div className="link-pro flex-parent">
                <Link
                  className="btn btn-light-small"
                  to={user.github}
                  target="_blank"
                >
                  Github <i className="fa-solid fa-chevron-right"></i>
                </Link>
                <Link
                  className="btn btn-light-small"
                  to={user.linkedin}
                  target="_blank"
                >
                  Linkedin <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          </section>
          <section className="introduction flex-parent">
            <p>
              <i className="fa-solid fa-quote-left icon-start"></i>
              {user.presentation}
            </p>
          </section>
        </div>
      </div>
      {/* PROJETS */}
      <div className="container">
        <section>
          <h2>Projets</h2>
          <div className="alaune"></div>
          <div className="slider">
            <Slider {...settings}>
              {projectsList.map((project) => {
                // console.log(project.title, project.video);
                return (
                  <Link
                    key={project._id}
                    className="project-item"
                    to={`/projet/${project._id}`}
                  >
                    <>
                      <article>
                        <div className="project">
                          <div className="project-top">
                            {project.type !== "App" && project.video ? (
                              <video
                                className="video-project"
                                controls
                                autoPlay
                                loop
                                muted
                              >
                                <source src={project.video} type="video/mp4" />
                                Votre navigateur ne supporte pas les vidéos
                                HTML5.
                              </video>
                            ) : (
                              <img src={project.preview.secure_url} alt="" />
                            )}
                          </div>
                          <div className="project-bottom">
                            <div className="flex-parent flex-between">
                              <h3>{project.title}</h3>
                              <p className="formation-date">{project.date}</p>
                            </div>

                            <div className="tags-container">
                              {project.tag.map((tag, index) => {
                                return <p key={index}>{tag}</p>;
                              })}
                            </div>

                            {/* {project.resume && (
                          <div className="project-resume">
                            <Markdown remarkPlugins={[remarkGfm]}>
                              {project.resume}
                            </Markdown>
                          </div>
                        )} */}

                            {/* {project.url && (
                          <Link
                            className="btn btn-solid btn-full"
                            to={project.url}
                            target="_blank"
                          >
                            Voir en ligne{" "}
                            <i className="fa-solid fa-chevron-right"></i>
                          </Link>
                        )}
                        {(project.repoback ||
                          project.repofront ||
                          project.figma) && (
                          <div className="project-links">
                            {project.repoback && (
                              <Link
                                className="btn btn-light-small "
                                to={project.repoback}
                                target="_blank"
                              >
                                Repo backend{" "}
                                <i className="fa-solid fa-chevron-right"></i>
                              </Link>
                            )}
                            {project.repofront && (
                              <Link
                                className="btn btn-light-small"
                                to={project.repofront}
                                target="_blank"
                              >
                                Repo frontend{" "}
                                <i className="fa-solid fa-chevron-right"></i>
                              </Link>
                            )}
                            {project.figma && (
                              <Link
                                className="btn btn-light-small"
                                to={project.figma}
                                target="_blank"
                              >
                                Figma{" "}
                                <i className="fa-solid fa-chevron-right"></i>
                              </Link>
                            )}
                          </div>
                        )} */}
                          </div>
                        </div>
                      </article>
                      <div className="overlay">
                        <div className="btn btn-outlined btn-green btn-bottom">
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </div>
                    </>
                  </Link>
                );
              })}
            </Slider>
          </div>
        </section>
      </div>
      {/* COMPETENCES */}
      <div className="container">
        <section className="competences">
          <h2>Compétences techniques</h2>
          <div className="column-container flex-parent">
            <article className="column-3 justify-center align-center">
              <h3>Développement Frontend</h3>
              <ul>
                <li>Javascript</li>
                <li>HTML/CSS</li>
                <li>TypeScript</li>
              </ul>

              <h4>Frameworks JS</h4>
              <ul>
                <li>React.js</li>
                <li>React Native</li>
              </ul>

              <h4>Frameworks & Préprocesseurs CSS</h4>
              <ul>
                <li>Sass</li>
                <li>Bootstrap</li>
              </ul>
            </article>
            <article className="column-3 justify-center align-center">
              <h3>Développement Backend</h3>
              <ul>
                <li>Node JS</li>
                <li>PHP</li>
              </ul>
              <h4>Frameworks</h4>
              <ul>
                <li>Express.js</li>
              </ul>
            </article>
            <article className="column-3 justify-center align-center">
              <h3>Outils et Gestion de Versions</h3>
              <ul>
                <li>Git</li>
                <li>Github</li>
                <li>Npm</li>
                <li>Visual Studio Code</li>
                <li>MongoDB Compass</li>
                <li>Terminal</li>
              </ul>
            </article>
          </div>
          <div className="column-container flex-parent">
            <article className="column-3 justify-center align-center">
              <h3>Design & UI/UX</h3>
              <ul>
                <li>Figma</li>
                <li>Photoshop</li>
                <li>Illustrator</li>
              </ul>
            </article>
            <article className="column-3 justify-center align-center">
              <h3>Base de Données</h3>
              <ul>
                <li>MongoDB</li>
                <li>MySQL</li>
                <li>Mongoose</li>
              </ul>
            </article>
            <article className="column-3 justify-center align-center">
              <h3>Environnement et Tests</h3>
              <ul>
                <li>Postman</li>
                <li>Docker</li>
              </ul>
            </article>
          </div>
        </section>
      </div>
      {/* EXPERIENCES */}
      <div className="container">
        <section className="experiences">
          <h2>Expériences</h2>
          <div className="toggle-container">
            <article className="toggle">
              <a
                className="toggle-top flex-parent"
                id="developpeur"
                onClick={(event) => {
                  handleToggle(event.target);
                }}
              >
                Développeur web & mobile
              </a>
              <div className="toggle-bottom">
                <ul>
                  <li className="dotted flex-parent">
                    <p>Freelance</p>
                    <div className="dot"></div>
                    <p>2024</p>
                  </li>
                  <li>
                    <ul>
                      <li className="dotted flex-parent">
                        <p>Ads-Com, agence web, Orléans</p>
                        <div className="dot"></div>
                        <p>2024</p>
                      </li>
                      <li>
                        <p className="xp-details">
                          React, React Native CLI, GitLab, Firebase
                          Analytics/Messaging.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </article>
            <article className="toggle">
              <a
                className="toggle-top flex-parent"
                id="integrateur"
                onClick={(event) => {
                  handleToggle(event.target);
                }}
              >
                Intégrateur web & mobile
              </a>
              <div className="toggle-bottom">
                <ul>
                  <li className="dotted flex-parent">
                    <p>Freelance</p>
                    <div className="dot"></div>
                    <p>2015</p>
                  </li>
                  <li>
                    <ul>
                      <li className="dotted flex-parent">
                        <p>Ads-Com, agence web, Orléans</p>
                        <div className="dot"></div>
                        <p>2014 - 2015</p>
                      </li>
                      <li>
                        <p className="xp-details">
                          Bootstrap, Drupal, Jahia, Grunt, Less, Sass.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </article>
            <article className="toggle">
              <a
                className="toggle-top flex-parent"
                id="communication"
                onClick={(event) => {
                  handleToggle(event.target);
                }}
              >
                Chargée de communication digitale
              </a>
              <div className="toggle-bottom">
                <ul>
                  <li>
                    <ul>
                      <li className="dotted flex-parent">
                        <p>Chambre d'agriculture</p>
                        <div className="dot"></div>
                        <p>2021 - 2023</p>
                      </li>
                      <li>
                        <p className="xp-details">
                          Chambre départementale du Loiret, Orléans
                        </p>
                        <p className="xp-details">
                          Cheffe de projet MOA pour la création du site marchand
                          de l'entreprise.
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li className="dotted flex-parent">
                        <p>Thélem assurances</p>
                        <div className="dot"></div>
                        <p>2018 - 2020</p>
                      </li>
                      <li>
                        <p className="xp-details">
                          Siège,service communication et marketing, Orléans.
                        </p>
                        <p className="xp-details">
                          Suivi de projet pout la refonte du site web & de
                          l'espace client de l'entreprise.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </article>
            <article className="toggle">
              <a
                className="toggle-top flex-parent"
                id="webdesigner"
                onClick={(event) => {
                  handleToggle(event.target);
                }}
              >
                Webdesigner
              </a>
              <div className="toggle-bottom">
                <ul>
                  <li className="dotted flex-parent">
                    <p>Mediamobile</p>
                    <div className="dot"></div>
                    <p>2015</p>
                  </li>
                  <li>
                    <p className="xp-details">
                      Fournisseur européen d'information trafic en temps réel,
                      Paris.
                    </p>
                    <p className="xp-details">
                      Maquette et intégration de leur appli mobile V-Trafic.
                    </p>
                  </li>
                  <li className="dotted  flex-parent">
                    <p>Is&a Bloom</p>
                    <div className="dot"></div>
                    <p>2015</p>
                  </li>
                  <li>
                    <p className="xp-details">Agence web, Paris.</p>
                    <p className="xp-details">Maquettes site web responsive.</p>
                  </li>
                  <li className="dotted flex-parent">
                    <p>Sool Design</p>
                    <div className="dot"></div>
                    <p>2011 - 2012</p>
                  </li>
                  <li>
                    <p className="xp-details">
                      Agence de communication, Orléans.
                    </p>
                    <p className="xp-details">
                      Maquettes site web et communication print.
                    </p>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      </div>

      {/* FORMATION */}
      <div className="container">
        <section>
          <h2>Formation</h2>
          <div className="slider flex-parent">
            <article className="column-4">
              <div className="formation-top">
                <img src={ESAD} alt="Fanny Carlier portrait" />
              </div>
              <div className="formation-bottom">
                <div className="flex-parent flex-between">
                  <h3>STUDI / DIGITAL CAMPUS</h3>
                  <p className="formation-date">2024 - 2025</p>
                </div>

                <p>Graduate Développeur web full stack</p>
              </div>
            </article>
            <article className="column-4">
              <div className="formation-top">
                <img src={Reacteur} alt="Fanny Carlier portrait" />
              </div>
              <div className="formation-bottom">
                <div className="flex-parent flex-between">
                  <h3>Le Réacteur Paris</h3>
                  <p className="formation-date">2023</p>
                </div>

                <p>Bootcamp Développeur web & mobile</p>
              </div>
            </article>
            <article className="column-4">
              <div className="formation-top">
                <img src={DigitalCampus} alt="Fanny Carlier portrait" />
              </div>
              <div className="formation-bottom">
                <div className="flex-parent flex-between">
                  <h3>Digital Campus Paris</h3>
                  <p className="formation-date">2018 - 2020</p>
                </div>

                <p>
                  Master en alternance « Expert en stratégie digitale »
                  spécialisation social média et webmarketing
                </p>
              </div>
            </article>
            <article className="column-4">
              <div className="formation-top">
                <img src={Gobelins} alt="Fanny Carlier portrait" />
              </div>
              <div className="formation-bottom">
                <div className="flex-parent flex-between">
                  <h3>Les Gobelins Paris</h3>
                  <p className="formation-date">2013 - 2014</p>
                </div>

                <p>
                  Formation professionnelle en Conception et Réalisation de
                  Produits en Ligne.
                </p>
              </div>
            </article>
            {/* <article className="column-4">
              <div className="formation-top">
                <img src={ESAD} alt="Fanny Carlier portrait" />
              </div>
              <div className="formation-bottom">
                <div className="flex-parent flex-between">
                  <h3>ESAD Orléans</h3>
                  <p className="formation-date">2006 - 2011</p>
                </div>

                <p>
                  Diplôme National Supérieur d’Expression Plastique en
                  Communication visuelle
                </p>
              </div>
            </article> */}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Resume;
