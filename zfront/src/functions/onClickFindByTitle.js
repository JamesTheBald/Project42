    const onClickFindByTitle = (searchTitl,setPostingsDataArr) => {
    
    console.log("onClickFindByTitle.js searchTitle=",searchTitl)
    PostingAxios.findByTitle(searchTitl)
      .then((response) => {
        setPostingsDataArr(response.data);
        console.log("onClickFindByTitle.js response.data=", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export default onClickFindByTitle;