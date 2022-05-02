import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faList,
  faClipboardQuestion,
} from "@fortawesome/free-solid-svg-icons";

import {
  faGithub,
  faTwitter,
  faFontAwesome,
} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";
import "./headerComponent.css";

const HeaderComponent = (props) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon className="fa" icon={faHouse} />
            </Link>
          </li>
          <li>
            <Link to="/questions">
              <FontAwesomeIcon
                className="fa"
                icon={faList}
                id="questions-link"
              />
            </Link>
          </li>
          <li>
            <FontAwesomeIcon
              onClick={props.toggleIsModalActive}
              icon={faClipboardQuestion}
              className="fa"
              id="info-modal"
            />
          </li>
        </ul>

        {/*<Link to="/daily">Daily</Link>*/}
      </nav>

      <h1>Codele</h1>

      <div className="social-media-links">
        <a href="https://github.com/ercheung3" target="_blank">
          <FontAwesomeIcon className="fa" icon={faGithub} />
        </a>
        <a href="#">
          <FontAwesomeIcon className="fa" icon={faTwitter} />
        </a>
        <a href="#">
          <FontAwesomeIcon className="fa" icon={faFontAwesome} />
        </a>
      </div>
    </header>
  );
};

export default HeaderComponent;
