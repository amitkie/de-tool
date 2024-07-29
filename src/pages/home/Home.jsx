import React, { useEffect } from "react";
import Cards from "../../components/Cards/Cards";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { getUserActivity } from "../../service/userService";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoRequest } from "../../features/user/userSlice";
import { setAlert } from "../../features/alert/alertSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, userInfo } = useSelector((state) => state.user);
  const userId = token;

  useEffect(() => {
    if (userId) {
      dispatch(getUserInfoRequest(userId));
    }
  }, [userId, dispatch]);

  const handleCardClick = async (tabName, link) => {
    try {
      if (userInfo?.paymentInfo?.payment_status === 'Completed') {
        navigate(link);
        return;
      }

      const userActivity = await getUserActivity(userId, tabName);

      if (userActivity.status === 'error' && userActivity.errorCode === 'LIMIT_REACHED') {
        dispatch(setAlert({type: "error", message: "You have reached the limit for this activity. Please make the payment"}))
        return;
      }

      navigate(link);
    } catch (error) {
      console.error(`Error fetching activity for ${tabName}:`, error);
      dispatch(setAlert({type: "success", message: "You have reached the limit for this activity. Please make the payment."}))
      navigate('/select-subscription');
    }
  };

  const handleCardClickForScrapper = async(tabName,link) => {
    navigate(link)
  }

  const handleAutomateClick = (tab) => {
    navigate('/automate-flow');
  };

  const cardsData = [
    {
      title: "Page Speed Insights",
      tab_name: 'page_speed_insights',
      description: `Page Speed Insights cards, designed to provide actionable tips and metrics for optimizing web page loading times.`,
      imgSrc: "../../images/page_speed_insight.png",
      link: "/page-speed-insights",
    },
    {
      title: "Facebook Insights",
      tab_name: 'facebook_insight',
      description: `The Facebook Insights is a powerful tool designed to extract and gather data from Facebook dashboard.`,
      imgSrc: "../../images/fb.jpg",
      link: "/facebook-insights",
    },
    {
      title: "Google Analytics",
      tab_name: 'google_analytics',
      description: `Tool that provides comprehensive insights into website and app performance.`,
      imgSrc: "../../images/google_analytics.webp",
      link: "/google-insights",
    },
    {
      title: "Google Ads",
      tab_name: 'google_ads',
      description: `Enables businesses of all sizes to reach their target audiences through targeted, pay-per-click (PPC) advertising.`,
      imgSrc: "../../images/google_ads.jpeg",
      link: "/google-ads",
    },
    {
      title: "DV360",
      tab_name: 'dv360',
      description: `Managing and optimizing digital advertising campaigns across display, video, and other media channels.`,
      imgSrc: "../../images/dv360.png",
      link: "/dv-360",
    },
  ];

  const socialMediaCardsData = [
    {
      title: "Instagram Scraper",
      tab_name: 'instagram_scraper',
      description: `Scrape and download Instagram posts, profiles, places, hashtags, photos, and comments. Get data from Instagram using one or more Instagram URLs or search queries. Export scraped data, run the scraper via API, schedule and monitor runs or integrate with other tools.`,
      imgSrc: "../../images/insta.png",
      link: "/scrapers/instagram-scraper",
    },
    {
      title: "Facebook Scraper",
      tab_name: 'facebook_scraper',
      description: `Facebook scraping tool to crawl and extract basic data from one or multiple Facebook Pages. Extract Facebook page name, page URL address, category, likes, check-ins, and other public data. Download data in JSON, CSV, Excel and use it in apps, spreadsheets, and reports.`,
      imgSrc: "../../images/fb.jpg",
      link: "/scrapers/facebook-scraper",
    },
    {
      title: "Twitter Scraper",
      tab_name: 'twitter_scraper',
      description: `⚡️ Lightning-fast search, URL, list, and profile scraping, with customizable filters. At $0.30 per 1000 tweets, and 30-80 tweets per second, it is ideal for researchers, entrepreneurs, and businesses! Get comprehensive insights from Twitter (X) now!`,
      imgSrc: "../../images/twitter.jpg",
      link: "/scrapers/twitter-scraper",
    },
  ];

  return (
    <>
      <main className="main flow">
        <div className="main__cards cards">
          <h3 className="text_heading">API Data Fetchers</h3>
          <div className="cards__inner">
            {cardsData.map((card, index) => (
              <Cards
                key={index}
                title={card.title}
                tabName={card.tab_name}
                description={card.description}
                imgSrc={card.imgSrc}
                link={card.link}
                onClick={handleCardClick}
                onAutomateClick={handleAutomateClick}
                paymentStatus={userInfo?.paymentInfo?.payment_status}
              />
            ))}
          </div>
          <div>
            <h3 className="text_heading">Social Media Web-Scraper Engines</h3>
            <p className="text_padding">
              All essential social media scraping tools in one place. Extract
              reviews, comments, and a lot more to track sentiment and
              engagement.
            </p>
            <div className="cards__inner">
              {socialMediaCardsData.map((card, index) => (
                <Cards
                  key={index}
                  title={card.title}
                  tabName={card.tab_name}
                  description={card.description}
                  imgSrc={card.imgSrc}
                  link={card.link}
                  onClick={handleCardClickForScrapper}
                  // onAutomateClick={handleAutomateClick}
                  // paymentStatus={userInfo?.paymentInfo?.payment_status}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
