import React, { useState, useEffect } from "react";
import { useCart, useDispatchCart } from "../../hooks/Cart/CartHandler";

import { CircleWithCross } from "@styled-icons/entypo/CircleWithCross";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";
import { Stripe } from "@styled-icons/fa-brands/Stripe";
import { ApplePay } from "@styled-icons/fa-brands/ApplePay";
import Select from "react-select";
import { GooglePay } from "@styled-icons/fa-brands/GooglePay";
import { CreditCardAlt } from "@styled-icons/boxicons-solid/CreditCardAlt";
import { Playstation } from "@styled-icons/fa-brands/Playstation";
import { Desktop } from "@styled-icons/fa-solid/Desktop";
import { Xbox } from "@styled-icons/fa-brands/Xbox";
import PostOrder from "../PostOrder/PostOrder";
import TagManager from "react-gtm-module";
import styled from "styled-components";
import Head from "next/head";
import PaypalCheckout from "./PaypalCheckout";
import findGetParameter from "../../utils/getParameter";
import Script from "next/Script";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Cart.module.css";
const stripePromise = loadStripe(
  "pk_live_51IXQz3BkRphF41hCtaUrdCUc0go2z7L5xnLyR8c0ygNfJtrZAODJ54e8MHGtBYmxU9PLo3b6cUmZnhIkTIggSek700L5X7dWou"
);
const StepTwoWarningContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
  background-color: #f44336; /* Red */
  color: white;
  max-width: 88vw;
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


