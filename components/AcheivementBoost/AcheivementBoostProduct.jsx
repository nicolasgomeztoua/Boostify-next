import React, { useState, useEffect } from "react";
import {
  ExtrasTitle,
  ExtrasContainer,
  ExtrasOptions,
  ExtraIconButtonWrap,
  ExtraCheckBox,
  IconDuo,
  IconDescWrapper,
  IconStream,
  IconSpeed,
  IconOffline,
  CheckLabel,
  DiscountButton,
  Button,
  ExtraDesc,
} from "../ProductComponents/ProductElements";
import Link from "next/link";
import {
  extraBadgesObj,
  LegendsObj,
  PopularBadgesObj,
} from "../../utils/InfoObj";

import { useDispatchCart } from "../../hooks/Cart/CartHandler";
import TwentyBomb from "../../public/assets/images/20Bomb.png";
import styled from "styled-components";
import Image from "next/image";
import styles from "./Acheivementbadges.module.css";
import NewGrid from "./NewGrid";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { calcCompletion } from "../../utils/calcCompletion";

const BadgesTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  color: #111;
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 35.23px;
  font-weight: 700;
  padding: 0.5rem;
  margin: 3rem;
  text-align: center;
  text-transform: uppercase;
  border-bottom: solid 4px turquoise;
  border-radius: 100px;
  @media (orientation: portrait) {
    border-radius: 20px;
    width: 90%;
  }
`;
const BadgesContainer = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: 50px;
  justify-content: center;
  width: 80vw;
  border: 4px solid turquoise;
  border-radius: 50px;
  height: min-content;
  @media (orientation: portrait) {
    width: 90%;
  }
`;
const BadgesWrap = styled.div`
  display: grid;
  overflow: auto;
  @media screen and (orientation: portrait) {
    grid-template-rows: none;
  }
`;
const BadgesSectionTitle = styled.h3`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 50px auto;
  height: min-content;
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 31.99px;
  font-weight: 700;
  line-height: 48px;
  color: black;
  border-bottom: solid 4px turquoise;
  border-top: solid 4px turquoise;
  border-radius: 10px;
  text-align: center;
  text-transform: uppercase;
  width: 80vw;
`;
const BadgesSelectionContainers = styled.div`
  display: grid;
  width: 80vw;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  height: ${(props) => (props.height ? props.height : "500px")};
  overflow-y: auto;
  margin-bottom: 150px;
  @media (max-width: 1780px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 530px) {
    height: 520px;
  }
`;

const TextIconCheckBox = styled.div`
  display: flex;
  justify-content: center;
  justify-self: center;
  padding: 0.5rem;
  margin: 0.5rem;
  flex-direction: column;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#3f3f3f"};
  border-radius: 100%;
  height: 320px;
  width: 320px;

  @media (max-width: 530px) {
    padding: 0.1rem;
    width: 250px;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }
  @media (max-width: 400px) {
    width: 200px;
  }
`;
const BadgeDesc = styled.p`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 5px;

  font-family: "Open Sans Condensed", sans-serif;
  font-size: 22.62px;
  font-weight: 100;
  line-height: 28px;
  color: black;
`;
const InputTyped = styled.input.attrs({
  maxLength: "10",
})`
  display: block;
  margin: 10px auto;
  color: black;
  height: ${(props) => props.height};
  border: 4px solid turquoise;
  border-radius: 50px;
  padding-left: 30px;
  margin-top: 30px;
  width: ${(props) => props.width};
  background: repeating-linear-gradient(
      90deg,
      white 0,
      white 1ch,
      transparent 0,
      transparent 1ch
    )
    0 100% / 5ch 2px no-repeat;
  font-size: ${(props) => props.fontSize};
  letter-spacing: 0ch;

  &:focus {
    outline: none;
    color: grey;
  }
  @media (max-width: 376px) {
    width: 200px;
    font-size: 50px;
  }
`;
const TotalContainer = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 1fr;
  align-items: flex-start;
  height: auto;
  margin-bottom: 100px;
  @media (max-width: 420px) {
    height: auto;
  }
