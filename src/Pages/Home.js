import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { store } from "../Redux/store";
import img from "./background.jpg";
import { PrivateToken } from "../Config/ABI/PrivateToken";
import { Token } from "../Config/ABI/Token";
import { PrivateSale } from "../Config/Contract/Contract";
import { TokenContract } from "../Config/Contract/Contract";
import { getAllAccountDetails } from "../Services/WalletConnection";
import Swal from "sweetalert2";
import { NetworkChanged, web3_ } from "../Services/web3Connection";
import CounterComponent from "./CounterComponents";
import { walletDisconnect } from "../Services/WalletConnection";
import pdf from "../File/Mine4You.pdf";

const Home = (props) => {
  const [details, setDetails] = React.useState(null);
  const [claim_detail, setClaim_Details] = React.useState(null);
  const [address, setAddress] = React.useState("");
  const [mintdata, setmintData] = React.useState("");
  const [Network, setNetwork] = React.useState(false);
  const [isApi,setIsApi] = React.useState(false);
  const [date, setDate] = React.useState("");
  useEffect(() => {
    if (props.Connect) {
      setAddress(store.getState().ConnectivityReducer.metamaskAddress);
    } else {
      setAddress("");
    }
  }, [props.Connect]);

  useEffect(() => {
    let res = NetworkChanged();
    setNetwork(res);
  }, []);

  //  const publicapi ="https://mineforyou.herokuapp.com"
  function Mint(data) {
  
      const url = "https://mineforyou.herokuapp.com/mint";
      fetch(url, {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        address: data,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((value) => {
        console.log(value.value);
        setDetails(value.value);
        if (value.value != null) {
          setDate(
            new Date(value.value.updatedAt).getTime() / 1000 + 24 * 60 * 60
            );
          }
        });
      }
    
      //Mint Api
  const Details_Mint = () => {
    const data = store.getState().ConnectivityReducer.metamaskAddress;

    if (props.Connect) {
      if (store.getState().ConnectivityReducer.metamaskAddress) {
        if (details !== null) {
          // 24 * 60 * 60

          if (
            new Date(details.updatedAt).getTime() / 1000 + 24 * 60 * 60 <
            new Date().getTime() / 1000
          ) {
            Mint(data);
            Swal.fire("Your Mine Successful");
          } else {
            Swal.fire("You Can Mine Once A Day");
          }
        } else {
      

            Mint(data);
            Swal.fire("Your Mine Successful");
          
        }
      }
    } else {
      Swal.fire("Please Connect Wallet");
    }
  };
  //Close Mint Api

  // Claim api

  //End Api call

  async function handleConnect() {
    if (window.ethereum) {
      getAllAccountDetails().then((res) => {
        console.log(res.result);
        setAddress(res.result);
        const url = "https://mineforyou.herokuapp.com/claim_details";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            address: res.result,
          }),
        })
          .then(async (data) => {
            return data.json();
          })
          .then((da) => {
            setIsApi(true)
            setDetails(da);
            if (da != null) {
              setDate(new Date(da.updatedAt).getTime() / 1000 + 24 * 60 * 60);
            }
          });
        props.setConnect(true);
      });
    } else {
      Swal.fire("Please Connect To  Wallet");
    }
  }
  // Claim Function

  async function getData() {
    console.log(address);
    if (props.Connect) {
      let chainID = await web3_.eth.getChainId();
      if (chainID == 56) {
        if (details != null) {
          if (details.token != 0 && details.token !== undefined) {
            await new web3_.eth.Contract(PrivateToken, PrivateSale).methods
              .UserMine(web3_.utils.toWei(details.token.toString(), "ether"))
              .send({
                from: store.getState().ConnectivityReducer.metamaskAddress,
              })
              .on("receipt", function (receipt) {
                console.log(receipt.contractAddress); // contains the new contract address
              })
              .on("confirmation", function (confirmationNumber, receipt) {
                console.log("gjhgfjhj");
                const data = address;
                console.log(data);
                const url = "https://mineforyou.herokuapp.com/claim";
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                  body: JSON.stringify({
                    address: data,
                  }),
                })
                  .then(async (data) => {
                    return data.json();
                  })
                  .then((da) =>  setDetails(da)
                  );
                // Swal.fire("You Claim Successfully");
              });
          } else {
            Swal.fire("You Don't Have Enough Token");
          }
        } else {
          Swal.fire("You Don't Mine Any Token, Please Mine Token First");
        }
      } else {
        Swal.fire("Warning", "Please Change Your Network", "warning]");
      }
    } else {
      Swal.fire("Please Connect To The Wallet");
    }
  }

  // Close Claim Function

  return (
    <>
      <div>
        <div className="headercontent">
          <ul className="headersecond">
            <li className="headerlist">
              M<span style={{ fontSize: "15px" }}>INE</span> F
              <span style={{ fontSize: "15px" }}>OR</span> F
              <span style={{ fontSize: "15px" }}>REE</span>
            </li>
            <li className="headerlist">
              M<span style={{ fontSize: "15px" }}>INE</span> C
              <span style={{ fontSize: "15px" }}>OIN</span>
            </li>
            <li className="headerlist">
              L<span style={{ fontSize: "15px" }}>OW</span> E
              <span style={{ fontSize: "15px" }}>NERGY</span> C
              <span style={{ fontSize: "15px" }}>OST</span>
            </li>
          </ul>
        </div>
        <div className="content">
          <div id="WEB3_CONNECT_MODAL_ID" />
          <div>
            <div className="leftdesc">
              <div className="mindescfirst">
                <div className="minnedecs">
                  <h4>
                    M<span style={{ fontSize: "15px" }}>INE</span>
                  </h4>
                </div>
                <div className="desctext">
                  <h3 className="desctextfirst">
                    W<span style={{ fontSize: "15px" }}>HAT</span> I
                    <span style={{ fontSize: "15px" }}>S</span> M
                    <span style={{ fontSize: "15px" }}>
                      INE4<span style={{ fontSize: "18px" }}>Y</span>OU?
                    </span>
                  </h3>
                  <h3 className="desctextfirst">
                    S<span style={{ fontSize: "15px" }}>IMPLE</span> A
                    <span style={{ fontSize: "15px" }}>NSWER</span>, P
                    <span style={{ fontSize: "15px" }}>RESS</span> T
                    <span style={{ fontSize: "15px" }}>O</span> E
                    <span style={{ fontSize: "15px" }}>ARN!!</span>
                  </h3>
                </div>
                <div className="minnedecsecond">
                  <h4>
                    M<span style={{ fontSize: "15px" }}>INE</span>
                  </h4>
                </div>
              </div>
              <div className="leftsecond">
                <ul>
                  <li className="liststyle">
                    M<span style={{ fontSize: "15px" }}>INE</span> E
                    <span style={{ fontSize: "15px" }}>VERY</span> D
                    <span style={{ fontSize: "15px" }}>AY</span> O
                    <span style={{ fontSize: "15px" }}>NCE</span> A D
                    <span style={{ fontSize: "15px" }}>AY.</span>
                  </li>
                  <li className="liststyle">
                    R<span style={{ fontSize: "15px" }}>EMOVE</span> T
                    <span style={{ fontSize: "15px" }}>HEM</span> W
                    <span style={{ fontSize: "15px" }}>HEN</span> Y
                    <span style={{ fontSize: "15px" }}>OU</span> W
                    <span style={{ fontSize: "15px" }}>ANT.</span>
                  </li>
                  <li className="liststyle">
                    S<span style={{ fontSize: "15px" }}>MART</span> C
                    <span style={{ fontSize: "15px" }}>ONTRACT</span>, M
                    <span style={{ fontSize: "15px" }}>ORE</span> C
                    <span style={{ fontSize: "15px" }}>HEAPER</span> T
                    <span style={{ fontSize: "15px" }}>HAN</span> B
                    <span style={{ fontSize: "15px" }}>TC</span>.
                  </li>
                  <li className="liststyle">
                    N<span style={{ fontSize: "15px" }}>O</span> D
                    <span style={{ fontSize: "15px" }}>EDICATED</span> V
                    <span style={{ fontSize: "15px" }}>IDEO</span> C
                    <span style={{ fontSize: "15px" }}>ARD</span> N
                    <span style={{ fontSize: "15px" }}>EEDED</span>.
                  </li>
                  <li className="liststyle">
                    L<span style={{ fontSize: "15px" }}>OW</span> C
                    <span style={{ fontSize: "15px" }}>OST</span> O
                    <span style={{ fontSize: "15px" }}>F</span> E
                    <span style={{ fontSize: "15px" }}>NERGY</span>.
                  </li>
                </ul>
              </div>
              <div className="leftthird">
                <h3 className="contractaddress">
                  M
                  <span
                    style={{ fontSize: "15px", textTransform: "upperCase" }}
                  >
                    INE4
                  </span>
                  Y
                  <span
                    style={{ fontSize: "15px", textTransform: "upperCase" }}
                  >
                    OU
                  </span>{" "}
                  O
                  <span
                    style={{ fontSize: "15px", textTransform: "upperCase" }}
                  >
                    FFICAL
                  </span>{" "}
                  C
                  <span
                    style={{ fontSize: "15px", textTransform: "upperCase" }}
                  >
                    ONTRACT
                  </span>{" "}
                  A
                  <span
                    style={{ fontSize: "15px", textTransform: "upperCase" }}
                  >
                    DDRESS
                  </span>
                  :
                </h3>
                <h4 className="contractaddress">
                 0x9839D3B56Da56F70083b472d25fB414a884ff94e
                </h4>
              </div>
              <div className="timerdetil">
              <a href={pdf} target="blank" style={{textDecoration:'none',color:'black'}}>
                  <h4>
                    W<span style={{ fontSize: "14px",fontWeight:'bold' }}>HITEPAPER</span>
                  </h4>
                  </a>
                </div>
            </div>
            {/* other  section */}
            <div className="rightdescp">
              <div className="rightfirst">
                <h3 style={{ color: "#fff", fontSize: "19px" }}>
                  T<span style={{ fontSize: "15px" }}>OKEN</span> M
                  <span style={{ fontSize: "15px" }}>ETRIC</span> M
                  <span style={{ fontSize: "15px" }}>INE4YOU</span>
                </h3>
                <h3 style={{ color: "#fff", fontSize: "18px" }}>
                  T<span style={{ fontSize: "15px" }}>OTAL</span> S
                  <span style={{ fontSize: "15px" }}>UPPLY</span>: $MNY
                  21.000.000{" "}
                </h3>
              </div>
              <div className="rightsecond">
                <ul>
                  <li className="liststyle">
                    P<span style={{ fontSize: "15px" }}>RESS</span> T
                    <span style={{ fontSize: "15px" }}>O</span> E
                    <span style={{ fontSize: "15px" }}>ARN</span>: $MNY
                    19.000.000 T
                    <span
                      style={{ fontSize: "15px", textTransform: "uppsercase" }}
                    >
                      HIS
                    </span>{" "}
                    I
                    <span
                      style={{ fontSize: "15px", textTransform: "uppsercase" }}
                    >
                      S
                    </span>{" "}
                    T
                    <span
                      style={{ fontSize: "15px", textTransform: "uppsercase" }}
                    >
                      HE
                    </span>{" "}
                    C
                    <span
                      style={{ fontSize: "15px", textTransform: "uppsercase" }}
                    >
                      IRCULATING
                    </span>{" "}
                    S
                    <span
                      style={{ fontSize: "15px", textTransform: "uppsercase" }}
                    >
                      UPPLY
                    </span>
                  </li>
                  <li className="liststyle">
                    D<span style={{ fontSize: "15px" }}>EV</span>: $MNY 500.000
                    F<span style={{ fontSize: "15px" }}>OR</span> M
                    <span style={{ fontSize: "15px" }}>AINTENANCE</span>.
                  </li>
                  <li className="liststyle">
                    M<span style={{ fontSize: "15px" }}>ARKETING</span>: $MNY
                    500.000 A<span style={{ fontSize: "15px" }}>DDING</span> I
                    <span style={{ fontSize: "15px" }}>N</span> E
                    <span style={{ fontSize: "15px" }}>XCHANGES</span>/A
                    <span style={{ fontSize: "15px" }}>DVERTISING</span>.
                  </li>
                  <li className="liststyle">
                    T<span style={{ fontSize: "15px" }}>EAM</span>: $MNY
                    1.000.000 L<span style={{ fontSize: "15px" }}>OCKED</span> F
                    <span style={{ fontSize: "15px" }}>OR</span> 2 Y
                    <span style={{ fontSize: "15px" }}>EARS</span>.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* close other section */}
          {/**/}
          <div className="background-video"></div>
          <div
            className="sub-head"
            id="claim-text-wrapper"
            style={{ width: "100%" }}
          >
            <div id="">
              <div>
                <h3 style={{ display: "flex", justifyContent: "center" }}>
                REMAINING TIME
                </h3>

                <CounterComponent endDate={date && date} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <img
                  style={{ borderRadius: "15px" }}
                  className="image "
                  height="200px"
                  src={process.env.PUBLIC_URL + "images/mine.jpg"}
                ></img>
              </div>
              <div id="ape-number">
                <button
                  className="purchase-button"
                  id="connect"
                  display="none"
                  onClick={Details_Mint}
                  disabled={!isApi ? true : false}
                >
                  MINE
                </button>

                <button
                  className="purchase-button"
                  id="connect"
                  display="none"
                  onClick={getData}
                >
                  CLAIM
                </button>
              </div>
              <div id="ape-total">
                <p className="total">
                  T<span style={{ fontSize: "15px" }}>OTAL</span> T
                  <span style={{ fontSize: "15px" }}>OKEN</span>
                </p>
                <h5 className="actual_price">
                  <a>$MNY</a>
                  <a id="price"> {details != null ? details.token : 0}</a>{" "}
                </h5>
              </div>
              <div></div>
              <div style={{ display: "flex" }}>
                <button
                  className="purchase-button"
                  id="connect"
                  display="none"
                  onClick={handleConnect}
                >
                  {props.Connect
                    ? (
                        store
                          .getState()
                          .ConnectivityReducer.metamaskAddress.slice(0, 4) +
                        "..." +
                        store
                          .getState()
                          .ConnectivityReducer.metamaskAddress.slice(
                            store.getState().ConnectivityReducer.metamaskAddress
                              .length - 5,
                            store.getState().ConnectivityReducer.metamaskAddress
                              .length
                          )
                      ).toLocaleUpperCase()
                    : "CONNECT WALLET"}
                </button>
                <button
                  className="purchase-button"
                  id="transfer"
                  onClick={() => props.setConnect(false)}
                >
                  DISCONNECT WALLET
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
