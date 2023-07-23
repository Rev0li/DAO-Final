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
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { SbtContext } from "@/providers/SbtProvider";
import { useNotif } from "@/hooks/useNotif";
import { useWagmi } from "@/hooks/useWagmi";
import { useSbt } from "@/hooks/useSbt";
import moment from "moment";

export default function sportif() {
  const { contract, getSoul, update, mint, brun } = useSbt();
  const { isConnected, address, chain } = useWagmi();
  // const { mint, burn, update, getsoul } = useContext(SbtContext);
  const { throwNotif } = useNotif();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [grade, setGrade] = useState("");
  const [license, setLicense] = useState(false);
  const [soulData, setSoulData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //___________________________MINT_________________________________//

  const handleMint = async () => {
    if (nom === "" || prenom === "" || dateNaissance === "") {
      throwNotif("error", "Veuillez renseigner tous les champs du formulaire.");
      return;
    }
    let birthdayDate = new Date(dateNaissance).getTime() / 1000;
    await mint(nom, prenom, birthdayDate, grade, license);
  };
  // useEffect(() => {
  //   const fetchSoulData = async () => {
  //     const data = await getSoul();
  //     console.log(data.address);
  //     if (data !== undefined || data.address != address) {
  //       data.dateNaissance = moment(
  //         new Date(parseInt(data.dateNaissance.toString()) * 1000)
  //       ).format("YYYY-MM-DD");
  //       setSoulData(data);
  //     }
  //     setIsLoading(false);
  //   };

  //   if (isConnected && isLoading) {
  //     fetchSoulData();
  //   }
  // }, [getSoul, isConnected, isLoading]);
  useEffect(() => {
    // Fonction pour récupérer les données du soul
    const fetchSoulData = async () => {
      try {
        const data = await getSoul();
        console.log(data.address);
        if (data) {
          data.dateNaissance = moment(
            new Date(parseInt(data.dateNaissance.toString()) * 1000)
          ).format("YYYY-MM-DD");
          setSoulData(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du soul:", error);
        throwNotif("error", "Erreur lors de la récupération du soul.");
      } finally {
        setIsLoading(false);
      }
    };

    // Vérifier si l'utilisateur est connecté et si les données du soul n'ont pas encore été chargées
    if (isConnected && isLoading && soulData === null) {
      fetchSoulData();
    }
  }, [isConnected, isLoading, getSoul, soulData]);
  //_____________________________________________________________________//

  //___________________________UPDATE_______________________________//
  const loadSoulData = async () => {
    try {
      const data = await getSoul();
      if (data) {
        data.dateNaissance = moment(
          new Date(parseInt(data.dateNaissance.toString()) * 1000)
        ).format("YYYY-MM-DD");
        setSoulData(data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du soul:", error);
      throwNotif("error", "Erreur lors du chargement du soul.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // ...

    // Chargement des informations actuelles du soul
    if (isConnected && isLoading && soulData === null) {
      loadSoulData();
    }
  }, [isConnected, isLoading, getSoul, soulData]);

  // ...

  // Fonction pour mettre à jour les informations du soul
  const handleUpdate = async () => {
    let birthdayDate = new Date(dateNaissance).getTime() / 1000;
    await update(nom, prenom, birthdayDate, grade, license);
  };

  //_____________________________________________________________________//

  //___________________________BURN_________________________________//

  //_____________________________________________________________________//
  return (
    <Card
      padding={4}
      margin={5}
      bgGradient="radial(gray.300, yellow.400, pink.200)"
    >
      <div>
        {/* <Button onClick={fetchSoulData}>Get</Button> */}
        <br />
        {soulData ? (
          <div>
            <h1>Votre Profil</h1>
            <label>
              Nom:
              <Input
                type="text"
                defaultValue={soulData.nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </label>
            <br />
            <label>
              Prenom:
              <Input
                type="text"
                defaultValue={soulData.prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </label>
            <br />
            <label>
              Date de Naissance:
              <Input
                type="date"
                defaultValue={soulData.dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
              />
            </label>
            <br />
            <label>
              Grade:
              <NumberInput
                step={1}
                min={0}
                max={10}
                type="number"
                defaultValue={soulData.grade}
                onChange={(e) => setGrade(e.target.value)}
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
              License:
              <Checkbox
                type="checkbox"
                checked={soulData.license}
                onChange={(e) => setLicense(e.target.value)}
              />
            </label>
            <br />
            <label>
              Owner:
              <Text>{soulData.owner}</Text>
            </label>
            <br />

            <Button onClick={handleUpdate}>Update your information</Button>
          </div>
        ) : (
          <div>
            <h1>Ajouter SBT</h1>
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
            <Button onClick={handleMint}>Mint</Button>
          </div>
        )}
      </div>
    </Card>
  );
}

/*onClick={handleMint}*/