const Cart = () => {
  const [titles, setTitles] = useState([""]);
  const [prices, setPrices] = useState([0]);
  const [selectedPopBadges, setSelectedPopBadges] = useState([""]);
  const [selectedExtraBadges, setSelectedExtraBadges] = useState([""]);
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const [selectedLegend, setSelectedLegend] = useState("");
  const [PSNemail, setPSN] = useState(null);
  const [PSNPass, setPSNPass] = useState(null);
  const [region, setRegion] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [xboxColor, setXboxcolor] = useState("white");
  const [psColor, setPScolor] = useState("white");
  const [pcColor, setPcColor] = useState("white");
  const [dateCreated, setDatecreated] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState("flex");
  const [extrasArr, setExtrasArr] = useState([]);
  const [badgesExtras, setBadgesExtras] = useState([]);
  const [rankedImage, setRankedImage] = useState([]);
  const [userId, setUserId] = useState(null);
  const [checkout, setCheckout] = useState(false);
  const [kills, setKills] = useState([]);
  const [placementMatches, setPlacementMatches] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const items = useCart();
  const dispatch = useDispatchCart();

  const totalPrice = items?.reduce(
    (total, b) => Number(total) + Number(b.price),
    0
  );

  useEffect(() => {
    window?.scrollTo(0, 0);
    const tagManagerArgs = {
      dataLayer: {
        ItemsCart: items,
        totalPrice: totalPrice,
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  }, [items, totalPrice]);
  useEffect(() => {
    setTitles(
      items?.map((element) => {
        return element.title;
      })
    );
    setPrices(
      items?.map((element) => {
        return element.price;
      })
    );
    setSelectedPopBadges(
      items?.flatMap((element) => {
        return element.selectedPopBadges;
      })
    );
    setSelectedExtraBadges(
      items?.flatMap((element) => {
        return element.selectedExtraBadges;
      })
    );
    setFirstValue(
      items?.flatMap((element) => {
        return element.firstValue;
      })
    );
    setSecondValue(
      items?.flatMap((element) => {
        return element.secondValue;
      })
    );
    setSelectedLegend(
      items?.flatMap((element) => {
        return element.selectedLegend;
      })
    );
    setDatecreated(new Date().toString());
    setExtrasArr(
      items?.flatMap((element) => {
        return element.extrasArr;
      })
    );
    setBadgesExtras(
      items?.flatMap((element) => {
        return element.badgesExtras;
      })
    );
    setRankedImage(
      items?.flatMap((element) => {
        return element.icon;
      })
    );
    setKills(
      items?.flatMap((element) => {
        return element.kills;
      })
    );
    setPlacementMatches(
      items?.flatMap((element) => {
        return element.placementMatches;
      })
    );
  }, [items]);
  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };
  items?.forEach((element, index) => {
    if (element.price === 0) {
      handleRemove(index);
    }
  });
  const payload = {
    titles,
    prices,
    selectedLegend,
    selectedPopBadges,
    selectedExtraBadges,
    firstValue,
    secondValue,
    PSNemail,
    PSNPass,
    region,
    dateCreated,
    extrasArr,
    items,
    totalPrice,
    platform,
    badgesExtras,
    rankedImage,
    userId,
    kills,
    placementMatches,
  };

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          "https://secret-cove-64633.herokuapp.com/api/private",
          config
        );
        setUserId(data.user_id);
      } catch (error) {
        setUserId(undefined);
      }
    };

    fetchPrivateDate();
  }, []);

  const potentialOrder = async (e) => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin":
          "https://secret-cove-64633.herokuapp.com/api/auth/createorder",
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        "https://secret-cove-64633.herokuapp.com/api/auth/createorder",
        payload,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (event) => {
    const stripe = await stripePromise;
    let obj = payload;
    Object.keys(obj).forEach(function (key) {
      obj[key] = JSON.stringify(obj[key]);
    });
    obj.gclid = findGetParameter("gclid");
    const response = await fetch(
      "https://secret-cove-64633.herokuapp.com/create-checkout-session",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          items: [{ id: titles }, { price: totalPrice * 100 }],
          orderDetails: obj,
        }),
      }
    );

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  const optionsRegion = [
    { value: "EU", label: "EU" },
    { value: "NA", label: "NA" },
    { value: "Asia", label: "Asia" },
    { value: "Oceania", label: "Oceania" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,

      color: "black",
      padding: 20,
    }),
  };
  useEffect(() => {
    if (
      region === null ||
      PSNPass === null ||
      PSNemail === null ||
      platform === null
    ) {
      setDisabled(true);
      setInvalid("flex");
    } else {
      setDisabled(false);
      setInvalid("none");
    }
  }, [region, PSNPass, PSNemail, platform]);

  const playClick = () => {
    setPlatform("PlayStation Network");
    setPScolor("#2E6DB4");
    setXboxcolor("white");
    setPcColor("white");
  };
  const xClick = () => {
    setPlatform("Xbox");
    setXboxcolor("#107C10");
    setPScolor("white");
    setPcColor("white");
  };
  const PcClick = () => {
    setPlatform("Origin/Steam");
    setPcColor("#ff0000");
    setPScolor("white");
    setXboxcolor("white");
  };

  if (totalPrice === 0) {
    return (
      <>
        {" "}
        <Head>
          <title>Boostify | My Apex Legends Boosting Cart</title>
          <meta
            name="deScription"
            content="Get boosted by our professionals for a cheap price and achieve higher Ranks in Apex Legends. Our professionals consist of only All-seasons Apex predators. Veterans. 24/7 Live Chat Support. Cheap. Get boosted by the best. Same Day Deliver Ranked boost and Badge boost."
          />
          <meta name="theme-color" content="#008f68" />
        </Head>
        <div className={styles.failed_cart_contaier}>
          <h1 id="empty">Your cart is empty </h1>
          <Link href={id ? "/?" + id : "/"} passHref>
            <button className={styles.example_d}> Go Back Home?</button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Script src="https://www.paypal.com/sdk/js?client-id=Ab-OAlTFVTL8hU1GN30jAoe1XL4K5g9iqA-UxWwbnq6GTne9XBwjmGBJCWjiTb3-d9jahO9Anc1NeSm3&disable-funding=credit,card"></Script>
      
    
        <div className={styles.container_cart}>
          <div className={styles.window}>
            <div className={styles.order_info}>
              <div className={styles.order_info_content}>
                <h2 className={styles.order_summary}>Order Summary</h2>
                <div className={styles.line}></div>{" "}
                {items?.map((element, index) => {
                  if (element.kills) {
                    return (
                      <table
                        className={styles.order_table}
                        key={element.title + index}
                      >
                        <tbody>
                          <tr>
                            <td className={styles.full_width}>
                              <Image
                                src={element.icon}
                               
                                alt="product"
                                width={50}
                                height={50}
                              ></Image>
                            </td>
                            <td>
                              <br />{" "}
                              <span className={styles.thin}>{element.title}</span>
                              <br />{" "}
                              <span className={styles.thin}>
                                {element.selectedLegend}
                              </span>
                              <br />
                              <span className={`${styles.thin} ${styles.small}`}>
                                Kills: {element.kills}
                                <br />
                                <span className={`${styles.thin} ${styles.small}`}>
                                  {element.filteredExtras}
                                  <br />
                                </span>
                                <br />
                                <CircleWithCross
                                  style={{
                                    height: "20px",
                                    color: "#e43043",
                                    zIndex: "10",
                                  }}
                                  onClick={() => handleRemove(index)}
                                ></CircleWithCross>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className={styles.price}>${element.price}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    );
                  }
                  return (
                    <table className={styles.order_table} key={element.title + index}>
                      <tbody>
                        <tr>
                          <td className={styles.full_width}>
                            <Image
                              src={element.icon}
                              
                              alt="product"
                              width={200}
                              height={200}
                            ></Image>
                          </td>
                          <td>
                            <br /> <span className={styles.thin}>{element.title}</span>
                            <br />
                            {element.selectedLegend ||
                              `From: ${element.firstValue}`}
                            <br />
                            <span className={`${styles.thin} ${styles.small}`}>
                              {element.selectedPopBadges ||
                                `To: ${element.secondValue}`}
                              <br />
                              <span className={`${styles.thin} ${styles.small}`}>
                                {element.selectedExtraBadges}
                                <br />
                              </span>
                              {element.placementMatches ? (
                                <span className={`${styles.thin} ${styles.small}`}>
                                  {"Placement Matches: " +
                                    element.placementMatches}
                                  <br />
                                </span>
                              ) : (
                                <br />
                              )}
                              <span className={`${styles.thin} ${styles.small}`}>
                                {element.filteredExtras ||
                                  `${element.badgesExtras}`}
                                <br />
                              </span>
                              <br />
                              <CircleWithCross
                                style={{
                                  height: "20px",
                                  color: "#e43043",
                                  zIndex: "10",
                                }}
                                onClick={() => handleRemove(index)}
                              ></CircleWithCross>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className={styles.price}>${element.price}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  );
                })}
                <div className={styles.line}></div>
                <div className={styles.total}>
                  <span style={{ float: "left" }}>TOTAL</span>
                  <span style={{ float: "right", textAlign: "right" }}>
                    ${totalPrice?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.credit_info}>
              <div className={styles.credit_info_content}>
                {" "}
                <h2 id="order_summary">Select Your Platform</h2>
                <div className={styles.platform_select} style={{}}>
                  <div>
                    <Playstation
                      style={{
                        height: "50px",
                        color: psColor,
                      }}
                      onClick={playClick}
                    ></Playstation>
                  </div>
                  <div>
                    <Desktop
                      style={{
                        height: "50px",
                        color: pcColor,
                      }}
                      onClick={PcClick}
                    ></Desktop>
                  </div>
                  <div>
                    <Xbox
                      style={{
                        height: "50px",
                        color: xboxColor,
                      }}
                      onClick={xClick}
                    ></Xbox>
                  </div>
                </div>
                <h2 id="order_summary">{platform} Email</h2>
                <input
                  type="email"
                  className={styles.input_field}
                  onChange={(e) => setPSN(e.target.value)}
                ></input>
                <h2 id="order_summary">{platform} Password</h2>
                <input
                  type="password"
                  className={styles.input_field}
                  onChange={(e) => setPSNPass(e.target.value)}
                ></input>
                <h2 id="order_summary">Select Your Region</h2>
                <Select
                  options={optionsRegion}
                  styles={customStyles}
                  onChange={(value) => setRegion(value.label)}
                />
                <StepTwoWarningContainer
                  style={{
                    display: invalid,

                    marginTop: "10px",
                  }}
                >
                  Fill out all fields
                  <StepTwoWarning>
                    <i
                      className="fa fa_times"
                      onClick={() => setInvalid("none")}
                      style={{ padding: "20px" }}
                    ></i>
                  </StepTwoWarning>
                </StepTwoWarningContainer>
                <StepTwoWarningContainer
                  id="secondWarning"
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    padding: "5px",
                  }}
                >
                  If 2_step_auth is enabled on your PSN account make sure to
                  disable it to prevent access problems
                </StepTwoWarningContainer>
                <div className={styles.checkout_buttons_icons}>
                  <button
                    type="button"
                    id="checkout_button"
                    role="link"
                    onClick={handleClick}
                    className={styles.pay_btn}
                    disabled={disabled}
                  >
                    Checkout with Card
                  </button>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "10px",
                    }}
                  >
                    {checkout ? (
                      <PaypalCheckout
                        titles={titles[0]}
                        totalPrice={totalPrice}
                        potentialOrder={potentialOrder}
                      ></PaypalCheckout>
                    ) : (
                      <button
                        disabled={disabled}
                        onClick={() => setCheckout(true)}
                        className={styles.pay_btn}
                        style={{ backgroundColor: "#00457C" }}
                      >
                        Checkout with Paypal
                      </button>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Stripe style={{ height: "50px" }}></Stripe>
                    <ApplePay style={{ height: "50px" }}></ApplePay>
                    <GooglePay style={{ height: "50px" }}></GooglePay>
                    <CreditCardAlt
                      style={{ height: "50px" }}
                      onClick={potentialOrder}
                    ></CreditCardAlt>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <PostOrder/>

    </>
  );
};

export default Cart;
