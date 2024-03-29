import styled from "styled-components";

export const Wrap = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 60px;
  height: min-content;
  max-width: 80%;
  @media (orientation: portrait) {
    display: flex;
    flex-direction: column;
  }
`;
export const TextContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  text-align: center;
  align-self: center;
  max-height: 80%;
  width: 81%;
  margin: 0 auto;
  @media screen and (orientation: portrait) {
    width: 100%;
    text-align: center;
    justify-self: center;
  }
`;

export const TextBlock = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 43px;
  padding-bottom: 20px;
`;
export const TitleSpan = styled.span`
  color: #40e0d0;
`;
export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
`;
export const ImageContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: flex-start;
  @media (orientation: portrait) {
    img {
      display: none;
    }
  }
  margin-left: -60px;
`;
export const Button = styled.button`
  font-size: 0.9rem;
  background-color: ${(props) =>
    props.background ? props.background : "#fff"};
  border: ${(props) => (props.border ? props.border : "solid #056e84 1px")};
  border-radius: 25px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.7);
  color: ${(props) => (props.color ? props.color : "#056e84")};
  cursor: pointer;
  font-weight: bold;
  height: auto;
  line-height: 2.5em;
  margin: 0;
  margin-top: 30px;
  min-height: 30px;
  min-width: 300px;

  padding: 0.55rem 2rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;
  transition: all 0.3s ease 0s;
  &&:hover {
    background-color: #2ee59d;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;