`;
const TotalTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #111;
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 45.23px;
  font-weight: 700;
  line-height: 48px;
  margin: 0 0 24px;
  height: 40px;

  text-align: center;
  text-transform: uppercase;
  @media (max-width: 420px) {
    font-size: 25.99px;
    height: 150px;
    margin-top: 50px;
    margin-bottom: 0;
  }
`;

const TotalMoneyCard = styled.div`
  display: grid;
  grid-template-rows: 1fr 0.2fr 0.2fr 0.2fr 0.1fr;
  box-sizing: border-box;
  color: rgb(44, 44, 44);

  justify-self: center;
  align-self: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  width: 360px;
  @media (max-width: 415px) {
    margin-top: 0px;
    width: 90vw;
  }
`;

const TotalMoneyHeader = styled.h1`
  background-color: rgb(236, 236, 236);
  border-bottom-color: rgb(221, 221, 221);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-top-color: rgb(221, 221, 221);
  border-top-style: solid;
  border-top-width: 1px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 11px 8px -10px inset,
    rgba(0, 0, 0, 0.05) 0px -11px 8px -10px inset;
  box-sizing: border-box;
  color: rgb(44, 44, 44);
  font-family: "Saira", "Helvetica Neue", Arial, sans-serif;
  font-size: 17.6px;
  font-weight: 300;
  line-height: 26.4px;

  overflow-wrap: break-word;
  padding-bottom: 20px;
  padding-top: 20px;
  text-align: center;
  @media (max-width: 415px) {
    width: 80vw;
  }
`;
const DiscountContainer = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  align-self: flex-start;
  text-align: center;
  color: rgba(0, 0, 0, 0.4);
  &:before {
    margin-right: 0.5em;
    content: "";
    flex: 1;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const TotalMoney = styled.div`
  align-items: flex-start;
  box-sizing: border-box;
  color: rgb(44, 44, 44);
  display: flex;
  flex-wrap: wrap;
  font-family: "Saira", "Helvetica Neue", Arial, sans-serif;
  font-size: 21.55px;
  font-weight: 300;
  justify-content: center;
  line-height: 26.4px;
  overflow-wrap: break-word;
  text-align: center;
`;
const Searchbar = styled.input.attrs({
  type: "text",
  placeholder: "search",
})`
  box-sizing: border-box;
  font-size: 2rem;
  padding: 1rem;
  display: block;
  margin: 2rem auto;
  width: 50vw;
  border-radius: 50px;
`;
const TotalBadgesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StepTwoWarningContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
  background-color: #f44336; /* Red */
  color: white;
  margin-bottom: 50px;
`;
const StepTwoWarning = styled.span`
  margin-left: auto;

  color: white;
  font-weight: bold;

  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: black;
  }
