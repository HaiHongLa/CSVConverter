import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedOutputFormat, setSelectedOutputFormat] = useState("");
  const [downloadReady, setDownloadReady] = useState(false);
  const [downloadFilename, setDownloadFilename] = useState("");
  const [errorObj, setErrorObj] = useState({ hasError: false, errorMsg: "" });

  const clickHandler = () => {
    document.getElementById("csvFile").click();
    setErrorObj({ hasError: false, errorMsg: "" });
  };

  const uploadHandler = (event) => {
    if (!event.target.files[0]) {
      setIsFilePicked(false);
      return;
    }
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const selectOutputHandler = (event) => {
    setSelectedOutputFormat(event.target.value);
  };

  const convertHandler = async () => {
    if (selectedOutputFormat.length <= 0) {
      setErrorObj({
        hasError: true,
        errorMsg: "Please choose an output format",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/convert/" + selectedOutputFormat + "/",
        {
          method: "POST",
          body: formData,
          contentType: "multipart/form-data",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg);
      }

      setDownloadFilename(data.filename);
      setDownloadReady(true);
      setErrorObj({ hasError: false, errorMsg: "" });

    } catch (err) {
      // console.log(err.message);
      setErrorObj({ hasError: true, errorMsg: "An error occurred when converting" });
    }
  };

  const downloadHandler = (event) => {
    event.preventDefault();
    document.getElementById("downloadLink").click();
    setSelectedFile("");
    setIsFilePicked(false);
    setSelectedOutputFormat("");
    setDownloadReady(false);
    setDownloadFilename("");
  };

  return (
    <div className="jumbotron">
      <h1 className="display-4">Online CSV Converter</h1>
      <p className="lead">Converts your CSV file to other file types</p>
      <hr className="my-4" />
      <p>Upload your CSV file and select your output format</p>
      <p className="lead">
        <a
          className="btn btn-primary btn-lg"
          href="#"
          role="button"
          onClick={clickHandler}
        >
          Upload CSV file
          <input
            id="csvFile"
            type="file"
            name="file"
            style={{ display: "none" }}
            accept=".csv"
            onChange={uploadHandler}
          ></input>
        </a>
      </p>
      <p>{isFilePicked && "Selected file: " + selectedFile.name}</p>
      <p>{!isFilePicked && "No file selected"}</p>

      {isFilePicked && (
        <div className="d-flex justify-content-center">
          <select
            id="selectOuputFormat"
            className="form-control form-control-lg "
            onChange={selectOutputHandler}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Select output format
            </option>
            <option>xlsx</option>
            <option>html</option>
            <option>txt</option>
            <option>pkl</option>
            <option>xml</option>
            <option>txt</option>
          </select>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={convertHandler}
          >
            Convert
          </button>
        </div>
      )}
      {errorObj.hasError && <p style={{ color: "red" }}>{errorObj.errorMsg}</p>}
      {downloadReady && (
        <div>
          <p>Download is ready</p>
          <button className="btn btn-primary" onClick={downloadHandler}>
            Download
          </button>
          <a
            id="downloadLink"
            href={
              "https://csv-converter-haila.s3.us-east-2.amazonaws.com/" +
              downloadFilename
            }
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
