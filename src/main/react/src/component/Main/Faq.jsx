import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import FaqApi from "../../api/FaqApi";

const FAQComp = styled.section`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 60px 0;
    padding-bottom: 130px;
    .faqHeader {
      margin-bottom: 80px;
      h3 {
        font-size: 1.6rem;
      }
    }
    .faqMap {
      width: 90%;
      margin: 0 auto;
      font-size: 1.4rem;

      li {
        position: relative;
        border-radius: 5px;
        background-color: rgba(42, 33, 71, 0.9);
        padding: 18px;
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 10px;

        .faqBox {
          display: flex;

          .title {
            color: white;
            padding-left: 10px;
          }
        }
        .toggle {
          transition: 0.4s ease-in;
          overflow: hidden;
          height: 0;
          padding: 0;

          line-height: 1.6;
          font-size: 0.8em;
          &.active {
            overflow: visible;
            height: auto;
            padding-top: 20px;
          }
          p {
            margin: 0 auto;
            width: 100%;
            color: var(--GREY);
            padding: 10px;
            font-weight: 400;
            white-space: pre-wrap;
          }
        }

        svg {
          color: var(--GREY);
          position: absolute;
          top: 3px;
          right: 0;
          padding: 18px;
          cursor: pointer;
        }
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .container {
      .faqHeader {
        margin-bottom: 40px;
      }
      .faqMap {
        width: 95%;
        li {
          font-size: 0.9rem;

          .faqBox {
            .title {
              color: white;
              padding-left: 0px;
            }
          }
        }
      }
    }
  }
`;
const Faq = ({ faqPlus }) => {
  const [icon, setIcon] = useState(faAngleDown);
  const [active, setActive] = useState("");

  const onClick = () => {
    icon === faAngleDown ? setIcon(faAngleUp) : setIcon(faAngleDown);
    active === "" ? setActive("active") : setActive("");
  };

  return (
    <>
      <li>
        <div className="faqBox">
          <div className="title">{faqPlus.faqQuestion}</div>
        </div>

        <div className={`toggle ${active}`}>
          <p>{faqPlus.faqAnswer}</p>
        </div>
        <FontAwesomeIcon onClick={onClick} icon={icon} />
      </li>
    </>
  );
};

const FAQList = () => {
  const [faqData, setFaqData] = useState([]);

  // faq 리스트 불러오기
  const fetchFaqList = async () => {
    try {
      const res = await FaqApi.getMainFaq();
      if (res.data !== null) {
        setFaqData(res.data);
        console.log("Faq리스트 가져옴");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchFaqList();
  }, []);

  return (
    <>
      <FAQComp>
        <div className="container">
          <div className="faqHeader">
            <h3>자주 묻는 질문</h3>
          </div>
          <ul className="faqMap">
            {faqData &&
              faqData.map((faq) => (
                <Faq key={faq.faqQuestion} faqPlus={faq} isNotice={false} />
              ))}
          </ul>
        </div>
      </FAQComp>
    </>
  );
};

export default FAQList;
