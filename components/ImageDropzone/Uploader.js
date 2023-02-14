import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import getCroppedImg from "./ImageCrop";
import { Card, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateProfilePic } from "../../store/profile";

export const Uploader = (props) => {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const currentFile = acceptedFiles[0];
      const myFileItemReader = new FileReader();
      myFileItemReader.readAsDataURL(currentFile);
      myFileItemReader.addEventListener("load", () => {
        setImgSrc(myFileItemReader.result);
      });
    }
  }, []);

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imgSrc,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      dispatch(updateProfilePic(croppedImage));

      // console.log("croppedImage: ", croppedImage);
    } catch (err) {
      console.log(err);
    }
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    // console.log("croppedArea : ", croppedArea);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onZoomChange = (zoom) => {
    // console.log("zoom: ", zoom);
    setZoom(zoom);
  };

  const onRotationChange = (rotation) => {
    // console.log("Rotation: ", rotation);
    setRotation(rotation);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Modal {...props} size="lg" style={{ top: "10%" }}>
        <Modal.Header className="d-flex justify-content-between d-flex flex-row-reverse">
          {/* <h5 className="modal-title" id="post-modalLabel">
                  Profile Crop
                </h5> */}
          <button
            type="button"
            className="btn btn-secondary lh-1 "
            onClick={props.onHide}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </Modal.Header>

        {imgSrc == "" ? (
          <Modal.Body>
            <div {...getRootProps()} style={{ textAlign: "center" }}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "50px", color: "#48badd" }}
                  >
                    download
                  </span>
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </>
              )}
            </div>
          </Modal.Body>
        ) : (
          <div className="container">
            <Card>

              <Card.Body style={{ height: "500px", minHeight: "250px" }}>
                <div
                  className="text-center h-100"
                  style={{ position: "relative" }}
                >
                  <Cropper
                    className="w-100 h-100"
                    image={imgSrc}
                    crop={crop}
                    zoom={zoom}
                    cropShape="round"
                    aspect={aspect}
                    rotation={rotation}
                    onCropChange={onCropChange}
                    onCropComplete={onCropComplete}
                    onZoomChange={onZoomChange}
                    onRotationChange={onRotationChange}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="controls">
                  <label>Zoom</label>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sc-ktwmPu fieEIt"
                  >
                    <path d="M7 7h10v10H7V7zm5 3l-3 4h6l-3-4z"></path>
                  </svg>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => onZoomChange(e.target.value || zoom)}
                    className="form-range w-50"
                  />
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sc-bUVJja bAlZLz"
                  >
                    <path d="M15 16h4l-4.5-8-3.192 4.643L9.5 11 5 16h10zM2 2h20v20H2V2z"></path>
                  </svg>
                </div>
                <div className="controls">
                  <label>Rotation</label>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sc-hoiiUa cPTyAB"
                  >
                    <path d="M18 12a6 6 0 11-1.5-4H14v2h5c.6 0 1-.4 1-1V4h-2v2.7A8 8 0 004 12a8 8 0 1016 0h-2z"></path>
                  </svg>
                  <input
                    type="range"
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="rotation"
                    onChange={(e, rotation) =>
                      onRotationChange(e.target.value || rotation)
                    }
                    className="form-range w-50"
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-danger" onClick={props.onHide}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={showCroppedImage}
                  >
                    Crop
                  </button>
                </div>
              </Card.Footer>
            </Card>
          </div>
        )}
        {/* <span
        onClick={props.onHide}
        className="material-symbols-outlined  cursor-pointer"
        style={{
          position: "absolute",
          right: "7%",
          top: "11%",
          zIndex: 1111,
          fontSize: "30px",
        }}
        role="button"
      >
        close
      </span> */}
      </Modal>
    </>
  );
};
