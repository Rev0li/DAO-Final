"use client";
import {
  Button,
  Card,
  Checkbox,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { SbtContext } from "@/providers/SbtProvider";
import { useNotif } from "@/hooks/useNotif";
import { useWagmi } from "@/hooks/useWagmi";
import { useSbt } from "@/hooks/useSbt";
import moment from "moment";

export default function sportif() {
  const { isConnected, address, chain } = useWagmi();
  const { mint, burn, update, getsoul } = useContext(SbtContext);
  const { throwNotif } = useNotif();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [grade, setGrade] = useState("");
  const [license, setLicense] = useState(false);

  // let startTimestamp = new Date(startDate).getTime() / 1000;

  const handleSubmit = async () => {
    if (nom === "" || prenom === "" || dateNaissance === "") {
      throwNotif("error", "Veuillez renseigner tous les champs du formulaire.");
      return;
    }
    let birthdayDate = new Date(dateNaissance).getTime() / 1000;
    await mint(nom, prenom, birthdayDate, grade, license);
  };

  const { contract, getSoul } = useSbt();
  const [soulData, setSoulData] = useState(null);

  const fetchSoulData = async () => {
    const data = await getSoul();

    data.dateNaissance = moment(
      new Date(parseInt(data.dateNaissance.toString()) * 1000)
    ).format("YYYY-MM-DD");
    // console.log(data);
    setSoulData(data);
  };

  return (
    <Card
      padding={4}
      margin={5}
      bgGradient="radial(gray.300, yellow.400, pink.200)"
    >
      <h1>Ajouter un NTT (Soul)</h1>
      <label>
        Nom:
        <Input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
      </label>
      <br />
      <label>
        Prénom:
        <Input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
      </label>
      <br />
      <label>
        Date de Naissance:
        <Input
          type="date"
          value={dateNaissance}
          onChange={(e) => setDateNaissance(e.target.value)}
        />
      </label>
      <br />
      <label>
        Grade:
        <NumberInput
          step={1}
          defaultValue={0}
          min={0}
          max={10}
          type="number"
          onChange={(value) => setGrade(value)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </label>
      <br />
      <label>
        Demander ma license:
        <Checkbox
          type="checkbox"
          checked={license}
          onChange={(e) => setLicense(e.target.checked)}
        />
      </label>
      <br />
      <Button onClick={handleSubmit}>Mint</Button>
      <br />

      <div>
        <Button onClick={fetchSoulData}>Get</Button>
        <br />
        {soulData ? (
          <div>
            <p>Nom: {soulData.nom}</p>
            <p>Prénom: {soulData.prenom}</p>
            <p>Date de Naissance: {soulData.dateNaissance}</p>
            <p>Grade: {soulData.grade}</p>
            <p>License: {soulData.license ? "Oui" : "Non"}</p>
            <p>Owner: {soulData.owner}</p>
          </div>
        ) : (
          <p>Pas de données pour cette adresse Ethereum</p>
        )}
      </div>
    </Card>
  );
}

/*onClick={handleMint}*/
