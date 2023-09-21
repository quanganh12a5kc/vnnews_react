import { useEffect, useState } from "react";
import { getData, getPost, getSourceNames } from "../service/postService";
import { Header } from "./Header";
import ModalPostDetail from "./ModalPostDetail";
export const Homepage = () => {
  const [data, setData] = useState({
    latest_news: [],
    hot_news: [],
    read_news: [],
  });
  const [readingNews, setReadingNews] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sourceNames, setSourceNames] = useState(false);
  const [page, setPage] = useState(1);

  //open, close modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //load latest_news, read_news, hot_news
  const loadData = (page) => {
    getData(page)
      .then((data) => {
        setData({
          latest_news: data.latest_news,
          hot_news: data.hot_news,
          read_news: data.read_news,
        });
        localStorage.setItem("total_pages", data.total_pages);
      })
      .catch((error) => {
        console.error("loadData() failed:", error);
      });
  };

  useEffect(() => {
    if (sourceNames === false) {
      getSourceNames()
        .then((data) => {
          setSourceNames(data.source_names);
        })
        .catch((error) => {
          console.error("loadData() failed:", error);
        });
    }
    loadData(page);
  }, []);

  useEffect(() => {
    if (page == 0) {
      setPage(localStorage.getItem("total_pages"));
    }
    if (page > localStorage.getItem("total_pages")) {
      setPage(1);
    }
    loadData(page);
  }, [page]);

  const getDetail = (id) => {
    getPost(id)
      .then((data) => {
        setReadingNews(data.news);
        openModal();
      })
      .catch((error) => {
        console.error("getDetail failed:", error);
      });
  };
  return (
    <div>
      <Header sourceNames={sourceNames} getDetail={getDetail}></Header>
      <div>
        <div className="content">
          <div className="left">
            <div className="latest-news">
              <h2>Tin mới nhất</h2>
              <div className="back-page">
                <div id="back-page" onClick={() => setPage(page - 1)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 256 512"
                  >
                    <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
                  </svg>
                </div>
              </div>
              <div className="fr">
                {data.latest_news.map((item, key) => (
                  <div key={key} className="frame">
                    <div className="source">
                      <p>
                        <a href={item["link"]}>{sourceNames[item["source"]]}</a>
                      </p>
                    </div>
                    <div className="title">
                      <a onClick={() => getDetail(item["id"])}>
                        {item["title"]}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="next-page">
                <div id="next-page" onClick={() => setPage(page + 1)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 256 512"
                  >
                    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="hot-news">
              {data.hot_news.map((item, key) => (
                <div key={key} className="frame">
                  <div className="source">
                    <p>
                      <a href={item["link"]}>{sourceNames[item["source"]]}</a>
                    </p>
                  </div>
                  <div className="title">
                    <a onClick={() => getDetail(item["id"])}>{item["title"]}</a>
                  </div>
                </div>
              ))}
            </div>
            <div className="read-news"></div>
          </div>
        </div>
        {isModalOpen && (
          <ModalPostDetail
            id={readingNews["id"]}
            isOpen={isModalOpen}
            onClose={closeModal}
            content={readingNews["content"]}
            title={readingNews["title"]}
            tags={readingNews["tag_names"]}
            isLoadData={loadData}
          />
        )}
      </div>
    </div>
  );
};
