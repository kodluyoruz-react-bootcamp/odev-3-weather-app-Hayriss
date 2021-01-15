import React, { Component } from 'react';
import AppContext from "../context";
import axios from "axios";

class Weather extends Component {

  constructor() {
    super();

    this.state = {
      name: "",
      days: [],
      conditionsDayNight: []
    };

    this.getCityWeatherFirst()
  }

  getCityWeatherFirst() {
    const options = {
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast/',
      params: {
        q: 'adana,tr',
        id: "524901",
        appid: "96d3a68ad6213fe75961d17a7f405580",
        units: "metric"
      }
    };
    axios.request(options)
      .then((response) => {

        this.state.name = response.data.city.name;
        this.state.conditions = response.data.list;

        console.log(this.state.name);
        console.log(this.state.conditions);
      })
      .catch((error) => { console.error(error); });
  }


  getCityWeather(event) {
    var cityName = "adana"
    if (event != null) {
      cityName = event.target.options[event.target.selectedIndex].innerHTML;
    }
    const options = {
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast/',
      params: {
        q: cityName.toLowerCase() + ',tr',
        id: "524901",
        appid: "96d3a68ad6213fe75961d17a7f405580",
        units: "metric"
      }
    };
    axios.request(options)
      .then((response) => {

        var ar = response.data.list.filter(x => x.dt_txt.includes("12:00:00") || x.dt_txt.includes("00:00:00"));
        ar.forEach(x => {
          var date = x.dt_txt.split(" ")[0];
          var time = x.dt_txt.split(" ")[1].includes("12") ? "Day" : "Night";
          x.dt_txt = date + " ~ " + time;
        });
        this.setState({ name: response.data.city.name });
        var conditionsDay = ar.filter(x => x.dt_txt.includes("Day"));
        var conditionsNight = ar.filter(x => x.dt_txt.includes("Night"));

        var conditionsArranged = [];
        var daysArranged=[];
        var dateTimeNow = new Date();
        dateTimeNow.setDate(dateTimeNow.getDate() + -1)

        for (var i = 0; i < 8; i++) {
          var conditionsArrangedElement = [];
          dateTimeNow.setDate(dateTimeNow.getDate() + 1)             
          var dateTimeDay = dateTimeNow.getUTCDate();          
          var dateTimeMonth = dateTimeNow.getUTCMonth() + 1;
          dateTimeMonth = dateTimeMonth.length==2 ? dateTimeMonth : "0"+dateTimeMonth;
          var dateTimeYear = dateTimeNow.getUTCFullYear();
          var day = conditionsDay.filter(x => x.dt_txt.includes(dateTimeMonth + "-" + dateTimeDay));
          var night = conditionsNight.filter(x => x.dt_txt.includes(dateTimeMonth + "-" + dateTimeDay));
          if (JSON.stringify(night).includes("dt_txt")) {
            conditionsArrangedElement.push(night)
          }
          if (JSON.stringify(day).includes("dt_txt")) {
            conditionsArrangedElement.push(day)           
          }
          if (conditionsArrangedElement.length > 0) {
            daysArranged.push(dateTimeNow.toString().split(' ')[0] + " ~ " + dateTimeDay + "/"+ dateTimeMonth + "/"+ dateTimeYear);
            conditionsArranged.push(conditionsArrangedElement);
          }
        }
        this.setState({days : daysArranged});
        console.log(this.state.days);
        this.setState({ conditionsDayNight: conditionsArranged });
      })
      .catch((error) => { console.error(error); });
  };

