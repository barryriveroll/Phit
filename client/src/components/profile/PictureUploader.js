import React, { Component, getGlobal, setGlobal } from "reactn";
import Paper from "@material-ui/core/Paper";
import { storage } from "../../firebase";
import { withRouter } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import "../../pages/profile.css";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import API from "../../utils/API";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,

  FilePondPluginFileValidateSize
);

let username = "";

class PictureUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      editingPhoto: false
    };
  }

  editButton = () => {
    this.setState({ editingPhoto: true });
  };

  handleInit() {
    // console.log("FilePond instance has initialised", this.pond);
  }

  handleSubmit = () => {
    if (this.state.files.length) {
      // Create a root reference
      var storageRef = storage.ref(
        "profiles/" + this.state.files[0].name + new Date().getTime()
      );

      var file = this.state.files[0]; // use the Blob or File API
      storageRef.put(file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          const picture = {
            id: localStorage.userId,
            photo: downloadURL
          };
          let username = this.props.match.params.username;
          API.findProfile(username)
            .then(res => {
              if (
                res.data.length &&
                res.data[0].picture !== "https://i.imgur.com/1vwfqhE.jpg"
              ) {
                // Create a reference to the file to delete
                var profilePictureRef = storage.refFromURL(res.data[0].picture);

                // Delete the file
                profilePictureRef.delete().catch(function(error) {
                  console.log(error); // Uh-oh, an error occurred!
                });
              }
            })
            .then(() => {
              API.uploadPicture(picture);
              this.props.updatePicture(downloadURL);
              setTimeout(() => {
                this.setState({ editingPhoto: false, files: [] });
              }, 2000);
            });
        });
      });
    }
  };
  changeFile = event => {
    this.setState({ newPicture: event.target.value });
  };

  changePicture = event => {
    this.setState({ file: event.target.files });
  };

  componentDidMount = () => {
    username = this.props.match.params.username;
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className="profile-picture" className={classes.paper}>
        <Typography
          component="h1"
          className={classes.panelHeader}
          color="secondary"
        >
          {username}
        </Typography>
        <div style={{ position: "relative" }}>
          <img
            src={this.props.profilePicture}
            alt="place"
            style={{ width: 300, height: 300, borderRadius: 4 }}
          />
          {this.props.monkeyWrench ? (
            <Fab
              style={{
                position: "absolute",
                bottom: 14,
                right: 10,
                zIndex: 3,
                display: this.state.editingPhoto ? "none" : "flex"
              }}
              onClick={this.editButton}
            >
              <Icon>edit_icon</Icon>
            </Fab>
          ) : null}

          {/* Pass FilePond properties as attributes */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              zIndex: 3,
              width: 280,
              height: 76,
              margin: "14px 10px",
              display: this.state.editingPhoto ? "inherit" : "none"
            }}
          >
            <FilePond
              allowFileSizeValidation={true}
              maxFileSize={"50KB"}
              labelMaxFileSizeExceeded={"Images must be less than 50KB"}
              allowImagePreview={false}
              ref={ref => (this.pond = ref)}
              files={this.state.files}
              name={"file"}
              allowMultiple={false}
              maxFiles={1}
              server="/upload"
              oninit={() => this.handleInit()}
              onupdatefiles={fileItems => {
                // Set currently active file objects to this.state
                this.setState({
                  files: fileItems.map(fileItem => fileItem.file)
                });
              }}
              onprocessfile={this.handleSubmit}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

export default withRouter(PictureUploader);