`;

const AcheivementBoostProduct = () => {
  const [checkedPopBadges, setPopBadges] = useState("");
  const [checkedExtraBadges, setExtraBadges] = useState("");
  const [checkedLegend, setLegend] = useState("");
  const [searchField, setSearchField] = useState("");
  const [searchFieldLegends, setSearchFieldLegends] = useState("");
  const [acheivementTotalMoney, setAcheivementTotalMoney] = useState(0);
  const [valid, setValid] = useState("flex");
  const [totalExtraBadges, setTotalExtraBadges] = useState(0);
  const [totalPopBadges, setTotalPopBadges] = useState(0);
  const [moneyMultiplierDuo, setMoneyMultiplierDuo] = useState(0);
  const [moneyMultiplierStream, setMoneyMultiplierStream] = useState(0);
  const [moneyMultiplierPriority, setMoneyMultipliePriority] = useState(0);
  const [activeDuo, setActiveDuo] = useState(false);
  const [activeStream, setActiveStream] = useState(false);
  const [activePriority, setPriority] = useState(false);
  const [activeOffline, setActiveOffline] = useState(false);
  const [filteredExtras, setFilteredExtras] = useState("");
  const [disabledButtonText, setDisabledButton] = useState("");
  const [disabledState, setDisabledState] = useState("");
  const [popCompletion, setPopCompletion] = useState("");
  const [extraCompletion, setExtraCompletion] = useState("");

  let ReversedObj = [...LegendsObj].reverse();
  const dispatch = useDispatchCart();
  const addToCart = (item) => {
    dispatch({ type: "ADD", item });
  };

  const handleChangePop = (e) => {
    setPopBadges(
      {
        ...checkedPopBadges,
        [e.target.name]: e.target.checked,
      },
      [checkedPopBadges]
    );
  };

  useEffect(() => {});
  const handleChangeExtra = (e) => {
    setExtraBadges(
      {
        ...checkedExtraBadges,
        [e.target.name]: e.target.checked,
      },
      [checkedExtraBadges]
    );
  };

  const handleChangeLegends = (e) => {
    setLegend({
      [e.target.name]: e.target.checked,
    });
  };

  let filteredPopBadges = Object.keys(checkedPopBadges).filter(function (x) {
    return checkedPopBadges[x] !== false;
  });

  let filteredExtraBadges = Object.keys(checkedExtraBadges).filter(function (
    x
  ) {
    return checkedExtraBadges[x] !== false;
  });
  useEffect(() => {
    setPopCompletion(0);
    let totalPop = 0;
    let totalTime = 0;
    for (let i = 0; i < PopularBadgesObj.length; i++) {
      if (checkedPopBadges[PopularBadgesObj[i].name] === true) {
        PopularBadgesObj[i].completionTime
          ? (totalTime = PopularBadgesObj[i].completionTime + totalTime)
          : (totalTime = 3 + totalTime);

        totalPop = PopularBadgesObj[i].price + totalPop;
        setTotalPopBadges(totalPop);
        setPopCompletion(totalTime);
      }
    }
  }, [checkedPopBadges, checkedExtraBadges]);

  useEffect(() => {
    setExtraCompletion(0);
    let totalExtra = 0;
    let totalTime = 0;
    for (let i = 0; i < extraBadgesObj.length; i++) {
      if (checkedExtraBadges[extraBadgesObj[i].name] === true) {
        extraBadgesObj[i].completionTime
          ? (totalTime = extraBadgesObj[i].completionTime + totalTime)
          : (totalTime = 3 + totalTime);

        totalExtra = extraBadgesObj[i].price + totalExtra;
        setTotalExtraBadges(totalExtra);
        setExtraCompletion(totalTime);
      }
    }
  }, [checkedExtraBadges, checkedPopBadges]);

  useEffect(() => {
    setAcheivementTotalMoney(totalExtraBadges + totalPopBadges);
  }, [totalExtraBadges, totalPopBadges]);

  useEffect(() => {
    if (Object.values(checkedLegend)[0] === false) {
      setValid("flex");
    }
    if (Object.values(checkedLegend)[0] === true) {
      setValid("none");
    }
  }, [checkedLegend]);

  useEffect(() => {
    if (Object.values(checkedPopBadges).includes(true) === false) {
      setTotalPopBadges(0);
    }
  }, [checkedPopBadges]);
  useEffect(() => {
    if (Object.values(checkedExtraBadges).includes(true) === false) {
      setTotalExtraBadges(0);
    }
  }, [checkedExtraBadges]);

  useEffect(() => {
    if (activeDuo) {
      setMoneyMultiplierDuo(acheivementTotalMoney * 0.75);
    }
    if (!activeDuo) {
      setMoneyMultiplierDuo(0);
    }
  }, [activeDuo, acheivementTotalMoney]);

  useEffect(() => {
    if (activePriority) {
      setMoneyMultipliePriority(acheivementTotalMoney * 0.5);
    }
    if (!activePriority) {
      setMoneyMultipliePriority(0);
    }
  }, [activePriority, acheivementTotalMoney]);

  useEffect(() => {
    if (activeStream) {
      setMoneyMultiplierStream(acheivementTotalMoney * 0.75);
    }
    if (!activeStream) {
      setMoneyMultiplierStream(0);
    }
  }, [activeStream, acheivementTotalMoney]);

  useEffect(() => {
    let extrasArr2 = {
      DuoQueue: activeDuo,
      Offline: activeOffline,
      Stream: activeStream,
      priority: activePriority,
    };
    setFilteredExtras(
      Object.fromEntries(
        Object.entries(extrasArr2).filter(([key, value]) => value === true)
      )
    );
  }, [activeDuo, activeOffline, activePriority, activeStream]);

  useEffect(() => {
    if (!Object.values(checkedLegend)[0] || checkedLegend.length < 1) {
      setDisabledButton("select a legend");
      setDisabledState(true);
    } else {
      setDisabledButton("Add to cart");
      setDisabledState(false);
    }
  }, [checkedLegend]);
  return (
    <>
      <div className="w-100 flex justify-center">
        <BadgesTitle>Select Your Badges</BadgesTitle>
      </div>
      <input type="checkbox" id="scales" name="scales"></input>
      <BadgesContainer>
        <BadgesWrap>
          <BadgesSectionTitle>Popular choices</BadgesSectionTitle>
          <NewGrid
            array={PopularBadgesObj}
            checkedBadges={checkedPopBadges}
            handleChange={handleChangePop}
          />
          <BadgesSectionTitle>More Badges</BadgesSectionTitle>
          <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 s">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  onChange={(e) => setSearchField(e.target.value.toLowerCase())}
                  id="search"
                  name="search"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>

          <NewGrid
            array={extraBadgesObj.filter((items) => {
              return items.name
                .toLowerCase()
                .includes(searchField.toLowerCase());
            })}
            checkedBadges={checkedExtraBadges}
            handleChange={handleChangeExtra}
          />

          <BadgesSectionTitle>Legends</BadgesSectionTitle>

          <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 s">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  onChange={(e) =>
                    setSearchFieldLegends(e.target.value.toLowerCase())
                  }
                  id="search"
                  name="search"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>

          <NewGrid
            array={ReversedObj.filter((items) => {
              return items.name
                .toLowerCase()
                .includes(searchFieldLegends.toLowerCase());
            })}
            checkedBadges={checkedLegend}
            handleChange={handleChangeLegends}
          />
        </BadgesWrap>
      </BadgesContainer>
      <ExtrasContainer style={{ gridTemplateRows: "1fr" }}>
        <ExtrasTitle style={{ maxWidth: "100%" }}>
          Choose additional services
        </ExtrasTitle>
        <ExtrasOptions>
          <ExtraIconButtonWrap>
            <IconDescWrapper>
              <IconOffline></IconOffline>
              <ExtraCheckBox onClick={() => setActiveOffline(!activeOffline)} />
              <ExtraDesc className={styles["ExtraDesc"]}>
                Appear offline
              </ExtraDesc>
              <ExtraDesc className={styles["ExtraDesc"]}> FREE</ExtraDesc>
            </IconDescWrapper>
          </ExtraIconButtonWrap>
          <ExtraIconButtonWrap>
            <IconDescWrapper>
              <IconDuo></IconDuo>
              <ExtraCheckBox onClick={() => setActiveDuo(!activeDuo)} />
              <ExtraDesc className={styles["ExtraDesc"]}>Duo-Queue </ExtraDesc>
              <ExtraDesc className={styles["ExtraDesc"]}> +75%</ExtraDesc>
            </IconDescWrapper>
          </ExtraIconButtonWrap>
          <ExtraIconButtonWrap>
            <IconDescWrapper>
              <IconStream />
              <ExtraCheckBox onClick={() => setActiveStream(!activeStream)} />
              <ExtraDesc className={styles["ExtraDesc"]}>On Stream</ExtraDesc>
              <ExtraDesc className={styles["ExtraDesc"]}> +75% </ExtraDesc>
            </IconDescWrapper>
          </ExtraIconButtonWrap>
          <ExtraIconButtonWrap>
            <IconDescWrapper>
              <IconSpeed></IconSpeed>
              <ExtraCheckBox onClick={() => setPriority(!activePriority)} />
              <ExtraDesc className={styles["ExtraDesc"]}>
                Boost-Priority
              </ExtraDesc>
              <ExtraDesc className={styles["ExtraDesc"]}> +25%</ExtraDesc>
            </IconDescWrapper>
          </ExtraIconButtonWrap>
        </ExtrasOptions>
      </ExtrasContainer>
      <StepTwoWarningContainer style={{ display: valid }}>
        Please Select a legend
        <StepTwoWarning>
          <i
            className={styles["fa fa-times"]}
            onClick={() => setValid("none")}
          ></i>
        </StepTwoWarning>
      </StepTwoWarningContainer>
      <TotalContainer>
        <TotalTitle>Check your total</TotalTitle>
        <TotalMoneyCard>
          <TotalMoneyHeader>
            Selected Badges:<br></br>
            <span>
              <TotalBadgesContainer>
                {filteredPopBadges.map((Items, index) => {
                  return <p key={Items.name + index.toString()}>{Items}</p>;
                })}
              </TotalBadgesContainer>
            </span>
            <span>
              <TotalBadgesContainer>
                {filteredExtraBadges.map((Items, index) => {
                  return <p key={Items.name + index.toString()}>{Items}</p>;
                })}
              </TotalBadgesContainer>
            </span>
            Selected Legend: <br></br>
            <span>{Object.keys(checkedLegend)}</span>
            <br />
            Completion time: <br></br>
            <span>{popCompletion + extraCompletion} Hours</span>
          </TotalMoneyHeader>
          <DiscountContainer>PromoCode</DiscountContainer>
          <InputTyped
            style={{ marginTop: "0px" }}
            fontSize="20px"
            height="50px"
            width="250px"
          ></InputTyped>
          <div className={styles["button_cont"]}>
            <DiscountButton
              className={styles["example_c"]}
              style={{ opacity: "0.4" }}
              disabled={true}
            >
              Not Applicable to Acheivement Boost
            </DiscountButton>
          </div>
          <DiscountContainer>Total</DiscountContainer>
          <TotalMoney>
            {(
              acheivementTotalMoney +
              moneyMultiplierDuo +
              moneyMultiplierStream +
              moneyMultiplierPriority
            ).toFixed(2)}
            {"$"}
          </TotalMoney>

          <div className={styles["button_cont"]}>
            <Link
              href={`/Cart${
                typeof window !== "undefined" ? window?.location.search : null
              }`}
              passHref
            >
              <Button
                onClick={() => {
                  addToCart({
                    title: "Acheivement Boost",
                    price: (
                      acheivementTotalMoney +
                      moneyMultiplierDuo +
                      moneyMultiplierStream +
                      moneyMultiplierPriority
                    ).toFixed(2),
                    selectedPopBadges: filteredPopBadges,
                    selectedExtraBadges: filteredExtraBadges,
                    selectedLegend: Object.keys(checkedLegend),
                    icon: TwentyBomb.src,
                    badgesExtras: Object.keys(filteredExtras),
                  });
                }}
                className={styles["example_d"]}
                disabled={disabledState}
              >
                {disabledButtonText}
              </Button>
            </Link>
          </div>
        </TotalMoneyCard>
      </TotalContainer>
    </>
  );
};

export default AcheivementBoostProduct;
