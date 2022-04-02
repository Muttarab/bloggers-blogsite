import { makeStyles, Box, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";
import Clamp from "react-multiline-clamp";
import parse from "html-react-parser";
const useStyle = makeStyles({
  container: {
    borderRadius: 5,
    margin: 10,
    display: "flex",
    marginTop: 16,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    backgroundColor: 'white',
    alignItems: "center",
    flexDirection: "column",
    transition: '0.2s',
    height: 380,

    "& > *": {
      padding: "0 0px 0px 0px",
    },
    "&:hover": {
      boxShadow:
        "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
      transition: '0.2s',
      transform: " scale(0.9)",
      textDecoration: 'none'
    },
  },
  image: {
    width: "100%",
    objectFit: "cover",
    borderRadius: "5px 5px 0 0",
    height: 350,
  },
  text: {
    color: "#878787",
    fontSize: 10,
  },
  heading: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600,
  },
  detail: {
    fontSize: 16,
    wordBreak: "break-word",
    paddingBottom: 20,
  },
  clamp: {
    textAlign: "center",
    fontSize: 16,
    textDecoration: 'none'
  },
});

const Post = ({ post }) => {
  const classes = useStyle();
  const url = `/${post.picture.slice(7)}`;
  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result;   
        resolve(base64data);
      }
    });
  }
  getBase64FromUrl(url).then(value=>{
    setImage(value);
  })
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `/user/${post.userId}`
      );
      setUsername(response.data.name);
    };
    getData();
  }, []);
  return (
    <Box className={classes.container}>
      <img src={image} alt="no blogpost-image" className={classes.image} />
      <Typography className={classes.text}>
        {" "}
        {new Date(post.createdAt).toDateString()}
      </Typography>
      <Typography className={classes.heading}>{post.title}</Typography>
      <Typography className={classes.text}>
        <b>Author:</b> {username}
      </Typography>
      <Clamp withTooltip lines={4}>
      <Typography className={classes.clamp}>{parse(post.description)}</Typography>
      </Clamp>
    </Box>
  );
};
export default Post;