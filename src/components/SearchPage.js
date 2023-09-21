import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost, getSourceNames, search } from "../service/postService";
import { Header } from "./Header";
import ModalPostDetail from "./ModalPostDetail";
export const SearchPage = () => {
  const [readingNews, setReadingNews] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sourceNames, setSourceNames] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const { i } = useParams();

  //open, close modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (sourceNames === false) {
      getSourceNames()
        .then((data) => {
          setSourceNames(data.source_names);
        })
        .catch((error) => {
          console.error("getSourceNames() failed:", error);
        });
    }
  }, []);

  useEffect(() => {
    search(i, "*")
      .then((data) => {
        setSearchResults(data.search_news);
      })
      .catch((error) => {
        console.error("search() failed:", error);
      });
  }, [i]);

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
              <h2>Tìm kiếm '{i}'</h2>
              {searchResults.map((item, key) => (
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
          />
        )}
      </div>
    </div>
  );
};
