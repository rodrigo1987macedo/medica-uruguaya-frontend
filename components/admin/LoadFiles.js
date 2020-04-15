import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Loader from "../common/Loader";
import Title from "../common/Title";
import { tabs } from "../../constants/tabs";
import { Button } from '../../styles/Button'

const FilesDisplayHeading = styled.div`
  display: flex;
  border: 1px solid ${props => props.theme.colors.border1};
  padding: 8px;
  background: ${props => props.theme.colors.background1};
`;

const FilesDisplay = styled.div`
  display: flex;
  width: 100%;
  margin: 20px 0 0 0;
  padding: 20px 0 0 0;
  border-top: 1px solid ${props => props.theme.colors.border2};
  > div:nth-child(1) {
    flex: 0 0 200px;
  }
  > div:nth-child(2) {
    flex: 1;
  }
`;

const Input = styled.input`
  padding: 4px 10px;
  height: 30px;
  width: 250px;
`;

const FilesToBeLoaded = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border1};
  padding: 14px 8px;
`;

const FilesStatus = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border1};
  padding: 14px 8px;
  color: ${props =>
    props.status === status.READY
      ? "inherit"
      : props.status === status.PENDING
      ? props.theme.colors.process
      : props.status === status.SUCCESS
      ? props.theme.colors.success
      : props.status === status.ERROR && props.theme.colors.error};
`;

const status = {
  READY: "Listo para cargar",
  PENDING: "Cargando...",
  SUCCESS: "Cargado con éxito",
  ERROR: "Ha ocurrido un error"
};

function LoadFiles() {
  const [filesToBeLoaded, setFilesToBeLoaded] = useState();
  const [filesToBeLoadedStatus, setFilesToBeLoadedStatus] = useState();
  const [loadedFilesLength, setLoadedFilesLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function setFilesArray(array) {
    let newArray = [].concat(array);
    return newArray;
  }

  function setLoadingStatus(index, messaage) {
    filesToBeLoadedStatus.splice(index, 1, messaage);
    let newArr = [].concat(filesToBeLoadedStatus);
    setFilesToBeLoadedStatus(newArr);
  }

  async function recursiveUploadChain(files) {
    const nextFile = files.shift();
    const nextFileIndex = loadedFilesLength - files.length - 1;

    setIsLoading(true);

    if (nextFile) {
      setLoadingStatus(nextFileIndex, status.PENDING);
      return axios
        .get(
          `https://arcane-everglades-49934.herokuapp.com/users?number=${nextFile.name
            .split(".")
            .slice(0, -1)
            .join(".")}`
        )
        .then(result => {
          if (result.data[0].id) {
            let id = result.data[0].id;
            let data = new FormData();
            data.append("files", nextFile);
            data.append("refId", id);
            data.append("ref", "user");
            data.append("field", "file");
            data.append("source", "users-permissions");
            axios
              .post(
                `https://arcane-everglades-49934.herokuapp.com/upload`,
                data
              )
              .then(() => setLoadingStatus(nextFileIndex, status.SUCCESS))
              .catch(() => setLoadingStatus(nextFileIndex, status.ERROR))
              .finally(() => recursiveUploadChain(files));
          }
        })
        .then(() => setLoadingStatus(nextFileIndex, status.SUCCESS))
        .catch(() => setLoadingStatus(nextFileIndex, status.ERROR))
        .finally(() => recursiveUploadChain(files));
    } else {
      return Promise.resolve().then(() => setIsLoading(false));
    }
  }

  function handleLoadFileChange(event) {
    let files = [];
    let filesStatus = [];
    Object.values(event.target.files).map(file => {
      files.push(file);
      filesStatus.push(status.READY);
    });
    setFilesToBeLoaded(files);
    setFilesToBeLoadedStatus(filesStatus);
    setLoadedFilesLength(files.length);
  }

  return (
    <>
      <Title text={tabs.LOAD} />
      {!isLoading && (
        <Input type="file" onChange={e => handleLoadFileChange(e)} multiple />
      )}
      {!isLoading && filesToBeLoaded && (
        <Button
          onClick={() => recursiveUploadChain(setFilesArray(filesToBeLoaded))}
        >
          Cargar archivos
        </Button>
      )}
      <FilesDisplay>
        <div>
          <FilesDisplayHeading>Archivos</FilesDisplayHeading>
          {filesToBeLoaded &&
            filesToBeLoaded.map((file, i) => {
              return (
                <FilesToBeLoaded key={file + i}>
                  {file.name
                    .split(".")
                    .slice(0, -1)
                    .join(".")}
                </FilesToBeLoaded>
              );
            })}
        </div>
        <div>
          <FilesDisplayHeading>Estado</FilesDisplayHeading>
          {filesToBeLoaded &&
            filesToBeLoadedStatus.map((status, i) => {
              return (
                <FilesStatus key={status + i} status={status}>
                  {status}
                </FilesStatus>
              );
            })}
        </div>
      </FilesDisplay>
      <Loader />
    </>
  );
}

export default LoadFiles;
