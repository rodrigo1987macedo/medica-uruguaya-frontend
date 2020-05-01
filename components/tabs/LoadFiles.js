import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { status } from "../../constants/status";
import { table } from "../../constants/table";
import { tabs } from "../../constants/tabs";
import Button from "../common/Button";
import Table from "../common/Table";
import Title from "../common/Title";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const Input = styled.input`
  padding: 4px 10px;
  height: 30px;
  width: 250px;
`;

const FileLoader = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 30px 0;
  min-height: 30px;
`;

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
            .join(".")}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.get("guards")}`
            }
          }
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
                data,
                {
                  headers: {
                    Authorization: `Bearer ${cookies.get("guards")}`
                  }
                }
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
      <Title text={tabs.LOAD} tag="h1" />
      <FileLoader>
        {!isLoading ? (
          <div>
            <Input
              type="file"
              onChange={e => handleLoadFileChange(e)}
              multiple
            />
            <Button
              text="Cargar archivos"
              onClick={() =>
                recursiveUploadChain(setFilesArray(filesToBeLoaded))
              }
            />
          </div>
        ) : (
          <div>Procesando...</div>
        )}
      </FileLoader>
      <Table
        data={[
          { heading: table.FILES, content: filesToBeLoaded },
          { heading: table.STATE, content: filesToBeLoadedStatus }
        ]}
      />
    </>
  );
}

export default LoadFiles;
