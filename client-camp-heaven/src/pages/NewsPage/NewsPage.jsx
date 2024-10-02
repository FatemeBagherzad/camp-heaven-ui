import './NewsPage.scss';

import TopNav from '../../components/TopNav/TopNav';
import LeftNav from '../../components/LeftNav/LeftNav';
import { useNavigate } from 'react-router-dom';
import newsImg11 from '../../assets/newsImg/Newsletter11.jpg';
import newsImg12 from '../../assets/newsImg/Newsletter12.jpg';
import newsImg13 from '../../assets/newsImg/Newsletter13.jpg';
import newsImg14 from '../../assets/newsImg/Newsletter14.jpg';
import newsImg15 from '../../assets/newsImg/Newsletter15.jpg';
import newsImg16 from '../../assets/newsImg/Newsletter16.jpg';
import newsImg17 from '../../assets/newsImg/Newsletter17.jpg';
import newsImg18 from '../../assets/newsImg/Newsletter18.jpg';
import newsImg19 from '../../assets/newsImg/Newsletter19.jpg';
import newsImg20 from '../../assets/newsImg/Newsletter20.jpg';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;
const gearsUrl = `${BASE_URL}:${PORT}/api/v1/gears`;

const GearPage = () => {
  const navigate = useNavigate();

  const loggedInUserId = sessionStorage.userId;

  const token = sessionStorage.getItem('JWTtoken');
  if (!token || !loggedInUserId) {
    navigate('/notLogedIn');
  }

  return (
    <div className="background">
      <div className="body">
        <section class="NewsMain">
          <div class="Newsfigures">
            <figure class="Newsfigure">
              <img src={newsImg11} alt="Nature image" class="NatImg" />
              <div class="NewsfigureTxt">
                <h2>
                  BCC Provides Recommendations on Policy Issues on Climate
                  Policy for the Alberta Government
                </h2>
                <span>May 18, 2021</span>
                <p>BCC makes recommendations on Alberta Climate Policy</p>
                <a href="UploadsPDF/For News.pdf" target="_blank">
                  Read more
                </a>
              </div>
            </figure>
            <figure class="Newsfigure">
              <img src={newsImg12} alt="Nature image" class="NatImg" />
              <div class="NewsfigureTxt">
                <h2>
                  BCC Participates in the Federal Governments Rule Making
                  Process for Canada’s Offset Marketplace
                </h2>
                <span>May 17, 2021</span>
                <p>BCC makes recommendations on Federal Offset Policy</p>
                <a href="UploadsPDF/For News.pdf" target="_blank">
                  Read more
                </a>
              </div>
            </figure>
            <figure class="Newsfigure">
              <img src={newsImg13} alt="Nature image" class="NatImg" />
              <div class="NewsfigureTxt">
                <h2>May 2021 Newsletter</h2>
                <span>May 1, 2021</span>
                <p>
                  Federal Government Offset Marketplace Biological Carbon Canada
                  (BCC) provides agriculture commentary on draft regulations
                  under the Greenhouse Gas...
                </p>
                <a href="UploadsPDF/For News.pdf" target="_blank">
                  Read more
                </a>
              </div>
            </figure>
            <figure class="Newsfigure">
              <img src={newsImg14} alt="Nature image" class="NatImg" />
              <div class="NewsfigureTxt">
                <h2>March 2021 Newsletter</h2>
                <span>Mar 6, 2021</span>
                <p>
                  Alberta Climate Policy In early March, Biological Carbon
                  Canada (BCC) was part of an announcement by the Province of
                  Alberta. The Province is...
                </p>
                <a href="UploadsPDF/For News.pdf" target="_blank">
                  Read more
                </a>
              </div>
            </figure>
            <figure class="Newsfigure">
              <img src={newsImg15} alt="Nature image" class="NatImg" />
              <div class="NewsfigureTxt">
                <h2>The Canadian Farm Business and Greenhouse Gas Emissions</h2>
                <span>Feb 24, 2021</span>
                <p>
                  Presentation given at the Canadian Federation of Agriculture
                  AGM
                </p>
                <a href="UploadsPDF/For News.pdf" target="_blank">
                  Read more
                </a>
              </div>
            </figure>
            <figure class="Newsfigure">
              <img src={newsImg16} alt="Nature image" class="NatImg" />
              <div class="NewsfigureTxt">
                <h2>
                  Update on the Federal Greenhouse Gas (GHG) Offset System
                </h2>
                <span>Feb 17, 2021</span>
                <p>
                  Departments of Ag & Environment support new and existing
                  Natural Climate Solution.
                </p>
                <a href="UploadsPDF/For News.pdf" target="_blank">
                  Read more
                </a>
              </div>
            </figure>
            <figure class="Newsfigure">
              <img src={newsImg17} alt="Nature image" class="NatImg" />
              <div class="NewsfigureTxt">
                <h2>
                  Joint Advice to Federal Departments for spending of New and
                  Existing Program money on Natural Climate Solutions
                </h2>
                <span>Jan 19, 2021</span>
                <p>
                  Departments of Ag & Environment support new and existing
                  Natural Climate Solution.
                </p>
                <a href="UploadsPDF/For News.pdf" target="_blank">
                  Read more
                </a>
              </div>
            </figure>
            <figure class="Newsfigure">
              <img src={newsImg18} alt="Nature image" class="NatImg" />
              <div class="NewsfigureTxt">
                <h2>January 2021 Newsletter</h2>
                <span>Jan 1, 2021</span>
                <p>
                  Welcome to 2021! 2020 was, to put it lightly, a doozy of a
                  year! In March our lives and the way we did business changed
                  in the blink of an eye....
                </p>
                <a href="UploadsPDF/For News.pdf" target="_blank">
                  Read more
                </a>
              </div>
            </figure>
            <figure class="Newsfigure">
              <img src={newsImg19} alt="Nature image" class="NatImg" />
              <div class="NewsfigureTxt">
                <h2>Emissions in Canadian Agriculture</h2>
                <span>Sep 27, 2020</span>
                <p>
                  The Intergovernmental Panel on Climate Change (IPCC) is the
                  United Nations body for assessing the science related to
                  climate change.
                </p>
                <a href="UploadsPDF/For News.pdf" target="_blank">
                  Read more
                </a>
              </div>
            </figure>
            <figure class="Newsfigure">
              <img src={newsImg20} alt="Nature image" class="NatImg" />
              <div class="NewsfigureTxt">
                <h2>Carbon Offsets Markets in Canada</h2>
                <span>Sep 21, 2020</span>
                <p>
                  Why use carbon markets? Carbon markets aim to do several
                  things. They aim to reduce greenhouse gas (GHG, or “carbon”)
                  emissions cost-effectively by…
                </p>
                <a href="UploadsPDF/For News.pdf" target="_blank">
                  Read more
                </a>
              </div>
            </figure>
          </div>

          <div class="NewsSideBar">
            <aside>
              <h2>Archive</h2>
              <ul>
                <li>
                  <a
                    href="UploadsPDF/For News.pdf"
                    target="_blank"
                    class="AllLinks"
                  >
                    September 2022
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    May 2022
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    March 2022
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    December 2021
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    October 2021
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    September 2021
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    July 2021
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    June 2021
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    May 2021
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    March 2021
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    February 2021
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    January 2021
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    September 2020
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    July 2020
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    December 2019
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    December 2018
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    April 2018
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    January 2018
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="UploadsPDF/For News.pdf"
                    class="AllLinks"
                  >
                    December 2017
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
};
export default GearPage;