  render() {
    return (
      <>
        <div className="container">
          <form className="w-100 text-center mt-5">
            <select className="form-control halign" style={{ width: "300px" }} name="Sehir" onChange={(event) => this.getCityWeather(event)}>
              <option value="1">Adana</option>
              <option value="2">Adıyaman</option>
              <option value="3">Afyonkarahisar</option>
              <option value="4">Ağrı</option>
              <option value="5">Amasya</option>
              <option value="6">Ankara</option>
              <option value="7">Antalya</option>
              <option value="8">Artvin</option>
              <option value="9">Aydın</option>
              <option value="10">Balıkesir</option>
              <option value="11">Bilecik</option>
              <option value="12">Bingöl</option>
              <option value="13">Bitlis</option>
              <option value="14">Bolu</option>
              <option value="15">Burdur</option>
              <option value="16">Bursa</option>
              <option value="17">Çanakkale</option>
              <option value="18">Çankırı</option>
              <option value="19">Çorum</option>
              <option value="20">Denizli</option>
              <option value="21">Diyarbakır</option>
              <option value="22">Edirne</option>
              <option value="23">Elazığ</option>
              <option value="24">Erzincan</option>
              <option value="25">Erzurum</option>
              <option value="26">Eskişehir</option>
              <option value="27">Gaziantep</option>
              <option value="28">Giresun</option>
              <option value="29">Gümüşhane</option>
              <option value="30">Hakkâri</option>
              <option value="31">Hatay</option>
              <option value="32">Isparta</option>
              <option value="33">Mersin</option>
              <option value="34">İstanbul</option>
              <option value="35">İzmir</option>
              <option value="36">Kars</option>
              <option value="37">Kastamonu</option>
              <option value="38">Kayseri</option>
              <option value="39">Kırklareli</option>
              <option value="40">Kırşehir</option>
              <option value="41">Kocaeli</option>
              <option value="42">Konya</option>
              <option value="43">Kütahya</option>
              <option value="44">Malatya</option>
              <option value="45">Manisa</option>
              <option value="46">Kahramanmaraş</option>
              <option value="47">Mardin</option>
              <option value="48">Muğla</option>
              <option value="49">Muş</option>
              <option value="50">Nevşehir</option>
              <option value="51">Niğde</option>
              <option value="52">Ordu</option>
              <option value="53">Rize</option>
              <option value="54">Sakarya</option>
              <option value="55">Samsun</option>
              <option value="56">Siirt</option>
              <option value="57">Sinop</option>
              <option value="58">Sivas</option>
              <option value="59">Tekirdağ</option>
              <option value="60">Tokat</option>
              <option value="61">Trabzon</option>
              <option value="62">Tunceli</option>
              <option value="63">Şanlıurfa</option>
              <option value="64">Uşak</option>
              <option value="65">Van</option>
              <option value="66">Yozgat</option>
              <option value="67">Zonguldak</option>
              <option value="68">Aksaray</option>
              <option value="69">Bayburt</option>
              <option value="70">Karaman</option>
              <option value="71">Kırıkkale</option>
              <option value="72">Batman</option>
              <option value="73">Şırnak</option>
              <option value="74">Bartın</option>
              <option value="75">Ardahan</option>
              <option value="76">Iğdır</option>
              <option value="77">Yalova</option>
              <option value="78">Karabük</option>
              <option value="79">Kilis</option>
              <option value="80">Osmaniye</option>
              <option value="81">Düzce</option>
            </select>
          </form>

          <AppContext.Consumer>

            {value => (
              <div className="weather">

                <div className="row">
                  <h1 className="col-12 text-center font mt-3">{this.state.name}</h1>
                  {this.state.days.map((day,index) =>
                  <div className="col-2 text-center" key={index}>
                    <span className="font"><strong>{day}</strong></span>
                  </div>
                  )}

                  {this.state.conditionsDayNight.map((condition, index) => (
                    <div className="col-2" key={index}>
                      {condition.map((item, index2) => (
                        <div className="row" key={index2}>
                          <div className="card w-100 h-100 mycard">
                            <img src={"http://openweathermap.org/img/wn/" + item[0].weather[0].icon + "@2x.png"} className="card-img-top" alt={"Picture: " + item[0].weather[0].main} width={25} ></img>
                            <div className="card-body mycardbody">
                              <h6 className="card-title font"><strong>{item[0].dt_txt.split('~')[1]}</strong></h6>
                              <div>
                                <p style={{ fontSize: '0.8em' }} className="card-text font"><strong>Max Temp: </strong>{item[0].main.temp_max}°C</p>

                                <p style={{ fontSize: '0.8em' }} className="card-text font"><strong>Min Temp: </strong>{item[0].main.temp_min}°C</p>

                                <p style={{ fontSize: '0.8em' }} className="card-text font"><strong>Condition: </strong> {item[0].weather[0].main}</p>
                              </div>





                              <button type="button" className="btn moredetails font" data-toggle="modal" data-target={"#clickModal"+index+index2}>
                                More Details
                              </button>


                              <div className="modal fade mymodalb" id={"clickModal"+index+index2} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog " role="document">
                                  <div className="modal-content mymodal">
                                    <div className="modal-header">
                                      <h5 className="text-center" id="exampleModalLabel">Weather Condition Details</h5>
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      <div style={{height:"200px",width:"200px"}} className="text-center halign">
                                        <img src={"http://openweathermap.org/img/wn/" + item[0].weather[0].icon + "@2x.png"} className="card-img-top mymodalb  rounded-circle" alt={"Picture: " + item[0].weather[0].main}></img>
                                      </div>
                                      <ul>
                                        <li className="card-text"><strong>The Weather Feels Like: </strong>{item[0].main.feels_like}°C</li>
                                        <li className="card-text"><strong>Description: </strong>{item[0].weather[0].main}, {item[0].weather[0].description}</li>
                                        <li className="card-text"><strong>Humidity: </strong>{item[0].main.humidity}</li>     
                                        <li className="card-text"><strong>Pressure: </strong>{item[0].main.pressure}</li>
                                        <li className="card-text"><strong>Wind: </strong>
                                          <ul>
                                            <li className="card-text"><strong>Speed: </strong>{item[0].wind.speed}</li>
                                            <li className="card-text"><strong>Degree: </strong>{item[0].wind.deg}</li>                                     
                                          </ul>
                                        </li>                                     
                                      </ul>
                                    
                                    
                                      
                                    </div>
                                    <div className="modal-footer">
                                    </div>
                                  </div>
                                </div>
                              </div>




                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <p className="mypowered"><strong>Created by Hayris</strong></p>
              </div>
            )
            }
          </AppContext.Consumer>
        </div>
      </>
    );
  }
}

export default Weather;



