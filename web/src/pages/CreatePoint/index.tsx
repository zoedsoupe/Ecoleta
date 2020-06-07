//* types, react hooks
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
//* icons
import { FiArrowLeft } from "react-icons/fi";
//* router and navigation
import { Link, useHistory } from "react-router-dom";
//* map
import { Map, TileLayer, Marker } from "react-leaflet";
//* map event type
import { LeafletMouseEvent } from "leaflet";
//* consume apis
import axios from "axios";

import Dropzone from "../../components/Dropzone";

import "./CreatePoint.css";

import api from "../../services/api";

import logo from "../../assets/logo.svg";

//* define types to Items
interface Item {
  id: number;
  title: string;
  image_url: string;
}

//* type to uf
interface ibgeUfResponse {
  sigla: string;
}

//* type to city
interface ibgeCityResponse {
  nome: string;
}

const CreatePoint = () => {
  //* variable to receive items
  const [items, setItems] = useState<Item[]>([]);
  //* variable to receive ufs
  const [ufs, setUfs] = useState<string[]>([]);
  //* variable to receive cities
  const [cities, setCities] = useState<string[]>([]);

  const [selectedFile, setSelectedFile] = useState<File>();

  //* variable to receive the map initial position
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  //* variable to receive all form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    wpp: "",
  });

  //* handle the selects for uf, city, map position and items
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const history = useHistory();

  //* ..., []) === run once when page loads

  //* get all items from api and stores on items const
  useEffect(() => {
    api.get("items").then((res) => setItems(res.data));
  }, []);

  //* get all ufs from ibge api and stores on ufs const
  useEffect(() => {
    axios
      .get<ibgeUfResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((res) => {
        const ufInitials = res.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  //* get all cities from ibge api and stores on cities const and executes every time that selected UF changes
  useEffect(() => {
    if (selectedUf !== "0") {
      axios
        .get<ibgeCityResponse[]>(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
        )
        .then((res) => {
          const cityNames = res.data.map((city) => city.nome);

          setCities(cityNames);
        });
    }
    return;
  }, [selectedUf]);

  //* get the actual user geolocation from browser
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  //* handle the selected uf
  function handleSelectedUf(e: ChangeEvent<HTMLSelectElement>) {
    const uf = e.target.value;

    setSelectedUf(uf);
  }

  //* handle the selected city
  function handleSelectedCity(e: ChangeEvent<HTMLSelectElement>) {
    const city = e.target.value;

    setSelectedCity(city);
  }

  //* handle the selected position to place a marker
  function handleMapClick(e: LeafletMouseEvent) {
    setSelectedPosition([e.latlng.lat, e.latlng.lng]);
  }

  //* store all the form data
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    //* copy all the existing data and add new
    setFormData({ ...formData, [name]: value });
  }

  //* handle the selected or disselected items
  function handleSelectedItems(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected > -1) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else setSelectedItems([...selectedItems, id]);
  }

  //* submit all data to the api and create a new point
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { name, email, wpp } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [lat, long] = selectedPosition;
    const items = selectedItems;

    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("wpp", wpp);
    data.append("uf", uf);
    data.append("city", city);
    data.append("lat", String(lat));
    data.append("long", String(long));
    data.append("items", items.join(","));

    if (selectedFile) data.append("img", selectedFile);

    try {
      await api.post("points", data);

      history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <Dropzone onFileUpload={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da ententidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="wpp">Whatsapp</label>
              <input
                type="tel"
                name="wpp"
                id="wpp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>
          //* see leaflet documentation
          <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                onChange={handleSelectedUf}
                value={selectedUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectedCity}
              >
                <option value="0">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectedItems(item.id)}
                className={selectedItems.includes(item.id) ? "selected" : ""}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
