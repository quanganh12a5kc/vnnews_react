import React, { useRef, useEffect } from "react";

const ModalPostDetail = ({
  id,
  isOpen,
  onClose,
  isLoadData,
  title,
  content,
  tags,
}) => {
  const modalContentRef = useRef(null);
  const buttonRef = useRef(null);
  const handleScroll = () => {
    const modalContent = modalContentRef.current;
    const button = buttonRef.current;

    if (modalContent && button) {
      const buttonPositionInModal = button.getBoundingClientRect().top;
      if (buttonPositionInModal <= modalContent.clientHeight) {
        handleScrollToButton();
      }
    }
  };

  const handleScrollToButton = () => {
    let read_news_ids = JSON.parse(localStorage.getItem("read_news_ids")) || [];
    if (!read_news_ids.includes(id)) {
      read_news_ids.push(id);
      localStorage.setItem("read_news_ids", JSON.stringify(read_news_ids));
      if (isLoadData) {
        isLoadData();
      }
    }
  };

  useEffect(() => {
    const modalContent = modalContentRef.current;
    if (modalContent) {
      modalContent.addEventListener("scroll", handleScroll);

      return () => {
        modalContent.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className={`custom-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content" ref={modalContentRef}>
        <div className="modal-body">
          <div className="">
            <b>
              <h4>{title}</h4>
              <span className="close" onClick={onClose}>
                <h1>&times;</h1>
              </span>
            </b>
          </div>
          <div className="" dangerouslySetInnerHTML={{ __html: content }}></div>
          <div className="tags">
            {tags.map((item, key) => (
              <div key={key} className="tag">
                {item}
              </div>
            ))}
          </div>
          <div className="button" ref={buttonRef}>
            <a>
              <svg
                className="like"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
              </svg>
            </a>
            <a>
              <svg
                className="dislike"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPostDetail;
