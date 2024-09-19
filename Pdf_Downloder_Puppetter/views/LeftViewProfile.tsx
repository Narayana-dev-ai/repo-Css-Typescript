import "./ViewProfiles.css";

export const LeftViewProfile = () => {
  return (
    <div className="left__grid">
      <div className="grid__img">
        <img src="Passport_Photograph.jpg" alt="Image" />
      </div>
      <div className="grid__contact">
        <span>
          <> &#128383; </> +91 7671837344
        </span>
        <span>
          <>&#128233; </> narayanareddylakkireddy123@gmail.com
        </span>
      </div>
      <div className="grid__summary">
        <hr />
        <h4>SUMMARY</h4>
        <p>
          Experienced in product design and development with 3+ years in Java,
          AWS and J2EE, Proficiency in OOP's design patterns, system design(HDL
          and LDL), data structures, algorithms, and microservices. sKilled in
          leading teams and delivering scalable efficient solutions.
        </p>
      </div>
      <div className="grid__skill">
        <hr />
        <h4>SKILLS</h4>
        <ul>
          <li>
            <p>Java8, Spring, Spring Boot, AWS, Hibernate, RabbitMQ, CI/CD</p>
          </li>
          <li>
            <p>
              HTML, JQuery, JavaScript, XML, JSP, Servlet, RESTful Web Service
            </p>
          </li>
          <li>
            <p>IDE's: IntelliJ, Eclipse</p>
          </li>
          <li>
            <p>
              Tools: SQL Developer, Git, JIRA, Version One, Maven, Log4J, SVN,
              Git, Junit, Cucumber, Jerkins
            </p>
          </li>
          <li>
            <p>Server: Apache Tomcat, Jetty</p>
          </li>
          <li>
            <p>OS: Windows, Linux</p>
          </li>
          <li>
            <p>Database: Oracle, 10g, 11g, MySQL, Dynamo DB</p>
          </li>
          <li>
            <p>JSP, JDBC, REST Web Services</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
