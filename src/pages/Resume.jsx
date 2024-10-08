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

const Resume = () => {
  const [projectsList, setProjectsList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--portfolio-backend--fklc4pfyn242.code.run/projects`
          // `${import.meta.env.VITE_API_URL}/projects`
        );
        setProjectsList(response.data);
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
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 10000,
    cssEase: "linear",
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
          slidesToShow: 3,
          slidesToScroll: 3,
          // infinite: true,
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
        },
      },
      {
        breakpoint: 768,
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

  if (isLoading === true) {
    // We haven't finished checking for the data yet
    return <p>Loading</p>;
  }

  return (
    <main>
      <div className="wrap red top-section">
        <div className="container">
          <section className="presentation flex-parent">
            <div className="avatar flex-parent">
              <img src={Profil} alt="Fanny Carlier portrait" />
            </div>

            <div className="identity">
              <p className="text-emphase">FANNY CARLIER</p>
              <h1>Développeuse web & mobile</h1>
              <p className="sub-title">
                En recherche d'un poste de développeur Front-end dans le cadre
                d'un contrat en alternance.
              </p>
              <div className="link-pro flex-parent">
                <Link
                  className="btn btn-light-small"
                  to={`https://github.com/Peterpaine01`}
                  target="_blank"
                >
                  Github <i className="fa-solid fa-chevron-right"></i>
                </Link>
                <Link
                  className="btn btn-light-small"
                  to={`https://www.linkedin.com/in/fanny-carlier/`}
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
              Après un parcours de 13 ans à la fois dans la création graphique
              et la stratégie de communication digitale, j'ai entrepris une
              reconversion pour devenir développeuse web et mobile. Curieuse et
              minutieuse, j'aime trouver des solutions techniques adaptées aux
              besoins des projets en portant un soin particulier au parcours
              utilisateur.
              <i className="fa-solid fa-quote-right icon-end"></i>
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
                console.log(project.title, project.video);
                return (
                  <Link
                    key={project._id}
                    className="project-item"
                    to={`/projet/${project._id}`}
                  >
                    {project.type === "App" && project.video ? (
                      <>
                        <article>
                          <div className="project project-app">
                            <div className="project-left">
                              {project.video && (
                                <video
                                  className="video-project"
                                  controls
                                  autoPlay
                                  loop
                                  muted
                                >
                                  <source
                                    src={project.video}
                                    type="video/mp4"
                                  />
                                  Votre navigateur ne supporte pas les vidéos
                                  HTML5.
                                </video>
                              )}
                            </div>
                            <div className="project-right">
                              <div>
                                <p className="formation-date">{project.date}</p>
                                <h3>{project.title}</h3>
                              </div>

                              <div className="tags-container">
                                {project.tag.map((tag, index) => {
                                  return <p key={index}>{tag}</p>;
                                })}
                              </div>
                            </div>
                          </div>
                        </article>
                        <div className="overlay">
                          <div className="btn btn-outlined btn-green btn-bottom">
                            <i className="fa-solid fa-plus"></i>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <article>
                          <div className="project">
                            <div className="project-top">
                              {project.video ? (
                                <video
                                  className="video-project"
                                  controls
                                  autoPlay
                                  loop
                                  muted
                                >
                                  <source
                                    src={project.video}
                                    type="video/mp4"
                                  />
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
                    )}
                  </Link>
                );
              })}
            </Slider>
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
      {/* COMPETENCES */}
      <div className="container">
        <section className="competences">
          <h2>Compétences techniques</h2>
          <div className="column-container flex-parent">
            <article className="column-3">
              <h3>Technologies</h3>
              <div className="items flex-parent">
                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                  >
                    <path
                      d="M 34.554688 3.984375 C 33.775003 3.9581582 32.958884 4.0940926 32.140625 4.359375 C 30.504109 4.889941 28.789203 5.9238848 27.029297 7.3554688 C 26.339589 7.9165071 25.643623 8.5578288 24.945312 9.2382812 C 24.262398 8.5751039 23.580733 7.9509974 22.90625 7.4023438 C 21.147758 5.9719089 19.4375 4.9375672 17.804688 4.4082031 C 16.171878 3.8788386 14.547223 3.8624356 13.212891 4.6328125 C 11.878558 5.4031893 11.080619 6.8173558 10.722656 8.4960938 C 10.364693 10.174832 10.404125 12.173992 10.763672 14.412109 C 10.888559 15.189511 11.066671 16.005078 11.269531 16.835938 C 10.507095 17.067004 9.7666767 17.309955 9.0800781 17.578125 C 7.0079817 18.387438 5.2934468 19.355663 4.0449219 20.507812 C 2.7963969 21.659962 1.9902344 23.058304 1.9902344 24.59375 C 1.9902344 26.129196 2.7963969 27.525585 4.0449219 28.677734 C 5.2934468 29.829884 7.0079817 30.800062 9.0800781 31.609375 C 9.8142516 31.896126 10.609118 32.154326 11.429688 32.398438 C 11.134531 33.501278 10.895394 34.571467 10.732422 35.585938 C 10.372587 37.825853 10.334588 39.825265 10.693359 41.507812 C 11.052134 43.19036 11.850478 44.612534 13.191406 45.386719 C 14.532336 46.160905 16.164264 46.141894 17.800781 45.611328 C 19.437297 45.080762 21.15025 44.048772 22.910156 42.617188 C 23.593512 42.061316 24.284757 41.427206 24.976562 40.753906 C 25.671996 41.431263 26.366006 42.068338 27.052734 42.626953 C 28.811227 44.057387 30.523438 45.089776 32.15625 45.619141 C 33.789061 46.148505 35.413715 46.164908 36.748047 45.394531 C 38.082379 44.624154 38.878366 43.209988 39.236328 41.53125 C 39.59429 39.852512 39.554857 37.855304 39.195312 35.617188 C 39.031899 34.599965 38.792614 33.526227 38.496094 32.419922 C 39.343769 32.169866 40.163744 31.904721 40.919922 31.609375 C 42.992018 30.800062 44.706553 29.829884 45.955078 28.677734 C 47.203603 27.525585 48.009766 26.129196 48.009766 24.59375 C 48.009766 23.058304 47.203603 21.659963 45.955078 20.507812 C 44.706553 19.355663 42.992018 18.387438 40.919922 17.578125 C 40.22347 17.306107 39.471688 17.059992 38.697266 16.826172 C 38.901775 15.990221 39.083345 15.168805 39.208984 14.386719 C 39.568819 12.146804 39.606825 10.145439 39.248047 8.4628906 C 38.889279 6.7803434 38.088976 5.3601244 36.748047 4.5859375 C 36.077582 4.1988452 35.334372 4.0105918 34.554688 3.984375 z M 34.462891 6.0195312 C 34.952154 6.03291 35.369535 6.1493386 35.726562 6.3554688 C 36.440618 6.7677287 36.968419 7.5700924 37.25 8.890625 C 37.531581 10.211156 37.521848 11.99533 37.189453 14.064453 C 37.075647 14.772878 36.910402 15.52369 36.722656 16.292969 C 34.677151 15.800695 32.435744 15.435401 30.046875 15.220703 C 28.847638 13.559329 27.615404 12.045781 26.373047 10.703125 C 27.030182 10.061662 27.683063 9.4617259 28.320312 8.9433594 C 29.946026 7.6209332 31.485126 6.7210962 32.769531 6.3046875 C 33.411734 6.0964824 33.973627 6.0061525 34.462891 6.0195312 z M 15.486328 6.0253906 C 15.978419 6.0116533 16.541491 6.1017415 17.185547 6.3105469 C 18.473657 6.7281576 20.015452 7.6275969 21.642578 8.9511719 C 22.267037 9.4591336 22.905298 10.047651 23.548828 10.673828 C 22.297283 12.027473 21.054862 13.55414 19.847656 15.230469 C 17.468889 15.449074 15.236606 15.81635 13.201172 16.310547 C 13.014826 15.545537 12.849558 14.798586 12.736328 14.09375 C 12.403642 12.02283 12.39534 10.238404 12.677734 8.9140625 C 12.960128 7.5897208 13.492238 6.7813032 14.212891 6.3652344 C 14.573216 6.1572002 14.994237 6.0391279 15.486328 6.0253906 z M 24.976562 12.142578 C 25.791172 13.029071 26.605956 13.99916 27.414062 15.042969 C 26.620033 15.009861 25.816288 14.990234 25 14.990234 C 24.167457 14.990234 23.34841 15.010498 22.539062 15.044922 C 23.347352 14.000306 24.16175 13.029737 24.976562 12.142578 z M 25 17.009766 C 26.359894 17.009766 27.685348 17.065647 28.974609 17.160156 C 29.86173 18.434311 30.728648 19.786055 31.554688 21.216797 C 32.280504 22.473948 32.937328 23.729163 33.535156 24.96875 C 32.931017 26.224782 32.263184 27.496972 31.527344 28.771484 C 30.879609 29.893393 30.20319 30.958949 29.515625 31.986328 C 28.059313 32.10805 26.550303 32.175781 25 32.175781 C 23.412375 32.175781 21.869462 32.104031 20.380859 31.976562 C 19.704742 30.963955 19.039735 29.91454 18.402344 28.810547 C 17.668186 27.538949 17.003577 26.269079 16.400391 25.015625 C 17.006106 23.755092 17.673701 22.47818 18.412109 21.199219 C 19.233818 19.775977 20.098207 18.432055 20.980469 17.164062 C 22.283609 17.067424 23.62445 17.009766 25 17.009766 z M 31.548828 17.410156 C 33.197299 17.615841 34.745083 17.901405 36.185547 18.244141 C 35.758129 19.645287 35.231654 21.108808 34.59375 22.619141 C 34.179567 21.820719 33.750599 21.019585 33.287109 20.216797 C 32.725422 19.243926 32.140408 18.316416 31.548828 17.410156 z M 18.34375 17.425781 C 17.764654 18.315097 17.194836 19.224578 16.644531 20.177734 C 16.175094 20.990823 15.737221 21.802736 15.318359 22.611328 C 14.68596 21.110075 14.162654 19.654877 13.738281 18.261719 C 15.168002 17.918363 16.706766 17.633813 18.34375 17.425781 z M 38.164062 18.775391 C 38.872944 18.989877 39.557566 19.21371 40.185547 19.458984 C 42.0957 20.205046 43.60665 21.088493 44.585938 21.992188 C 45.565224 22.895882 45.990234 23.757696 45.990234 24.59375 C 45.990234 25.429804 45.565225 26.291619 44.585938 27.195312 C 43.60665 28.099007 42.0957 28.982454 40.185547 29.728516 C 39.487698 30.001079 38.72096 30.248243 37.923828 30.482422 C 37.355199 28.723643 36.629408 26.888772 35.765625 25.015625 C 36.758785 22.865083 37.561088 20.768289 38.164062 18.775391 z M 11.802734 18.785156 C 12.398803 20.758169 13.190811 22.834118 14.169922 24.962891 C 13.30047 26.846955 12.571087 28.692254 12 30.460938 C 11.23096 30.232919 10.490212 29.992451 9.8144531 29.728516 C 7.9042995 28.982454 6.39335 28.099007 5.4140625 27.195312 C 4.434775 26.291618 4.0097656 25.429804 4.0097656 24.59375 C 4.0097656 23.757696 4.434775 22.895882 5.4140625 21.992188 C 6.39335 21.088493 7.9042995 20.205046 9.8144531 19.458984 C 10.432774 19.217483 11.105915 18.996837 11.802734 18.785156 z M 25 20 C 22.250421 20 20 22.250421 20 25 C 20 27.749579 22.250421 30 25 30 C 27.749579 30 30 27.749579 30 25 C 30 22.250421 27.749579 20 25 20 z M 15.341797 27.365234 C 15.762496 28.177853 16.200028 28.993283 16.671875 29.810547 C 17.041048 30.449973 17.418073 31.072393 17.800781 31.683594 C 16.457817 31.497372 15.181231 31.261605 13.982422 30.982422 C 14.363652 29.81481 14.819744 28.602796 15.341797 27.365234 z M 34.619141 27.365234 C 35.143284 28.605725 35.599609 29.819681 35.982422 30.990234 C 34.779808 31.269089 33.499292 31.504052 32.152344 31.689453 C 32.540071 31.070779 32.922982 30.44057 33.296875 29.792969 C 33.765252 28.981717 34.201083 28.171917 34.619141 27.365234 z M 13.40625 32.923828 C 15.216074 33.352568 17.177716 33.681912 19.257812 33.896484 C 20.64638 35.904859 22.092967 37.709497 23.548828 39.287109 C 22.897813 39.921859 22.252566 40.517583 21.621094 41.03125 C 19.99538 42.353677 18.454326 43.251559 17.169922 43.667969 C 15.885516 44.084378 14.926946 44.029446 14.212891 43.617188 C 13.498835 43.204927 12.972987 42.402563 12.691406 41.082031 C 12.409825 39.761499 12.417606 37.979279 12.75 35.910156 C 12.900793 34.971492 13.12615 33.966374 13.40625 32.923828 z M 36.560547 32.931641 C 36.842987 33.980548 37.069013 34.98935 37.220703 35.933594 C 37.553389 38.004513 37.56169 39.788939 37.279297 41.113281 C 36.996903 42.437623 36.468699 43.247993 35.748047 43.664062 C 35.027395 44.080132 34.059594 44.13441 32.771484 43.716797 C 31.483374 43.299186 29.941578 42.399747 28.314453 41.076172 C 27.678439 40.558811 27.028726 39.958258 26.373047 39.318359 C 27.838664 37.73459 29.295467 35.920758 30.693359 33.900391 C 32.778701 33.687251 34.745791 33.359875 36.560547 32.931641 z M 21.867188 34.101562 C 22.893951 34.157518 23.934244 34.195312 25 34.195312 C 26.030504 34.195312 27.037063 34.159787 28.03125 34.107422 C 27.014961 35.478593 25.979034 36.725149 24.947266 37.847656 C 23.916125 36.722751 22.882144 35.473968 21.867188 34.101562 z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                  <p>React.js</p>
                  <p>React Native</p>
                </div>
                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 43.335938 4 L 6.667969 4 C 5.195313 4 4 5.195313 4 6.667969 L 4 43.332031 C 4 44.804688 5.195313 46 6.667969 46 L 43.332031 46 C 44.804688 46 46 44.804688 46 43.335938 L 46 6.667969 C 46 5.195313 44.804688 4 43.335938 4 Z M 27 36.183594 C 27 40.179688 24.65625 42 21.234375 42 C 18.140625 42 15.910156 39.925781 15 38 L 18.144531 36.097656 C 18.75 37.171875 19.671875 38 21 38 C 22.269531 38 23 37.503906 23 35.574219 L 23 23 L 27 23 Z M 35.675781 42 C 32.132813 42 30.121094 40.214844 29 38 L 32 36 C 32.816406 37.335938 33.707031 38.613281 35.589844 38.613281 C 37.171875 38.613281 38 37.824219 38 36.730469 C 38 35.425781 37.140625 34.960938 35.402344 34.199219 L 34.449219 33.789063 C 31.695313 32.617188 29.863281 31.148438 29.863281 28.039063 C 29.863281 25.179688 32.046875 23 35.453125 23 C 37.878906 23 39.621094 23.84375 40.878906 26.054688 L 37.910156 27.964844 C 37.253906 26.789063 36.550781 26.328125 35.453125 26.328125 C 34.335938 26.328125 33.628906 27.039063 33.628906 27.964844 C 33.628906 29.109375 34.335938 29.570313 35.972656 30.28125 L 36.925781 30.691406 C 40.171875 32.078125 42 33.496094 42 36.683594 C 42 40.117188 39.300781 42 35.675781 42 Z"></path>
                  </svg>
                  <p>Javascript</p>
                </div>

                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#212121"
                      d="M23.697,37.56h1.18c0.84,0,1.631-0.392,2.139-1.061l7.485-9.847l7.485,9.847	c0.508,0.668,1.299,1.061,2.139,1.061h1.18L35.756,25l9.121-12h-1.18c-0.84,0-1.631,0.392-2.139,1.061L34.5,23.347l-7.059-9.287	C26.933,13.392,26.142,13,25.302,13h-1.18l9.121,12L23.697,37.56z"
                    ></path>
                    <path
                      fill="#212121"
                      d="M24,26v-3c0-6.675-5.945-11.961-12.829-10.852C5.812,13.011,2,17.857,2,23.284L2,24v2v0.142	c0,6.553,4.777,11.786,10.868,11.858c5.092,0.06,9.389-3.344,10.707-7.999h-1.028c-0.62,0-1.182,0.355-1.451,0.913	c-1.739,3.595-5.789,5.862-10.228,4.842C6.776,34.815,4,30.981,4,26.783V26H24z M4,23.71c0-4.708,2.804-8.557,6.924-9.478	C16.798,12.92,22,17.352,22,23v1H4V23.71z"
                    ></path>
                  </svg>
                  <p>Express</p>
                </div>

                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 32 32"
                  >
                    <path d="M 15.994141 3 C 15.629141 3 15.264219 3.0895313 14.949219 3.2695312 L 5.0390625 8.9902344 C 4.3990625 9.3602344 4 10.060781 4 10.800781 L 4 21.179688 C 4 21.929688 4.3990625 22.620234 5.0390625 22.990234 L 7.640625 24.490234 C 8.900625 25.110234 9.3499219 25.109375 9.9199219 25.109375 C 11.789922 25.109375 12.859375 23.979531 12.859375 22.019531 L 12.859375 11.310547 C 12.859375 11.150547 12.730312 11.019531 12.570312 11.019531 L 11.320312 11.019531 C 11.150313 11.019531 11.029297 11.150547 11.029297 11.310547 L 11.029297 22.009766 C 11.029297 22.889766 10.120391 23.749531 8.6503906 23.019531 L 5.9296875 21.449219 C 5.8296875 21.399219 5.7695313 21.289687 5.7695312 21.179688 L 5.7695312 10.810547 C 5.7695312 10.690547 5.8296875 10.589297 5.9296875 10.529297 L 15.839844 4.8105469 C 15.929844 4.7505469 16.050391 4.7505469 16.150391 4.8105469 L 26.060547 10.529297 C 26.160547 10.589297 26.220703 10.690781 26.220703 10.800781 L 26.220703 21.179688 C 26.220703 21.289687 26.160313 21.399219 26.070312 21.449219 L 16.150391 27.179688 C 16.060391 27.229688 15.929844 27.229688 15.839844 27.179688 L 13.289062 25.669922 C 13.219062 25.619922 13.120781 25.610391 13.050781 25.650391 C 12.340781 26.050391 12.210781 26.100078 11.550781 26.330078 C 11.390781 26.380078 11.140625 26.479766 11.640625 26.759766 L 14.949219 28.720703 C 15.269219 28.900703 15.630234 29 15.990234 29 C 16.360234 29 16.719062 28.900703 17.039062 28.720703 L 26.960938 22.990234 C 27.600938 22.620234 28 21.929688 28 21.179688 L 28 10.810547 C 28 10.060547 27.600938 9.37 26.960938 9 L 17.039062 3.2695312 C 16.724063 3.0895313 16.359141 3 15.994141 3 z M 18.660156 11.005859 C 15.830156 11.005859 14.140625 12.205078 14.140625 14.205078 C 14.140625 16.375078 15.819062 16.974141 18.539062 17.244141 C 21.789062 17.564141 22.039062 18.045547 22.039062 18.685547 C 22.039062 19.785547 21.150547 20.255859 19.060547 20.255859 C 16.430547 20.255859 15.850156 19.594922 15.660156 18.294922 C 15.640156 18.154922 15.520859 18.054688 15.380859 18.054688 L 14.089844 18.054688 C 13.929844 18.054688 13.810547 18.185938 13.810547 18.335938 C 13.810547 20.005937 14.720547 21.994141 19.060547 21.994141 C 22.200547 21.994141 24 20.755703 24 18.595703 C 24 16.455703 22.549766 15.884609 19.509766 15.474609 C 16.419766 15.074609 16.109375 14.864531 16.109375 14.144531 C 16.109375 13.544531 16.380156 12.755859 18.660156 12.755859 C 20.690156 12.755859 21.449766 13.194453 21.759766 14.564453 C 21.789766 14.694453 21.899062 14.794922 22.039062 14.794922 L 23.330078 14.794922 C 23.410078 14.794922 23.479063 14.755313 23.539062 14.695312 C 23.589062 14.645313 23.619375 14.564609 23.609375 14.474609 C 23.409375 12.114609 21.840156 11.005859 18.660156 11.005859 z"></path>
                  </svg>
                  <p>Node.js</p>
                </div>

                <div className="competence-item">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    role="img"
                    viewBox="0 0 24 24"
                    class="mb-5 w-1/2 text-green-500"
                    width="100"
                    height="100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title></title>
                    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"></path>
                  </svg>
                  <p>MongoDB Compass</p>
                </div>

                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 48 48"
                  >
                    <polygon
                      fill="#000000"
                      points="18.001,29.994 18.001,35 21.995,34.995 21.995,29.999 20.001,32.004"
                    ></polygon>
                    <path
                      fill="#000000"
                      d="M46.586,21.441c-0.177-0.221-0.84-0.354-0.84-0.354l-0.796,1.592l0.088-1.769	c0,0-4.821-1.946-8.668-2.875s-6.58-1.291-8.048-1.326c-1.062-0.026-3.097,0.088-3.097,0.088l1.725,1.636	c0,0-2.167-0.885-2.963-1.194s-2.034-0.31-2.654-0.354c-0.619-0.044-1.15,0.221-1.15,0.221s-0.575,0.442,0.752,3.405	c1.088,2.43,3.719,3.965,4.632,4.44c-5.917-1.284-6.578-7.005-6.578-7.005s-3.603-0.037-8.757,1.769	c-5.824,2.041-9.288,5.971-9.288,5.971s4.6-1.548,8.492-0.487s5.497,3.788,5.497,3.788l0.107-3.007h2.936l2.251,2.713l1.758-2.677	h2.971c0,0,0.015,0,0.036-0.001v5.979c0,0,2.014-1.665,3.372-2.328c1.813-0.885,6.015-0.619,6.015-0.619s-0.067-0.47-0.315-0.967	c-0.352-0.704,0.573-0.935,0.573-0.935s8.278-1.813,9.206-1.99c0.929-0.177,1.592-0.575,1.813-0.796	c0.221-0.221,0.84-1.769,0.973-1.946C46.763,22.237,46.763,21.662,46.586,21.441z M21.2,18.389c0.221-0.354,0.885-0.487,1.902,0	c1.2,0.574,2.654,2.477,2.654,2.477l-1.238-0.575l0.619,1.106l-1.106-0.619l0.973,1.415l-0.663-0.177l0.885,1.459	C21.377,21.264,20.979,18.743,21.2,18.389z M37.918,20.556l-0.663,0.486c0,0-2.654,0.354-3.361,0.31	c-0.708-0.044-1.15-1.106-1.15-1.106l-1.459-0.885L37.918,20.556z M32.92,26.748c-0.487,0.398-0.044,1.371-0.044,1.371	c-0.663-0.486-1.46-1.415-0.752-1.946c0.708-0.531,5.882-1.194,5.882-1.194S33.406,26.35,32.92,26.748z"
                    ></path>
                  </svg>
                  <p>Mongoose</p>
                </div>

                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                  >
                    <path d="M9,7l3,34l14,4l14-4c1-11.33,2-22.67,3-34H9z M33.76,35l-7.77,2l-7.76-2l-0.39-5h3.86l0.18,2L26,32.62L30.17,32l0.41-5	H17.59l0.96-12H34l0.7,6H31l-0.23-2h-8.36l-0.32,4h12.66L33.76,35z"></path>
                  </svg>
                  <p>HTML 5</p>
                </div>

                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M 42 6 L 39 40 L 25 44 L 11 40 L 8 6 Z M 16.800781 28 L 20.800781 28 L 20.898438 30.5 L 25 31.898438 L 29.101563 30.5 L 29.398438 26 L 20.601563 26 L 20.398438 22 L 29.601563 22 L 29.898438 18 L 16.101563 18 L 15.800781 14 L 34.101563 14 L 33.601563 22 L 32.898438 33.5 L 25 36.101563 L 17.101563 33.5 Z"
                    ></path>
                  </svg>
                  <p>CSS 3</p>
                </div>

                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 50 50"
                  >
                    <path d="M43.03,27.802c-1.747,0.009-3.261,0.429-4.53,1.054c-0.464-0.926-0.934-1.741-1.013-2.347 c-0.092-0.707-0.199-1.129-0.088-1.972c0.111-0.843,0.599-2.036,0.591-2.125c-0.007-0.089-0.109-0.518-1.117-0.526 c-1.008-0.007-1.87,0.194-1.972,0.46c-0.102,0.266-0.296,0.865-0.416,1.49c-0.177,0.914-2.012,4.174-3.055,5.879 c-0.341-0.666-0.631-1.252-0.691-1.716c-0.092-0.707-0.199-1.129-0.088-1.972c0.111-0.843,0.599-2.036,0.591-2.125 c-0.007-0.089-0.109-0.518-1.117-0.526c-1.008-0.007-1.87,0.194-1.972,0.46c-0.102,0.266-0.21,0.888-0.416,1.49 c-0.207,0.602-2.647,6.039-3.286,7.448c-0.326,0.718-0.609,1.295-0.809,1.689c-0.001-0.001-0.001-0.002-0.001-0.002 s-0.012,0.026-0.034,0.071c-0.171,0.335-0.273,0.521-0.273,0.521s0.001,0.003,0.003,0.007c-0.136,0.246-0.281,0.475-0.353,0.475 c-0.05,0-0.151-0.656,0.022-1.555c0.363-1.886,1.235-4.828,1.227-4.929c-0.004-0.052,0.162-0.564-0.57-0.833 c-0.711-0.26-0.965,0.174-1.03,0.175c-0.063,0.001-0.11,0.153-0.11,0.153s0.793-3.308-1.512-3.308c-1.44,0-3.436,1.576-4.42,3.004 c-0.62,0.338-1.948,1.063-3.357,1.837c-0.541,0.297-1.093,0.601-1.617,0.89c-0.036-0.039-0.071-0.079-0.108-0.118 c-2.794-2.981-7.958-5.089-7.739-9.096c0.08-1.457,0.586-5.293,9.924-9.946c7.649-3.812,13.773-2.763,14.831-0.438 c1.512,3.321-3.273,9.494-11.216,10.384c-3.027,0.339-4.62-0.834-5.017-1.271c-0.417-0.46-0.479-0.481-0.635-0.394 c-0.254,0.141-0.093,0.547,0,0.789c0.237,0.617,1.21,1.712,2.87,2.256c1.46,0.479,5.013,0.742,9.311-0.92 c4.813-1.862,8.571-7.041,7.468-11.37c-1.123-4.403-8.423-5.85-15.332-3.396c-4.112,1.461-8.563,3.754-11.764,6.747 c-3.806,3.56-4.412,6.658-4.162,7.952c0.889,4.6,7.228,7.595,9.767,9.815c-0.125,0.069-0.243,0.134-0.35,0.193 c-1.273,0.63-6.105,3.159-7.314,5.831c-1.371,3.031,0.218,5.206,1.271,5.499c3.26,0.907,6.606-0.725,8.404-3.407 c1.798-2.681,1.578-6.172,0.753-7.766c-0.01-0.02-0.022-0.039-0.032-0.059c0.329-0.195,0.664-0.392,0.996-0.587 c0.648-0.38,1.284-0.735,1.836-1.036c-0.309,0.846-0.535,1.86-0.653,3.325c-0.138,1.721,0.567,3.945,1.49,4.82 c0.406,0.385,0.895,0.394,1.205,0.394c1.074,0,1.564-0.893,2.103-1.95c0.662-1.296,1.249-2.804,1.249-2.804 s-0.737,4.075,1.271,4.075c0.731,0,1.467-0.949,1.795-1.432c0.001,0.005,0.001,0.008,0.001,0.008s0.019-0.031,0.056-0.095 c0.076-0.116,0.119-0.19,0.119-0.19s0.002-0.008,0.004-0.021c0.294-0.51,0.946-1.674,1.924-3.594 c1.263-2.48,2.475-5.586,2.475-5.586s0.113,0.76,0.482,2.015c0.217,0.739,0.679,1.556,1.043,2.339 c-0.293,0.407-0.473,0.64-0.473,0.64s0.002,0.004,0.005,0.012c-0.234,0.311-0.497,0.646-0.772,0.974 c-0.997,1.188-2.185,2.544-2.344,2.936c-0.187,0.461-0.143,0.801,0.219,1.073c0.264,0.199,0.735,0.23,1.227,0.197 c0.896-0.06,1.527-0.283,1.838-0.418c0.485-0.171,1.05-0.441,1.58-0.831c0.978-0.719,1.568-1.748,1.512-3.111 c-0.031-0.751-0.271-1.495-0.574-2.198c0.089-0.128,0.178-0.256,0.267-0.387c1.542-2.255,2.738-4.732,2.738-4.732 s0.113,0.76,0.482,2.015c0.187,0.636,0.556,1.329,0.887,2.009c-1.45,1.178-2.349,2.547-2.662,3.445 c-0.577,1.661-0.125,2.414,0.723,2.585c0.384,0.078,0.927-0.098,1.335-0.271c0.508-0.168,1.118-0.449,1.688-0.868 c0.978-0.719,1.919-1.726,1.862-3.089c-0.026-0.62-0.194-1.236-0.422-1.828c1.229-0.512,2.821-0.797,4.848-0.56 c4.349,0.508,5.202,3.223,5.039,4.359c-0.163,1.137-1.075,1.761-1.38,1.95c-0.305,0.189-0.398,0.254-0.372,0.394 c0.037,0.204,0.178,0.196,0.438,0.152c0.358-0.06,2.283-0.924,2.366-3.022C50.102,30.703,47.55,27.778,43.03,27.802z M9.512,39.102 c-1.44,1.571-3.453,2.165-4.316,1.665c-0.932-0.54-0.563-2.854,1.205-4.521c1.077-1.016,2.468-1.952,3.391-2.529 c0.21-0.126,0.518-0.312,0.893-0.537c0.062-0.035,0.097-0.055,0.097-0.055l-0.001-0.002c0.072-0.043,0.147-0.088,0.223-0.134 C11.647,35.363,11.024,37.453,9.512,39.102z M20.005,31.968c-0.502,1.223-1.552,4.352-2.191,4.184 c-0.549-0.144-0.883-2.523-0.11-4.863c0.389-1.178,1.22-2.586,1.709-3.133c0.786-0.879,1.652-1.167,1.862-0.81 C21.544,27.8,20.32,31.201,20.005,31.968z M28.675,36.105c-0.213,0.111-0.408,0.181-0.498,0.127 c-0.067-0.04,0.088-0.186,0.088-0.186s1.084-1.167,1.512-1.698c0.248-0.309,0.537-0.676,0.85-1.086 c0.003,0.041,0.004,0.082,0.004,0.122C30.627,34.782,29.277,35.725,28.675,36.105z M35.354,34.582 c-0.159-0.113-0.132-0.478,0.389-1.614c0.205-0.446,0.672-1.198,1.485-1.916c0.094,0.295,0.152,0.578,0.15,0.842 C37.367,33.653,36.112,34.31,35.354,34.582z"></path>
                  </svg>
                  <p>Sass</p>
                </div>

                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 46.792969 22.089844 L 27.910156 3.207031 C 27.109375 2.402344 26.054688 2 25 2 C 23.945313 2 22.890625 2.402344 22.089844 3.207031 L 18.355469 6.941406 L 22.976563 11.5625 C 24.511719 10.660156 26.511719 10.855469 27.828125 12.171875 C 29.144531 13.488281 29.335938 15.488281 28.433594 17.019531 L 32.976563 21.5625 C 34.511719 20.660156 36.511719 20.855469 37.828125 22.171875 C 39.390625 23.734375 39.390625 26.265625 37.828125 27.828125 C 36.265625 29.390625 33.734375 29.390625 32.171875 27.828125 C 30.855469 26.511719 30.660156 24.511719 31.5625 22.976563 L 27.019531 18.433594 C 26.695313 18.625 26.355469 18.765625 26 18.855469 L 26 31.140625 C 27.722656 31.585938 29 33.136719 29 35 C 29 37.210938 27.210938 39 25 39 C 22.789063 39 21 37.210938 21 35 C 21 33.136719 22.277344 31.585938 24 31.140625 L 24 18.855469 C 23.332031 18.683594 22.695313 18.351563 22.171875 17.828125 C 20.855469 16.511719 20.664063 14.511719 21.566406 12.980469 L 16.941406 8.355469 L 3.207031 22.089844 C 1.597656 23.695313 1.597656 26.304688 3.207031 27.910156 L 22.089844 46.792969 C 22.890625 47.597656 23.945313 48 25 48 C 26.054688 48 27.109375 47.597656 27.910156 46.792969 L 46.792969 27.910156 C 48.402344 26.304688 48.402344 23.695313 46.792969 22.089844 Z"></path>
                  </svg>
                  <p>Git</p>
                </div>
              </div>
            </article>
            <article className="column-3">
              <h3>Outils</h3>
              <div className="items flex-parent">
                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 30 30"
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                  </svg>
                  <p>GitHub</p>
                </div>

                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 32 32"
                  >
                    <path d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z"></path>
                  </svg>
                  <p>NPM</p>
                </div>

                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                  >
                    <path d="M31 24c-2.757 0-5-2.243-5-5V7c0-2.757 2.243-5 5-5s5 2.243 5 5v12C36 21.757 33.757 24 31 24zM43 24h-4c-.553 0-1-.447-1-1v-4c0-2.757 2.243-5 5-5s5 2.243 5 5S45.757 24 43 24zM19 24H7c-2.757 0-5-2.243-5-5s2.243-5 5-5h12c2.757 0 5 2.243 5 5S21.757 24 19 24zM23 12h-4c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5v4C24 11.553 23.553 12 23 12zM19 48c-2.757 0-5-2.243-5-5V31c0-2.757 2.243-5 5-5s5 2.243 5 5v12C24 45.757 21.757 48 19 48zM7 36c-2.757 0-5-2.243-5-5s2.243-5 5-5h4c.553 0 1 .447 1 1v4C12 33.757 9.757 36 7 36zM43 36H31c-2.757 0-5-2.243-5-5s2.243-5 5-5h12c2.757 0 5 2.243 5 5S45.757 36 43 36zM31 48c-2.757 0-5-2.243-5-5v-4c0-.553.447-1 1-1h4c2.757 0 5 2.243 5 5S33.757 48 31 48z"></path>
                  </svg>
                  <p>Slack</p>
                </div>

                <div className="competence-item">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    class="mb-5 w-1/2 text-white"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm9.5 5.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm-6.354-.354a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146z"></path>
                  </svg>
                  <p>Terminal</p>
                </div>
              </div>
            </article>
            <article className="column-3">
              <h3>Logiciels</h3>
              <div className="items flex-parent">
                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 5 3 C 3.9 3 3 3.9 3 5 L 3 19 C 3 20.1 3.9 21 5 21 L 19 21 C 20.1 21 21 20.1 21 19 L 21 5 C 21 3.9 20.1 3 19 3 L 5 3 z M 6.890625 8 L 9.5898438 8 C 11.915844 8 12.193359 10.140469 12.193359 10.605469 C 12.192359 12.465469 10.891641 13.115234 9.6816406 13.115234 L 8.5644531 13.115234 L 8.5644531 15.90625 L 6.890625 15.90625 L 6.890625 8 z M 8.5644531 9.3027344 L 8.5644531 11.814453 L 9.6816406 11.814453 C 10.425641 11.814453 10.611328 11.256469 10.611328 10.605469 C 10.612328 9.9534687 10.333641 9.3027344 9.6816406 9.3027344 L 8.5644531 9.3027344 z M 15.169922 9.953125 C 16.564922 9.953125 17.308594 10.791453 17.308594 11.814453 L 15.728516 11.814453 C 15.728516 11.349453 15.541922 11.070312 15.169922 11.070312 C 14.890922 11.070312 14.611328 11.256906 14.611328 11.628906 C 14.611328 12.558906 17.310547 12.279172 17.310547 14.326172 C 17.309547 15.721172 15.913922 16 15.169922 16 C 13.681922 16 12.9375 14.976875 12.9375 14.046875 L 14.425781 14.046875 C 14.425781 14.790875 14.983922 14.884766 15.169922 14.884766 C 15.541922 14.884766 15.820313 14.698172 15.820312 14.326172 C 15.820312 13.489172 13.121094 13.581703 13.121094 11.720703 C 13.121094 10.325703 14.424922 9.953125 15.169922 9.953125 z"></path>
                  </svg>
                  <p>Photoshop</p>
                </div>

                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 5 3 C 3.898438 3 3 3.898438 3 5 L 3 19 C 3 20.101563 3.898438 21 5 21 L 19 21 C 20.101563 21 21 20.101563 21 19 L 21 5 C 21 3.898438 20.101563 3 19 3 Z M 15.5 7.5 C 16 7.5 16.40625 7.90625 16.40625 8.40625 C 16.40625 8.90625 16 9.3125 15.5 9.3125 C 15 9.3125 14.59375 8.90625 14.59375 8.40625 C 14.59375 7.90625 15 7.5 15.5 7.5 Z M 9.6875 7.90625 L 11.3125 7.90625 L 14 16.40625 L 12.09375 16.40625 L 11.59375 14.6875 L 9.3125 14.6875 L 8.8125 16.40625 L 7 16.40625 Z M 14.6875 10.09375 L 16.40625 10.09375 L 16.40625 16.40625 L 14.6875 16.40625 Z M 10.5 10.1875 L 9.6875 13.1875 L 11.3125 13.1875 Z"></path>
                  </svg>
                  <p>Illustrator</p>
                </div>

                <div className="competence-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                  >
                    <path d="M25 2v14h-7c-3.855 0-7-3.145-7-7 0-3.855 3.145-7 7-7H25zM25 18v14h-7c-3.855 0-7-3.145-7-7 0-3.855 3.145-7 7-7H25zM25 34v7c0 3.855-3.145 7-7 7s-7-3.145-7-7c0-3.855 3.145-7 7-7H25zM41 9c0 3.855-3.145 7-7 7h-7V2h7C37.855 2 41 5.145 41 9zM34 18A7 7 0 1034 32 7 7 0 1034 18z"></path>
                  </svg>
                  <p>Figma</p>
                </div>

                <div className="competence-item">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="mb-5 w-1/2 text-blue-500"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M16 3v18l4 -2.5v-13z"></path>
                    <path d="M9.165 13.903l-4.165 3.597l-2 -1l4.333 -4.5m1.735 -1.802l6.932 -7.198v5l-4.795 4.141"></path>
                    <path d="M16 16.5l-11 -10l-2 1l13 13.5"></path>
                  </svg>
                  <p>Visual Studio Code</p>
                </div>

                <div className="competence-item">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    role="img"
                    viewBox="0 0 24 24"
                    class="mb-5 w-1/2 text-orange-400"
                    height="100"
                    width="100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title></title>
                    <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z"></path>
                  </svg>
                  <p>Postman</p>
                </div>
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
            <article className="column-4">
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
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Resume;
