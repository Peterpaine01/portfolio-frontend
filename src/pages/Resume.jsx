import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

// images
import Profil from "../assets/photo-profil.png";

const Resume = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/projects`
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

            <aside>
              <p className="text-emphase">FANNY CARLIER</p>
              <h1>Developpeuse web & mobile JS</h1>
              <p className="sub-title">
                En recherche d'un contrat de professionalisation (fin février
                2024)
              </p>
              <div className="link-pro flex-parent">
                <Link
                  className="btn btn-light-small"
                  to={`https://github.com/Peterpaine01`}
                >
                  Github <i class="fa-solid fa-chevron-right"></i>
                </Link>
                <Link
                  className="btn btn-light-small"
                  to={`https://www.linkedin.com/in/fanny-carlier/`}
                >
                  Linkedin <i class="fa-solid fa-chevron-right"></i>
                </Link>
              </div>
            </aside>
          </section>
          <section className="introduction flex-parent">
            <p>
              {" "}
              <i class="fa-solid fa-quote-left fa-fade"></i>
            </p>

            <p>En reconversion ...</p>

            <p>
              <i class="fa-solid fa-quote-right fa-fade"></i>
            </p>
          </section>
        </div>
      </div>

      <div className="container">
        <section className="competences">
          <h2>Compétences techniques</h2>
          <div className="column-container flex-parent">
            <article className="column-3">
              <h3>Technologies</h3>
              <div className="items">
                <p>HTML/CSS</p>
                <p>Javascript</p>
                <p>Express</p>
                <p>Node.js</p>
                <p>MongoDB Compass</p>
                <p>Mongoose</p>
                <p>React.js</p>
                <p>React Native</p>
                <p>Git</p>
                <p>Sass</p>
              </div>
            </article>
            <article className="column-3">
              <h3>Outils</h3>
              <div className="items">
                <p>GitHub</p>
                <p>NPM</p>
                <p>Slack</p>
                <p>Terminal</p>
              </div>
            </article>
            <article className="column-3">
              <h3>Logiciels</h3>
              <div className="items">
                <p>Photoshop</p>
                <p>Illustrator</p>
                <p>Figma</p>
                <p>Visual Studio Code</p>
                <p>Postman</p>
              </div>
            </article>
          </div>
        </section>
      </div>
      <div className="container">
        <section>
          <h2>Projets</h2>
          <div className="slider"></div>
        </section>
      </div>
      <div className="container">
        <section>
          <h2>Formation</h2>
          <div className="slider flex-parent">
            <article className="column-4">
              <h3>Le Réacteur</h3>
              <p>Certification</p>
              <p>2013</p>
            </article>
            <article className="column-4">
              <h3>Digital Campus</h3>
              <p></p>
              <p>Master II / 2018 - 2020</p>
            </article>
            <article className="column-4">
              <h3>Les Gobelins</h3>
              <p>License</p>
              <p>2014</p>
            </article>
            <article className="column-4">
              <h3>ESAD Orélans</h3>
              <p>Diplôme Nationale Supérieur d'Expression Plastique</p>
              <p>Master II / 2006 - 2011</p>
            </article>
          </div>
        </section>
      </div>
      <div className="container">
        <section className="experiences">
          <h2>Expériences</h2>
          <div className="toggle-container">
            <article className="toggle">
              <div
                className="toggle-top flex-parent"
                onClick={(event) => {
                  handleToggle(event.target);
                }}
              >
                <h3>Intégrateur web & mobile</h3>
                <aside className="flex-parent">
                  <p>1 an</p>
                  <i class="fa-solid fa-chevron-right"></i>
                </aside>
              </div>
              <div className="toggle-bottom">
                <ul>
                  <li>Freelance en 2015.</li>
                  <li>
                    <p>Agence web Ads-Com, Orléans, 2014.</p>
                    <p>Bootstrap, Drupal, Jahia, Grunt, Less.</p>
                  </li>
                </ul>
              </div>
            </article>
            <article className="toggle">
              <div
                className="toggle-top flex-parent"
                onClick={(event) => {
                  handleToggle(event.target);
                }}
              >
                <h3>Chargée de communication digitale</h3>
                <aside className="flex-parent">
                  <p>5 ans</p>
                  <i class="fa-solid fa-chevron-right"></i>
                </aside>
              </div>
              <div className="toggle-bottom">
                <ul>
                  <li>
                    <p>
                      Chambre d'agriculture du Loiret, Orléans, 2021 - 2023.
                    </p>
                    <p>
                      Cheffe de projet MOA pour la création du site marchand de
                      l'entreprise.
                    </p>
                  </li>
                  <li>
                    <p>Thélem assurances, Orléans, 2018 - 2020.</p>
                    <p>
                      Suivi de projet pout la refonte du site web & de l'espace
                      client de l'entreprise.
                    </p>
                  </li>
                </ul>
              </div>
            </article>
            <article className="toggle">
              <div
                className="toggle-top flex-parent"
                onClick={(event) => {
                  handleToggle(event.target);
                }}
              >
                <h3>Webdesigner</h3>
                <aside className="flex-parent">
                  <p>6 ans</p>
                  <i class="fa-solid fa-chevron-right"></i>
                </aside>
              </div>
              <div className="toggle-bottom">
                <ul>
                  <li>Media Mobile</li>
                  <li>Is&a Bloom</li>
                  <li>Sool Design</li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Resume;
